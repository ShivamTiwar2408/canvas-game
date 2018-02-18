const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/box.js',
  plugins: [
   new CopyWebpackPlugin([
            {from:'src/Images',to:'Images'} 
        ]), 
    new UglifyJsPlugin()
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};