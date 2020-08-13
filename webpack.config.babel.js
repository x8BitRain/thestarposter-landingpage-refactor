import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
// import WorkboxPlugin from "workbox-webpack-plugin";
// import OfflinePlugin from "offline-plugin";

import CopyWebpackPlugin from "copy-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";

const outputDir = "static/webpack"
const mode = process.env.NODE_ENV || 'development';
const isDevMode = mode !== "production";
const cleaning = [outputDir + "/*.*"]
module.exports = (env, argv) => {
  return {
    mode: mode,
    watchOptions: {
      ignored: ["/node_modules/"]
    },
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: "all",
      }
    },
    entry: {
      main: "./src/main.js",
    },
    output: {
      filename: "[name].bundle.js", //!isDevMode ? "[name].bundle.js" : "[name].[hash].bundle.js",
      chunkFilename: "[name].bundle.js", //!isDevMode ? "[name].bundle.js" : "[name].[hash].bundle.js",
      path: path.resolve(__dirname, outputDir)
    },
    devtool: "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 3000
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            sourceMap: true,
            minimize: true
          }
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true
          }
        }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.s?[ac]ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: "css-loader",
          options: {
            importLoaders: 2,
            sourceMap: true,
            minimize: true
          }
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: 'responsive-loader',
        options: {
          sizes: [360, 512, 768, 1024, 2048],
          quality: 70,
          name: '[path][name]_[width]x.[ext]'
        }
      }
      ]
    },
    plugins: [
      new UglifyJsPlugin({
        sourceMap: true,
        cache: true,
        parallel: true,
        uglifyOptions: {
          warning: false,
          compress: true
        }
      }),
      new MiniCssExtractPlugin({
        filename: "[name].bundle.css",
        chunkFilename: "[name].bundle.css",
      }),
      new CleanWebpackPlugin(cleaning, { watch: true, beforeEmit: true })
    ]
  };
};
