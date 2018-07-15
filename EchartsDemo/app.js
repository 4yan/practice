var express = require("express")
var bodyParser = require("body-parser")
var logUtil = require("./utils/logUtil")
var routeUtil = require("./utils/routeUtil")
var app = express()

app.use(bodyParser.json())
app.use(express.static("static"))

var indexRoutes = require("./route/index").routes
routeUtil.registerRoutes(app, indexRoutes)
var houseRoutes = require("./route/house").routes
routeUtil.registerRoutes(app, houseRoutes)


var server = app.listen(8000, () => {
    var addressItem = server.address()
    var host = addressItem.address
    var port = addressItem.port
    logUtil.log(`本地服务器启动, 访问地址是 ${host}:${port}`)
})