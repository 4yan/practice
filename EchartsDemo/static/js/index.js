var timeObject = {
    "5年以下": 0,
    "5~10年": 0,
    "10~15年": 0,
    "15~20年": 0,
    "20~25年": 0,
    "25~30年": 0,
    "30年以上": 0,

}
var areaObject = {
    "0~30平方米": 0,
    "30~60平方米": 0,
    "60~90平方米": 0,
    "90~120平方米": 0,
    "超过120平方米": 0,
}

var priceObject = {
    "3000元以下": 0,
    "3000-5000元": 0,
    "5000-8000元": 0,
    "8000-12000元": 0,
    "12000-20000元": 0,
    "20000元以上": 0,
}

var initCircleTable = (postionObject) => {
    var postionArray = []
    var keys = Object.keys(postionObject)
    for (var i = 0; i < keys.length; i++) {
        var newPosition = {}
        var keyName = keys[i]
        newPosition.name = keyName
        newPosition.value = postionObject[keyName]
        postionArray.push(newPosition)
    }
    var option = cirCleTableOptions(keys, postionArray)
    var divElement = document.querySelector(".circleTable")
    var circleTable = echarts.init(divElement)
    circleTable.setOption(option)
}

var initAreaTable = (areaObject) => {
    var keys = Object.keys(areaObject)
    var values = Object.values(areaObject)
    var option = columnTableOption(keys, values)
    var divElement = document.querySelector(".columnTable")
    var columnTable = echarts.init(divElement)
    columnTable.setOption(option)
}

var initPriceTable = (priceObject) => {
    var keys = Object.keys(priceObject)
    var data = []
    for (var i = 0; i < keys.length; i++) {
        var newItem = {}
        var keyName = keys[i]
        newItem.name = keyName
        newItem.value = priceObject[keyName]
        data.push(newItem)
    }
    var option = priceOption(keys, data)
    var priceDiv = document.querySelector(".priceTable")
    var priceTable = echarts.init(priceDiv)
    priceTable.setOption(option)
}

var calculatePosition = (item) => {
    var f = item.floor
    var time = 2018  - f.split("/")[2].slice(0, 4)
    //console.log(time)
    if (time <= 5 ) {
        timeObject["5年以下"]++
    } else if(time <= 10 ) {
        timeObject["5~10年"]++
    }else if(time <= 15 ) {
        timeObject["10~15年"]++
    }else if(time <= 20 ) {
        timeObject["15~20年"]++
    }else if(time <= 25 ) {
        timeObject["20~25年"]++
    }else if(time <= 30 ) {
        timeObject["25~30年"]++
    }else if(time > 30 && time < 60) {
        timeObject["30年以上"]++
    }
}

var calculateArea = (item) => {
    var area = item.meters
    if (area <= 30) {
    areaObject["0~30平方米"]++
}
else if (area <= 60) {
    areaObject["30~60平方米"]++
}
else if (area <= 90) {
    areaObject["60~90平方米"]++
}
else if (area <= 120) {
    areaObject["90~120平方米"]++
}
else {
    areaObject["超过120平方米"]++
}
}

var calculatePrice = (item) => {
    var price = item.price
    if (price <= 3000) {
        priceObject["3000元以下"]++
    }
    else if (price <= 5000) {
        priceObject["3000-5000元"]++
    }
    else if (price <= 8000) {
        priceObject["5000-8000元"]++
    }
    else if (price <= 12000) {
        priceObject["8000-12000元"]++
    }
    else if (price <= 20000) {
        priceObject["12000-20000元"]++
    }
    else {
        priceObject["20000元以上"]++
    }
}

var handleData = (dataArray) => {
    for (var i = 0; i < dataArray.length; i++) {
        var item = dataArray[i]
        calculatePosition(item)
        calculateArea(item)
        calculatePrice(item)
    }
    initCircleTable(timeObject)
    initAreaTable(areaObject)
    initPriceTable(priceObject)
}

var getAllHouseData = () => {
    var request = {
        method: "GET",
        url: "/api/house/all",
        contentType: "application/json",
        callback: (response) => {
            var dataArray = response
            handleData(dataArray)
        }
    }
    ajax(request)
}

var __main = () => {
    getAllHouseData()
}

__main()