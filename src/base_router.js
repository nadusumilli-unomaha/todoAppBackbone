// imports.
import _ from "underscore";
import Backbone from "backbone";

/** Router: base_router
 *  Arguments:
 *      - None
 *  Defenition:
 *      It extends the Backbone router and adds two
 *      additional functions before and after the router function
 *      is called.
 *  Returns:
 *      - base_router: The router with additional functions
 **/
let base_router = Backbone.Router.extend({
    before: function() {},
    after: function() {},
    route: function(route, name, callback) {
        if (!_.isRegExp(route)) route = this._routeToRegExp(route);
        if (_.isFunction(name)) {
            callback = name;
            name = "";
        }
        if (!callback) callback = this[name];

        let router = this;
        Backbone.history.route(route, function(fragment) {
            let args = router._extractParameters(route, fragment);
            let next = function() {
                callback && callback.apply(router, args);
                router.trigger.apply(router, ["route:" + name].concat(args));
                router.trigger("route", name, args);
                Backbone.history.trigger("route", router, name, args);
                router.after.apply(router, args);
            };
            router.before.apply(router, [args, next]);
        });
        return this;
    }
});

export default base_router;
