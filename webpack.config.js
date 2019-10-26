const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssModulesValues = require('postcss-modules-values');

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
          presets: ['@babel/env', '@babel/react'],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            ['transform-class-properties', { spec: true }],
            ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
            '@babel/plugin-transform-runtime',
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
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssFlexbugsFixes,
                autoprefixer({
                  overrideBrowserslist: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                }),
                postcssModulesValues,
              ],
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
