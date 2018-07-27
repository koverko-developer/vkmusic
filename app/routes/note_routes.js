var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var needle = require('needle');

module.exports = function(app, cookie,iconv, request, querystring) {
  
  app.get('/', (req, res) => {
   
    res.send('hello');
    });


  app.get('/audio/:id', (req, res) => {
    const id = req.params.id;
    //res.send('dasdad');

    getAudio(res, req, id, cookie);
    //sendP(request,id);
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
          console.log(body);
          parse(body, res);
        }else {
          console.log('MY ERR:----------'+error);
          res.send('err')
        }

      });
  });

  app.post('/audioSpecial', (req, res) => {
    const id = req.body.id;
    const cookies = req.body.cookies;
    sendP(id, cookies, request, res);

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

  /*axios.post({
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

    });*/
    res.send('helo');
}
function getAudio(res, req, id, cookie){
  try{
    var options = {
        headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
          'cookie' : cookie,'content-type' : 'application/x-www-form-urlencoded','content-type': 'application/x-www-form-urlencoded;charset=windows-1251 '}
      }
    var data = {
      access_hash : '',
      act : 'load_section',
      al : '1',
      offset : '0',
      owner_id : id,
      playlist_id : '-1',
      type: 'playlist'
    }
    var a = needle.post('https://vk.com/al_audio.php', data, options);
    var  resp = '';
    a.on('readable', function() {

      while (data = this.read()) {
        console.log(data.toString());
        resp = resp + data.toString();
      }
    })
    a.on('done', function(err) {
      // if our request had an error, our 'done' event will tell us.
      if (!err) console.log('Great success!');
      var a = parse(resp, res);
      //res.send('done');
    })
  }
  catch(err) {
    console.log('Call the locksmith!')
    res.send('errr')
  }
}

function parse(body, res){
  console.log(body);
  console.log('parse');
  try{
  let res1 = body;
  var fs = require('fs');
  let tmpJson = res1.substring(res1.indexOf("gridCovers") + 7, res1.indexOf("hasMore") +8);
  //console.log(tmpJson);
  console.log('list= ' + tmpJson.indexOf("list"));
  console.log('hasMore= ' + tmpJson.indexOf("hasMore"));
  let arrL = tmpJson.substring(tmpJson.indexOf("list")+6, tmpJson.length-6);

  let listAudio = arrL.substring(0, arrL.length -4);
  fs.writeFile("/home/mobi-app/development/node/vk/test.txt", listAudio, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  });
  //let jsonStringArray = iconv.decode(listAudio,'win1251');
  //let jsonSTR = JSON.stringify(jsonStringArray);
  let json = JSON.parse(listAudio);
  res.send(json)
  }catch(err){
  console.log('MY ERR rapse:----------');
  res.send(err)
  }

}
