# Dcard Reader

串接 Dcard 文章 API，自製簡單的 Dcard Reader

作者：Eason Chang

![](preview.gif)

Live Demo: https://www.easonchang.com/dcard-reader/

## Local 啟動方法

```bash
yarn start
# or
npm start
```

## 技術重點

- 手刻 Infinite Scroll，頁面滑到最下面時再 call API 拿後續文章資料，使用 IntersectionObserver API 實作
- 自架 [proxy server](https://github.com/Kamigami55/eason-proxy) 處理 CORS 問題
- styled-components 簡單樣式切版
- axios 串接 API

## 專案架構

使用 create-react-app 來建立專案模板

```
/dcard-reader
├── src
│   ├── App.js                  # 主頁面邏輯
│   ├── apis
│   │   └── postsAPI.js         # API 串接
│   └── components
│       ├── Loader.js           # Loading 動畫 UI
│       ├── Page.js             # 頁面 UI
│       ├── Post.js             # 文章 UI
│       ├── PostsContainer.js   # 文章列表 UI
│       └── VisibilitySensor.js # infinite scroll 實作
├── .eslintrc.json              # eslint 設定
└── .prettierrc                 # prettier 設定
```