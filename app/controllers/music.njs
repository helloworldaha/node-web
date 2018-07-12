var path = require('path')
var path = require('path')
var config = require(path.join(__dirname, '../config.njs'))
var Music = require(path.join(config.path.app, 'models/Music.njs'))
var async = require('async')
var Throw = require(path.join(config.path.fish, 'throw.njs'))

var Fish = {}

var actions = {
    params: {},
    index: async function () {
        // 查询推荐音数据
        var recommendSounds = await Music.model.find()
            .select('id, subject, author, views, photo')
            .where('top = ?', [1])
            .limit(4)
            .all()
        var newSounds = await Music.model.find()
            .select('id, subject, photo')
            .limit(5)
            .order('created DESC')
            .all()
        var vocaloidSounds = await Music.model.find()
            .select('id, subject, photo')
            .limit(10)
            .order('RAND()')
            .all()
        var hotSounds = await Music.model.find()
            .select('id, subject, photo')
            .where('hot = ?', [1])
            .limit(10)
            .order('created DESC')
            .all()
        var data = {
            data: {
                recommendSounds: recommendSounds,
                newSounds: newSounds,
                vocaloidSounds: vocaloidSounds,
                hotSounds: hotSounds
            }
        }
        // console.log(data)
        return data
    }
}

exports.actions = actions