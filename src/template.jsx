import serialize from "serialize-javascript"

export default ({ helmet, markup, data }) => {
    return (
        `
            <!DOCTYPE html>
            <html>
                <head>
                ${helmet.title.toString()}
                ${helmet.script.toString()}
                ${helmet.meta.toString()}
                <script src="/bundle.js" defer></script>
                <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                </head>
                <body>
                <div id="app">${markup}</div>
                </body>
            </html>
    `
    )
}