const path = require('path');

module.exports = {
  entry: './app/app.js',
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/public/',
    filename: 'bundle.js',
  },
  devtool: '#sourcemap',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'es2015'],
          plugins: [
            'transform-object-rest-spread',
            ['transform-class-properties', { spec: true }],
            ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
            ['transform-runtime', {
              polyfill: false,
              regenerator: true,
            }],
            'babel-plugin-syntax-dynamic-import',
          ],
        },
      }, {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
};
