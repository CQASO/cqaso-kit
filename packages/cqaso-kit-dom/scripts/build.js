
const babel = require('rollup-plugin-babel');
const fs = require('fs');
const path = require('path');
const babelRc = JSON.parse(fs.readFileSync('.babelrc', 'utf8'));
const rollup = require( 'rollup' );

// 常量
const rootPath = process.cwd();
const appPath = path.join(rootPath, 'src');
const distPath = path.join(rootPath, 'dist');


/**
 * 根据入口路径编译
 */
function getOption(entry) {
    return {
        entry: entry,
        plugins: [
            babel({
                babelrc: false,
                presets: ['es2015-minimal-rollup'].concat(babelRc.presets.slice(1)),
                plugins: babelRc.plugins,
                exclude: 'node_modules/**'
            }),
        ],
    }
}

/**
 * 获得入口路径
 */
 function getEntries(_path) {
     function merge(args) {
         const result = [];
         for (let i = 0; i < args.length; i++) {
             const arg = args[i];
             result.push(...arg);
         }
         return result;
     }


     if (isDirectory(_path)) {
         // 过滤 _helper目录
         if (/\/internal/.test(_path)) return [];

         // 递归
         return merge(
             fs.readdirSync(_path)
             .map(value => getEntries(path.join(_path, value)))
        );
     } else {
         // 过滤__test__.js文件
         if (/^((?!__test__|__snapshots__).)*(\.js)$/.test(_path)) {
             return [_path];
         }

         return [];
     }
 }

/**
 * 判断是否是路径
 */
 function isDirectory(dir) {
   return fs.lstatSync(dir).isDirectory();
 }


/* ------------------------------------
 * 主程序
 * ------------------------------------ */

const entries = getEntries(appPath);

async function main() {

    // 平行的异步
    return entries.map(async (entry) => {
        await rollup.rollup(getOption(entry))
        .then(bundle => {
            bundle.write({
                dest: path.join(distPath, path.basename(entry)),
                format: 'umd',
                moduleName: path.basename(entry, '.js'),
                sourceMap: false,
            });
        });
    })
}

main();
console.log('✅ rollup success.');
