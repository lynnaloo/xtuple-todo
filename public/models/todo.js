/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Store the original version of Backbone.sync
  var backboneSync = Backbone.sync;

	Backbone.sync = function(method, model, options) {

		options = options || {};

		switch (method) {
			case 'create':
				var params = {
					type: 'POST',
					url: '/add',
					contentType: 'application/json',
					data: model,
					dataType: 'json',
				};
				$.ajax(_.extend(params, options));
				break;

			case 'update':
				backboneSync(method, model, options);
				break;

			case 'patch':
				backboneSync(method, model, options);
				break;

			case 'delete':
				backboneSync(method, model, options);
				break;

			case 'read':
				backboneSync(method, model, options);
				break;

			default:
				// Something probably went wrong
				console.error('Unknown method:', method);
				break;
		}
	};

	// Todo Model
	// ----------
	app.Todo = Backbone.Model.extend({

		defaults: {
      isActive: true,
      status: 'N'
    },

		// Toggle the `completed` state of this todo item.
		toggle: function () {
			this.save({
				status: this.get('status') === 'N' ? 'C' : 'N'
			});
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
