var querystring = require('querystring');
var iconv = require('iconv-lite');

var my_id = '185645054';

var COOKIE = 'remixlang=0; remixstid=174780143_8f08d9b6cecc032d5b; remixflash=0.0.0; remixscreen_depth=24; remixdt=0; remixttpid=da52df1d140a2a76ab14e8be1b9adea7d54a1e6835; remixmdevice=1366/768/1/!!-!!!!; remixrefkey=0fe3acff61937fac01; remixgp=55e4345b0f6326e4e5d01b97afeffe5c; remixsid=fe1cf6004fd6b57c37617649c496cc25892a0a891f02353a0b80b; remixseenads=0; tmr_detect=0%7C1524326678826; remixsts=%7B%22data%22%3A%5B%5B1524329584%2C%22time_spent%22%2C%7B%22audio%22%3A%7B%22full%22%3A9001%2C%22last%22%3A1524329582523%2C%22options%22%3A%7B%7D%7D%7D%5D%5D%2C%22uniqueId%22%3A879780241%7D';
var USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';
                                                                                                                                                                                             
const https = require('https');

var options = {
  hostname: 'vk.com',
  port: 443,
  path: '/al_audio.php',
  method: 'POST',
  headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       'cookie': 'remixlang=0; remixstid=174780143_8f08d9b6cecc032d5b; remixflash=0.0.0; remixscreen_depth=24; remixdt=0; remixttpid=da52df1d140a2a76ab14e8be1b9adea7d54a1e6835; remixmdevice=1366/768/1/!!-!!!!; remixrefkey=0fe3acff61937fac01; remixgp=55e4345b0f6326e4e5d01b97afeffe5c; remixsid=fe1cf6004fd6b57c37617649c496cc25892a0a891f02353a0b80b; remixseenads=0; tmr_detect=0%7C1524331085549',
    
     }
};


function audio_api() {
    // Build the post string from an object
  var pd = {
        'al': 1,
        'act': 'load_section',
        'owner_id': my_id,
        'type': 'playlist',
        'playlist_id': '-1',
        'offset': 0
    }

    var post_data = querystring.stringify(
        pd
    );
    console.log(post_data);

    var post_options = {
        host: 'vk.com',
        scheme: 'https',
        port: '443',
        path: '/al_audio.php',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data),
            'Cookie': COOKIE,
            'user-agent': USER_AGENT
        }
    };
    var result = httpsRequest(post_options, post_data);
    return result;
}
function httpsRequest(params, postData) {
    return new Promise(function (resolve, reject) {
        var req = https.request(params, function (res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
                
            });
            // resolve on end
            res.on('end', function () {
                try {
                    body = Buffer.concat(body);
                    console.log(body);
                } catch (e) {
                    reject(e);
                     console.log(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function (err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        // IMPORTANT
        req.end();
    });
}
 
audio_api();
