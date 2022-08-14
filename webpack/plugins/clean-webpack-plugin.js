// Import dependencies.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Import Configuration.
const { paths } = require('../configuration');

/**
 * CleanWebpackPlugin()
 * A webpack plugin to remove/clean your build folder(s) before building.
 */
const cleanWebpackPlugin = new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: [paths.build],
});

module.exports = cleanWebpackPlugin;
