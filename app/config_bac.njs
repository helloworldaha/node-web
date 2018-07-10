var path  = require('path');

var root = path.join(__dirname, '../')
var app = path.join(root, 'app')
var fish = path.join(root, 'fish')
var mysql = {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    port: '3306',
    database: 'test',
}
exports.path = {
    root: root,
    app: app,
    fish: fish,
}

exports.mysql = mysql
/*

var path  = require('path');

var root = path.join(__dirname, '../')
var app = path.join(root, 'app')
var fish = path.join(root, 'fish')
var mysql = {
    host     : '127.0.0.1',
    user     : 'music',
    password : 'cg147258',
    port: '3306',
    database: 'music',
}
exports.path = {
    root: root,
    app: app,
    fish: fish,
}

exports.mysql = mysql
*/
