import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";
import TodoCreateTemplate from "../../templates/todo/create.hbs";

/** View: create_todo
 *  Arguments:
 *      - None
 *  Defenition:
 *      This extends backbone view to create a page
 *      to create todos.
 *  Returns:
 *      - None
 **/
let create_todo = Backbone.View.extend({
    // Template to create a todo.
    template: TodoCreateTemplate,

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
            throw new Error("event emitter not passed to create");
        this.vent = options.vent;
    },

    // Binding events to functions.
    events: {
        "click #create-todo": "createTodo"
    },

    /** Function: createTodo
     *  Arguments:
     *      - None
     *  Defenition:
     *      This function takes the event that has triggered and
     *      creates a todo:create event passing the data
     *      from the page.
     *  Returns:
     *      - None
     **/
    createTodo: function(e) {
        e.preventDefault();
        let $title = $("#title").val();
        let $description = $("#description").val();
        let $author = $("#author").val();

        // Validating data.
        if ($title.trim() && $description.trim() && $author.trim()) {
            // gathering data together.
            let data = {
                id: Math.random()
                    .toString(36)
                    .substr(2, 9),
                title: $title,
                description: $description,
                author: $author
            };

            // event trigger to send data to index
            this.vent.trigger("todo:create", data);

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
        this.$el.html(this.template({}));
        return this;
    }
});

export default create_todo;
