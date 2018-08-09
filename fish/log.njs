var path = require('path')
var fs = require('fs')
var config = require('../app/config.njs')

const __APP__ = 'app'

/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 *
 * @param {String} messsage 日志要记录的信息
 * @param {Object} value 元素值
 * @param {Boolean} validateType 是否验证类型
 * @return {Boolean} 是否为数组中元素
 */
var info = function (messsage, catelog) {
  var catelog = catelog || __APP__
  var log_file_name = path.join(config.path.app, 'runtime/' + __APP__ + '.log')
  var now = new Date().toLocaleString()
  var msg = `\n>>> [${now}] ${messsage}`
  var timeStamp = Date.parse(new Date()) / 1000;
  fs.appendFile(log_file_name, msg, 'utf8', function () {})
}

exports.info = info