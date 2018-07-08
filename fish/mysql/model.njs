var mysql  = require('mysql');
var async = require('async')
var path = require('path')
var config = require(path.join(__dirname, '../../app/config.njs'))

const DB_POOL = mysql.createPool(config.mysql)

var model = {
    table: '',
    find: {
        queryObj: {
            // table: '',
            select: '*',
            where: '',
            params: [],
            order: '',
            limit: null
        },
        select: function (str) {
            // @TODO: 需要预处理查询语句
            this.queryObj.select = str
            return this
        },
        where: function (str, params) {
            params = params || this.queryObj.params
            // @TODO: 需要预处理查询语句
            this.queryObj.where = str
            if (params.length > 0) {
                this.queryObj.params = params
            }
            return this
        },
        all: async function () {
            return await query(this.queryObj, model.table)
        },
        one: async function () {
            //return new Promise((resolve, reject) => {
                this.queryObj.limit = 1
                var data = await query(this.queryObj, model.table)
                if (data.length >= 1) {
                    data = data[0]
                }
                return data
            //})
        }
    }

}

var findOne = async () =>  {
    return 2333
}

async function query(queryObj, table) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        port: '3306',
        database: 'test',
    })
    var select = queryObj.select
    var sql = 'SELECT ' + queryObj.select + ' FROM ' + table;
    if (queryObj.where !== '') {
        sql += ' WHERE ' + queryObj.where
    }
    var data = await queryDB(sql, queryObj.params)
    /*console.log(sql)
    console.log(queryObj.params)
    console.log(data)*/
    return data
}
let queryDB = function (sql, params) {
    return new Promise((resolve, reject) => {
        DB_POOL.getConnection(function(err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, params, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
}
module.exports.model = model
module.exports.findOne = findOne
