let jacobs = 0;

let farmBuilt = false;
let farmJacobs = 0;
let farmRate = 0;	//total production
let farmRateLevel = 0;
let farmRateMultiplier = 1;
let food = 0;

let factoryBuilt = false;
let factoryJacobs = 0;
let factoryRate = 0;	//total production
let factoryRateLevel = 0;
let factoryRateMultiplier = 1;
let factoryFoodRate = 0.1;

let schoolBuilt = false;
let schoolJacobs = 0;
let schoolCountdown = 0;
let schoolCountdownInterval = 60;

let armyBuilt = false;
let armyJacobs = 0;

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

		farmBuilt = savedValues.farmBuilt;
		farmJacobs = parseFloat(savedValues.farmJacobs);
		farmRate = parseFloat(savedValues.farmRate);
		farmRateLevel = parseInt(savedValues.farmRateLevel);
		farmRateMultiplier = parseFloat(savedValues.farmRateMultiplier);
		food = parseFloat(savedValues.food);

		factoryBuilt = savedValues.factoryBuilt;
		factoryJacobs = parseFloat(savedValues.factoryJacobs);
		factoryRate = parseFloat(savedValues.factoryRate);
		factoryRateLevel = parseInt(savedValues.factoryRateLevel);
		factoryRateMultiplier = parseFloat(savedValues.factoryRateMultiplier);
		factoryFoodRate = parseFloat(savedValues.factoryFoodRate);
		
		schoolBuilt = savedValues.schoolBuilt;
		schoolJacobs = parseFloat(savedValues.schoolJacobs);
		
		armyBuilt = savedValues.armyBuilt;
		armyJacobs = parseFloat(savedValues.armyJacobs);

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

		farmBuilt: farmBuilt,
		farmJacobs: farmJacobs,
		farmRate: farmRate,
		farmRateLevel: farmRateLevel,
		farmRateMultiplier: farmRateMultiplier,
		food: food,

		factoryBuilt: factoryBuilt,
		factoryJacobs: factoryJacobs,
		factoryRate: factoryRate,
		factoryRateLevel: factoryRateLevel,
		factoryRateMultiplier: factoryRateMultiplier,
		factoryFoodRate: factoryFoodRate,
		
		schoolBuilt: schoolBuilt,
		schoolJacobs: schoolJacobs,
		
		armyBuilt: armyBuilt,
		armyJacobs: armyJacobs,

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

	farmBuilt = false;
	farmJacobs = 0;
	farmRate = 0;
	farmRateLevel = 0;
	farmRateMultiplier = 1;
	food = 0;

	factoryBuilt = false;
	factoryJacobs = 0;
	factoryRate = 0.01;
	factoryRateLevel = 0;
	factoryRateMultiplier = 1;
	factoryFoodRate = 0.1;
	
	armyBuilt = false;
	armyJacobs = 0;

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

//MAIN LOOP
function tick() {
	updateCounters();
	reloadCounters();
	
	resetDisplay();
	updateDisplay();
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
	document.getElementById("farm_div").style.display = 'none';
	document.getElementById("factory_div").style.display = 'none';
	document.getElementById("school_div").style.display = 'none';
	
	document.getElementById("army_div").style.display = 'none';

	document.getElementById("developer_jacob_counter_div").style.display = 'none';
	document.getElementById("developer_jacob_div").style.display = 'none';
	document.getElementById("developer_terminal_div").style.display = 'none';
	document.getElementById("robot_overseer_div").style.display = 'none';

	document.getElementById("engineer_jacob_counter_div").style.display = 'none';
	document.getElementById("engineer_jacob_div").style.display = 'none';

	document.getElementById("architect_jacob_counter_div").style.display = 'none';
	document.getElementById("architect_jacob_div").style.display = 'none';
}

