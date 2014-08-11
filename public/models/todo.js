/*global Backbone */
var app = app || {};

	// Store the original version of Backbone.sync
  var backboneSync = Backbone.sync;

	// Todo Model
	// ----------
	app.Todo = Backbone.Model.extend({

		defaults: {
      isActive: true,
      status: 'N'
    },

		methodToURL: {
			'read': '/todos',
			'create': '/add',
			'update': '/update',
			'delete': '/remove'
		},

    idAttribute: 'uuid',

		sync: function(method, model, options) {
			options = options || {};
			options.url = model.methodToURL[method.toLowerCase()];

      if (method.toLowerCase() === 'delete') {
        options.url = options.url + '/' +  model.id;
      }

			return Backbone.sync(method, model, options);
		},

		// Toggle the `completed` state of this todo item.
		toggle: function () {
      // this.save({
      // status: this.get('status') === 'N' ? 'C' : 'N'
      // });
		}

  });

  var TodoCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Todo,

    url: '/todos'

	});

	// Create our global collection of **Todos**.
	app.todos = new TodoCollection();
