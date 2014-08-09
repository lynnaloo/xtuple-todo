/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	app.Todo = Backbone.Model.extend({
    defaults: {
      isActive: true,
      status: 'N',
      dueDate: '1/1/2016'
    }
  });

  var TodoCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Todo,

		// Save all of the todo items under the `"todos"` namespace.
		//localStorage: new Backbone.LocalStorage('todos-react-backbone'),

    // Returns the relative URL where the model's resource would be
    // located on the server. If your models are located somewhere else,
    // override this method with the correct logic. Generates URLs of the
    // form: "/[collection.url]/[id]", falling back to "/[urlRoot]/id" if
    // the model is not part of a collection.
    // Note that url may also be defined as a function.
    url: '/todos'

	});

	// Create our global collection of **Todos**.
	app.todos = new TodoCollection();

})();
