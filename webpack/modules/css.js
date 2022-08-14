// Import dependencies.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Import Configuration.
const { config } = require('../configuration');

/**
 * Default modules loader for CSS.
 */

const cssLoader = {
  loader: 'css-loader',
  options: { sourceMap: true, importLoaders: 1, modules: true },
};

const sassLoader = { loader: 'sass-loader', options: { sourceMap: true } };

const css = {
  test: /\.(sass|scss|css)$/,
  use: [config.IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader, cssLoader, sassLoader],
  exclude: /node_modules/,
};

module.exports = css;
