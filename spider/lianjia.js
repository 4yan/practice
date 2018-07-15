var fs = require('fs')

var request = require('sync-request')
var cheerio = require('cheerio')


// ES6 定义一个类
class Houses {
    constructor() {
        // 分别是简述/小区/格局/大小/价格/楼层/价格/图片链接
        this.title = ''
        this.community = ''
        this.zone = ''
        this.meters = 0
        this.floor = 0
        this.price = 0
        //this.coverUrl = ''
    }
}


var log = console.log.bind(console)

var houseFromDiv = (div) => {
    var e = cheerio.load(div)

    // 创建一个电影类的实例并且获取数据
    // 这些数据都是从 html 结构里面人工分析出来的
    var house = new Houses()
    house.title = e('h2').find('a').text()
    //console.log(e('.title'))
    house.community = e('.region').text()
    house.zone = e('.zone').text()
    house.meters = e('.meters').text().slice(0,2)

    var con = e('.con')
    house.floor = con.text()
    house.price = e('.price').find('.num').text()

    // let other = e('.other').text()
    // house.otherNames = other.slice(3).split(' / ').join('|')

    return house
}

var cachedUrl = url => {
    // 1. 确定缓存的文件名
    var cacheFile = 'cached_html/' + url.split('pg')[1] + '.html'
    // 2. 检查缓存文件是否存在
    // 如果存在就读取缓存文件
    // 如果不存在就下载并写入缓存文件
    var exists = fs.existsSync(cacheFile)
    if (exists) {
        var data = fs.readFileSync(cacheFile)
        // log('data', data)
        return data
    } else {
        // 用 GET 方法获取 url 链接的内容
        // 相当于你在浏览器地址栏输入 url 按回车后得到的 HTML 内容
        var r = request('GET', url)
        // utf-8 是网页文件的文本编码
        var body = r.getBody('utf-8')
        fs.writeFileSync(cacheFile, body)
        log('body', body)
        return body
    }
}

var housesFromUrl = (url) => {
    var body = cachedUrl(url)
    // cheerio.load 用来把 HTML 文本解析为一个可以操作的 DOM
    var e = cheerio.load(body)

    // 一共有 30 个 .info-panel
    var houseDivs = e('.info-panel')
    // 循环处理 30 个 .info-panel
    var houses = []
    for (var i = 0; i < houseDivs.length; i++) {
        var div = houseDivs[i]
        // 扔给 movieFromDiv 函数来获取到一个 movie 对象
        var m = houseFromDiv(div)
        houses.push(m)
    }
    //console.log('houses', houses)
    return houses
}

var saveHouse = (houses) => {
    // JSON.stringify 第 2 3 个参数配合起来是为了让生成的 json
    // 数据带有缩进的格式，第三个参数表示缩进的空格数
    // 建议当套路来用
    // 如果你一定想要知道原理，看下面的链接（不建议看）
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    var s = JSON.stringify(houses, null, 2)
    // 把 json 格式字符串写入到 文件 中
    var fs = require('fs')
    var path = 'lianjia.txt'
    fs.writeFileSync(path, s)
}

var downloadCovers = (houses) => {
    for (var i = 0; i < movies.length; i++) {
        var m = movies[i]
        var url = m.coverUrl
        // 保存图片的路径
        var path = 'covers/' + m.name.split('/')[0] + '.jpg'
        var r = request('GET', url)
        var img = r.getBody()
        fs.writeFileSync(path, img)
    }
}

var __main = () => {

    // 主函数
    // var url = 'https://bj.lianjia.com/zufang/haidian/pg1'
    // var housesInPage = housesFromUrl(url)
    var houses = []
    for (var i = 1; i < 43; i++) {
        var url = `https://bj.lianjia.com/zufang/haidian/pg${i}`
        var housesInPage = housesFromUrl(url)
        houses = [...houses, ...housesInPage]

    }

    saveHouse(houses)
    var l = houses.length
    console.log(l)
    //downloadCovers(movies)
}

__main()
