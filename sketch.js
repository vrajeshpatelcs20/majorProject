// Major Project/ Battleship
// Vrajesh Patel
// 2021/2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let loadingScreen;
let stateOfGame = loadingScreen;
let theColor = 0;
<<<<<<< Updated upstream
let fillColor = 0;
=======
let fillColor
>>>>>>> Stashed changes

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
  stroke(theColor);
  fill(theColor);
  rect(width / 4 * 2, height / 2, 200, 100);
  rect(width / 4 * 3, height / 2, 200, 100);
  rect(width / 4, height / 2, 200, 100);
<<<<<<< Updated upstream
  fill(fillColor);
=======
  fill(0);
>>>>>>> Stashed changes
  text("Battleship", width / 4 * 3, height / 2 + 10);
  text("Snake", width / 4 * 2, height / 2 + 10);
  text("Undecided", width / 4, height / 2 + 10);
  textSize(40);
  textAlign(CENTER); 
  // eslint-disable-next-line no-extra-parens
  if((mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 + 100 && mouseX > width / 4 - 100) || (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 * 2 + 100 && mouseX > width / 4 * 2 - 100) || (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 &&mouseX < width / 4 * 3 + 100 && mouseX > width / 4 * 3 - 100)){
    theColor = "blue";
<<<<<<< Updated upstream
    fillColor = 0;
=======
>>>>>>> Stashed changes
  }
  else{
    theColor = 0;
    fillColor = "blue";
  }
}

// function mousePressed() {
//   if(stateOfGame === loadingScreen){
//   }
// }

function draw() {
  stateChecker();
}
