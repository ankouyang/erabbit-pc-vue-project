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
  // css配置
  css: {
    // css预设器配置项
    loaderOptions: {
      scss: {
        // 共享全局变量,把变量和混入加载进去
        prependData: `
        @import "@/assets/styles/variables.scss";
        @import "@/assets/styles/mixins.scss";
        `
      }
    }
  },
  devServer: {
    port: 8888,
    open: true,
    proxy: {
      '/api': {
        target: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
