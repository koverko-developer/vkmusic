const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare
    .goto('http://www.vk.com/')
  .wait()
  .evaluate(function () {
        return document.documentElement.outerHTML;
     }, function (result) {
        console.log( result);
     }
  ).run(function( err, nightmare){
    console.log("done");
  });
