## Description
在webpack中，读取文件夹下的图片资源，返回资源路径数组

## Install
```javascript
npm install imgurl-loader -D
```

## Webpack Config

```
  plugins: [
	...
    new HappyPack({
      id: "imgurl",
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'imgurl-loader'
        }
      ]
    })
  ],
  module:{
	rules: [
		{
			test: /\.js$/, // 支持 js
			exclude: [/node_modules/,/lib/],
			include : /src/,
			use: ['happypack/loader?id=imgurl']
        },
	],
  }
```


## Usage
```javascript
//将img文件夹下的所有文件列出来，返回数组
let resList = __getPath("img");
```