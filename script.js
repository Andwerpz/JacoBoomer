let jacobs = 0;

let factoryBuilt = false;
let factoryJacobs = 0;
let factoryRate = 0.01;
let factoryRateLevel = 0;

let schoolBuilt = false;
let schoolJacobs = 0;
let schoolCountdown = 0;
let schoolCountdownInterval = 60;

let educatedJacobs = 0;

let engineerJacobsUnlocked = false;
let developerJacobsUnlocked = false;
let architectJacobsUnlocked = false;

let developerJacobs = 0;
let code = 0;
let developerTerminalUnlocked = false;
let developerTerminalBadCommands = new Array("kill", "boo", "kekw", "segfault");
let developerTerminalNeutralCommands = new Array("consoleLog", "print", "invSqrt")
let developerTerminalGoodCommands = new Array("wysi", "bogosort", "sv_cheats");
let developerTerminalCommands = new Array();	//currently drawn commands
let robotOverseersUnlocked = false;
let robotOverseers = 0;

let engineerJacobs = 0;
let patents = 0;

let architectJacobs = 0;
let blueprints = 0;

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

    educatedJacobs = parseFloat(savedValues.educatedJacobs);
    
	developerJacobsUnlocked = savedValues.developerJacobsUnlocked;
    engineerJacobsUnlocked = savedValues.engineerJacobsUnlocked;
    architectJacobsUnlocked = savedValues.architectJacobsUnlocked;
    
	developerJacobs = parseFloat(savedValues.developerJacobs);
	code = parseFloat(savedValues.code);
	developerTerminalUnlocked = savedValues.developerTerminalUnlocked;
	robotOverseersUnlocked = savedValues.robotOverseersUnlocked;
	robotOverseers = parseFloat(savedValues.robotOverseers);
	
    engineerJacobs = parseFloat(savedValues.engineerJacobs);
    patents = parseFloat(savedValues.patents);
    
    architectJacobs = parseFloat(savedValues.architectJacobs);
    blueprints = parseFloat(savedValues.blueprints);
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
    schoolJacobs: schoolJacobs,

    educatedJacobs: educatedJacobs,
    
	developerJacobsUnlocked: developerJacobsUnlocked,
    engineerJacobsUnlocked: engineerJacobsUnlocked,
    architectJacobsUnlocked: architectJacobsUnlocked,

    developerJacobs: developerJacobs,
    code: code,
    developerTerminalUnlocked: developerTerminalUnlocked,
    robotOverseersUnlocked: robotOverseersUnlocked,
    robotOverseers: robotOverseers,
    
    engineerJacobs: engineerJacobs,
    patents: patents,
    
    architectJacobs: architectJacobs,
    blueprints: blueprints
  }
  localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function resetGame() {
  jacobs = 0;

  factoryBuilt = false;
  factoryJacobs = 0;
  factoryRate = 0.01;
  factoryRateLevel = 0;

  schoolBuilt = false;
  schoolJacobs = 0;
  schoolCountdown = 0;
  schoolCountdownInterval = 60;

  educatedJacobs = 0;
  
  developerJacobsUnlocked = 0;
  engineerJacobsUnlocked = 0;
  architectJacobsUnlocked = 0;
  
  developerJacobs = 0;
  code = 0;
  developerTerminalUnlocked = false;
  robotOverseersUnlocked = false;
  robotOverseers = 0;
  
  engineerJacobs = 0;
  patents = 0;
  
  architectJacobs = 0;
  blueprints = 0;

  resetDisplay();

  saveGame();
}

