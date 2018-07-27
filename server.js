const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
var querystring = require('querystring');
var https = require('https');
var iconv = require('iconv-lite');
var request = require('request');
var iter = 0;
var my_id = parseInt("185645054");

var cookie = "remixlang=0; remixstid=174780143_8f08d9b6cecc032d5b; remixflash=0.0.0; remixscreen_depth=24; remixdt=0; remixttpid=da52df1d140a2a76ab14e8be1b9adea7d54a1e6835; remixmdevice=1366/768/1/!!-!!!!; remixseenads=0; remixrefkey=d1fb7610a21ed037de; remixgp=55e4345b0f6326e4e5d01b97afeffe5c; remixsid=ae802088f9843990d5fe6e06cabe92f94dfedfd9884f7ec723be4; tmr_detect=0%7C1524664286097; remixcurr_audio=2000386058_456240006";

var options = {
  url: 'https://vk.com/al_audio.php?__query=audios185645054&_ref=left_nav&_tstat=274%2C0%2C43%2C322%2Cgroups_list&al=-1&al_id=185645054&_rndVer=63236',
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
    'cookie' : cookie,
  }
};

const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app, cookie,iconv, request, querystring);
app.listen(port, () => {
  console.log('We are live on ' + port);
});
