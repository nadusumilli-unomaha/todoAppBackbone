import _ from "underscore";

// This is the applications views object that contains
// all the views.
let vm = {};

/** Function: create
 *  Arguments:
 *      - name: The name of the view to be created.
 *      - View: The View that needs to be created.
 *      - options: Options to pass to the view.
 *  Defenition:
 *      This function checks if the view already exists and cleans up
 *      the views and creates new ones.
 *  Returns:
 *      - view: The view to render to the screen.
 **/
let create = (name, View, options) => {
    if (vm[name] !== undefined) {
        if (vm[name].clean) vm[name].clean();
    }

    let view = new View(options);
    vm[name] = view;
    return view;
};

export { create };
