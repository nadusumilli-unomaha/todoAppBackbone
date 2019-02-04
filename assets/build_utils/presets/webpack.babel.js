/** Function: config
 *  Arguments:
 *      - env: the object that contains
 *          - mode: the application mode - dev / prod
 *          - presets: presets to install.
 *  Defenition:
 *      This function returns a webpack configuration for the
 *      babel preset.
 *  Returns:
 *      - None
 **/
const config = env => ({
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    }
});

module.exports = config;
