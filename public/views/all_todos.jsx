/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Backbone */
var app = app || {};

var TodoItem = app.TodoItem;

var CommentList = React.createClass({
    getInitialState: function() {
      return {data: []};
    },

    componentDidMount: function() {
      var self = this;

      this.props.data.fetch({
        success: function () {
          self.setState({data: self.props.data});
        }
      });
    },

    render: function() {
      var main, todoItems,
        todos = this.state.data;

      if (todos.length) {
        todoItems = todos.models.map(function (todo) {
          return (
            <TodoItem key={todo.get('uuid')} todo={todo} />
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
