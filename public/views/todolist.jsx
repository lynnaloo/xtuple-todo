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

var CommentList = React.createClass({
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
          <section id='main'>
            <input id='toggle-all' type='checkbox'/>
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
  <CommentList data={app.todos} />,
  document.getElementById('todoapp')
);
