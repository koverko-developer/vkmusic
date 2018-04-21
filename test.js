var https = require('https');
var querystring = require('querystring');

var my_id = '185645054';

var COOKIE = 'remixlang=0; remixstid=174780143_8f08d9b6cecc032d5b; remixflash=0.0.0; remixscreen_depth=24; remixdt=0; remixttpid=da52df1d140a2a76ab14e8be1b9adea7d54a1e6835; remixmdevice=1366/768/1/!!-!!!!; remixrefkey=0fe3acff61937fac01; remixgp=55e4345b0f6326e4e5d01b97afeffe5c; remixsid=fe1cf6004fd6b57c37617649c496cc25892a0a891f02353a0b80b; remixseenads=0; tmr_detect=0%7C1524331085549';
var USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';
  
 
// form data
var postData = querystring.stringify({
        'al': 1,
        'act': 'load_section',
        'owner_id': my_id,
        'type': 'playlist',
        'playlist_id': '-1',
        'offset': 0
});
 
// request option
var options = {
         host: 'vk.com',
        scheme: 'https',
        port: '443',
        path: '/al_audio.php',
        method: 'POST',
        accept : '*/*',
        referer : 'https://vk.com/audios185645054?section=recoms',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length,
            'Cookie': COOKIE,
            'user-agent': USER_AGENT
        }
};
 
// request object
var req = https.request(options, function (res) {
  var result = '';
  res.on('data', function (chunk) {
    result += chunk;
  });
  res.on('end', function () {
    console.log(result);
  });
  res.on('error', function (err) {
    console.log(err);
  })
});
 
// req error
req.on('error', function (err) {
  console.log(err);
});
 
//send request witht the postData form
req.write(postData);
req.end();
