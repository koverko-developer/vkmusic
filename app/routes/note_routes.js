var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var cookie = "remixlang=0; remixstid=174780143_8f08d9b6cecc032d5b; remixflash=0.0.0; remixscreen_depth=24; remixdt=0; remixttpid=da52df1d140a2a76ab14e8be1b9adea7d54a1e6835; remixmdevice=1366/768/1/!!-!!!!; remixgp=55e4345b0f6326e4e5d01b97afeffe5c; remixseenads=0; remixrefkey=d1fb7610a21ed037de; remixsid=12460caed6a6371e6505b0ce30d8072566521bf5c54dd45e5f2c9; tmr_detect=0%7C1524509114070";
var request = require('request');
//const Nightmare = require('nightmare')
//const puppeteer = require('puppeteer');
//var cookie = require('cookie-parse');
module.exports = function(app, cookie,iconv, request, querystring) {

 
  app.get('/audioSpecial/:id', (req, res) => {
    const id = req.params.id;
    sendP(id, cookie, request, res);     
  });  
}
async function sendP(id,cookie, request, res){
 
  console.log(cookie);
 
  request.post({
      headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
      'cookie' : cookie,'content-type' : 'application/x-www-form-urlencoded','content-type': 'application/x-www-form-urlencoded;charset=windows-1251 '},
       url:     'https://vk.com/al_audio.php',
      form: "access_hash=&act=load_section&al=1&offset=0&owner_id="+id+"&playlist_id=-1&type=playlist",
    }, function(error, response, body){
      if(!error){
        console.log(body);
        
        var a = parse(body, response);
        res.send(a);
      }else {
        console.log('MY ERR:----------'+error);
        var a = 'error';
        res.send('error')
      }

    });

}
function parse(body, res){
  console.log('parse');
  try{
  var res1 = body;
  var tmpJson = res1.substring(res1.indexOf("gridCovers") + 7, res1.indexOf("hasMore") +8);
  console.log(tmpJson.indexOf("list"));
  console.log(tmpJson.indexOf("hasMore"));
  var arrL = tmpJson.substring(tmpJson.indexOf("list")+6, tmpJson.length-6);
  var listAudio = arrL.substring(0, arrL.length -4);
  var jsonStringArray = iconv.decode(listAudio,'win1251');
  var jsonSTR = JSON.stringify(jsonStringArray);
  var json = JSON.parse(jsonStringArray);
  return json;
  //res.send(json)
  }catch(err){
   return 'err';
  console.log('MY ERR rapse:----------');
  //res.send(err)
  }

}
