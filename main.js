var url = ""

async function getJSONData() {
    fetchUrl = url + "status.json";
    const response = await fetch(fetchUrl);
    const jsonData = await response.json();
    document.getElementById("dumpStatus").innerHTML = JSON.stringify(jsonData)
  }

  async function init(){
    getJSONData();
  }

init();