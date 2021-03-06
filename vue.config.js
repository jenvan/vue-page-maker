/**
 * Created by Liu.Jun on 2019/10/25 15:42.
 */

const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const chalk = require('chalk');

const log = require('./scripts/log');
const envConfig = require('./scripts/envConfig').getConfig();

const {
    entries,
    openPage
} = require('./scripts/entry.js')({
    chunks: ['user-runtime', 'user-vendors-polyfill']
});

log({
    data: chalk.green(openPage),
    des: 'openPage'
});

log({
    data: Object.entries(entries).map(([key, value]) => ({
        [key]: value.entry
    })),
    des: 'entry'
});

const isProduction = process.env.NODE_ENV === 'production';

console.log(entries, openPage);

module.exports = {
    // 资源目录
    publicPath: process.env.base || "./",

    // 发布目录
    outputDir: path.resolve(__dirname, (process.env.dist || './dist')),

    assetsDir: 'static',

    filenameHashing: true,

    pages: entries,

    lintOnSave: false,

    runtimeCompiler: true,

    transpileDependencies: [],

    productionSourceMap: false,

    configureWebpack: (config) => {

        config.resolve.alias = {
            ...config.resolve.alias,
            'demo-common': path.resolve(__dirname, './src/demo-common'),
        };
    },

    // webpack 链接 API，用于生成和修改 webpack 配置
    // https://github.com/mozilla-neutrino/webpack-chain
    chainWebpack: (config) => {
        // 添加runtime
        config.optimization.runtimeChunk({
            name: 'user-runtime'
        });

        // 指定文件提取
        const splitConfig = {
            cacheGroups: {
                vendors: {
                    name: 'user-vendors-polyfill',
                    chunks: 'initial',
                    priority: 12,
                    test: module => /[\\/]node_modules[\\/]/.test(module.context) || /components\\ElementUi/.test(module.context),
                },
                asyncVendor: {
                    name: 'chunk-vendors-async',
                    chunks: 'async',
                    priority: 8,
                    minChunks: 5,
                }
            }
        };

        config.optimization.splitChunks(splitConfig);

        // js 文件名调整
        if (isProduction) {
            // 资源表
            config.plugin('manifest').use(ManifestPlugin, [{
                fileName: 'manifest.json',
                filter: (obj) => {
                    const ext = path.extname(obj.name);
                    const includeExts = ['.js', '.css'];
                    return includeExts.includes(ext) && !obj.name.includes('chunk-');
                }
            }]);
        }

        // report
        if (envConfig.report) {
            // eslint-disable-next-line global-require
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
            config.plugin('bundle-analyzer').use(BundleAnalyzerPlugin);
        }

        // 移除 prefetch 插件
        Object.keys(entries).forEach((item) => {
            config.plugins.delete(`prefetch-${item}`);
        });
    },

    css: {
        requireModuleExtension: true,
        sourceMap: !isProduction,
        extract: isProduction
    },

    // All options for webpack-dev-server are supported
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        clientLogLevel: 'info',
        open: true,
        openPage,
        port: 8800,
        //host: '127.0.0.1',
        host: '192.168.1.2',
        overlay: {
            warnings: false,
            errors: true
        },
        publicPath: '/',
        proxy: {
            '/api-dev': {
                target: 'http://www.api.com',
                hot: true,
                open: true,
                contentBase: false,
                historyApiFallback: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api-dev': ''
                }
            }
        }
    },

    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},

    // 第三方插件配置
    pluginOptions: {}
};
