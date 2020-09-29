var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: "css-loader" }],
      },
      {
        test: /\.svg$/,
        loader: "svg-url-loader",
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
        use: [{ loader: "url-loader?limit=100000" }],
      },
    ],
  },
  resolve: {
    mainFiles: ["index", "Index"],
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 9000,
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      //apiUrl: "http://167.86.81.129:8080/Aqar",
      apiUrl: "http://localhost:8080",
    }),
  },
};
