const path = require("path");
const webpack = require("webpack");
const webpack_merge = require("webpack-merge");
const html_plugin = require("html-webpack-plugin");
const load_presets = env => require("./assets/build_utils/loadPresets")(env);
const load_configs = env =>
    require(`./assets/build_utils/webpack.${env.mode}`)(env);

// The path for src dir.
const SRC_DIR = path.resolve("./src");

/** Function: config
 *  Arguments:
 *      - mode: the application mode - dev / prod
 *      - presets: presets to install.
 *  Defenition:
 *      This function returns a merged webpack configuration object
 *      which includes the presets and configs.
 *  Returns:
 *      - None
 **/
const config = ({ mode, presets } = { mode: "production", presets: "babel" }) =>
    webpack_merge(
        {
            mode,
            entry: path.join(SRC_DIR, "index.js"),
            plugins: [
                new html_plugin({ template: path.join(SRC_DIR, "index.html") })
            ]
        },
        load_presets({ mode, presets }),
        load_configs({ mode, presets })
    );

module.exports = config;
