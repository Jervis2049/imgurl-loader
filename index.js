const fs = require("fs")
const path = require('path');
const glob = require('glob');

module.exports = function(content) {
    let fileReg = /__getPath\(([^\)]+)\)/gim;
    let rootPath = path.join(this.options.context, "/src");
    let filepath = this.context;
    // console.log(this.options.context)
    // console.log(filepath)
    content = content.replace(fileReg, (ret, src) => {
        let pathName = src.replace(/'|"/g, "");

        // console.log(path.join(rootPath, pathName))
        let resList = glob.sync(path.join(rootPath, pathName) + "/*");
        let result = '[';
        for (let i = 0; i < resList.length; i++) {
            let respath = path.relative(filepath, resList[i]).replace(/\\/g, "/")
            result += "require('" + respath + "')" + ","
        }
        result = result.substr(0, result.length - 1) + "]";
        return result;
        // console.log(result)
    })
    return content;
}