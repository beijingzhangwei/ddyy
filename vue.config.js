const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 代理的目的服务器  8080-->8080--->5000
  devServer:{
    proxy:"http://localhost:5000"
  }
})
