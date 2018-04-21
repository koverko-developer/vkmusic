const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
var cheerio = require('cheerio');


nightmare
  .goto('https://vk.com')
  .end()
  .then(function(body){
  //loading html body to cheerio
      var $ = cheerio.load(body);
      console.log(body);
  })
  .catch(error => {
    console.error('Search failed:', error)
  })
