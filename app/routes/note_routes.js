var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var cookie = "remixlang=0; remixstid=174780143_8f08d9b6cecc032d5b; remixflash=0.0.0; remixscreen_depth=24; remixdt=0; remixttpid=da52df1d140a2a76ab14e8be1b9adea7d54a1e6835; remixmdevice=1366/768/1/!!-!!!!; remixgp=55e4345b0f6326e4e5d01b97afeffe5c; remixseenads=0; remixrefkey=d1fb7610a21ed037de; remixsid=9b8c6fe71fe2345400123a0b9b6adf2e1cb12f7e4e844a6cf1ffe; tmr_detect=0%7C1524492713021";
var request = require('request');
//const Nightmare = require('nightmare')
//const puppeteer = require('puppeteer');
//var cookie = require('cookie-parse');
module.exports = function(app, cookie,iconv, request, querystring) {

  app.get('/audio/:id', (req, res) => {
    const id = req.params.id;
    var a = sendP(request,id);
    });

  app.get('/audio/:id/:offset/', (req, res) => {

    const id = req.params.id;
    const offset = req.params.offset;
    request.post({
        headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
        'cookie' : cookie,'content-type' : 'application/x-www-form-urlencoded','content-type': 'application/x-www-form-urlencoded;charset=windows-1251 '},
         url:     'https://vk.com/al_audio.php',
        form: "access_hash=&act=load_section&al=1&limit=30&offset="+offset+"&owner_id="+id+"&playlist_id=-1&type=playlist",
      }, function(error, response, body){
        if(!error){
          //res.send(body)
          parse(body, res);
        }else {
          console.log('MY ERR:----------'+error);
          res.send('err')
        }

      });
  });

  app.get('/audioSpecial/:id', (req, res) => {
    const id = req.params.id;
    sendP(id, cookie, request, res)
      .then(data => {
      console.log(data)
      return "done"
    })
    //  .then((res) => console.log(res+'ETO RESSSS'))
    //  .catch((err) => console.log(err))
    // res.send('');
    // request.post({
    //     headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
    //     'cookie' : cookie,'content-type' : 'application/x-www-form-urlencoded','content-type': 'application/x-www-form-urlencoded;charset=windows-1251 '},
    //     url:     'https://vk.com/al_audio.php?',
    //     form: "access_hash=&act=load_section&al=1&claim=0&owner_id="+id+"&playlist_id=recomsPUkLGlpXADkvD0tMBBhJFicMDClBTRsDZFFLFVRACgopDEsL&type=recoms",
    //   }, function(error, response, body){
    //     if(!error){
    //       //res.send(body)
    //       console.log('BODY:----------'+body)
    //       parse(body, res);
    //     }else {
    //       console.log('MY ERR:----------');
    //       res.send(error)
    //     }
    //   });
  });

  app.get('/audioNews/:id', (req, res) => {
    const id = req.params.id;
    request.post({
        headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
        'cookie' : cookie,'content-type' : 'application/x-www-form-urlencoded','content-type': 'application/x-www-form-urlencoded;charset=windows-1251 '},
        url:     'https://vk.com/al_audio.php?',
        form: "access_hash=&act=load_section&al=1&claim=0&owner_id="+id+"&playlist_id=recomsPUkLGlpXADkvD0tMBABHRDYKDhNqQBIWI0lTVFZVHwcqBA5USA&type=recoms",
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

  app.get('/audioPopular/:id', (req, res) => {
    const id = req.params.id;
    request.post({
        headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
        'cookie' : cookie,'content-type' : 'application/x-www-form-urlencoded','content-type': 'application/x-www-form-urlencoded;charset=windows-1251 '},
        url:     'https://vk.com/al_audio.php?',
        form: "act=recoms_blocks&al=1",
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

  app.get('/audioGroup/:id/', (req, res) => {
    const id = req.params.id;
    request.post({
        headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
        'cookie' : cookie,'content-type' : 'application/x-www-form-urlencoded','content-type': 'application/x-www-form-urlencoded;charset=windows-1251 '},
        url:     'https://vk.com/al_wall.php?',
        form: "access_hash=&act=get_wall&al=1&owner_id="+id+"&type=own&offset=0&wall_start_from=0",
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

  app.get('/vk', (req, res) =>{
      var a = sendP(id, cookie);
      res.send(a);
    });
}
async function sendP(id,cookie, request, res){
  request.post({
      headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
      'cookie' : cookie,'content-type' : 'application/x-www-form-urlencoded','content-type': 'application/x-www-form-urlencoded;charset=windows-1251 '},
       url:     'https://vk.com/al_audio.php',
      form: "access_hash=&act=load_section&al=1&offset=0&owner_id="+id+"&playlist_id=-1&type=playlist",
    }, function(error, response, body){
      if(!error){
       // console.log(body);
        
        var a = parse(body, response);
        body = a;
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
