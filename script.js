let jacobs = 0;

let factoryBuilt = false;
let factoryJacobs = 0;
let factoryRate = 0.05;
let factoryRateLevel = 0;

let schoolBuilt = false;
let schoolJacobs = 0;

let prevUpdateTime = Date.now();

setInterval(tick, 10);	//main loop
setInterval(saveGame, 60000)

function loadGame() {
  resetDisplay();
  if (localStorage.getItem("gameSave") != null) {
    let savedValues = JSON.parse(localStorage.getItem("gameSave"));
    jacobs = parseFloat(savedValues.jacobs);

    factoryBuilt = savedValues.factoryBuilt;
    factoryJacobs = parseFloat(savedValues.factoryJacobs);
    factoryRate = parseFloat(savedValues.factoryRate);
    factoryRateLevel = parseInt(savedValues.factoryRateLevel);

    schoolBuilt = savedValues.schoolBuilt;
    schoolJacobs = parseFloat(savedValues.schoolJacobs);
  }
  else {
    saveGame();
  }
}

function saveGame() {
  let gameSave = {
    jacobs: jacobs,

    factoryBuilt: factoryBuilt,
    factoryJacobs: factoryJacobs,
    factoryRate: factoryRate,
    factoryRateLevel: factoryRateLevel,

    schoolBuilt: schoolBuilt,
    schoolJacobs: schoolJacobs
  }
  localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function resetGame() {
  jacobs = 0;

  factoryBuilt = false;
  factoryJacobs = 0;
  factoryRate = 0.05;
  factoryRateLevel = 0;

  schoolBuilt = false;
  schoolJacobs = 0;
  
  resetDisplay();

  saveGame();
}

function resetDisplay() {
  //RESET UPGRADES DISPLAY
  document.getElementById("upgrade_build_factory").style.display = 'none';
  document.getElementById("upgrade_factory_rate_1").style.display = 'none';
  document.getElementById("upgrade_factory_rate_2").style.display = 'none';
  document.getElementById("upgrade_build_school").style.display = 'none';
  
  //RESET BUILDINGS DISPLAY
  document.getElementById("factory_div").style.display = 'none';
  document.getElementById("school_div").style.display = 'none';
}

//MAIN LOOP
function tick() {
  updateCounters();
  reloadCounters();
  
  //FACTORY
  if (factoryBuilt) {
    document.getElementById("factory_div").style.display = 'inline';
  }
  if (!factoryBuilt && jacobs >= 50) {
    document.getElementById("upgrade_build_factory").style.display = 'block';
  }
  if(factoryBuilt && factoryRateLevel === 0 && jacobs >= 500) {
  	document.getElementById("upgrade_factory_rate_1").style.display = 'block';
  }
  if(factoryBuilt && factoryRateLevel == 1 && jacobs >= 5000){
    document.getElementById("upgrade_factory_rate_2").style.display = 'block';
  }
  
  //SCHOOL
  if (!schoolBuilt && jacobs >= 5000) {
    document.getElementById("upgrade_build_school").style.display = 'block';
  }
  if(schoolBuilt){
  	document.getElementById("school_div").style.display = 'inline';
  }
}

function reloadCounters() {
  document.getElementById("jacob_counter").innerHTML = parseInt(jacobs);

  document.getElementById("factory_jacob_counter").innerHTML = parseInt(factoryJacobs);
  document.getElementById("factory_jacob_rate").innerHTML = factoryRate;
  document.getElementById("factory_jacob_rate_counter").innerHTML = (factoryRate * factoryJacobs).toFixed(2);

  document.getElementById("school_jacob_counter").innerHTML = parseInt(schoolJacobs);
}

function constructJacob() {
  jacobs++;
}

function buildFactory() {
  if (parseInt(jacobs) >= 100) {
    document.getElementById("factory_div").style.display = 'inline';
    jacobs -= 100;
    document.getElementById("upgrade_build_factory").style.display = 'none';
    factoryBuilt = true;
  }
}
function sendJacobToFactory() {
  if (jacobs >= 1) {
    jacobs--;
    factoryJacobs++;
  }
}
function removeJacobFromFactory() {
  if (factoryJacobs >= 1) {
    factoryJacobs--;
    jacobs++;
  }
}
function upgradeFactoryRate1() {
  if(jacobs >= 1000){
  	jacobs -= 1000;
  	factoryRateLevel = 1;
  	factoryRate *= 2;
  	document.getElementById("upgrade_factory_rate_1").style.display = 'none';
  }
}
function upgradeFactoryRate2() {
  if(jacobs >= 10000){
  	jacobs -= 10000;
  	factoryRateLevel = 2;
  	factoryRate *= 2;
  	document.getElementById("upgrade_factory_rate_2").style.display = 'none';
  }
}

function buildSchool() {
  if (parseInt(jacobs) >= 10000) {
    document.getElementById("school_div").style.display = 'inline';
    jacobs -= 10000;
    document.getElementById("upgrade_build_school").style.display = 'none';
    schoolBuilt = true;
  }
}
function sendJacobToSchool() {
  if (jacobs >= 1) {
    jacobs--;
    schoolJacobs++;
  }
}
function removeJacobFromSchool() {
  if (schoolJacobs >= 1) {
    schoolJacobs--;
    jacobs++;
  }
}

function updateCounters() {
  let jacobDiff = 0;
  jacobDiff += factoryJacobs * factoryRate;

  let curTime = Date.now();
  jacobDiff *= (curTime - prevUpdateTime) / 1000;
  prevUpdateTime = curTime;
  jacobs += jacobDiff;
}