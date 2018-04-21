var cheerio = require('cheerio');
var iconv = require('iconv-lite');


module.exports = function(app, cookie,iconv, request, querystring, nightmare) {

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
    
        var options = {
          url: 'https://i.instagram.com/api/v1/feed/user/1769917485',
          headers: {
            'X-IG-Connection-Type':'WIFI',
                  'X-IG-Capabilities':'3Q4=',
                 'Accept-Language':'en-US',
                'User-Agen':'Instagram 9.3.0 Android (22/5.1; 480dpi; 1080x1776; LG; Google Nexus 5 - 5.1.0 - API 22 - 1080x1920; armani; qcom; en_US)',
                 'Accept-Encoding':'deflate, sdch',
                'cookie','shbid=13534; csrftoken=lrycqR1uFrOtuOgzEazENL5ZUyo94kBw; ds_user_id=5972326347; rur=FRC; mid=Wtrf4gAEAAGwfloHOY6jJW6_6JhW; mcd=3; ig_vw=1301; ig_pr=1; ig_vh=678; fbm_124024574287414=base_domain=.instagram.com; ig_or=landscape-primary; sessionid=IGSCd613efefbafb5ac9093affe9ff4e5882343195ded2f02b30e8ae26de61872318%3AcUuIO6Vw3uMnlxMH4embo0ynGv9qAGIs%3A%7B%22_auth_user_id%22%3A5972326347%2C%22_auth_user_backend%22%3A%22accounts.backends.CaseInsensitiveModelBackend%22%2C%22_auth_user_hash%22%3A%22%22%2C%22_platform%22%3A4%2C%22_token_ver%22%3A2%2C%22_token%22%3A%225972326347%3ANZRePe3HSIdV0Y76auVielmr9FGmtbZE%3A7c7b97c7747088daa1b7e25cf3cb43724bbc5962a6865a9c9262127edd4601a8%22%2C%22last_refreshed%22%3A1524306638.4598226547%7D; urlgen="{\"time\": 1524293602\054 \"159.65.152.59\": 14061\054 \"93.84.107.237\": 6697}:1f9zda:sCpDEG4RZ7Y7MeJzJtXbTMpwJqA"; fbsr_124024574287414=pi1vvA7shZbemjp54VPVyRmq92bSfMcQGpbjRVJV3r8.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUNRSWlxOGNJcXRNRG5JU1hha0xmZXI3QnZRS09FQXRCQ214ZnBsM1RSZklCVmNwMVZteEpLZlR0R3VERFNMNENMYzZBa0dTNVhJU2xZZ29WV2s4bl9CS2x4MHJqeExjaUhkbXphMzFBazhLZ0x4QkphaEhUT3NBVzNGVE5CQlZmbEthLTZrVEdRTktDWlY1U214NVVNT2RBcy1aSmhpS25xMXA3Ylc5dkxYdXNjOFYtQVh1NFI0em9zeGlZSDNhdkJPU3ZqSTFLRDRwNHQ1VWZfRU9BN0dOQ0NHU2huVEpDZXBldXRzSUo4M0pCZXBwQXZHM2plMUJkenVxdkdxY1VVcElfdmtKVnRPUkt0c2VWNm9XWlFpRUczdlMxeUp0enM3M3dEaDFkcDJ5YlM5UGExYUlRRkJYQVJKb2xaZE9VOWxReHFPQmZBUDhoTmJxeTVSQldoaiIsImlzc3VlZF9hdCI6MTUyNDM0NTQ0NywidXNlcl9pZCI6IjEwMDAxMzY1NTczNDY0OSJ9'
          }
        };
 
        function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info.stargazers_count + " Stars");
            console.log(info.forks_count + " Forks");
          }
        }
 
        request(options, callback);
    
    
//     request.post({
//         headers: {'X-IG-Connection-Type':'WIFI',
//                  'X-IG-Capabilities':'3Q4=',
//                  'Accept-Language':'en-US',
//                  'User-Agen':'Instagram 9.3.0 Android (22/5.1; 480dpi; 1080x1776; LG; Google Nexus 5 - 5.1.0 - API 22 - 1080x1920; armani; qcom; en_US)',
//                  'Accept-Encoding':'deflate, sdch',
//                  'cookie','shbid=13534; csrftoken=lrycqR1uFrOtuOgzEazENL5ZUyo94kBw; ds_user_id=5972326347; rur=FRC; mid=Wtrf4gAEAAGwfloHOY6jJW6_6JhW; mcd=3; ig_vw=1301; ig_pr=1; ig_vh=678; fbm_124024574287414=base_domain=.instagram.com; ig_or=landscape-primary; sessionid=IGSCd613efefbafb5ac9093affe9ff4e5882343195ded2f02b30e8ae26de61872318%3AcUuIO6Vw3uMnlxMH4embo0ynGv9qAGIs%3A%7B%22_auth_user_id%22%3A5972326347%2C%22_auth_user_backend%22%3A%22accounts.backends.CaseInsensitiveModelBackend%22%2C%22_auth_user_hash%22%3A%22%22%2C%22_platform%22%3A4%2C%22_token_ver%22%3A2%2C%22_token%22%3A%225972326347%3ANZRePe3HSIdV0Y76auVielmr9FGmtbZE%3A7c7b97c7747088daa1b7e25cf3cb43724bbc5962a6865a9c9262127edd4601a8%22%2C%22last_refreshed%22%3A1524306638.4598226547%7D; urlgen="{\"time\": 1524293602\054 \"159.65.152.59\": 14061\054 \"93.84.107.237\": 6697}:1f9zda:sCpDEG4RZ7Y7MeJzJtXbTMpwJqA"; fbsr_124024574287414=pi1vvA7shZbemjp54VPVyRmq92bSfMcQGpbjRVJV3r8.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUNRSWlxOGNJcXRNRG5JU1hha0xmZXI3QnZRS09FQXRCQ214ZnBsM1RSZklCVmNwMVZteEpLZlR0R3VERFNMNENMYzZBa0dTNVhJU2xZZ29WV2s4bl9CS2x4MHJqeExjaUhkbXphMzFBazhLZ0x4QkphaEhUT3NBVzNGVE5CQlZmbEthLTZrVEdRTktDWlY1U214NVVNT2RBcy1aSmhpS25xMXA3Ylc5dkxYdXNjOFYtQVh1NFI0em9zeGlZSDNhdkJPU3ZqSTFLRDRwNHQ1VWZfRU9BN0dOQ0NHU2huVEpDZXBldXRzSUo4M0pCZXBwQXZHM2plMUJkenVxdkdxY1VVcElfdmtKVnRPUkt0c2VWNm9XWlFpRUczdlMxeUp0enM3M3dEaDFkcDJ5YlM5UGExYUlRRkJYQVJKb2xaZE9VOWxReHFPQmZBUDhoTmJxeTVSQldoaiIsImlzc3VlZF9hdCI6MTUyNDM0NTQ0NywidXNlcl9pZCI6IjEwMDAxMzY1NTczNDY0OSJ9',
//         url:     'https://i.instagram.com/api/v1/feed/user/1769917485'
//         }, function(error, response, body){
//         if(!error){
//           //res.send(body)
//           console.log('BODY:----------'+body);
//           //res.send(JSON.stringify(response.body));
//           //parse(body, res);
//         }else {
//           console.log('MY ERR:----------');
//           //res.send(error)
//         }
        
//         res.send(body);
//       });
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
