let path = require('path');

module.exports = {
    entry: "./app/app.js",
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/public/',
        filename: "bundle.js"
    },
    devtool: "#sourcemap",
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["env", "react", "es2015"],
                    plugins: [
                        "transform-object-rest-spread",
                        ["transform-class-properties", { "spec": true }],
                        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }],
                        ["transform-runtime", {
                            "polyfill": false,
                            "regenerator": true
                        }],
                        "babel-plugin-syntax-dynamic-import"
                    ]
                }
            },
            {
                test: /\.css$/,
                loaders: 'style-loader!css-loader'
            }
        ]
    }
}