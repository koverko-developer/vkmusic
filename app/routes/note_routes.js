var cheerio = require('cheerio');
var iconv = require('iconv-lite');

module.exports = function(app, cookie,iconv, request, querystring) {

app.get('/audioSpecial/:id', (req, res) => {
    const id = req.params.id;
    request.post({
        headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
        'cookie' : cookie,'content-type' : 'application/x-www-form-urlencoded','content-type': 'application/x-www-form-urlencoded;charset=windows-1251 '},
        url:     'https://vk.com/al_audio.php?',
        form: "access_hash=&act=load_section&al=1&claim=0&owner_id="+id+"&playlist_id=recomsPUkLGlpXADkvD0tMBBhJFicMDClBTRsDZFFLFVRACgopDEsL&type=recoms",
      }, function(error, response, body){
        if(!error){
          //res.send(body)
          console.log('BODY:----------'+body)
          parse(body, res);
        }else {
          console.log('MY ERR:----------');
          res.send(error)
        }
      });
  });


function parse(body, res){
  console.log('parse');
  try{
  var tmpJson = body.substring(body.indexOf("gridCovers") + 7, body.indexOf("hasMore") +8);
  console.log(tmpJson.indexOf("list"));
  console.log(tmpJson.indexOf("hasMore"));
  var arrL = tmpJson.substring(tmpJson.indexOf("list")+6, tmpJson.length-6);
  var listAudio = arrL.substring(0, arrL.length -4);
  var jsonStringArray = listAudio;
  var jsonSTR = JSON.stringify(jsonStringArray);
  var json = JSON.parse(jsonStringArray);
  //res.send('hello')
  }catch(err){
  console.log('MY ERR rapse:----------'+ err);
  res.send(err);
  }

}
    
}
