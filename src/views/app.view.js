// import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";
import AppTemplate from "../templates/partials/layout.hbs";
import * as ViewManager from "../view_manager";

/** View: AppView
 *  Arguments:
 *      - None
 *  Defenition:
 *      This extends backbone view to create an AppView that
 *      is used to create a layout structure for the app.
 *  Returns:
 *      - None
 **/
let AppView = Backbone.View.extend({
    /** Function: initialize
     *  Arguments:
     *      - options: Options to pass to the view.
     *  Defenition:
     *      This function is used to initialize the AppView
     *  Returns:
     *      - None
     **/
    initialize: function(options) {},
    // Template for the layout.
    template: AppTemplate,

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

        // Header View for the app.
        import("./partials/header.view").then(module => {
            let header_view = ViewManager.create("header", module.default, {});
            header_view.render();
        });

        // Footer View for the app.
        import("./partials/footer.view").then(module => {
            let footer_view = ViewManager.create("footer", module.default, {});
            footer_view.render();
        });

        return this;
    }
});

export default AppView;
