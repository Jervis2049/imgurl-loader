const fs = require("fs")
const path = require('path');
const glob = require('glob');
const loaderUtils = require('loader-utils');

module.exports = function(content) {
    const options = loaderUtils.getOptions(this) || {};
    if (options.noCache) this.cacheable(false);

    let fileReg = /__getPath\(([^\)]+)\)/gim;
    //自定义文件 context|| 从webpack 4开始，原先的this.options.context被改进为this.rootContext
    let rootPath = options.context || this.rootContext || (this.options && this.options.context);
    let srcPath = path.join(rootPath, "/src");
    let filepath = this.context; //被处理的文件所在路径
    content = content.replace(fileReg, (ret, src) => {
        let folderName = src.replace(/'|"/g, "");
        let resList = glob.sync(path.join(srcPath, folderName) + "/*");
        let result = '[';
        for (let i = 0; i < resList.length; i++) {
            let respath = path.relative(filepath, resList[i]).replace(/\\/g, "/")
            result += "require('" + respath + "')" + ","
        }
        result = result.substr(0, result.length - 1) + "]";
        return result;

    })
    return content;
}