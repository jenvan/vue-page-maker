/**
 * Created by Liu.Jun on 2018/5/31.
 */

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const envConfig = require('./envConfig');

// 默认的模板文件
const defaultTemp = path.resolve(__dirname, '../index.html');

function entryFn({ dir, chunks = [] }) {
    // entry 文件相对的目录
    const dirPath = path.normalize(path.resolve(__dirname, '../src/pages'));

    // entry 文件
    const filePath = path.normalize(path.resolve(__dirname, '../src/pages/*/index.js'));

    let openPage = "";
    const entries = glob.sync(filePath).reduce((preValue, entry, index) => {
        let dirName = path.normalize(path.dirname(entry));
        let entryName = dirName.substring(path.normalize(dirPath).length + 1).replace(/\\/g, '/');

        // const fileName = path.basename(entry, path.extname(entry));

        // 第一个 entry 为浏览器默认打开页面
        if (index === 0){
            entryName = "index";
            //openPage = `${entryName}.html`;
        } 

        preValue[entryName] = {
            entry,
            template: fs.existsSync(entry.replace('.js', '.html')) ? entry.replace('.js', '.html') : defaultTemp,
            filename: `${entryName}.html`,
            title: `${entryName}`,
            chunks: [
                entryName,
                ...chunks
            ]
            // chunks to include on this pages, by default includes
            // extracted common chunks and vendor chunks.
            // chunks: ['chunk-runtime', 'chunk-vendors-polyfill', 'index']
        };
        return preValue;
    }, {});

    return {
        entries,
        openPage
    };
}

module.exports = ({
    chunks = []
} = {}) => {
    // 相对于 根目录
    const {
        dir, // 指定编译的目录
    } = envConfig.getConfig();

    return entryFn({
        dir,
        chunks
    });
};
