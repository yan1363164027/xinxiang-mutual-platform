const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://43.138.83.20:8000', // 目标地址
        pathRewrite: {
          '^/api': ''
        },
        ws: true, // 用于支持websocket
        changeOrigin: true
      }
    }
  }
})
