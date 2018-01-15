'use strict';

const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const csso = require('csso');
const uglify = require('uglify-js');
const chalk = require('chalk')

const config = require('./config');
const entry = require('./webpack.config').entry;
const baseRoot = config.baseRoot;

const publicPath = '<%= __public_path__ %>';
const searchRe = /<%= __public_path__ %>([^"]+)/g;
const hashedRe = /(\w+)(-\w{32})?(\.\w+[^"])/;
const imageFileRe = /png|svg|gif|jpg|jpe?g|icon?/;

const stylesDir = path.join(baseRoot, 'public/css');
const imgDir = path.join(baseRoot, 'public/img');
const assetsDir = path.join(baseRoot, 'public/assets');
const viewsDir = path.join(baseRoot, 'views');

const fileMap = {};

const hashStatic = (fromDir, toDir) => {
  let files = fs.readdirSync(fromDir);
  files.forEach(f => {
    let fpath = path.join(fromDir, f);
    let fstat = fs.statSync(fpath);

    if (fstat.isFile()) {
      let dest = path.join(toDir, hashFile(fpath));
      fs.createReadStream(fpath).pipe(fs.createWriteStream(dest));
    }
  });
};

const hashAssets = dir => {
  fs.readdirSync(dir).forEach(file => {
    let fpath = path.join(dir, file);
    let fstat = fs.statSync(fpath);
    let finfo = path.parse(fpath);

    if (fstat.isFile()) {
      if (isHashed(file)) {
        fs.unlinkSync(fpath);
      } else {
        if (file.endsWith('.js')) {
          fs.writeFileSync(fpath, minify(fpath));
        } else if (file.endsWith('.css')) {
          fs.writeFileSync(fpath, minifyCss(fpath));
        }
        fs.renameSync(fpath, path.join(dir, hashFile(fpath)));
      }
    }
  });
};

// 添加hash
const hashFile = file => {
  console.log(file)
  if (file.match('.DS_store')) {
    return false
  } else {
    let hash = hashMd5(file);
    let info = path.parse(file);
    let toName = `${info.name}-${hash}${info.ext}`;

    fileMap[info.base] = toName;
    return toName;
  }
};

// 更新视图文件
const updateViews = isRelease => {
  let views = fs.readdirSync(viewsDir);
  views.forEach(view => {
    let fpath = path.join(viewsDir, view);
    let fstat = fs.statSync(fpath);
    if (fstat.isFile() && view.endsWith('.html')) {
      updateHtml(fpath, isRelease);
    }
  });
};

// 引用css和js路径
const updateHtml = (file, isRelease) => {
  let html = fs.readFileSync(file, 'utf8');
  let matches = html.match(searchRe);
  let newfile = html;

  if (matches && matches.length) {
    matches.forEach(match => {
      let matchInfo = path.parse(match);
      let hashedInfo = path.parse(match.replace(publicPath, publicPath + '/'));
      let hashedBase = hashedInfo.base;
      let hashedMatch = isHashed(match);
      let name = hashedBase.replace(hashedRe, '$1$3');
      let hashedFile = fileMap[name];

      if (isRelease) {
        if (hashedMatch) {
          newfile = newfile.replace(hashedBase, hashedFile);
        } else {
          newfile = newfile.replace(match, `${publicPath}${hashedFile}`);
        }
      } else {
        let sub = isImageFile(match) ? '../img/' : '';
        newfile = newfile.replace(match, `${publicPath}${sub}${name}`);
      }
    });
  }

  fs.writeFileSync(file, newfile);
};

const minify = file => {
  console.log(chalk.cyan(`process file: ${file}`));
  return resourceBanner() + uglify.minify(file).code;
};

const minifyCss = file => {
  console.log(chalk.cyan(`process file: ${file}`));
  return resourceBanner() + csso.minify(fs.readFileSync(file, 'utf8'));
};

const resourceBanner = () => {
  const now = new Date;
  const buildTime = `build: ${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  return `/*\n * ${buildTime}\n */\n`;
};

const cleanAssets = () => {};

const hashMd5 = file => md5(fs.readFileSync(file));
const isHashed = file => /-\w{32}\.\w+$/.test(file);
const isImageFile = file => imageFileRe.test(path.extname(file));

module.exports = isRelease => {
  if (isRelease) {
    hashAssets(assetsDir);
    hashStatic(imgDir, assetsDir);

    fs.writeFileSync(path.join(baseRoot, 'build/filemap.json'),
      JSON.stringify(fileMap, null, 2));
  }

  updateViews(isRelease);
};

