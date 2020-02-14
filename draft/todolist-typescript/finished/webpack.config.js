const path = require('path');
const webpack = require('webpack');

const envVariables = new webpack.DefinePlugin({
  ENV: JSON.stringify(process.env.ENV)
});

module.exports = {
  entry: './app/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "awesome-typescript-loader"
        },
      },
      //{
      //  test: /\.js$/,
      //  exclude: /node_modules/,
      //  use: {
      //    loader: "babel-loader",
      //    options: {
      //      presets: [
      //        '@babel/preset-env'
      //      ]
      //    }
      //  },
      //}
    ]
  },
  plugins: [
    envVariables,
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000
  }
};
