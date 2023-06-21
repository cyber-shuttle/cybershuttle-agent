const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
  //   module: {
  //     rules: [{
  //             test: /\.(js|vue)$/,
  //             exclude: /node_modules/,
  //             use: {
  //                 loader: 'babel-loader'
  //             }
  //         }
  //     ]
  // },
    resolve: {
      alias: {
        fs: false,
        tls: false,
        net: false,
        nock: false,
        // child_process: false,
        "aws-sdk": false,
        "mock-aws-s3": false
      }
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
})
