const path = require('path');
const webpack = require('webpack');

const envVariables = new webpack.DefinePlugin({
  ENV: JSON.stringify(process.env.ENV)
});

module.exports = {
  entry: ['babel-polyfill','./app/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'app/dist'),
    filename: 'bundle.js'
  },
  devtool: ' inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            plugins:[ 'transform-object-rest-spread' ]
          }
        }
      },
      {
        test: /\.sol/,
        use: [
          {
            loader: 'json-loader'
          },
          {
            loader: 'truffle-solidity-loader',
            options: {
              network: 'development',
              migrations_directory: path.resolve(__dirname, './migrations'),
              contracts_build_directory: path.resolve(__dirname, '../build/contracts')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    envVariables,
  ],
};
