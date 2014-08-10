/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app = app || {};

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

app.TodoItem = React.createClass({
	getInitialState: function () {
		return {editText: this.props.todo.get('name')};
	},

	render: function () {
		var dueDate = this.props.todo.get('dueDate');

		return (
			<li>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={this.props.todo.get('isActive')}
					/>
					<label>
						{this.props.todo.get('name')}
					</label>
					<label>
						{moment(dueDate).format('L')}
					</label>
				</div>
				<input
					ref="editField"
					className="edit"
					value={this.state.editText}
				/>
			</li>
		);
	}
});
