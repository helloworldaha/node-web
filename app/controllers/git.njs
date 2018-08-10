var path = require('path')
var fs = require('fs')

var config = require(path.join(__dirname, '../config.njs'))
var mutils = require(path.join(config.path.fish, 'mutils.njs'))
var Log = require(path.join(config.path.fish, 'log.njs'))

// @todo: 需要在基类定义
var Fish = {}
var date = mutils.date

var actions = {
    params: {},
    index: async function () {
        // console.log(data)
        // return data
    },
    test: async function () {
        var log = new Log.model(this.params)
        log.info('我爱打发士大夫士大夫')
        return '日志已生成'
    },
    createmusic: async function () {
        var subject = this.params.request.post.subject
        var summary = this.params.request.post.summary
        var category_id = parseInt(this.params.request.post.category_id)
        var photoFile = this.params.request.files.photo
        var soundFile = this.params.request.files.sound
        if (!photoFile) {
            return '请上传图片'
        }
        if (!soundFile) {
            return '请上传音频'
        }
        var photo = await uploadFile(photoFile, 'photo')
        var soundUrl = await uploadFile(soundFile, 'sound')
        if (!photo || !soundUrl) {
            return '文件类型错误'
        }
        // console.log(this.params.request.post)
        addMusic(subject, summary, category_id, photo, soundUrl)
        return '歌曲创建成功'
    }
}

async function addMusic(subject, summary, category_id, photo, soundUrl) {
    var music = Music.model
    var timeStamp = Date.parse(new Date()) / 1000;
    music.attrs = {
        uid: 349524,
        music_id: 233,
        music_category_id: category_id,
        subject: subject,
        summary: summary,
        author: '鱼鱼鱼',
        url: soundUrl,
        created: timeStamp,
        status: 1,
        top: 1,
        hot: 0,
        photo: photo
    }
    music.save()
    return {}
}

// 同步写入
async function uploadFile(files, type) {
    // @TODO: 需改造成可同时写多个文件
    if (files.length > 0) {
        // @ TODO: 之后改为临时文件，上传到 OSS 以后删除
        var exts = type === 'photo' ? ['.jpg', '.png', '.gif', '.jpeg'] : ['.mp3', '.wav', '.MP3']
        var extname = path.extname(files[0].originalname);
        if (!mutils.inArray(extname, exts)) {
            return false
        }
        var fileName = '/tem/' + md5(new Date().getTime() + files[0].originalname) + extname;
        var filesPath = path.join(config.path.root, 'public' + fileName)
        var data = fs.readFileSync(files[0].path);
        fs.writeFileSync(filesPath, data);
    } else {
        return false
    }
    return fileName
}

// 异步写入
function uploadFileAsync(files, db) {
    // @TODO: 需改造成可同时写多个文件
    if (files.length > 0) {
        // @ TODO: 之后改为临时文件，上传到 OSS 以后删除

        var extname = path.extname(files[0].originalname);
        var fileName = '/tem/' + md5(new Date().getTime() + files[0].originalname) + extname;
        var filesPath = path.join(config.path.root, 'public' + fileName)
        fs.readFile(files[0].path, function (err, data) {
            fs.writeFile(filesPath, data, function (err) {
                if(err){
                    console.log(err)
                }else{
                    db()
                }
            });
        });
    } else {
        return '文件上传失败'
    }
    return fileName
}

exports.actions = actions