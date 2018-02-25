const path = require('path');

module.exports = {
    entry: './client/src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        { 
          test: /\.jsx?$/, 
          loader: 'babel-loader', 
          exclude: /node_modules/ 
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      historyApiFallback: true
    }
};