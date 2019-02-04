const webpackMerge = require("webpack-merge");

/** Function: config
 *  Arguments:
 *      - env: the object that contains
 *          - mode: the application mode - dev / prod
 *          - presets: presets to install.
 *  Defenition:
 *      This function returns a merged webpack configuration of
 *      all the loaded presets.
 *  Returns:
 *      - None
 **/
const config = env => {
    const { presets } = env;
    const mergedPresets = [].concat(...[presets]);
    const mergedConfigs = mergedPresets.map(preset =>
        require(`./presets/webpack.${preset}`)(env)
    );

    return webpackMerge({}, ...mergedConfigs);
};

module.exports = config;
