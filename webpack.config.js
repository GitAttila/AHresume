
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        Vendor: "./website/assets/js/vendor.js",
        App: ["@babel/polyfill", "./website/assets/js/app.js"]
    },
    mode: 'none',
    output: {
        path: __dirname + "/website/temp/js",
        filename: "[name].js"
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ["@babel/plugin-transform-runtime"]
            },
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};
