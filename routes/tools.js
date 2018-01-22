'use strict'

const fs = require('fs')
const chalk = require('chalk')

/*
 *根据路径名字获取文件信息，
 *当文件不存在时则创建
 */
exports.getList = sourcePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(sourcePath, (err, data) => {
      // 判断文件是否存在
      if (fs.existsSync(sourcePath)) {
        if (!data.length) {
          const list = []
          resolve(list)
        } else {
          const list = JSON.parse(data)
          resolve(list)
        }
      } else {
        // 不存在重新创建一个
        fs.writeFile(sourcePath, '', (err) => {
          if (err) reject(err);
          console.log(chalk.green('新建文件成功:' + sourcePath))
        })
        const list = []
        resolve(list)
      }
    })
  });
}
/*
 * 从已中奖列表查找奖项=type的所有列表并返回
 */
exports.hasTypeList = (data, type) => {
  let j = 0
  const arrayList = []
  for (let i = 0; i < data.length; i++) {
    if (data[i][3] === type) {
      arrayList.push(data[i])
      j = j + 1
    }
  }
  return arrayList
}
/*
 * 计算奖项当前剩余情况
 */
exports.renderList = (typelist, len) => {
  const list = {}
  list.name = typelist.name
  list.type = typelist.type
  list.len = typelist.len
  list.totalNum = typelist.totalNum
  if (typelist.len - len < 1) {
    list.totalTimes = 0
  } else {
    list.totalTimes = Math.floor((typelist.len - len) / typelist.totalNum)
  }
    
  return list
}
