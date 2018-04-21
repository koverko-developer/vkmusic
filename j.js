const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
var cheerio = require('cheerio');


nightmare
  .goto('https://vk.com')
  .then(function(body){
    //loading html body to cheerio
        var b = cheerio.load(body);
        console.log(b);
    })
  .catch(error => {
    console.error('Search failed:', error)
  })
  
