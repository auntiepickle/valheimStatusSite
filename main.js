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
        //console.log('new data pulled... updating')
        currentStatus = jsonData;
        updateHTMLStatus();
    }
  }

  async function init(){
   createCollapsible();
   //await getJSONData();
   beginFetchLoop();
  }

function updateHTMLStatus(){
    //console.log(currentStatus);    
    if(currentStatus.error != null){             //server offline  
        elementbyIdUpdate(HTMLTAGS.SERVERSTATUS, '<span class="offline">Server Offline</span>'); 
    }
    else{            
        elementbyIdUpdate(HTMLTAGS.SERVERSTATUS, '<span class="online">Online</span>');
        elementbyIdUpdate(HTMLTAGS.STATUSDUMP, JSON.stringify(currentStatus)); 
        elementbyIdUpdate(HTMLTAGS.SERVERNAME, currentStatus.server_name);
        elementbyIdUpdate(HTMLTAGS.PLAYERSONLINE, "<span class='tag'>Players online: </span>"  + currentStatus.player_count);
    }
}

function elementbyIdUpdate(el, html){
    document.getElementById(el).innerHTML = html;
}

function beginFetchLoop(){
    setInterval(getJSONData, 2000);
}

function createCollapsible(){
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
    });
    }
}

init();