// Import dependencies.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Import Configuration.
const { config } = require('../configuration');

/**
 * MiniCssExtractPlugin()
 * A webpack plugin to extracts CSS into separate files.
 */
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: config.CSS_FILE_OUTPUT,
});

module.exports = miniCssExtractPlugin;
