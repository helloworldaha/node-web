var util = require('util')
var url = require('url')
var fs = require('fs')
var mysql  = require('mysql');
var path = require('path')
var config = require(path.join(__dirname, '../config.njs'))
var Db = require(path.join(config.path.fish, 'mysql/model.njs'))


var model = Db.model
var findOne = Db.findOne

model.table = 'news'

exports.model = model;
exports.findOne = findOne;
