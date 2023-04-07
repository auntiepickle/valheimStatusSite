var url = "./"
var currentStatus = undefined;
const HTMLTAGS = {
    SERVERSTATUS: "ServerStatus",
    SERVERNAME: "ServerName",
    PLAYERSONLINE: "PlayersOnline",
    PLAYERSCONTAINER: "PlayersContainer",
    STATUSDUMP: "dumpStatus"
}


Object.extend(Object, {
    deepEquals: function(o1, o2) {
      var k1 = Object.keys(o1).sort();
      var k2 = Object.keys(o2).sort();
      if (k1.length != k2.length) return false;
      return k1.zip(k2, function(keyPair) {
        if(typeof o1[keyPair[0]] == typeof o2[keyPair[1]] == "object"){
          return deepEquals(o1[keyPair[0]], o2[keyPair[1]])
        } else {
          return o1[keyPair[0]] == o2[keyPair[1]];
        }
      }).all();
    }
 });


async function getJSONData() {
    fetchUrl = url + "status.json";
    const response = await fetch(fetchUrl);
    const jsonData = await response.json();

    var anObj = JSON.parse(jsonString1);
    var anotherObj= JSON.parse(jsonString2);
    
    if (Object.deepEquals(currentStatus, jsonData))
    {
        currentStatus = jsonData;
        updateHTMLStatus();
    }
  }

  async function init(){
   await getJSONData();
   updateHTMLStatus();
  }

function updateHTMLStatus(){
    console.log(currentStatus);
    elementbyIdUpdate(HTMLTAGS.STATUSDUMP, JSON.stringify(currentStatus)); 
    elementbyIdUpdate(HTMLTAGS.SERVERNAME, currentStatus.server_name);
    elementbyIdUpdate(HTMLTAGS.PLAYERSONLINE, "<span class='tag'>Players online: </span>"  + currentStatus.player_count);
    //elementbyIdUpdate(STATUSDUMP, currentStatus);
}

function elementbyIdUpdate(el, html){
    document.getElementById(el).innerHTML = html;
}

init();