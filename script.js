let jacobs = 0;
let factoryJacobs = 0;
let factoryJacobRate = 0.05;
let schoolJacobs = 0;

let prevUpdateTime = Date.now();

setInterval(updateCounters, 10);
setInterval(saveGame, 60000)

function loadGame(){
  if(localStorage.getItem("gameSave") != null){
    let savedValues = JSON.parse(localStorage.getItem("gameSave"));
    jacobs = parseFloat(savedValues.jacobs);
    factoryJacobs = savedValues.factoryJacobs;
    factoryJacobRate = savedValues.factoryJacobRate;
    schoolJacobs = savedValues.schoolJacobs;
  }
  else{
    saveGame();
  }
}

function saveGame(){
  let gameSave = {
    jacobs: jacobs,
    factoryJacobs: factoryJacobs,
    factoryJacobRate: factoryJacobRate,
    schoolJacobs: schoolJacobs
  }
  localStorage.setItem("gameSave",JSON.stringify(gameSave));
}

function reloadCounters() {
  document.getElementById("jacob_counter").innerHTML = parseInt(jacobs);
    
  document.getElementById("factory_jacob_counter").innerHTML = parseInt(factoryJacobs);
    document.getElementById("factory_jacob_rate").innerHTML = factoryJacobRate;
    document.getElementById("factory_jacob_rate_counter").innerHTML = (factoryJacobRate * factoryJacobs).toFixed(2);
    
  document.getElementById("school_jacob_counter").innerHTML = parseInt(schoolJacobs);
}
function constructJacob() {
  jacobs++;
  reloadCounters();
}
function sendJacobToFactory() {
  if (jacobs >= 1) {
    jacobs--;
    factoryJacobs++;
    reloadCounters();
  }
}
function removeJacobFromFactory() {
  if (factoryJacobs >= 1) {
    factoryJacobs--;
    jacobs++;
    reloadCounters();
  }
}
function sendJacobToSchool() {
  if (jacobs >= 1) {
    jacobs--;
    schoolJacobs++;
    reloadCounters();
  }
}
function removeJacobFromSchool() {
  if (schoolJacobs >= 1) {
    schoolJacobs--;
    jacobs++;
    reloadCounters();
  }
}
function updateCounters() {
	let jacobDiff = 0;
	jacobDiff += factoryJacobs * factoryJacobRate;
	
	let curTime = Date.now();
	jacobDiff *= (curTime - prevUpdateTime) / 1000;
	prevUpdateTime = curTime;
  	jacobs += jacobDiff;
 	reloadCounters();
}

//    var loadGame = JSON.parse(localStorage.getItem("saveGame"));