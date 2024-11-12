const { defineConfig } = require("@vue/cli-service");
const { resolve } = require("path");
const { packageName } = require("./package");
const port = process.env.port || 8082;

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/micro-app-b" : "/",
  devServer: {
    port,
    open: {
      target: [`http://localhost:${port}`],
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${packageName}-[name]`,
      libraryTarget: "umd",
      chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    },
  },
});
