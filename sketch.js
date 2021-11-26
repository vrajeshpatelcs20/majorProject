// Major Project/ Battleship
// Vrajesh Patel
// 2021/2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let loadingScreen;
let stateOfGame = loadingScreen;

function setup() {

  createCanvas(windowWidth, windowHeight);
}
function stateChecker() {
  if (stateOfGame === loadingScreen) {
    starterScreen();
  }
}

function starterScreen() {
  background(0);
  rectMode(CENTER);
  fill(255);
  rect(width / 4 * 3, height / 2, 200, 100);
  fill(0);
  text("Battleship", width / 4 * 3, height / 2 + 10);
  textSize(40);
  textAlign(CENTER);



}

function levelSelector(){
  if(stateOfGame === loadingScreen){
  }
}

function draw() {
  stateChecker();
}
