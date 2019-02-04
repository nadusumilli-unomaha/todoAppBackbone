import _ from "underscore";
import Backbone from "backbone";

/** Model: todo
 *  Arguments:
 *      - None
 *  Defenition:
 *      This extends backbone model to create a todo model.
 *  Returns:
 *      - None
 **/
let todo = Backbone.Model.extend({
    // Creating defaults if the model is created without data.
    defaults: {
        id: null,
        title: null,
        description: null,
        author: null,
        completed: false
    },

    /** Function: validate
     *  Arguments:
     *      - attrs: attributes to validate.
     *  Defenition:
     *      This function is used to validate todo attributes.
     *  Returns:
     *      - None
     **/
    validate: function(attrs) {
        if (!attrs.title) throw new Error("Title is required.");
        if (!attrs.description) throw new Error("Description is required.");
    },

    // Url location to send backend requests.
    urlRoot: "/todo",

    /** Function: toggleComplete
     *  Arguments:
     *      - None
     *  Defenition:
     *      This function is used to toggle the completed attribute
     *      of a single todo object.
     *  Returns:
     *      - None
     **/
    toggleComplete: function() {
        this.set("completed", !this.get("completed"));
        this.save();
    },

    /** Function: edit
     *  Arguments:
     *      - data: data to edit a todo.
     *  Defenition:
     *      This function is used to edit a single todo object.
     *  Returns:
     *      - None
     **/
    edit: function(data) {
        this.set(data);
        this.set("id", this.get("cid"));
        this.save();
    },

    /** Function: deleteData
     *  Arguments:
     *      - None
     *  Defenition:
     *      This function is used to destroy a single todo object.
     *  Returns:
     *      - None
     **/
    deleteData: function() {
        this.destroy();
    }
});

export default todo;
