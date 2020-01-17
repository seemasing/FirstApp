const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const bundleSizePlugin = require('./bundleSizePlugin');

module.exports = ({ mode = 'development' }) => {
  return {
    entry: path.resolve(__dirname, 'src/index'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    devtool: false,
    plugins: [
      new HtmlWebpackPlugin({ template: 'src/index.html' }),
      new bundleSizePlugin({ sizeLimit: 200000 }),                 //custom plugin to check the bundle size
      ...(mode === 'development'
        ? [
            new webpack.SourceMapDevToolPlugin({                   //create source map only in development mode
              filename: '[name].js.map'
            })
          ]
        : [])
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: path.resolve(__dirname, 'node_modules'),
          use: [
            {
              loader: 'babel-loader',
              query: {
                presets: ['@babel/react', '@babel/preset-env']
              }
            },
            {
              loader: path.resolve('./customLoader.js'),          //custom loader to parse a file and replace a specific text
              options: {
                textToReplace: 'setup',
                replacementText: 'repo setup'
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  };
};
