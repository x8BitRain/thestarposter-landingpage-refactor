module.exports = {
  assetsDir: "editor-assets",
  filenameHashing: false,
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: {
            loader: "worker-loader",
            options: {
              publicPath: "/editor-assets"
            }
          }
        }
      ]
    },
    output: {
      globalObject: "this"
    }
  }
};
