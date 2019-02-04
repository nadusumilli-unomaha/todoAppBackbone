import _ from "underscore";
import Backbone from "backbone";
import Todo from "../models/todo.model";

/** Collection: todos
 *  Arguments:
 *      - None
 *  Defenition:
 *      This extends backbone collection to create a todo collection.
 *  Returns:
 *      - None
 **/
let todos = Backbone.Collection.extend({
    // Setting the model of the collection to a todo model.
    model: Todo
});

export default todos;
