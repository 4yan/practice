var house = require("../model/house")

var all = {
    path: "/api/house/all",
    method: "get",
    func: (request, response) => {
        var data = house.all()
        data = JSON.stringify(data)
        response.send(data)
    }
}

var routes = [
    all,
]

module.exports.routes = routes