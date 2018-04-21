 var afterLoad=require('after-load');

afterLoad('https://google.com',function(html){
     console.log(html);
 });
