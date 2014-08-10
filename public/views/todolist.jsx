/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Backbone */
var app = app || {};

app.ALL_TODOS = 'all';
app.ACTIVE_TODOS = 'active';
app.COMPLETED_TODOS = 'completed';
var TodoItem = app.TodoItem;
var ENTER_KEY = 13;

// An example generic Mixin that you can add to any component that should
// react to changes in a Backbone component. The use cases we've identified
// thus far are for Collections -- since they trigger a change event whenever
// any of their constituent items are changed there's no need to reconcile for
// regular models. One caveat: this relies on getBackboneCollections() to
// always return the same collection instances throughout the lifecycle of the
// component. If you're using this mixin correctly (it should be near the top
// of your component hierarchy) this should not be an issue.
var BackboneMixin = {
	componentDidMount: function () {
		// Whenever there may be a change in the Backbone data, trigger a
		// reconcile.
		this.getBackboneCollections().forEach(function (collection) {
			// explicitly bind `null` to `forceUpdate`, as it demands a callback and
			// React validates that it's a function. `collection` events passes
			// additional arguments that are not functions
			collection.on('add remove change', this.forceUpdate.bind(this, null));
		}, this);
	},

	componentWillUnmount: function () {
		// Ensure that we clean up any dangling references when the component is
		// destroyed.
		this.getBackboneCollections().forEach(function (collection) {
			collection.off(null, null, this);
		}, this);
	}
};

var ToDoList = React.createClass({
    mixins: [BackboneMixin],
		getBackboneCollections: function () {
			return [this.props.data];
		},

    getInitialState: function() {
      return {data: []};
    },

    componentDidMount: function() {
      var self = this;

      // TODO: create picker to set this value
      self.setState({nowShowing: app.ACTIVE_TODOS});

      this.props.data.fetch({
        success: function () {
          self.setState({data: self.props.data});
        }
      });
    },

    // Add a new record when the enter key is pressed
    handleNewTodoKeyDown: function (event) {
      if (event.which !== ENTER_KEY) {
        return;
      }

      var name = this.refs.newNameField.getDOMNode().value.trim(),
        dueDate = this.refs.newDateField.getDOMNode().value.trim();

      // Both fields are required
      if (name && dueDate) {
        this.state.data.create({
          name: name,
          dueDate: dueDate
        });
        this.refs.newNameField.getDOMNode().value = '';
        this.refs.newDateField.getDOMNode().value = '';
      }

      return false;
    },

    toggleAll: function (event) {
			var checked = event.target.checked;
			this.props.todos.forEach(function (todo) {
				if (checked) {
          todo.set('status', 'C');
        } else {
          todo.set('status', 'N')
        }
			});
		},

    edit: function (todo, callback) {
			// refer to todoItem.jsx `handleEdit` for the reason behind the callback
			this.setState({editing: todo.get('uuid')}, callback);
		},

		save: function (todo, text) {
			todo.save({name: text});
			this.setState({editing: null});
		},

		cancel: function () {
			this.setState({editing: null});
		},

    render: function() {
      var main, todoItems,
        todos = this.state.data;

      var activeTodoCount = todos.reduce(function (accum, todo) {
				return todo.get('status') === 'C' ? accum : accum + 1;
			}, 0);

			var completedCount = todos.length - activeTodoCount;

      if (todos.length) {

        var shownTodos = todos.models.filter(function (todo) {
  				switch (this.state.nowShowing) {
  				case app.ACTIVE_TODOS:
  					return todo.get('status') !== 'C';
  				case app.COMPLETED_TODOS:
  					return todo.get('status') === 'C';
  				default:
  					return true;
  				}
  			}, this);

        todoItems = shownTodos.map(function (todo) {
          return (
            <TodoItem
              key={todo.get('uuid')}
              todo={todo}
						  onToggle={todo.toggle.bind(todo)}
						  onDestroy={todo.destroy.bind(todo)}
						  onEdit={this.edit.bind(this, todo)}
						  editing={this.state.editing === todo.get('uuid')}
						  onSave={this.save.bind(this, todo)}
						  onCancel={this.cancel}
            />
          );
        }, this);

        main = (
					<section id="main">
						<input
							id="toggle-all"
							type="checkbox"
							onChange={this.toggleAll}
							checked={activeTodoCount === 0}
						/>
						<ul id="todo-list">
							{todoItems}
						</ul>
					</section>
				);
      }

      return (
        <div>
          <header id="header">
            <h1>xTuple To Dos</h1>
            <input
              ref="newNameField"
              id="new-todo-name"
              placeholder="What needs to be done?"
              onKeyDown={this.handleNewTodoKeyDown}
              autoFocus={true}
            />
            <input
              ref="newDateField"
              id="new-todo-date"
              placeholder="By when?"
              onKeyDown={this.handleNewTodoKeyDown}
            />
          </header>
          {main}
        </div>
      );
    }
});

React.renderComponent(
  <ToDoList data={app.todos} />,
  document.getElementById('todoapp')
);
