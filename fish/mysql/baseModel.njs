var mysql  = require('mysql');
var async = require('async')
var path = require('path')
var config = require(path.join(__dirname, '../../app/config.njs'))
const DB_POOL = mysql.createPool(config.mysql)

class Model {
    // 构造函数
    constructor() {
        this.queryObj = {
            select: '*',
            where: '',
            params: [],
            order: '',
            limit: null
        }
    }
    getTable() {
        return ''
    }
    getDb() {
        return 'test'
    }
    select(str) {
        // @TODO: 需要预处理查询语句
        this.queryObj.select = str
        return this
    }
    where(str, params) {
        params = params || this.queryObj.params
        // @TODO: 需要预处理查询语句
        this.queryObj.where = str
        if (params.length > 0) {
            this.queryObj.params = params
        }
        return this
    }
    limit(number) {
        number = parseInt(number)
        if (number < 0) number = 0
        this.queryObj.limit = number
        return this
    }
    async one() {
        //return new Promise((resolve, reject) => {
        this.queryObj.limit = 1
        return await this.query()
        //})
    }
    async all() {
        return await this.query()
    }
    async query() {
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            port: '3306',
            database: 'test',
        })
        var table = this.getTable()
        var db = this.getDb()
        var select = this.queryObj.select
        var sql = 'SELECT ' + this.queryObj.select + ' FROM `' + db + '`.`' + table + '`';
        if (this.queryObj.where !== '') {
            sql += ' WHERE ' + this.queryObj.where
        }
        if (this.queryObj.limit !== null) {
            sql += ' LIMIT ' + this.queryObj.limit
        }
        console.log(sql)
        var data = await this.queryDB(sql, this.queryObj.params)
        // console.log(data)
        return data
    }
    async queryDB(sql, params) {
        var that = this
        return new Promise((resolve, reject) => {
            DB_POOL.getConnection(function(err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, params, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            // that.data = rows
                            resolve(rows)
                        }
                        // 结束会话
                        connection.release()
                    })
                }
            })
        })
    }
}
exports.model = Model;
/*var ccc = new Model('kobe')
ccc.select('title').where('id=1').all()
var test = async function () {
    var cc = await ccc.select('title').where('id=1').all()
    // return ccc.data
    console.log({tooo: cc})
}
test()*/
// console.log(ccc.select('title').where('id=1').all())
// console.log(ccc.data)
// module.exports = Point;


// console.log(model.table)

// module.exports.findOne = findOne
