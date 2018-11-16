# api-write-blog-every-week

## 概要

ブログ更新を管理・監視するための「We Love Blog」用のAPIを出力するためのコードです。
Netlifyを使っています。

https://we-love-blog.netlify.com/

## サイト登録の方法

1. Blogs.txtに登録したいサイトのURLを登録します。登録するURLは/feedもしくは/rssなどのRSSフィードを出力するURLになります。
2. ローカル環境で、 ``` node fetchBlog.js ``` を実行します。各サイトの最新のブログ一覧を取得してJSONで出力されます
3. MasterにMargeすると、自動でデプロイが走ります。サイト上でも正しく表示探されているか一応確認してください。
4. 基本的には1時間に一度、自動デプロイが走ります。

## 応援のしかた
サイトのキャプチャを撮って、Slackに貼る。更新してない人を見つけたら励ます。

