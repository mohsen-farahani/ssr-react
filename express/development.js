const express = require('express');
const cors = require('cors');
const app = express();
const webpack = require('webpack');
const config = require('../webpack/development.config.js');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

app.use(cors())
app.use(webpackDevMiddleware(compiler, {
    serverSideRender: true,
    publicPath: "/public/",
}));
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

const PORT = process.env.PORT || 3000;

app.listen(PORT, error => {
    if (error) {
        return console.error(error);
    } else {
        console.log(`:::Development::: server running at http://localhost:${PORT}`);
    }
});