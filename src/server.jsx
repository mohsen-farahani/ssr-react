import React from 'react';
import routes from './app/routes';
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Template from './template';
import App from './app/App';

export default function serverRenderer({ clientStats, serverStats }) {
    return (req, res, next) => {
        const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}
        const promise = activeRoute.fetchInitialData
            ? activeRoute.fetchInitialData(req.path)
            : Promise.resolve()

        promise.then((data) => {
            const context = { data }

            const markup = renderToString(
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            )

            const helmet = Helmet.renderStatic();

            res.send(Template({ helmet, markup, data }))

        }).catch(next)
    };
}