var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack')


const publicDir = path.resolve(__dirname, '../public');
const srcDir = path.join(__dirname, '../src');

var browserConfig = {
    name: 'client',
    target: 'web',
    entry: `${srcDir}/client.jsx`,
    mode: 'development',
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
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
                            },
                        },
                    },
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: "true"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new Dotenv({
            path: path.join(__dirname, '.env'),
            systemvars: true
        }),
    ]
}

var serverConfig = {
    name: 'server',
    target: 'node',
    entry: `${srcDir}/server.jsx`,
    mode: 'development',
    externals: [nodeExternals()],
    output: {
        path: publicDir,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
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
                test: /\.css$/i,
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
                ]
                // use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: "false"
        }),
        new Dotenv({
            path: path.join(__dirname, '.env'),
            systemvars: true
        }),
    ]
}

module.exports = [browserConfig, serverConfig]
