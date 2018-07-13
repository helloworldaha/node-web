var path = require('path')
var config = require(path.join(__dirname, '../config.njs'))
var Music = require(path.join(config.path.app, 'models/Music.njs'))
// var Throw = require(path.join(config.path.fish, 'throw.njs'))
var mutils = require(path.join(config.path.fish, 'mutils.njs'))

var date = mutils.date
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
    },
    play: async function () {
        var id = this.params.request.get.id ? this.params.request.get.id : 1
        var sound = await Music.model.find()
            .select('id, subject, author, views, photo, url, created, replies')
            .where('id = ?', [id])
            .one()
        sound.created = date(sound.created, 'y-MM-dd HH:mm:ss')
        var data = {
            fishData: {
                sound: sound
            }
        }
        // console.log(data)
        return data
    }
}

exports.actions = actions