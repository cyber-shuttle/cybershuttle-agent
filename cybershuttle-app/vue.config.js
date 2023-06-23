const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
// const html = require('html-loader');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    module: {
      rules: [
          //   {
          //     test: /\.(js|vue)$/,
          //     exclude: /node_modules/,
          //     use: {
          //         loader: '@vue/cli-plugin-babel/preset'
          //     }
          // },
        //   {
        //     test: /\.html$/,
        //     use: {
        //         loader: 'html-loader'
        //     }
        // },
      ]
  },
    // resolve: {
    //   alias: {
    //     fs: false,
    //     tls: false,
    //     net: false,
    //     nock: false,
    //     child_process: false,
    //     "aws-sdk": false,
    //     "mock-aws-s3": false,
    //     // http2: false,
    //     dns: false
    //   }
    // },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
  devServer: {
    proxy: 'http://localhost:5001',
    },
  //   crossorigin: 'anonymous',
})
