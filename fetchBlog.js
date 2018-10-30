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
  return await fetchRSS(feed)
}).then(function(response){
  console.log(JSON.stringify(response,null,4))
})