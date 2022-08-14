/// const HtmlWebpackPlugin = require('html-webpack-plugin')
const { htmlWebpackPlugin } = require("./plugins");
const { paths, config } = require("./configuration");
const { typeScript, css } = require("./modules");

/**
 * Entry point for the bundle.
 */
const entry = [`${paths.src}/index.tsx`, `${paths.src}/index.scss`];

/**
 * Set output file name and path.
 */
const output = {
  publicPath: "/",
  path: paths.build,
  filename: config.JS_FILE_OUTPUT,
  clean: true,
};

/**
 * Shared plugins.
 */
const plugins = [htmlWebpackPlugin];

/**
 * Shared modules.
 */
const modules = {
  rules: [typeScript, css],
};

/**
 * Resolve extensions.
 * Alias for @ set to paths.src directory.
 */
const resolve = {
  extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  alias: {
    "@": paths.src,
    "@modules": `${paths.src}/modules`,
    "@hooks": `${paths.src}/hooks`,
    "@components": `${paths.src}/components`,
  },
};

/**
 * Webpack common configuration.
 */
module.exports = {
  entry,
  output,
  plugins,
  resolve,
  module: modules,
  context: __dirname,
  target: config.IS_DEV ? "web" : "browserslist",
  mode: config.IS_DEV ? "development" : "production",
};
