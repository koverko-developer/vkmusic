const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
var cheerio = require('cheerio');


nightmare
  .goto('https://vk.com')
    .evaluate(function(){

        //here is where I want to return the html body
        console.log(document.body.innerHTML);


    })
  .then(function(body){
    //loading html body to cheerio
        var b = cheerio.load(body);
        console.log(b);
    })
  .catch(error => {
    console.error('Search failed:', error)
  })
  
