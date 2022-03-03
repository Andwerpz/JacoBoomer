let jacobs = 0;
let factoryJacobs = 0;
let schoolJacobs = 0;
let counter = 0.0;
setInterval(jacobWork, 1000);
function reloadCounters() {
  document.getElementById("jacob_counter").innerHTML = "Jacobs: "
    + jacobs;
  document.getElementById("factory_jacob_counter").innerHTML = "Factory Jacobs: "
    + factoryJacobs;
  document.getElementById("school_jacob_counter").innerHTML = "School Jacobs: "
    + schoolJacobs;
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
function jacobWork() {
  jacobs += factoryJacobs;
  reloadCounters();
}