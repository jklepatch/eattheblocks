const path = require('path');
const webpack = require('webpack');

const envVariables = new webpack.DefinePlugin({
  ENV: JSON.stringify(process.env.ENV)
});

module.exports = {
  entry: './app/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app/dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
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
              network: process.env.ENV,
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
