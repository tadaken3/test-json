const FeedParser = require('feedparser');  
const request = require('request');
 
const fetchRSS = (feed) => { 
  let req = request(feed);
  let feedparser = new FeedParser({});
  
  let result;
  let feedMeta;
  let items = [];

  return new Promise(function (resolve, reject) {
  
  req.on('error', function (error) {
      return reject(error)
  });

  req.on('response', function (res) {  
    this.pipe(feedparser);
  });

  
  feedparser.on('meta', function(meta) {  
     feedMeta = meta;
  });

  feedparser.on('readable', function() {  
    while(item = this.read()) {
      items.push(item);
    }
  });

  feedparser.on('end', function() {
    latestArticle = items[0]
    result = {
     'blogTitle' : feedMeta.title,
     'articleTitle' : latestArticle.title,
     'pubdate' : latestArticle.pubdate,
     'link' : latestArticle.link
    }
    return resolve([result])
  });
  })
}

let feeds =  [
  'https://pensuke.work/rss',
  'https://tadaken3.hatenablog.jp/rss',
  'https://note.mu/rk_tech/rss'
];

async function asyncMap(array, operation) {
  return Promise.all(array.map(async item => await operation(item)))
}

asyncMap(feeds, async feed => {
  const response = await fetchRSS(feed)
  await console.log(response)
})




/*求めている結果
[
 [{ 
   blogTitle: 'タダケンのEnjoy Tech',
   articleTitle: 'PythonでSlackにメッセージを送る方法',
   pubdate: 2018-10-26T21:00:00.000Z,
   link: 'https://tadaken3.hatenablog.jp/entry/python-slack' 
  }],
 [{ 
  　blogTitle: 'コバヤシ リョウタ',
  　articleTitle: 'ロゴを募集したら素敵なロゴをたくさんご提案いただいた話',
  　pubdate: 2018-10-25T12:35:15.000Z,
  　link: 'https://note.mu/rk_tech/n/na346e6bc5bda' 
　}],
　[{ 
    blogTitle: 'ぺんすけブログ',
    articleTitle: 'プログラミング学習で分からない時の解決方法',
  　pubdate: 2018-10-26T00:55:15.000Z,
  　link: 'https://pensuke.work/solve-a-programming-problem/' 
　}],
]
*/



