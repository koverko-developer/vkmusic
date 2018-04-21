var cheerio = require('cheerio');
var iconv = require('iconv-lite');


module.exports = function(app, cookie,iconv, request, querystring, afterLoad) {

app.get('/audioSpecial/:id', (req, res) => {
    const id = req.params.id;
    //res.send('hello');
    //res.send(parse('err'));
    request.post({
        headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
        'cookie' : cookie,'content-type' : 'application/x-www-form-urlencoded','content-type': 'application/x-www-form-urlencoded;charset=windows-1251 '},
        url:     'https://vk.com/audios185645054',
        form: "access_hash=&act=load_section&al=1&claim=0&owner_id="+id+"&playlist_id=recomsPUkLGlpXADkvD0tMBBhJFicMDClBTRsDZFFLFVRACgopDEsL&type=recoms",
      }, function(error, response, body){
        if(!error){
          //res.send(body)
          console.log('BODY:----------'+body.substring(0,1000))
          //res.send(JSON.stringify(response.body));
          //parse(body, res);
        }else {
          console.log('MY ERR:----------');
          //res.send(error)
        }
        
        res.send(body.toString());
      });
  });
    
app.get('/insta', (req, res) => {
          afterLoad('http://stackoverflow.com/users/747579',function(html,$){
         console.log(`Abdennour's Reputation in Stackoverflow = ${$('.reputation').eq(0).text()} `);
          //   7.6k 
      })
  });


function parse(body, res){
  console.log('parse'+body);
  try{
  var tmpJson = body.substring(body.indexOf("gridCovers") + 7, body.indexOf("hasMore") +8);
  console.log(tmpJson.indexOf("list"));
  console.log(tmpJson.indexOf("hasMore"));
  var arrL = tmpJson.substring(tmpJson.indexOf("list")+6, tmpJson.length-6);
  var listAudio = arrL.substring(0, arrL.length -4);
  var jsonStringArray = listAudio;
  var jsonSTR = JSON.stringify(jsonStringArray);
  var json = JSON.parse(jsonStringArray);
  return json;
  }catch(err){
  return 'error';
  console.log('MY ERR rapse:----------'+ err);  
  }

}
    
}
