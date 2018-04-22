var cheerio = require('cheerio'); // Basically jQuery for node.js
var rp = require('request-promise');
 
var options = {
    uri: 'http://www.google.com',
    transform: function (body) {
        consloe.log(cheerio.load(body));
        return cheerio.load(body);
    }
};
 
rp(options)
    .then(function ($) {
        // Process html like you would with jQuery...
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
    });
