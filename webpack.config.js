const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  context: __dirname, //webpack이 동작할 root디렉토리 (default는 프로젝트폴더인듯)
  entry: {
    main: ["./src/js/index.js", "./src/css/index.css"], //개발할 코드의 시작점
  },
  output: {
    //결과물이 위치할 곳
    path: path.resolve(__dirname, "build"),
    publicPath: "build", //bundling한 결과물을 배포할 경로
    filename: "js/bundle_[name].js",
  },
  devServer: {
    static: {
      directory: __dirname,
    },
    port: 3000, //웹서버가 사용할 포트
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: "js/vendor/libs",
        },
      },
    },
  },
};
