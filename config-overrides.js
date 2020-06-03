const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        //注意改为true
        style: true,
    }),
    //添加less加载器
    addLessLoader({
        javascriptEnabled: true,
        //修改默认主题样式
        modifyVars: {
            "@brand-primary": "#1cae82",
            "color-text-base": "#333",
            //other...
        }
    })
);
