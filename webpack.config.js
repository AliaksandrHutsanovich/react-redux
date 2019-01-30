var path = require('path');

module.exports = {
    entry: "./app/app.jsx",
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/public/',
        filename: "bundle.js"
    },
    devtool: "#sourcemap",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["env", "react", "es2015"],
                    plugins: ["transform-object-rest-spread"]
                }
            }
        ]
    }
}