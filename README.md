# node-web
node 服务器

## 安装方式
`cd` 至项目根目录
```
npm install
```
## 启动
`cd` 至项目根目录
```
node servers.njs
```
## 配置说明
- `server.njs` 中对监听的端口进行设置（默认端口号为 `80`），也可在此完善日志记录
- `app` 目录下为 MVC 模式目录结构
- `fish` 目录下为框架文件
- `app/config.njs` 中对数据库连接等进行配置

> 项目中 node.js 相关文件使用非规范的 `.njs` 作为后缀名，旨在与普通的 `javascript` 脚本文件做区分
