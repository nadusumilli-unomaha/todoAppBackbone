import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";
import TodoEditTemplate from "../../templates/todo/edit.hbs";

/** View: edit_todo
 *  Arguments:
 *      - None
 *  Defenition:
 *      This extends backbone view to create a page
 *      to edit todos.
 *  Returns:
 *      - None
 **/
let edit_todo = Backbone.View.extend({
    // Tempalte for editing todos.
    template: TodoEditTemplate,

    /** Function: initialize
     *  Arguments:
     *      - options: Options to pass to the view.
     *  Defenition:
     *      This function is used to initialize the todo create view.
     *  Returns:
     *      - None
     **/
    initialize: function(options) {
        if (!(options && options.vent))
            throw new Error("Event emitter not passed to edit view");
    },

    // Binding events to functions.
    events: {
        "click #edit-todo": "todoEdit"
    },

    /** Function: todoEdit
     *  Arguments:
     *      - e: Event that has triggered
     *  Defenition:
     *      This function takes the event that has triggered and
     *      gathers data and tries to edit a todo.
     *  Returns:
     *      - this: the element to render.
     **/
    todoEdit: function(e) {
        e.preventDefault();
        let $title = $("#title").val();
        let $description = $("#description").val();
        let $author = $("#author").val();
        if ($title.trim() && $description.trim() && $author.trim()) {
            this.model.edit({
                title: $title,
                description: $description,
                author: $author
            });
            Backbone.history.navigate("todos", true);
        } else {
            // TODO: Display error messages
        }
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
        this.$el.html(this.template({ todo: this.model.toJSON() }));
        return this;
    }
});

export default edit_todo;
