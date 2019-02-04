import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";
import HeaderTemplate from "../../templates/partials/header.hbs";

/** View: Header
 *  Arguments:
 *      - None
 *  Defenition:
 *      This extends backbone view to create a header element.
 *  Returns:
 *      - None
 **/
let Header = Backbone.View.extend({
    // TagName for the header element.
    el: "#header",
    // Template for the header element.
    template: HeaderTemplate,

    // Binding events to functions.
    events: {
        "click #nav li": "routePage"
    },

    /** Function: routePage
     *  Arguments:
     *      - e: event that has triggered.
     *  Defenition:
     *      This function is used to navigate the user on clicking
     *      on the navigation bar.
     *  Returns:
     *      - None
     **/
    routePage: e => {
        Backbone.history.navigate($(e.target).attr("data-url"), true);
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

export default Header;
