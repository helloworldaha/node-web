var path = require('path')

var config = require(path.join(__dirname, '../config.njs'))
var Log = require(path.join(config.path.fish, 'log.njs'))
var Email = require(path.join(config.path.root, 'lib/Email.js'))

// @todo: 需要在基类定义
var actions = {
    params: {},
    test: function () {
        var log = new Log(this.params)
        log.info('git 提交日志')
        return '日志已生成'
    },
    pull: async function () {
        let email = new Email('353740902@qq.com');
        let res =  await email.send('node-web 有新的提交已被拉取', '有新的提交已被拉取');
        var log = new Log(this.params)
        log.info('有新的提交已被拉取，邮件已发送')
        return '日志已生成'
    },
}

exports.actions = actions