let jacobs = 0;

let factoryBuilt = false;
let factoryJacobs = 0;
let factoryJacobRate = 0.05;

let schoolBuilt = false;
let schoolJacobs = 0;

let prevUpdateTime = Date.now();

setInterval(updateCounters, 10);
setInterval(saveGame, 60000)

function loadGame(){
  if(localStorage.getItem("gameSave") != null){
    let savedValues = JSON.parse(localStorage.getItem("gameSave"));
    jacobs = parseFloat(savedValues.jacobs);
    
    factoryBuilt = savedValues.factoryBuilt;
    if(factoryBuilt){
      document.getElementById("factory_div").style.display='inline';
      document.getElementById("showFactoryBtn").style.display='none';
    }
    factoryJacobs = parseFloat(savedValues.factoryJacobs);
    factoryJacobRate = parseFloat(savedValues.factoryJacobRate);
    
    schoolBuilt = savedValues.schoolBuilt;
    if(schoolBuilt){
      document.getElementById("school_div").style.display='inline';
      document.getElementById("showSchoolBtn").style.display='none';
    }
    schoolJacobs = parseFloat(savedValues.schoolJacobs);
  }
  else{
    saveGame();
  }
}

function saveGame(){
  let gameSave = {
    jacobs: jacobs,
    
    factoryBuilt: factoryBuilt,
    factoryJacobs: factoryJacobs,
    factoryJacobRate: factoryJacobRate,
    
    schoolBuilt: schoolBuilt,
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

function showFactory(){
  if(parseInt(jacobs) >= 50){
    document.getElementById("factory_div").style.display='inline';
    jacobs -= 50;
    document.getElementById("showFactoryBtn").style.display='none';
    factoryBuilt = true;
  }
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

function showSchool(){
  if(parseInt(jacobs) >= 100){
    document.getElementById("school_div").style.display='inline';
    jacobs -= 100;
    document.getElementById("showSchoolBtn").style.display='none';
    schoolBuilt = true;
  }}
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