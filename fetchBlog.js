const FeedParser = require('feedparser');  
const request = require('request');

  
var feedparser = new FeedParser({});

let feed = 'https://pensuke.work/rss';

const fetchRSS = (feed) => {
  let result;
  let feedMeta;
  let items = [];
  const req = request(feed);
  
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
    recentlyArticle = items[0]
    let 
    result = {
     'blogTitle' : feedMeta.title,
     'artTitle' : recentlyArticle.title,
     'pubdate' : recentlyArticle.pubdate,
     'link' : recentlyArticle.link
    }
    console.log(JSON.stringify(result, null, 4))
  });
}

fetchRSS(feed)