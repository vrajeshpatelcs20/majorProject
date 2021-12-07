/* eslint-disable no-extra-parens */
// Major Project/ Battleship
// Vrajesh Patel
// 2021/2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let stateOfGame;
let player1 = true;
let gridForPlayer1;
let gridForPlayer2;
let gridSize = 11;
let theColor = 0;
let fillColor = 0;

function setup() {
  stateOfGame = "loadingScreen";
  createCanvas(windowWidth, windowHeight);
  gridForPlayer1 = createGridOfPlayer(gridSize, gridSize);
  gridForPlayer2 = createGridOfPlayer(gridSize, gridSize);
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

function createGridOfPlayer(rows, cols) {
  let gridForPlayer1 = [];
  for (let y = 0; y < rows; y++) {
    gridForPlayer1.push([]);
    for (let x = 0; x < cols; x++) {
      gridForPlayer1[y].push(0);
    }
  }
  return gridForPlayer1;
}



function displayGridForPlayer2() {
  let cellWidth = (width / 2.5) / gridSize;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (gridForPlayer2[y][x] === 0) {
        fill("white");
      }
      // else if (gridForPlayer2;[y][x] === 1) {
      //   fill("black");
      // }
      // noStroke();
      fill("blue");
      rect(x * cellWidth + (width / 1.75), y * cellWidth + 100, cellWidth, cellWidth);
    }
    fill(0);
    textSize(50);
    textAlign(CENTER);
    text(y,cellWidth /2 + (width / 1.75), y * cellWidth + 150);
    text(y, y * cellWidth + (width/ 1.8) + 59, cellWidth + 95);
    fill(0);
  }
}

function displayGridForPlayer1() {
  let cellWidth = (width / 2.5) / gridSize;
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
    fill(0);
    textSize(50);
    textAlign(CENTER);
    text(y, cellWidth, y * cellWidth + 150);
    text(y, y * cellWidth + 59, cellWidth + 95);
    fill(0);
  }
}

function battleshipGame() {
  background(0);
  rectMode(CORNER);
  if (player1) {
    displayGridForPlayer1();
  }
  if (!player1) {
    displayGridForPlayer2();
  }
}

function mousePressed() {
  if (stateOfGame === "loadingScreen") {
    if (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 * 3 + 100 && mouseX > width / 4 * 3 - 100) {
      stateOfGame = "instructionsOfBattleship";
    }
  }
  player1 = !player1;
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
