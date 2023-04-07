var url = "./"
var currentStatus = undefined;

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
    document.getElementById("dumpStatus").innerHTML = JSON.stringify(currentStatus);    
    console.log(currentStatus);
}

init();