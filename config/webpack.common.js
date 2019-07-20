const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    index: path.join(process.cwd(), "src/index.js")
  },
  output: {
    filename: "./JS/[name].js",
    path: path.join(process.cwd(), "dist"),
    chunkFilename: "./class/[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(process.cwd(), "src/index.html"),
      chunks: ["index"]
    }),
    new miniCssExtractPlugin({
      filename: "./css/[name].css",
      chunkFilename: "/css/[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sc|c|sa)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: miniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: "2"
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 2048,
            fallback: "file-loader",
            outputPath: "./image",
            name: "[name].[ext]"
          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", "img:data-src", "audio:src"],
            minimize: true
          }
        }
      }
    ]
  }
};
