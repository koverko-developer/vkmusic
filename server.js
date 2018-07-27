const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
var querystring = require('querystring');
var https = require('https');
var iconv = require('iconv-lite');
var request = require('request');
var iter = 0;
var my_id = parseInt("185645054");

var cookie = "remixlang=0; remixstid=174780143_8f08d9b6cecc032d5b; remixflash=0.0.0; remixscreen_depth=24; remixttpid=da52df1d140a2a76ab14e8be1b9adea7d54a1e6835; remixdt=0; remixmdevice=360/640/3/!!!!!!!; remixab=1; remixseenads=0; remixgp=3405b92340246731d102a3dc5c9591bb; remixrefkey=8b40d59b188da295aa; remixcurr_audio=45489437_456239051; remixsid=2434a243c00e5d4e2cb6873ab3017b768972e305e1088025bf57d; tmr_detect=1%7C1532705538916";

var options = {
  url: 'https://vk.com/al_audio.php?__query=audios185645054&_ref=left_nav&_tstat=274%2C0%2C43%2C322%2Cgroups_list&al=-1&al_id=185645054&_rndVer=63236',
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
    'cookie' : cookie,
  }
};

var port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app, cookie,iconv, request, querystring);
app.listen(port, () => {
  console.log('We are live on ' + port);
});
