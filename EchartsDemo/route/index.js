var routeUtil = require("../utils/routeUtil")

var index = {
    path: "/",
    method: "get",
    func: (request, response) => {
        var path = "index.html"
        routeUtil.sendHTML(path, response)
    }
}

var routes = [
    index,
]

module.exports.routes = routes