function resetDisplay() {
  //RESET UPGRADES DISPLAY
  document.getElementById("upgrade_build_factory").style.display = 'none';
  document.getElementById("upgrade_factory_rate_1").style.display = 'none';
  document.getElementById("upgrade_factory_rate_2").style.display = 'none';
  document.getElementById("upgrade_factory_rate_3").style.display = 'none';
  document.getElementById("upgrade_build_school").style.display = 'none';
  document.getElementById("upgrade_unlock_developer_jacobs").style.display = 'none';
  document.getElementById("upgrade_unlock_engineer_jacobs").style.display = 'none';
  document.getElementById("upgrade_unlock_architect_jacobs").style.display = 'none';
  document.getElementById("upgrade_unlock_developer_terminal").style.display = 'none';
  document.getElementById("upgrade_unlock_robot_overseers").style.display = 'none';
  
  //RESET BUILDINGS DISPLAY
  document.getElementById("factory_div").style.display = 'none';
  document.getElementById("school_div").style.display = 'none';
  
  document.getElementById("developer_jacob_counter_div").style.display = 'none';
  document.getElementById("developer_jacob_div").style.display = 'none';
  document.getElementById("developer_terminal_div").style.display = 'none';
  document.getElementById("robot_overseer_div").style.display = 'none';
  
  document.getElementById("engineer_jacob_counter_div").style.display = 'none';
  document.getElementById("engineer_jacob_div").style.display = 'none';
  
  document.getElementById("architect_jacob_counter_div").style.display = 'none';
  document.getElementById("architect_jacob_div").style.display = 'none';
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
  if(factoryBuilt && factoryRateLevel === 0 && jacobs >= 110) {
  	document.getElementById("upgrade_factory_rate_1").style.display = 'block';
  }
  if(factoryBuilt && factoryRateLevel == 1 && jacobs >= 250){
    document.getElementById("upgrade_factory_rate_2").style.display = 'block';
  }
  if(factoryBuilt && factoryRateLevel == 2 && jacobs >= 1000){
    document.getElementById("upgrade_factory_rate_3").style.display = 'block';
  }

  //SCHOOL
  if (!schoolBuilt && jacobs >= 2500) {
    document.getElementById("upgrade_build_school").style.display = 'block';
  }
  if(schoolBuilt){
  	document.getElementById("school_div").style.display = 'inline';
  }
  if(schoolBuilt && !developerJacobsUnlocked){
  	document.getElementById("upgrade_unlock_developer_jacobs").style.display = 'block';
  }
  if(schoolBuilt && !engineerJacobsUnlocked && code >= 10000){
  	document.getElementById("upgrade_unlock_engineer_jacobs").style.display = 'block';
  }
  if(schoolBuilt && !architectJacobsUnlocked && patents >= 3000){
  	document.getElementById("upgrade_unlock_architect_jacobs").style.display = 'block';
  }
  
  //DEVELOPER JACOBS
  if(developerJacobsUnlocked){
  	document.getElementById("developer_jacob_counter_div").style.display = 'inline';
  	document.getElementById("developer_jacob_div").style.display = 'inline';
  }
  if(developerTerminalUnlocked){
  	document.getElementById("developer_terminal_div").style.display = 'inline';
  	if(Math.random() <= 0.02){
  	  useDeveloperTerminal();
  	}
  	drawDeveloperTerminal();
  }
  if(robotOverseersUnlocked){
  	document.getElementById("robot_overseer_div").style.display = 'inline';
  }
  if(developerJacobsUnlocked && code >= 100 && !developerTerminalUnlocked){
  	document.getElementById("upgrade_unlock_developer_terminal").style.display = 'block';
  }
  if(developerJacobsUnlocked && code >= 1100 && !robotOverseersUnlocked){
  	document.getElementById("upgrade_unlock_robot_overseers").style.display = 'block';
  }
  
  //ENGINEER JACOBS
  if(engineerJacobsUnlocked){
    document.getElementById("engineer_jacob_counter_div").style.display = 'inline';
    document.getElementById("engineer_jacob_div").style.display = 'inline';
  }
  
  //ARCHITECT JACOBS
  if(architectJacobsUnlocked){
  	document.getElementById("architect_jacob_counter_div").style.display = 'inline';
  	document.getElementById("architect_jacob_div").style.display = 'inline';
  }
}

