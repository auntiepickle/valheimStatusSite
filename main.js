var url = "./"
var currentStatus = undefined;

async function getJSONData() {
    fetchUrl = url + "status.json";
    const response = await fetch(fetchUrl);
    const jsonData = await response.json();
    currentStatus = jsonData;
  }

  async function init(){
   await getJSONData().then(function(data){
    document.getElementById("dumpStatus").innerHTML = JSON.stringify(data);    
    console.log(data);
   });
  }

init();