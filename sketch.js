/* eslint-disable no-extra-parens */
// Major Project/ Battleship
// Vrajesh Patel
// 2021/2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let stateOfGame;
let gridForPlayer1;
let gridForPlayer2;
let gridSize = 11;
let theColor = 0;
let fillColor = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gridForPlayer1 = createGridOfPlayer1(gridSize, gridSize);
  gridForPlayer2 = createGridOfPlayer1(gridSize, gridSize);
  stateOfGame = "battleshipGame";

}
function stateChecker() {
  if (stateOfGame === "loadingScreen") {
    starterScreen();
  }
  if (stateOfGame === "instructionsOfBattleship") {
    pregameBattleship();
  }
  if (stateOfGame === "battleshipGame") {
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

function createGridOfPlayer1(rows, cols) {
  let gridForPlayer1 = [];
  for (let y = 0; y < rows; y++) {
    gridForPlayer1.push([]);
    for (let x = 0; x < cols; x++) {
      gridForPlayer1[y].push(0);
    }
  }
  return gridForPlayer1;
}

function createGridOfPlayer2(rows, cols) {
  let gridForPlayer2 = [];
  for (let y = 0; y < rows; y++) {
    gridForPlayer2.push([]);
    for (let x = 0; x < cols; x++) {
      gridForPlayer2[y].push(0);
    }
  }
  return gridForPlayer2;
}


function displayGridForPlayer2() {
  let cellWidth = (width - 1000) / gridSize;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (gridForPlayer2[y][x] === 0) {
        fill("white");
      }
      // else if (gridForPlayer2;[y][x] === 1) {
      //   fill("black");
      // }
      // noStroke();
      rect(x * cellWidth + ( width/ 1.75) , y * cellWidth + 100, cellWidth, cellWidth);
    }
  }
}

function displayGridForPlayer1() {
  let cellWidth = (width - 1000) / gridSize;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (gridForPlayer1[y][x] === 0) {
        fill("white");
      }
      // else if (gridForPlayer1[y][x] === 1) {
      //   fill("black");
      // }
      // noStroke();
      rect(x * cellWidth + width / 50, y * cellWidth + 100, cellWidth, cellWidth);
    }
  }
}

function battleshipGame() {
  background(0);
  rectMode(CORNER);
  displayGridForPlayer1();
  displayGridForPlayer2();

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
