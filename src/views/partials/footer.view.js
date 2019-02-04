import _ from "underscore";
import Backbone from "backbone";
import FooterTemplate from "../../templates/partials/footer.hbs";

/** View: Footer
 *  Arguments:
 *      - None
 *  Defenition:
 *      This extends backbone view to create a footer element.
 *  Returns:
 *      - None
 **/
let Footer = Backbone.View.extend({
    // TagName for the footer element.
    el: "#footer",
    // Template for the footer.
    template: FooterTemplate,

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

export default Footer;
