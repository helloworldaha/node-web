var mysql  = require('mysql');
var async = require('async')
var path = require('path')
var config = require(path.join(__dirname, '../../app/config.njs'))
var baseModel = require(path.join(config.path.fish, 'mysql/baseModelnew.njs'))

class News extends baseModel.model {

}

var ccc = new News('kobe')
ccc.select('title').where('id=1').all()
var test = async function () {
    var cc = await ccc.select('title').where('id=1').all()
    // return ccc.data
    console.log({tooo: cc})
}
test()
console.log(News)

// module.exports.findOne = findOne
