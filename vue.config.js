const path = require('path')
module.exports = {
  outputDir: 'dist',
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: config => {
    // 配置路径别名
    config.resolve.alias
      .set('@', path.join(__dirname, './src'))
      .set('@components', path.join(__dirname, './src/components'))
      .set('@utils', path.join(__dirname, './src/utils'))
      .set('@views', path.join(__dirname, './src/views'))
  },
  devServer: {
    port: 8888,
    open: true,
    proxy: {
      '/admin': {
        target: 'https://dev-gateway.xinshuiguanjia.com',
        // target: 'http://test4-admin.xinshuiguanjia.com',
        changeOrigin: true
      },
      '/accounts-admin': {
        // target: 'https://dev2-xzb.xinshuiguanjia.com',
        target: 'http://192.168.11.124:8201', // 震霖
        // target: 'http://test4-admin.xinshuiguanjia.com',
        changeOrigin: true,
        pathRewrite: {
          '^/accounts-admin': ''
        }
      }
    }
  }
}
