const path = require('path');

module.exports = {
  entry: './ethereum.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.sol/,
        use: [
          {
            loader: 'json-loader'
          },
          {
            loader: 'truffle-solidity-loader',
            options: {
              network: 'develop',
              migrations_directory: path.resolve(__dirname, '../migrations'),
              contracts_build_directory: path.resolve(__dirname, '../build/contracts')
            }
          }
        ]
      }
    ]
  }
};
