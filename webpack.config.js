const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
  },
  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, 'public')
  },
  watch: false,
  mode: 'development',
  externals: {
    bindings: true,
    serialport: true
  }
};
