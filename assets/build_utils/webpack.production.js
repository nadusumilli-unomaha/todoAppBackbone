const path = require("path");
const cssPlugin = require("mini-css-extract-plugin");
const DIST_DIR = path.resolve("./dist");

/** Function: config
 *  Arguments:
 *      - env: the object that contains
 *          - mode: the application mode - dev / prod
 *          - presets: presets to install.
 *  Defenition:
 *      This function returns a webpack configuration for the
 *      production environment mode.
 *  Returns:
 *      - None
 **/
const config = env => ({
    output: {
        path: DIST_DIR,
        filename: "bundle.js",
        publicPath: "/static/app/"
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [cssPlugin.loader, "css-loader", "sass-loader"]
            },
            { test: /\.hbs$/, loader: "handlebars-loader" }
        ]
    },
    plugins: [new cssPlugin()]
});

module.exports = config;
