'use strict'

 var Fish = {
    getDate: function (dataJsonStr) {
        var data = {}
        try {
            dataJsonStr = dataJsonStr.replace(/\n|\t|\r/g, "")
            data =  JSON.parse(dataJsonStr);
            // data = eval('({"msg":"信息","intro":"简介","age":10000})')
        } catch (e) {
            throw ('数据名 ' + dataJsonStr + '不存在')
        }
        return data
    },
    showModel: function (str) {
        document.body.innerHTML = '<div id="model"></div>'
        var html = str ? '<div class="tip">' + str + '</div>' : ''
        document.getElementById('model').innerHTML = html
    },
    hideModel: function () {
        document.getElementById('model').style.display = 'none'
    }
}
