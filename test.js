 var afterLoad=require('after-load');

var t = afterLoad('https://google.com',function(html){
     console.log(html);
 });

console.log(t);
