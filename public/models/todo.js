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

    url: '/todos'

	});

	// Create our global collection of **Todos**.
	app.todos = new TodoCollection();

})();
