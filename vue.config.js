const path = require('path')
module.exports = {
  // css: {
  //   loaderOptions: {
  //     // 给 sass-loader 传递选项
  //     // sass-loader v8.0 下版本使用data，以上使用prependData。
  //     scss: {
  //       data: `@import "~@/assets/scss/variable.scss";`
  //     }
  //   }
  // },
  devServer: {
    open: true // 自动打开浏览器
    // runtimeCompiler: true // 允许模板使用
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 全局变量文件路径，只有一个时可将数组省去
          resources: ['./src/assets/scss/variable.scss']
        })
        .end()
    })
  },
  configureWebpack: {
    resolve: {
      alias: {
        // 别名
        vue$: 'vue/dist/vue.esm.js' // 允许模板使用
      }
    }
  }
}
