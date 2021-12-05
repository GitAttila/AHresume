var webpack = require('webpack');
var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        App: ["@babel/polyfill", "./website/assets/js/app.js"]
    },
    output: {
        path: __dirname + "/website/temp/js",
        filename: "app.js"
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
            "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
            "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
            "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
            "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
            "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
            "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: ["@babel/plugin-transform-runtime", "transform-node-env-inline"],
                        presets: [['@babel/preset-env', { "targets": {"esmodules": true}} ]]
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};
