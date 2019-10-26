module.exports = {
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    ['transform-class-properties', { spec: true }],
    '@babel/plugin-transform-runtime',
    'babel-plugin-syntax-dynamic-import',
  ],
};
// we don't need to include in this file import plugin because it causes problems with
// import statements in ant design
