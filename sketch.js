// Major Project/ Battleship
// Vrajesh Patel
// 2021/2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let stateOfGame;
let theColor = 0;
let fillColor = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stateOfGame = "loadingScreen";

}
function stateChecker() {
  if (stateOfGame === "loadingScreen") {
    starterScreen();
  }
  if (stateOfGame === "instructionsOfBattleship") {
    pregameBattleship();
  }
  if (stateOfGame === "battleshipGame"){

    background(0);
    battleshipGame();  
  }
}

function starterScreen() {
  background(0);
  rectMode(CENTER);
  stroke(theColor);
  fill(theColor);
  rect(width / 4 * 2, height / 2, 200, 100);
  rect(width / 4 * 3, height / 2, 200, 100);
  rect(width / 4, height / 2, 200, 100);
  fill(fillColor);
  text("Battleship", width / 4 * 3, height / 2 + 10);
  text("Snake", width / 4 * 2, height / 2 + 10);
  text("Undecided", width / 4, height / 2 + 10);
  textSize(width / 40);
  textAlign(CENTER);
  // eslint-disable-next-line no-extra-parens
  if ((mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 + 100 && mouseX > width / 4 - 100) || (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 * 2 + 100 && mouseX > width / 4 * 2 - 100) || (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 * 3 + 100 && mouseX > width / 4 * 3 - 100)) {
    theColor = "blue";
    fillColor = 0;
  }
  else {
    theColor = 0;
    fillColor = "blue";
  }
}

function pregameBattleship() {
  stroke(0);
  background(255);
  text("Press Space to Countine", width / 2, 100);
}
battleshipGame(){
  
}

function mousePressed() {
  if (stateOfGame === "loadingScreen") {
    if (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 * 3 + 100 && mouseX > width / 4 * 3 - 100) {
      stateOfGame = "instructionsOfBattleship";

    }
  }
}

function keyPressed() {
  if (key === " ") {
    if (stateOfGame === "instructionsOfBattleship") {
      stateOfGame = "battleshipGame";
    }
  }
}

function draw() {
  stateChecker();
}
