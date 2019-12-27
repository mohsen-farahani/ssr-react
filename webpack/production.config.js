var path = require('path')
var webpack = require('webpack')
const StatsPlugin = require('stats-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const publicDir = path.resolve(__dirname, '../public');
const srcDir = path.join(__dirname, '../src');


var browserConfig = {
    name: 'client',
    target: 'web',
    entry: `${srcDir}/client.jsx`,
    mode: 'production',
    output: {
        path: publicDir,
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
                            },
                        },
                    },
                    { loader: 'postcss-loader' }

                ],
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: "true"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ]
}

var serverConfig = {
    name: 'server',
    target: 'node',
    entry: `${srcDir}/server.jsx`,
    mode: 'production',
    externals: [nodeExternals()],
    output: {
        path: publicDir,
        filename: 'server.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'isomorphic-style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
                            },
                        },
                    },
                    { loader: 'postcss-loader' }
                ],
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: "false"
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
        new StatsPlugin('stats.json', {
            chunkModules: true,
            modules: true,
            chunks: true,
            exclude: [/node_modules[\\\/]react/],
        }),
    ]
}

module.exports = [browserConfig, serverConfig]