function updateDisplay() {
	//FARM
	if (farmBuilt) {
		document.getElementById("farm_div").style.display = 'inline';
	}
	if (!farmBuilt && jacobs >= 10) {
		document.getElementById("upgrade_build_farm").style.display = 'block';
	}

	//FACTORY
	if (factoryBuilt) {
		document.getElementById("factory_div").style.display = 'inline';
	}
	if (!factoryBuilt && jacobs >= 60) {
		document.getElementById("upgrade_build_factory").style.display = 'block';
	}
	if (factoryBuilt && factoryRateLevel === 0 && jacobs >= 110) {
		document.getElementById("upgrade_factory_rate_1").style.display = 'block';
	}
	if (factoryBuilt && factoryRateLevel == 1 && jacobs >= 250) {
		document.getElementById("upgrade_factory_rate_2").style.display = 'block';
	}
	if (factoryBuilt && factoryRateLevel == 2 && jacobs >= 1000) {
		document.getElementById("upgrade_factory_rate_3").style.display = 'block';
	}

	//SCHOOL
	if (!schoolBuilt && jacobs >= 2500) {
		document.getElementById("upgrade_build_school").style.display = 'block';
	}
	if (schoolBuilt) {
		document.getElementById("school_div").style.display = 'inline';
	}
	if (schoolBuilt && !developerJacobsUnlocked) {
		document.getElementById("upgrade_unlock_developer_jacobs").style.display = 'block';
	}
	if (schoolBuilt && !engineerJacobsUnlocked && code >= 10000) {
		document.getElementById("upgrade_unlock_engineer_jacobs").style.display = 'block';
	}
	if (schoolBuilt && !architectJacobsUnlocked && patents >= 3000) {
		document.getElementById("upgrade_unlock_architect_jacobs").style.display = 'block';
	}
	
	//ARMY
	if(!armyBuilt && jacobs >= 1000){
		document.getElementById("upgrade_build_army").style.display = 'block';
	}
	if(armyBuilt){
		document.getElementById("army_div").style.display = 'inline';
	}

	//DEVELOPER JACOBS
	if (developerJacobsUnlocked) {
		document.getElementById("developer_jacob_counter_div").style.display = 'inline';
		document.getElementById("developer_jacob_div").style.display = 'inline';
	}
	if (developerTerminalUnlocked) {
		document.getElementById("developer_terminal_div").style.display = 'inline';
		if (Math.random() <= 0.02) {
			useDeveloperTerminal();
		}
		drawDeveloperTerminal();
	}
	if (robotOverseersUnlocked) {
		document.getElementById("robot_overseer_div").style.display = 'inline';
	}
	if (developerJacobsUnlocked && code >= 100 && !developerTerminalUnlocked) {
		document.getElementById("upgrade_unlock_developer_terminal").style.display = 'block';
	}
	if (developerJacobsUnlocked && code >= 1100 && !robotOverseersUnlocked) {
		document.getElementById("upgrade_unlock_robot_overseers").style.display = 'block';
	}

	//ENGINEER JACOBS
	if (engineerJacobsUnlocked) {
		document.getElementById("engineer_jacob_counter_div").style.display = 'inline';
		document.getElementById("engineer_jacob_div").style.display = 'inline';
	}

	//ARCHITECT JACOBS
	if (architectJacobsUnlocked) {
		document.getElementById("architect_jacob_counter_div").style.display = 'inline';
		document.getElementById("architect_jacob_div").style.display = 'inline';
	}
}

