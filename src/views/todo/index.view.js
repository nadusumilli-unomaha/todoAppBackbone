import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";
import TodoIndexTemplate from "../../templates/todo/index.hbs";
import Row from "./row.view";
import "../../../assets/styles/todo-index.scss";
import Todo from "../../models/todo.model";

/** View: TodoIndexView
 *  Arguments:
 *      - None
 *  Defenition:
 *      This extends backbone view to create a todo index that
 *      is used to list all the todos in the app.
 *  Returns:
 *      - None
 **/
let index = Backbone.View.extend({
    // ChildViews used for cleanup.
    childViews: [],
    // Template for the index.
    template: TodoIndexTemplate,

    /** Function: initialize
     *  Arguments:
     *      - options: Options to pass to the view.
     *  Defenition:
     *      This function is used to initialize the todo index view.
     *  Returns:
     *      - None
     **/
    initialize: function(options) {
        if (!(options && options.model))
            throw new Error("A model has not been passed to todo index");
        this.vent = options.vent;
        // Listening to a todo:create event.
        options.vent.on("todo:create", this.onAddTodo, this);
    },

    // Binding events to functions.
    events: {
        "click #create-redirect-todo": "redirectCreate"
    },

    /** Function: redirectCreate
     *  Arguments:
     *      - None
     *  Defenition:
     *      This function is used to redirect users to create
     *      on a button click
     *  Returns:
     *      - None
     **/
    redirectCreate: function() {
        Backbone.history.navigate("todo/create", true);
    },

    /** Function: onAddTodo
     *  Arguments:
     *      - data: data to create a todo.
     *  Defenition:
     *      This function called on an event trigger and creates
     *      a todo object and adds it to a list and also appends
     *      it to the view.
     *  Returns:
     *      - None
     **/
    onAddTodo: function(data) {
        let todo = new Todo(data);
        this.model.create(todo);
        let todo_row_view = new Row({ model: todo });
        $("todo-list").append(todo_row_view.render().$el);
        this.vent.off("todo:create");
    },

    /** Function: clean
     *  Arguments:
     *      - None
     *  Defenition:
     *      This function removes the app view and unbinds any events.
     *  Returns:
     *      - None
     **/
    clean: function() {
        this.remove();
        this.unbind();
        _.each(this.childviews, view => {
            if (view.clean) view.clean();
        });
    },

    /** Function: render
     *  Arguments:
     *      - None
     *  Defenition:
     *      This function creates the render element for the
     *      app to render to the dom. This also loops through
     *      all the models and creates a child view for each todo.
     *  Returns:
     *      - this: the element to render.
     **/
    render: function() {
        this.$el.html(this.template({}));
        this.model.each(Todo => {
            let todo_row_view = new Row({ model: Todo, vent: this.vent });
            this.$el.find("#todo-list").append(todo_row_view.render().$el);
            this.childViews.push(todo_row_view);
        });
        return this;
    }
});

export default index;
