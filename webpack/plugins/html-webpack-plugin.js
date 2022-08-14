// Import dependencies.
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Import Configuration.
const { paths } = require('../configuration');

/**
 * HtmlWebpackPlugin()
 * A webpack plugin that simplifies creation of HTML files to serve your webpack bundles.
 */
module.exports = new HtmlWebpackPlugin({
  inject: 'body',
  template: `${paths.public}/index.html`,
});
