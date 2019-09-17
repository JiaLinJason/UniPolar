const Config =require('./src/Config');
const {override,addLessLoader,fixBabelImports} = require('customize-cra');
const dir = 'hfile/';
const rewiredWebpackConfig = (dir) => config => {
    if (config.mode === 'production') {
        let output = config.output;
        let cssObj = config.plugins[5].options;

        output.filename = dir + output.filename;
        output.chunkFilename = dir + output.chunkFilename;
        cssObj.filename = dir + cssObj.filename;
        cssObj.chunkFilename = dir + cssObj.chunkFilename;

        config.output.filename = dir + 'static/js/[name]_[chunkhash:8].js';
        config.output.chunkFilename = dir + 'static/js/[name]_[chunkhash:8].chunk.js';
    }

    return config;
};

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: true,
    }),
    process.env.GENERATE_SOURCEMAP = false, // 去除打包的.map文件
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@brand-primary': Config.baseColor },
    }),
    rewiredWebpackConfig(dir)
);
