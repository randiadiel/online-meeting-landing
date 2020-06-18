const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");

module.exports = {
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  entry: {
    index: "./src/js/index.js",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "app.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          { loader: "css-loader", options: { url: false } },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "Hellow World by Webpack!",
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: "./src/index.ejs",
    }),
    new MiniCssExtractPlugin({ filename: "app.css" }),
  ],
};
