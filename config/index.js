// see http://vuejs-templates.github.io/webpack for documentation.
var path = require("path");

module.exports = {
  build: {
    env: require("./prod.env"),
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "./",
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require("./dev.env"),
    port: 8005,
    autoOpenBrowser: true,
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      //代理解决跨域
      //           原接口：http://http://121.41.130.58:9090/yt_api/login/doLogin
      //
      // 　　　　　 页面调用：http://localhost:8081/proxy/yt_api/login/doLogin ——这里多了一个proxy
      // '/s1': {
      //   target: 'http://10.100.16.168:8282', //设置你调用的接口域名和端口号 别忘了加http
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/s1': '/s1' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
      //   }
      // }
      '/count': {
        target: 'http://tracklog.aipark.com/', //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/count': 'http://tracklog.aipark.com/' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      },
      '/test': {
        target: 'http://pre.sjz.appcw.aipark.com', //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/test': 'http://pre.sjz.appcw.aipark.com' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      },
      // '/api': {
      //   target: 'http://10.100.16.198:8082', //设置你调用的接口域名和端口号 别忘了加http
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': 'http://10.100.16.198:8082/sym_aipark/api' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
      //   }
      // },
      // '/api': {
      //   target: 'http://pre.sjz.appcw.aipark.com', //设置你调用的接口域名和端口号 别忘了加http
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': 'http://pre.sjz.appcw.aipark.com/api' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
      //   }
      // },
      '/api': {
        target: 'http://sjz.appcw.aipark.com', //设置商用接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      }

    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};