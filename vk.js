var querystring = require('querystring');
var https = require('https');
var iconv = require('iconv-lite');

//var my_id = parseInt(readline.question("Enter your ID: "));

//var COOKIE = readline.question("Enter your cookies: ");
var USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';


https.post('https://vk.com/al_audio.php', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
