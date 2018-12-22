const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  /* 이 부분은 entry와 output의 기본값으로 생략 가능합니다. */
  entry: './src/index.js',
  output: {
    filename: 'vue-timepicker-wheel.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};