'use strict'

const fs = require('fs')

exports.getInfo = sourcePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(sourcePath, (err, data) => {
      if (fs.existsSync(sourcePath)) {
        const list = JSON.parse(data)
        resolve(list.length)
      } else {
        fs.writeFile(sourcePath, '', (err) => {
          if (err) reject(err);
          console.log('保存成功')
        })
        resolve(0)
      }
    })
  });
}