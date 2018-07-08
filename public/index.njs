var Fish = require('../fish/fish-route.njs')

exports.serve = function (req, res) {
    App(req, res)
}

function App(req, res) {
    // 渲染页面
    Fish.createPage(req, res)
}
