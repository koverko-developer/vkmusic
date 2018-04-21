var Nightmare1 = require('nightmare');
var nightmare = Nightmare1({
  show: true
});
var fs = require('fs');

nightmare
  .goto('http://vk.com')
  .evaluate(function() {
    return document.querySelector('body')
      .innerHTML;
  })
  .end()
  .then(function(page) {
      console.log(page);
    });
