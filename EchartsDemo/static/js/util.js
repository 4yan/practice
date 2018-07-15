var log = console.log.bind(console)

var ajax = (request) => {
    var newRequet = new XMLHttpRequest()
    var method = request.method
    newRequet.open(method, request.url, true)
    var contentType = request.contentType
    if (contentType != undefined) {
        newRequet.setRequestHeader("Content-Type", contentType)
    }
    newRequet.onreadystatechange = () => {
        if (newRequet.readyState == 4) {
            var data = newRequet.response
            data = JSON.parse(data)
            request.callback(data)
        }
    }
    if (method == "POST") {
        var parseData = JSON.stringify(request.data)
        newRequet.send(parseData)
        return
    }
    newRequet.send()
}