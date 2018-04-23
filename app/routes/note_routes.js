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
    sendP(id, cookie, request, res);
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
        var a = parse(body, response);
        res.send(a);
      }else {
        console.log('MY ERR:----------'+error);
        var a = 'error';
        res.send('error')
      }

    });


}
// async function setCookie1() {
//   var cookieStr = 'remixlang=0;'+
//   'remixstid=174780143_8f08d9b6cecc032d5b; '+
//   'remixflash=0.0.0; '+
//   'remixscreen_depth=24; '+
//   'remixdt=0; '+
//   'remixttpid=da52df1d140a2a76ab14e8be1b9adea7d54a1e6835; '+
//   'remixmdevice=1366/768/1/!!-!!!!; '+
//   'remixgp=55e4345b0f6326e4e5d01b97afeffe5c; '+
//   'remixseenads=0; '+
//   'emixrefkey=d1fb7610a21ed037de; '+
//   'remixcurr_audio=2000122525_456241900; '+
//   'remixsid=098b8206cf513eacb80a9190610f75dc30212bab20b6d90d36885; '+
//   'tmr_detect=0%7C1524412659798; '+
//   'remixsts=%7B%22data%22%3A%5B%5B1524414022%2C%22time_spent%22%2C%7B%22search%22%3A%7B%22full%22%3A9003%2C%22last%22%3A1524414020824%2C%22options%22%3A%7B%7D%7D%7D%5D%5D%2C%22uniqueId%22%3A357649281%7D';
//         if(cookieStr != "") {
//             let cookiesArr = cookieStr.split(';');
//             cookiesArr = cookiesArr.map( e => {
//                 let obj = {
//                   name : e.split("=")[0],
//                   value : e.split("=")[1]
//                 };
//                 console.log('-----------------------------------------------');
//                 return {
//                     name: e.split("=")[0],
//                     value: e.split("=")[1],
//                     path: '/',
//                     //expires: 0,
//                     domain : 'vk.com'
//                 };
//             });
//             console.log(cookiesArr);
//             return cookiesArr;
//         }
// }
//
// function nn() {
//     (async () => {
//       try{
//         const browser = await puppeteer.launch();
//         var page = await browser.newPage();
//         var cc = await setCookie1();
//         await page.setCookie(...cc);
//         await page.goto('https://vk.com');
//         await browser.close();
//       }
//       catch(err){
//         console.log(err);
//       }
//
//     })();
// }
//
// function pep(){
//   (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   var cookies = {
//     'remixlang'  : '0',
//     'remixstid'  : '174780143_8f08d9b6cecc032d5b',
//     'remixflash'  : '0.0.0',
//     'remixscreen_depth'  : '24',
//     'remixdt'  : '0',
//     'remixttpid'  : 'da52df1d140a2a76ab14e8be1b9adea7d54a1e6835',
//     'remixmdevice'  : '1366/768/1/!!-!!!!',
//     'remixgp'  : '55e4345b0f6326e4e5d01b97afeffe5c',
//     'remixseenads'  : '0',
//     'emixrefkey'  : 'd1fb7610a21ed037de',
//     'remixcurr_audio'  : '2000122525_456241900',
//     'remixsid'  : '098b8206cf513eacb80a9190610f75dc30212bab20b6d90d36885',
//     'tmr_detect'  : '0%7C1524412659798',
//     'remixsts'  : '%7B%22data%22%3A%5B%5B1524414022%2C%22time_spent%22%2C%7B%22search%22%3A%7B%22full%22%3A9003%2C%22last%22%3A1524414020824%2C%22options%22%3A%7B%7D%7D%7D%5D%5D%2C%22uniqueId%22%3A357649281%7D'
//
//   };
//   await page.setCookie(...cookies);
//   await page.goto('https://vk.com');
//   expect(await page.cookies()).toEqual(cookies);
//   // Get the "viewport" of the page, as reported by the page.
//   const dimensions = await page.evaluate(() => {
//     return {
//       width: document.body.clientWidth,
//       height: document.documentElement.clientHeight,
//       deviceScaleFactor: window.devicePixelRatio
//     };
//   });
//
//   console.log('Dimensions:', dimensions);
//
//   await browser.close();
// })();
// }
//
// function ni(){
//   (async ()=>{
//   let nightmare;
//   try {
//   	nightmare = Nightmare({ show: true });
//   	await nightmare
//             .goto('http://vk-music.download/')
//             .cookies.set({
//             remixlang  : '0',
//             remixstid  : '174780143_8f08d9b6cecc032d5b',
//             remixflash  : '0.0.0',
//             remixscreen_depth  : '24',
//             remixdt  : '0',
//             remixttpid  : 'da52df1d140a2a76ab14e8be1b9adea7d54a1e6835',
//             remixmdevice  : '1366/768/1/!!-!!!!',
//             remixgp  : '55e4345b0f6326e4e5d01b97afeffe5c',
//             remixseenads  : '0',
//             emixrefkey  : 'd1fb7610a21ed037de',
//             remixcurr_audio  : '2000122525_456241900',
//             remixsid  : '098b8206cf513eacb80a9190610f75dc30212bab20b6d90d36885',
//             tmr_detect  : '0%7C1524412659798',
//             remixsts  : '%7B%22data%22%3A%5B%5B1524414022%2C%22time_spent%22%2C%7B%22search%22%3A%7B%22full%22%3A9003%2C%22last%22%3A1524414020824%2C%22options%22%3A%7B%7D%7D%7D%5D%5D%2C%22uniqueId%22%3A357649281%7D'
//               })
//             .wait()
//             .goto('http://vk-music.download/')
//             .wait(10000)
//                 console.log('in vk');
//               } catch (error) {
//               	console.error(error);
//               	throw error;
//               } finally {
//               	await nightmare.end();
//                 console.log('end');
//               }
//
//               var nightmare2 = Nightmare({show: true})
//
//
//               })();
// }

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
  console.log('MY ERR rapse:----------');
  //res.send(err)
  }

}
