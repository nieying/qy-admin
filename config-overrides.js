const { override, fixBabelImports, addLessLoader, addPostcssPlugins, addDecoratorsLegacy } = require('customize-cra');
const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');

module.exports = override(
    // 支持装饰器写法 
    addDecoratorsLegacy(),

    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),

    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1890FF' },
    }),

    // addPostcssPlugins([require('postcss-pxtorem')({
    //     rootValue: 100,
    //     propList: ['*']
    //     // propList: ['*', '!border*', '!font-size*', '!letter-spacing'],
    //     // propWhiteList: []
    // }),]),

    rewireAliases.aliasesOptions({
        '@components': path.resolve(__dirname, `${paths.appSrc}/components/`),
        '@pages': path.resolve(__dirname, `${paths.appSrc}/pages/`),
        '@styles': path.resolve(__dirname, `${paths.appSrc}/assets/styles/`),
        '@images': path.resolve(__dirname, `${paths.appSrc}/assets/images/`),
        '@routes': path.resolve(__dirname, `${paths.appSrc}/routes/`),
        '@utils': path.resolve(__dirname, `${paths.appSrc}/utils/`),
        '@api': path.resolve(__dirname, `${paths.appSrc}/api/`)
    })
);