const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var common_config = {
    output: {
        path: path.resolve(__dirname + '/dist/')
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          include: __dirname,
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          loader: 'vue'
        },
        {
          test: /\.css$/,
          loader: 'style!less!css'
        }
      ]
    },
    externals: {
      Velocity: 'velocity-animate'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin( {
        minimize : true,
        sourceMap : false,
        mangle: true,
        compress: {
          warnings: false
        }
      })
    ]
};
entry: path.resolve(__dirname + '/src/BulmaAccordion.vue'),
filename: 'vue-bulma-accordion.js'
module.exports = {
    // Config 1: For browser environment
    merge(common_config, {
        entry: path.resolve(__dirname + '/src/plugin.js'),
        output: {
            filename: 'bulma-accordion.min.js',
            libraryTarget: 'window',
            library: 'BulmaAccordion'
        }
    }),

    // Config 2: For Node-based development environments
    merge(common_config, {
        entry: path.resolve(__dirname + '/src/BulmaAccordion.vue'),
        output: {
            filename: 'bulma-accordion.js',
            libraryTarget: 'umd',
        
            // These options are useful if the user wants to load the module with AMD
            library: 'BulmaAccordion',
            umdNamedDefine: true
        }
    })
};