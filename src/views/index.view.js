import _ from "underscore";
import Backbone from "backbone";
import IndexTemplate from "../templates/index.hbs";

/** View: index
 *  Arguments:
 *      - None
 *  Defenition:
 *      This extends the backbone view to create a index element.
 *  Returns:
 *      - None
 **/
let Index = Backbone.View.extend({
    /** Function: initialize
     *  Arguments:
     *      - options: Options to pass to the view.
     *  Defenition:
     *      This function is used to initialize the index view.
     *  Returns:
     *      - None
     **/
    initialize: function(options) {},
    // The template for the index view.
    template: IndexTemplate,

    /** Function: clean
     *  Arguments:
     *      - None
     *  Defenition:
     *      This function is used to remove the view from dom and unbind
     *      its related events.
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

export default Index;
