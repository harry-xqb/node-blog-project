/**
 * 数据库连接类
 * @author  Ta_Mu
 * @date  2020/12/11 10:24
 */
const {MYSQL_CONFIG} = require('../config/db')
const mysql = require('mysql')
// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG)
// 执行sql函数
const exec = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec,
  escape: mysql.escape
}