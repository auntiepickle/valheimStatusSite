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
    
    if (!_.isEqual(currentStatus, jsonData))
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