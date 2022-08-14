const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { paths } = require('./configuration');
const {
  miniCssExtractPlugin,
  cleanWebpackPlugin,
  imageMinimizerWebpackPlugin,
} = require('./plugins');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const plugins = [cleanWebpackPlugin, miniCssExtractPlugin];

/**
 * Webpack production configuration.
 */
const WebpackConfig = {
  plugins,
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin(), imageMinimizerWebpackPlugin],
  },
};

module.exports = merge(common, WebpackConfig);
