var url = "./"
var currentStatus = undefined;
const HTMLTAGS = {
    SERVERSTATUS: "ServerStatus",
    SERVERNAME: "ServerName",
    PLAYERSONLINE: "PlayersOnline",
    PLAYERSCONTAINER: "PlayersContainer",
    STATUSDUMP: "dumpStatus"
}

async function getJSONData() {
    fetchUrl = url + "status.json";
    const response = await fetch(fetchUrl);
    const jsonData = await response.json();
    currentStatus = jsonData;
  }

  async function init(){
   await getJSONData();
   updateHTMLStatus();
  }

function updateHTMLStatus(){
    console.log(currentStatus);
    elementbyIdUpdate(HTMLTAGS.STATUSDUMP, currentStatus); 
    elementbyIdUpdate(HTMLTAGS.SERVERNAME, currentStatus.server_name);
    elementbyIdUpdate(HTMLTAGS.PLAYERSONLINE, currentStatus.player_count);
    //elementbyIdUpdate(STATUSDUMP, currentStatus);
}

function elementbyIdUpdate(el, html){
    document.getElementById(el).innerHTML = html;
}

init();