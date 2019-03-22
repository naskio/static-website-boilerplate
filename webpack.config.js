const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    context: path.resolve('./src'),
    entry: './js/entry.js',
    output: {
        // path: path.resolve(__dirname, "public/js"),
        path: path.resolve('./public/'),
        filename: 'js/bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["babel-preset-env"]
                }
            }
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.scss$/,
            loaders: ["style-loader", "css-loader", "sass-loader"]
        }, {
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"]
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader?name=fonts/[name].[ext]"
        }, {
            test: /\.(jpe?g|png|gif)$/,
            loader: 'file-loader?name=img/[name].[ext]'
        }, {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new BrowserSyncPlugin({
            server: {
                baseDir: ['public']
            },
            port: 3000,
            host: 'localhost',
            open: false
        }),
        new CopyWebpackPlugin([{
            from: './manifest.json'
        }, {
            from: './manifest.webapp'
        }, {
            from: './robots.txt'
        }, {
            from: './favicon.ico'
        }, {
            from: './resources/**/*',
            to: './'
        }])
    ]
};
