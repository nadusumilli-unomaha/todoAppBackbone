import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";
import TodoRowTemplate from "../../templates/todo/row.hbs";
import "../../../assets/styles/todo-list.scss";

/** View: TodoRowView
 *  Arguments:
 *      - None
 *  Defenition:
 *      This extends backbone view to create a todo row in the
 *      index that is used to list all the todos in the app.
 *  Returns:
 *      - None
 **/
let row = Backbone.View.extend({
    // TagName for the view.
    tagName: "tr",

    // Template for the row of todo.
    template: TodoRowTemplate,

    /** Function: initialize
     *  Arguments:
     *      - options: Options to pass to the view.
     *  Defenition:
     *      This function is used to initialize the todo row view.
     *  Returns:
     *      - None
     **/
    initialize: function(options) {
        if (!(options && options.model))
            throw new Error("A model is not passed to todo row");
    },

    // Binding events to functions.
    events: {
        "click #edit-redirect-todo": "redirectEdit",
        "click #delete-todo": "deleteTodo",
        "click #completed": "toggleComplete"
    },

    /** Function: toggleComplete
     *  Arguments:
     *      - None
     *  Defenition:
     *      This function is used to toggle a todo to completed.
     *  Returns:
     *      - None
     **/
    toggleComplete: function(e) {
        this.model.toggleComplete();
        $("#todo" + this.model.id).toggleClass("completed");
    },

    /** Function: redirectEdit
     *  Arguments:
     *      - None
     *  Defenition:
     *      This function is used to redirect users to edit todo
     *      on a button click
     *  Returns:
     *      - None
     **/
    redirectEdit: function() {
        Backbone.history.navigate("todo/" + this.model.id + "/edit", true);
    },

    /** Function: deleteTodo
     *  Arguments:
     *      - e: the event that has triggered the function.
     *  Defenition:
     *      This function deletes the todo from the list and dom.
     *  Returns:
     *      - None
     **/
    deleteTodo: function(e) {
        let id = $(e.target).attr("data-id");
        this.model.deleteData();
        $("#todo" + id).remove();
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
    },

    /** Function: render
     *  Arguments:
     *      - None
     *  Defenition:
     *      This function creates the render element for the
     *      app to render to the dom.
     *  Returns:
     *      - this: the element to render.
     **/
    render: function() {
        this.$el.attr("id", "todo" + this.model.id);
        this.$el.toggleClass("completed", this.model.get("completed"));
        this.$el.html(this.template({ todo: this.model.toJSON() }));
        return this;
    }
});

export default row;
