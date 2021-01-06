/**
 * 博客数据库访问层
 * @author  Ta_Mu
 * @date  2020/12/11 10:24
 */
const {exec} = require('../db/mysql')
const dayjs = require('dayjs')
const CommonUtil = require('../util/common-util')

const getList = (author, keyword) => {
  let sql = 'select * from blog where 1 = 1'
  if(author) {
    sql += ` and author = '${author}'`
  }
  if(keyword) {
    sql += ` and title like '%${keyword}%'`
  }
  return exec(sql)
}

const getById = async (id) => {
  const sql = `select * from blog where id = '${id}'`
  const result = await exec(sql)
  return result && result[0]
}

const create = async (blogData) => {
  const currentTime = getCurrentTime()
  const sql = `insert into blog (title, content, author, createTime, updateTime) values ('${blogData.title}',
   '${CommonUtil.toLiteral(blogData.content)}', 
   '${blogData.author}', 
   '${currentTime}', 
   '${currentTime}'
   )`
  const result = await exec(sql)
  return {
    id: result.insertId,
    title: blogData.title,
    content: blogData.content,
    author: blogData.author,
    createTime: currentTime,
    updateTime: currentTime
  }
}

const update = async (blogData) => {
  const sql = `update blog set title = '${CommonUtil.toLiteral(blogData.title)}', content = '${CommonUtil.toLiteral(blogData.content)}' where id = '${blogData.id}'`
  return exec(sql)
}

const deleteById = async (id) => {
  const sql = `delete from blog where id = ${id}`
  return exec(sql)
}

const getCurrentTime = () => {
  return dayjs().format('YYYY-MM-DD hh:mm:ss')
}

const BlogDao = {
  getList,
  getById,
  create,
  update,
  deleteById
}
module.exports = BlogDao