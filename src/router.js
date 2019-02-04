// imports.
import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";
import BaseRouter from "./base_router";
import * as ViewManager from "./view_manager";

/** Function: initialize
 *  Arguments:
 *      - options: Options to pass to the view.
 *  Defenition:
 *      This function creates an AppRouter that is used to
 *      create routes and render views based on the  route.
 *  Returns:
 *      - None
 **/
let initialize = options => {
    let AppRouter = BaseRouter.extend({
        // All the routes that are present in the application.
        routes: {
            "": "index",
            todos: "todoIndex",
            "todo/create": "todoCreate",
            "todo/:id/edit": "todoEdit"
        },

        // Routes restricted after user logs in.
        cancelAccess: ["login"],

        /** Function: before
         *  Arguments:
         *      - params: params to check if the user is logged in.
         *      - next: This is a function to continue on to the route
         *              if the user is logged in.
         *  Defenition:
         *      This function runs before each route is accesed to
         *      check the login status of the user.
         *  Returns:
         *      - None
         **/
        before: function(params, next) {
            //TODO: Authentication Check.
            next();
        },

        /** Function: index
         *  Arguments:
         *      - None
         *  Defenition:
         *      This function creates and renders the index view for
         *      the users to acces the home page of the app.
         *  Returns:
         *      - None
         **/
        index: () => {
            import("./views/index.view").then(module => {
                let index_route = ViewManager.create("index", module.default, {
                    vent: options.vent
                });
                $("#main").html(index_route.render().$el);
            });
        },

        /** Function: todoIndex
         *  Arguments:
         *      - None
         *  Defenition:
         *      This function creates and renders the todo index view
         *      for the users to acces the todos page of the app.
         *  Returns:
         *      - None
         **/
        todoIndex: () => {
            import("./views/todo/index.view").then(module => {
                let todo_list = ViewManager.create(
                    "todo:index",
                    module.default,
                    { vent: options.vent, model: options.collections.todos }
                );
                $("#main").html(todo_list.render().$el);
            });
        },

        /** Function: todoCreate
         *  Arguments:
         *      - None
         *  Defenition:
         *      This function creates and renders the todo create view
         *      for the users to acces the home page of the app.
         *  Returns:
         *      - None
         **/
        todoCreate: () => {
            import("./views/todo/create.view").then(module => {
                let todo_create = ViewManager.create(
                    "todo:edit",
                    module.default,
                    { vent: options.vent }
                );
                $("#main").html(todo_create.render().$el);
            });
        },

        /** Function: todoEdit
         *  Arguments:
         *      - id: The todo id to edit.
         *  Defenition:
         *      This function creates and renders the todo edit view
         *      for the users to acces the home page of the app.
         *  Returns:
         *      - None
         **/
        todoEdit: id => {
            import("./views/todo/edit.view").then(module => {
                let todo = options.collections.todos.get(id);
                let todo_edit = ViewManager.create(
                    "todo:edit",
                    module.default,
                    { vent: options.vent, model: todo }
                );

                $("#main").html(todo_edit.render().$el);
            });
        }
    });

    // Creating a router and starting the history.
    let router = new AppRouter();
    Backbone.history.start({ pushState: true });
};

export { initialize };
