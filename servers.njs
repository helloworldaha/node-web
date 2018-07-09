var http = require('http')
var static = require('node-static')
var url = require('url')
var util = require('util')
var static = require('node-static');
var index = require('./public/index.njs')

var fileServer = new static.Server('public');

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
// 在此处可配置监听的端口号
http.createServer(handleReq).listen(8787, '127.0.0.1')
console.log('This servers is running !')