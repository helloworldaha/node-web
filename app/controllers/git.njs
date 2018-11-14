var path = require('path')

var config = require(path.join(__dirname, '../config.njs'))
var Log = require(path.join(config.path.fish, 'log.njs'))

// @todo: 需要在基类定义
var actions = {
    params: {},
    test: function () {
        var log = new Log(this.params)
        log.info('git 提交日志')
        return '日志已生成'
    },
}

exports.actions = actions