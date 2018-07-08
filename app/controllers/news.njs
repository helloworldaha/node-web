var path = require('path')
var path = require('path')
var config = require(path.join(__dirname, '../config.njs'))
var News = require(path.join(config.path.app, 'models/News.njs'))
var async = require('async')
var Throw = require(path.join(config.path.fish, 'throw.njs'))

var Fish = {}

var actions = {
    params: {},
    index: function () {
        var id = this.params.request.get.id
        // 查询数据
        // var query = News.model.find.select('title, cover, intro').where('id = ?', [id]).all()
        return new Promise((resolve, reject) => {
            var news = News.model.find.select('title, cover, intro').where('id = ?', [id]).one()
            resolve(news)
        })
        console.log(query)
        var data = {
            'name': 'asdads',
            'intro': '啊还是饥渴的啥会计考试的发就饿我i却无ask计划的撒可见度'
        }
        return data
    },
    view: function () {
        var id = this.params.request.get.id
        if (!id) {
            return false
            // var HttpException = Throw.HttpException;
            throw 'error';
        }

        return new Promise((resolve, reject) => {
            var news = News.model.find.select('title, cover, intro').where('id = ?', [id]).all()
            resolve(news)
        })
        // 查询数据
        // var news = News.model.find.select('title, cover, intro').where('id = ?', [id]).one()
        var news = News.findOne
        /*async.waterfall([
            function (callback) {
                var news = News.model.find.select('title, cover, intro').where('id = ?', [id]).one()
                callback(null, news);
            },
            function (news, null) {
             return 233
            }
        ], function (err) {
            console.log(err)
        })*/
        console.log(news)
        
        /*var news= null
        console.log(news)

        var data = {
            'name': news.title,
            'intro': news.intro
        }
        console.log(data)*/
        return {}
    }
}

exports.actions = actions