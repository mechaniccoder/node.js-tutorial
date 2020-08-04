const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  devtool: "source-map",
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".js"],
  },
};
