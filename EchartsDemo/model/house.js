var dataFilePath = "db/lianjia.json"
var fileSystem = require("fs")

var loadHouses = () => {
    var data = fileSystem.readFileSync(dataFilePath, "utf8")
    data = JSON.parse(data)
    return data
}

var house = {
    data: loadHouses()
}

house.all = () => {
    return house.data
}

module.exports = house