function reloadCounters() {
	document.getElementById("jacob_counter").innerHTML = parseInt(jacobs);

	document.getElementById("farm_jacob_counter").innerHTML = parseInt(farmJacobs);
	document.getElementById("farm_single_rate_counter").innerHTML = (farmRate / farmJacobs).toFixed(2);
	document.getElementById("farm_rate_counter").innerHTML = (farmRate).toFixed(2);
	document.getElementById("food_counter").innerHTML = parseInt(food);

	document.getElementById("factory_jacob_counter").innerHTML = parseInt(factoryJacobs);
	document.getElementById("factory_single_rate_counter").innerHTML = (factoryRate / factoryJacobs).toFixed(2);
	document.getElementById("factory_rate_counter").innerHTML = (factoryRate).toFixed(2);
	document.getElementById("factory_food_rate_counter").innerHTML = (factoryFoodRate * factoryJacobs).toFixed(2);
	
	document.getElementById("army_jacob_counter").innerHTML = parseInt(armyJacobs);

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

function updateCounters() {
	let timeDiff = (Date.now() - prevUpdateTime) / 1000;	//time diff in seconds
	prevUpdateTime = Date.now();

	//FOOD
	//factory workers consume food. if there is not enough food, then factory loses 0.1% of workers
	//which get turned back into jacobs
	farmRate = Math.sqrt(farmJacobs * 10) * 0.1 * farmRateMultiplier;

	let foodDiff = farmRate * timeDiff;
	foodDiff -= factoryJacobs * factoryFoodRate * timeDiff;

	food += foodDiff;

	if (food < 0) {
		food = 0;
		let factoryJacobLoss = factoryJacobs * 0.001;
		jacobs += factoryJacobLoss;
		factoryJacobs -= factoryJacobLoss;
	}

	//JACOBS
	factoryRate = Math.sqrt(factoryJacobs * 20) * 0.1 * factoryRateMultiplier;
	let jacobDiff = factoryRate * timeDiff;
	jacobs += jacobDiff;

	//EDUCATED JACOBS
	if (schoolBuilt) {
		if (schoolCountdown > schoolCountdownInterval) {
			schoolCountdown = schoolCountdownInterval;
		}
		schoolCountdown -= timeDiff;
		if (schoolCountdown <= 0) {
			if (schoolJacobs >= 1) {
				educatedJacobs++;
				schoolJacobs--;
			}
			schoolCountdown += schoolCountdownInterval;
		}
	}

	//CODE
	code += developerJacobs * timeDiff;

	//FACTORY JACOBS
	let hiredJacobs = robotOverseers * timeDiff;
	if (jacobs >= hiredJacobs) {
		jacobs -= hiredJacobs;
		factoryJacobs += hiredJacobs;
	}
}

function constructJacob() {
	jacobs++;
}

function upgradeBuildFarm() {
	if (jacobs >= 50) {
		jacobs -= 50;
		document.getElementById("upgrade_build_farm").style.display = 'none';
		farmBuilt = true;
	}
}
function purchaseFarmJacob() {
	if (jacobs >= 1) {
		jacobs--;
		farmJacobs += 1;
	}
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
	if (jacobs >= 200) {
		jacobs -= 200;
		factoryRateLevel = 1;
		factoryRateMultiplier *= 2;
		document.getElementById("upgrade_factory_rate_1").style.display = 'none';
	}
}
function upgradeFactoryRate2() {
	if (jacobs >= 500) {
		jacobs -= 500;
		factoryRateLevel = 2;
		factoryRateMultiplier *= 2;
		document.getElementById("upgrade_factory_rate_2").style.display = 'none';
	}
}
function upgradeFactoryRate3() {
	if (jacobs >= 2000) {
		jacobs -= 2000;
		factoryRateLevel = 3;
		factoryRateMultiplier *= 3;
		document.getElementById("upgrade_factory_rate_3").style.display = 'none';
	}
}

function upgradeBuildArmy() {
	if(jacobs >= 5000){
		document.getElementById("upgrade_build_army").style.display = 'none';
		armyBuilt = true;
		jacobs -= 5000;
	}
}

function purchaseArmyJacob() {
	if(jacobs >= 1){
		armyJacobs += 1;
		jacobs -= 1;
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
	if (educatedJacobs >= 1) {
		educatedJacobs--;
		engineerJacobs++;
	}
}
function purchaseDeveloperJacob() {
	if (educatedJacobs >= 1) {
		educatedJacobs--;
		developerJacobs++;
	}
}
function purchaseArchitectJacob() {
	if (educatedJacobs >= 1) {
		educatedJacobs--;
		architectJacobs++;
	}
}

function upgradeUnlockDeveloperJacobs() {
	if (educatedJacobs >= 1) {
		educatedJacobs -= 1;
		developerJacobsUnlocked = true;
		document.getElementById("upgrade_unlock_developer_jacobs").style.display = 'none';
	}
}
function upgradeUnlockEngineerJacobs() {
	if (code >= 50000) {
		code -= 50000;
		engineerJacobsUnlocked = true;
		document.getElementById("upgrade_unlock_engineer_jacobs").style.display = 'none';
	}
}
function upgradeUnlockArchitectJacobs() {
	if (patents >= 20000) {
		patents -= 20000;
		architectJacobsUnlocked = true;
		document.getElementById("upgrade_unlock_architect_jacobs").style.display = 'none';
	}
}

function upgradeUnlockDeveloperTerminal() {
	if (code >= 1000) {
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
	if (parseInt(Date.now() / 500) % 2 == 0) {
		ctx.fillRect(10, height - 13, 7, 2);
	}

	//COMMANDS
	var fontSize = 12;
	var lineGap = 3;
	var font = fontSize + "px Arial";
	ctx.font = font;

	for (var i = 0; i < developerTerminalCommands.length; i++) {
		var x = 10;
		var y = height - 13 - (i + 1) * (fontSize + lineGap);
		var text = developerTerminalCommands[i] + "()";
		ctx.fillStyle = 'white';
		if (developerTerminalBadCommands.includes(developerTerminalCommands[i])) {
			ctx.fillStyle = 'red';
		}
		else if (developerTerminalNeutralCommands.includes(developerTerminalCommands[i])) {
			ctx.fillStyle = 'white';
		}
		else if (developerTerminalGoodCommands.includes(developerTerminalCommands[i])) {
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

	if (rand <= badChance) {
		developerTerminalCommands.unshift(developerTerminalBadCommands[Math.floor(Math.random() * developerTerminalBadCommands.length)]);
	}
	else if (badChance <= rand && rand <= neutralChance) {
		developerTerminalCommands.unshift(developerTerminalNeutralCommands[Math.floor(Math.random() * developerTerminalNeutralCommands.length)]);
	}
	else if (neutralChance <= rand && rand <= goodChance) {
		developerTerminalCommands.unshift(developerTerminalGoodCommands[Math.floor(Math.random() * developerTerminalGoodCommands.length)]);
	}
	if (developerTerminalCommands.length >= 20) {
		developerTerminalCommands.pop();
	}
}

function upgradeUnlockRobotOverseers() {
	if (code >= 5000) {
		code -= 5000;
		robotOverseersUnlocked = true;
		document.getElementById("upgrade_unlock_robot_overseers").style.display = 'none';
	}
}

function purchaseRobotOverseer() {
	if (code >= calculateRobotOverseerCost()) {
		code -= calculateRobotOverseerCost();
		robotOverseers += 1;
	}
}
function calculateRobotOverseerCost() {
	return robotOverseers * robotOverseers * 27 + 727;
}
