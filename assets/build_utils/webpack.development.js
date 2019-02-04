const path = require("path");
const DIST_DIR = path.resolve("./dist");

/** Function: config
 *  Arguments:
 *      - env: the object that contains
 *          - mode: the application mode - dev / prod
 *          - presets: presets to install.
 *  Defenition:
 *      This function returns a webpack configuration for the
 *      development environment mode.
 *  Returns:
 *      - None
 **/
const config = env => ({
    output: {
        path: DIST_DIR,
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            { test: /\.hbs$/, loader: "handlebars-loader" }
        ]
    }
});

module.exports = config;
