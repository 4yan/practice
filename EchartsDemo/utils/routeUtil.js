var fileSystem = require("fs")

var registerRoutes = (app, routes) => {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        app[route.method](route.path, route.func)
    }
}

var sendHTML = (path, response) => {
    var options = {
        encoding: "utf-8",
    }
    path = "template/" + path
    fileSystem.readFile(path, options, (error, data) => {
        response.send(data)
    })
}

var routeUtil = {
    registerRoutes,
    sendHTML,
}

module.exports = routeUtil