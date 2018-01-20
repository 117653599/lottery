'use strict'

const fs = require('fs')
const chalk = require('chalk')

exports.getInfo = sourcePath => {
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