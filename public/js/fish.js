'use strict'

 var Fish = {
    getDate: function (dataJsonStr) {
        var data = {}
        try {
            data =  JSON.parse(dataJsonStr);
            // data = eval('({"msg":"信息","intro":"简介","age":10000})')
        } catch (e) {
            throw ('数据名 ' + dataJsonStr + '不存在')
        }
        return data
    }
}