function reloadCounters() {
  document.getElementById("jacob_counter").innerHTML = parseInt(jacobs);

  document.getElementById("factory_jacob_counter").innerHTML = parseInt(factoryJacobs);
  document.getElementById("factory_jacob_rate").innerHTML = (factoryRate).toFixed(2);
  document.getElementById("factory_jacob_rate_counter").innerHTML = (factoryRate * factoryJacobs).toFixed(2);

  document.getElementById("school_jacob_counter").innerHTML = parseInt(schoolJacobs);
  document.getElementById("school_countdown").innerHTML = parseInt(schoolCountdown);

  document.getElementById("educated_jacob_counter").innerHTML = parseInt(educatedJacobs);
  
  document.getElementById("developer_jacob_counter").innerHTML = parseInt(developerJacobs);
  document.getElementById("code_counter").innerHTML = parseInt(code);
  document.getElementById("robot_overseer_counter").innerHTML = parseInt(robotOverseers);
  document.getElementById("robot_overseer_cost_counter").innerHTML = parseInt(calculateRobotOverseerCost());
  
  document.getElementById("engineer_jacob_counter").innerHTML = parseInt(engineerJacobs);
  document.getElementById("patent_counter").innerHTML = parseInt(patents);
  
  document.getElementById("architect_jacob_counter").innerHTML = parseInt(architectJacobs);
  document.getElementById("blueprint_counter").innerHTML = parseInt(blueprints);
}

function constructJacob() {
  jacobs++;
}

function upgradeBuildFactory() {
  if (jacobs >= 100) {
    jacobs -= 100;
    document.getElementById("upgrade_build_factory").style.display = 'none';
    factoryBuilt = true;
  }
}
function purchaseFactoryJacob() {
  if (jacobs >= 1) {
    jacobs -= 1;
    factoryJacobs += 1;
  }
}
function upgradeFactoryRate1() {
  if(jacobs >= 200){
  	jacobs -= 200;
  	factoryRateLevel = 1;
  	factoryRate *= 2;
  	document.getElementById("upgrade_factory_rate_1").style.display = 'none';
  }
}
function upgradeFactoryRate2() {
  if(jacobs >= 500){
  	jacobs -= 500;
  	factoryRateLevel = 2;
  	factoryRate *= 2;
  	document.getElementById("upgrade_factory_rate_2").style.display = 'none';
  }
}
function upgradeFactoryRate3() {
  if(jacobs >= 2000){
  	jacobs -= 2000;
  	factoryRateLevel = 3;
  	factoryRate *= 3;
  	document.getElementById("upgrade_factory_rate_3").style.display = 'none';
  }
}

function upgradeBuildSchool() {
  if (jacobs >= 5000) {
    jacobs -= 5000;
    document.getElementById("upgrade_build_school").style.display = 'none';

    schoolCountdown = schoolCountdownInterval;

    schoolBuilt = true;
  }
}
function sendJacobToSchool() {
  if (jacobs >= 1) {
    jacobs--;
    schoolJacobs++;
  }
}
function purchaseEngineerJacob() {
  if(educatedJacobs >= 1){
  	educatedJacobs --;
  	engineerJacobs ++;
  }
}
function purchaseDeveloperJacob() {
  if(educatedJacobs >= 1){
  	educatedJacobs --;
  	developerJacobs ++;
  }
}
function purchaseArchitectJacob() {
  if(educatedJacobs >= 1){
  	educatedJacobs --;
  	architectJacobs ++;
  }
}

function upgradeUnlockDeveloperJacobs() {
  if(educatedJacobs >= 1){
  	educatedJacobs -= 1;
  	developerJacobsUnlocked = true;
  	document.getElementById("upgrade_unlock_developer_jacobs").style.display = 'none';
  }
}
function upgradeUnlockEngineerJacobs() {
  if(code >= 50000){
  	code -= 50000;
  	engineerJacobsUnlocked = true;
  	document.getElementById("upgrade_unlock_engineer_jacobs").style.display = 'none';
  }
}
function upgradeUnlockArchitectJacobs() {
  if(patents >= 20000){
  	patents -= 20000;
  	architectJacobsUnlocked = true;
  	document.getElementById("upgrade_unlock_architect_jacobs").style.display = 'none';
  }
}

