module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true // 把请求头中host配置target
      },
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true // 把请求头中host配置target
      }
    }
  }
}
