const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false,
  // 配置代理跨域
   devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn' 
        }
      }
    }
})

//接口地址会更新，失效查看 https://www.bilibili.com/video/BV1Vf4y1T7bw?p=17&vd_source=928500936bdd049604bdbc03246ed8ae