function upgradeUnlockDeveloperTerminal() {
  if(code >= 1000){
  	code -= 1000;
  	developerTerminalUnlocked = true;
  	document.getElementById("upgrade_unlock_developer_terminal").style.display = 'none';
  }
}
function drawDeveloperTerminal() {
  var c = document.getElementById("developer_terminal_canvas");
  var ctx = c.getContext("2d");
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  
  //REFRESH CANVAS
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  
  //CURSOR
  ctx.fillStyle = 'white';
  if(parseInt(Date.now() / 500) % 2 == 0){
    ctx.fillRect(10, height - 13, 7, 2);
  }
  
  //COMMANDS
  var fontSize = 12;
  var lineGap = 3;
  var font = fontSize + "px Arial";
  ctx.font = font;

  for(var i = 0; i < developerTerminalCommands.length; i++){
  	var x = 10;
  	var y = height - 13 - (i + 1) * (fontSize + lineGap);
  	var text = developerTerminalCommands[i] + "()";
  	ctx.fillStyle = 'white';
  	if(developerTerminalBadCommands.includes(developerTerminalCommands[i])){
  	  ctx.fillStyle = 'red';
  	}
  	else if(developerTerminalNeutralCommands.includes(developerTerminalCommands[i])){
  	  ctx.fillStyle = 'white';
  	}
  	else if(developerTerminalGoodCommands.includes(developerTerminalCommands[i])){
  	  ctx.fillStyle = '#22CCEE';
  	}
  	ctx.fillText(text, x, y);
  }
}
function useDeveloperTerminal() {
	let badChance = 0.2;
	let neutralChance = 0.6;
	let goodChance = 0.2;
	
	neutralChance += badChance;
	goodChance += neutralChance;
	
	let rand = Math.random();
	
	if(rand <= badChance){
	  developerTerminalCommands.unshift(developerTerminalBadCommands[Math.floor(Math.random() * developerTerminalBadCommands.length)]);
	}
	else if(badChance <= rand && rand <= neutralChance){
	  developerTerminalCommands.unshift(developerTerminalNeutralCommands[Math.floor(Math.random() * developerTerminalNeutralCommands.length)]);
	}
	else if(neutralChance <= rand && rand <= goodChance){
	  developerTerminalCommands.unshift(developerTerminalGoodCommands[Math.floor(Math.random() * developerTerminalGoodCommands.length)]);
	}
	if(developerTerminalCommands.length >= 20){
	  developerTerminalCommands.pop();
	}
}

function upgradeUnlockRobotOverseers(){
  if(code >= 5000){
    code -= 5000;
    robotOverseersUnlocked = true;
    document.getElementById("upgrade_unlock_robot_overseers").style.display = 'none';
  }
}

function purchaseRobotOverseer() {
  if(code >= calculateRobotOverseerCost()){
  	code -= calculateRobotOverseerCost();
  	robotOverseers += 1;
  }
}
function calculateRobotOverseerCost() {
  return robotOverseers * robotOverseers * 27 + 727;
}


function updateCounters() {

  let timeDiff = (Date.now() - prevUpdateTime) / 1000;	//time diff in seconds
  prevUpdateTime = Date.now();

  //FACTORY
  let jacobDiff = 0;
  jacobDiff += factoryJacobs * factoryRate;

  jacobDiff *= timeDiff;
  jacobs += jacobDiff;


  //SCHOOL
  if(schoolBuilt){
  	if(schoolCountdown > schoolCountdownInterval){
  	  schoolCountdown = schoolCountdownInterval;
  	}
  	schoolCountdown -= timeDiff;
  	if(schoolCountdown <= 0){
  	  if(schoolJacobs >= 1){
  	  	educatedJacobs ++;
 	  	schoolJacobs --;
  	  }
 	  schoolCountdown += schoolCountdownInterval;
 	}
  }
  
  //DEVELOPER JACOBS
  code += developerJacobs * timeDiff;
  
  //ROBOT OVERSEERS
  let hiredJacobs = robotOverseers * timeDiff;
  if(jacobs >= hiredJacobs){
  	jacobs -= hiredJacobs;
  	factoryJacobs += hiredJacobs;
  }
}
