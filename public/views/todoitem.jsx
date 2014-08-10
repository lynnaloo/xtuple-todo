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

	handleSubmit: function () {
		var val = this.state.editText.trim();
		if (val) {
			this.props.onSave(val);
			this.setState({editText: val});
		} else {
			this.props.onDestroy();
		}
		return false;
	},

	handleKeyDown: function (event) {
		if (event.which === ESCAPE_KEY) {
			this.setState({editText: this.props.todo.get('name')});
			this.props.onCancel();
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit();
		}
	},

	handleChange: function (event) {
		this.setState({editText: event.target.value});
	},

	render: function () {
		var dueDate = this.props.todo.get('dueDate');

		return (
			<li className={React.addons.classSet({
				completed: this.props.todo.get('status') === 'C',
				editing: this.props.editing
			})}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={this.props.todo.get('status') === 'C'}
						onChange={this.props.onToggle}
					/>
					<label>
						{this.props.todo.get('name')}
					</label>
					<label>
						{moment(dueDate).format('L')}
					</label>
					<button className="destroy" onClick={this.props.onDestroy} />
				</div>
				<input
					ref="editField"
					className="edit"
					value={this.state.editText}
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
			</li>
		);
	}
});
