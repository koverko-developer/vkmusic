const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare
    .goto('http://www.anika-cs.by/')
  .wait()
  .evaluate(function () {
        return document.documentElement.outerHTML;
     }, function (result) {
        console.log( result);
     }
  ).run(function( err, nightmare){
    console.log("done");
  });
