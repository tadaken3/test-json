var FeedParser = require('feedparser');  
var request = require('request');  
var feed = 'https://pensuke.work/rss';

var req = request(feed);  
var feedparser = new FeedParser({});

var result = [];
var items =[];

req.on('response', function (res) {  
  this.pipe(feedparser);
});

feedparser.on('meta', function(meta) {  
   result.push({blogTitle: meta.title});
});

feedparser.on('readable', function() {  
  while(item = this.read()) {
    items.push(item);
  }
});

feedparser.on('end', function() {
   var recentItem = items[0]
   result.push({articleTitle: recentItem.title});
   result.push({pubdata: recentItem.pubdate});
   result.push({link: recentItem.link});
   console.log(JSON.stringify(result, null, 4))
});

