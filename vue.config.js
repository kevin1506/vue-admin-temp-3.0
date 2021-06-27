module.exports = {
  // // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
    // config.performance.set('hints', false)
  },
  // configureWebpack: {
  //   // 警告 webpack 的性能提示
  //   performance: {
  //     hints: 'warning',
  //     // 入口起点的最大体积
  //     maxEntrypointSize: 50000000,
  //     // 生成文件的最大体积
  //     maxAssetSize: 30000000,
  //     // 只给出 js 文件的性能提示
  //     assetFilter: function (assetFilename) {
  //       return assetFilename.endsWith('.js')
  //     }
  //   }
  // },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  runtimeCompiler: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: true,
    // css预设器配置项
    loaderOptions: {
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8888,
    https: false,
    // hotOnly: false,
    // disableHostCheck: true,
    proxy: null, // 设置代理
    before: () => {}
  }
}
