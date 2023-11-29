const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// webpack 번들러는 기본적으로 js 번들러, js이외의 파일은 해석할 수 없다.
// 다른 확장자를 해석하기 위해서는 Loader의 도움이 필요
// Loader은 목표로하는 확장자 파일을 가져와서 읽을 준비만 한다.
// 실제 해석하는것은 플러그인

module.exports = {
  resolve: {
    // 파일을 가져올때 배열 내의 확장자를 생략할 수 있게 해준다.
    extensions: [".vue", ".js"],
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  entry: "./src/main.js",
  output: {
    // resolve: 인자로 받은 경로들을 문자열 형태로 리턴
    // __dirname: 현재 파일의 절대경로

    // output을 절대경로로 설정하는 이유, output은 상대경로로 찾을 수 있다고 보장할 수 없기 때문에.
    // output은 webpack config에 작성한 옵션들이 모두 동작하고 최종결과를 내어주는 옵션이다.
    // 그때 최종결과를 내어주는 옵션이 webpack config가 아닐 경우가 대부분
    path: path.resolve(__dirname, "dist"),
    publicPath:"/",
    // 기존의 번들파일을 삭제하고 다시 생성
    clean: true,

    // filename을 생략하면 entry포인트의 파일 이름과 같은 이름으로 생성
    // filename: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 제외할 것
        exclude: /node_modules/,
        // exclude: /node_modules\/(?!axios|XXXX|XXXX )/,
        use: "babel-loader"
      },
      {
        // ".vue"로 끝나는 파일을 찾는다
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.s?css$/,
        // 여러개의 loader를 사용할때는 끝 index부터 평가된다. 순서가 중요.
        // css-loader로 css를 해석, vue-style-loader로 vue확장자의 style부분을 html쪽에 삽입이 가능하도록 만들어준다.
        use: ["vue-style-loader",
              "css-loader", 
              "postcss-loader", 
              "sass-loader"],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),

    // index.html 해석을 위한 플러그인
    // ? : loader는 필요 없나?
    new HTMLPlugin({
      template: "./src/index.html",
    }),

    new CopyPlugin({
      patterns: [
        // from에서 to로 파일을 복사해서 넣어준다.
        // 따로 to를 지정하지 않으면 output과 동일 (dist)
        { from: "static" },
      ],
    }),
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
};
