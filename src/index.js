import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";
import AppView from "./views/app.view";
import * as ViewManager from "./view_manager";
import * as Router from "./router";
import Todos from "./collections/todos.collection";
import Todo from "./models/todo.model";
import "../assets/styles/main.scss";

// Creating the App.
let App = {
    models: {},
    collections: {},
    vent: _.extend({}, Backbone.Events)
};

// Adding a todo collection to the app.
App.collections.todos = new Todos([
    new Todo({
        id: 1,
        title: "this is first todo",
        description: "Go to the shopping center",
        author: {
            name: "Barn"
        }
    }),
    new Todo({
        id: 2,
        title: "this is first todo",
        description: "Go to the shopping center",
        author: {
            name: "john"
        }
    }),
    new Todo({
        id: 3,
        title: "this is first todo",
        description: "Go to the shopping center",
        author: "C"
    })
]);

// Initializing the router with the routes.
Router.initialize(App);
// Creating the initial layout with viewManager.
let view = ViewManager.create("app", AppView, {});
// Rendering the initial layout to the dom.
$("#app").html(view.render().$el);
