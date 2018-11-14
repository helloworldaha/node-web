var url = require('url')
var static = require('node-static')
var express = require('express')
var bodyParser = require('body-parser')
var multer  = require('multer')

var index = require('./public/index.njs')

var fileServer = new static.Server('public');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({ dest: '/tmp/'}).fields([{name:'photo',maxCount:9},{name:'sound',maxCount:1}]))

app.use('/', function (req, res){
    console.log(req.files)

    handleReq(req, res)
})

var handleReq = function (req, res) {
    var path = url.parse(req.url).path
    // if(path === '/favicon.ico') return
    var pathArr = path.split('/')
    if (pathArr.length >= 2) {
        var filename = pathArr[pathArr.length - 1];
        var suffixArr = filename.split('.')
        if (suffixArr.length >= 2) {
            var suffix = suffixArr[suffixArr.length-1];
            if (suffix !== 'njs') {
                fileServer.serve(req, res)
                return
            }
        }
    }
    index.serve(req, res)
}
app.listen(8989)

// 在此处可配置监听的端口号
// http.createServer(handleReq).listen(8787, '127.0.0.1')
console.log('This servers is running !')