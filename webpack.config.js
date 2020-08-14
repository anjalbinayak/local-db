const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
entry: './ts/app.js',
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
},
devServer: {
    contentBase: './dist'
},
watch: true,
watchOptions:{
    ignored: /node_modules/  
},
plugins: [

],
module: {
    rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
      },
     {
       test: /\.js$/,
       use: ["source-map-loader"],
       enforce: "pre"
   }
   
    ]
}
}