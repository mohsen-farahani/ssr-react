const express = require('express');
const path = require('path');
const app = express();
const ClientStatsPath = path.join(__dirname, './../public/stats.json');
const ServerRendererPath = path.join(__dirname, './../public/server.js');
const ServerRenderer = require(ServerRendererPath).default;
const Stats = require(ClientStatsPath);

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(ServerRenderer(Stats));

app.listen(3000, () => {
    console.log(`Server is listening on port: 3000`)
})