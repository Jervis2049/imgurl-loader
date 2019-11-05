

## Description
在webpack中，读取文件夹下的图片资源，返回资源路径数组

## Install
```javascript
npm install imgurl-loader -D
```

## Webpack Config

```
...
  module: {
    rules: [
     {
        test: /\.js$/, 
        include:/src/,
        use: [{
          loader:'imgurl-loader'
        }]
      },
      //图片处理
    {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [{
            loader: 'file-loader',
            options: {
                outputPath: 'img',
                name: '[name]_[contenthash:8].[ext]'
            }
        }]
    }
    ],
  },
```


## Usage
在页面上这样写，就可以返回一个img数组，如
`["img/1.jpg","img/2.jpg",...]`，通常在做图片预加载前可以这样获取，免去要一个个手动写的麻烦。
```javascript
//将img文件夹下的所有文件列出来，返回数组
let resList = __getPath("img");
```

## Demo

https://github.com/xiaojiecong/imgurl-loader-demo