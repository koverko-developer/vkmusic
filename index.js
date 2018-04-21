const TelegramBot = require('node-telegram-bot-api');
var querystring = require('querystring');
var https = require('https');
var iconv = require('iconv-lite');
var request = require('request');
var iter = 0;
var my_id = parseInt("185645054");

var cookie = "remixlang=0; remixstid=174780143_8f08d9b6cecc032d5b; remixflash=0.0.0; remixscreen_depth=24; remixdt=0; remixttpid=da52df1d140a2a76ab14e8be1b9adea7d54a1e6835; remixmdevice=1366/768/1/!!-!!!!; remixseenads=0; remixrefkey=0fe3acff61937fac01; remixgp=55e4345b0f6326e4e5d01b97afeffe5c; remixsid=89f49a59cb4f90484ab2379001a010b85172656fa67f80c7eb5ca; tmr_detect=0%7C1524068225475; remixsts=%7B%22data%22%3A%5B%5B1524068788%2C%22time_spent%22%2C%7B%22groups_list%22%3A%7B%22full%22%3A9007%2C%22last%22%3A1524068787142%2C%22options%22%3A%7B%7D%7D%7D%5D%5D%2C%22uniqueId%22%3A383029686%7D";

var options = {
  url: 'https://vk.com/al_audio.php?__query=audios185645054&_ref=left_nav&_tstat=274%2C0%2C43%2C322%2Cgroups_list&al=-1&al_id=185645054&_rndVer=63236',
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
    'cookie' : cookie,
  }
};

const token = '574393814:AAF_9ctrwf8kUyNerCoaT-k9m4zSSUiea2k';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, msg => {

});

bot.on('message', (msg) => {
    request(options, callback);
});

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    parse(body);
  }
}

function parse(body){
  let res1 = body;
  let tmpJson = res1.substring(res1.indexOf("gridCovers") + 7, res1.indexOf("hasMore") +8);
  //let jsonStringArray = tmpJson.substring(res1.indexOf("list") + 7, res1.indexOf("hasMore") -3);
  console.log(tmpJson.indexOf("list"));
  console.log(tmpJson.indexOf("hasMore"));
  let arrL = tmpJson.substring(tmpJson.indexOf("list")+7, tmpJson.length-7);
  let listAudio = '{\"response\":'+arrL.substring(0, arrL.length -4)+"}";
  let jsonStringArray = iconv.decode(listAudio,'win1251');
  let jsonSTR = JSON.stringify(listAudio);
  var str = '{ "name": "Вася", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
  let json = JSON.parse(str);
  console.log(jsonStringArray);
}
