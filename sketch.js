/* eslint-disable no-extra-parens */
// Major Project/ Battleship
// Vrajesh Patel
// 2021/2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let stateOfGame, cellWidth, timerForScreenChange;
let numbersToLetters = new Map();
let whiteGrid = false;
let gridForPlayer1;
let gridForPlayer2;
let gridSize = 11;
let theColor = 0;
let fillColor = 0;
let boatsForWhite = false;
let whiteBoatCount = 5;
let boatsForBlue = false;
let blueBoatCount = 5;
let blueShipsAlive = 5;
let whiteShipsAlive = 5;
let previousVariable;
let whiteInstructions = true;
let blueInstructions = true;

function setup() {
  stateOfGame = "loadingScreen";
  createCanvas(windowWidth, windowHeight);
  gridForPlayer1 = createGridOfPlayer(gridSize, gridSize);
  gridForPlayer2 = createGridOfPlayer(gridSize, gridSize);
  // stateOfGame = "battleshipGame";
  setupOfMap();
}


function setupOfMap() {
  numbersToLetters.set(1, "A");
  numbersToLetters.set(2, "B");
  numbersToLetters.set(3, "C");
  numbersToLetters.set(4, "D");
  numbersToLetters.set(5, "E");
  numbersToLetters.set(6, "F");
  numbersToLetters.set(7, "G");
  numbersToLetters.set(8, "H");
  numbersToLetters.set(9, "I");
  numbersToLetters.set(10, "J");
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
  text("Press Space to Countine", width / 2, height - 50);
  text("The Classic Game of Battleship", width / 2, 100);
  text("Expect it's not, This game is much worse than that", width / 2, 150);
  text("Anyways Lets Get to it", width / 2, 200);
  text("Player 1 will be the White grid/Left grid", width / 2, 300);
  text("Player 2 will be the Blue grid/Right grid",width / 2, 350);
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
  stroke(255);
  cellWidth = (width / 2.5) / gridSize;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (gridForPlayer2[y][x] === 0 || gridForPlayer2[y][x] === 3) {
        fill("blue");
      }
      if (gridForPlayer2[y][x] === 1) {
        fill("black");
      }
      if (gridForPlayer2[y][x] === 2) {
        fill("red");
      }
      rect(x * cellWidth + (width / 1.75), y * cellWidth + 100, cellWidth, cellWidth);
      rect(0 * cellWidth + (width / 1.75), 0 * cellWidth + 100, cellWidth, cellWidth);
    }
    fill(0);
    textSize(cellWidth);
    textAlign(CENTER);
    text(y, cellWidth / 2 + (width / 1.75), y * cellWidth + 150);
    text(numbersToLetters.get(y), y * cellWidth + (width / 1.8) + 50, cellWidth + 90);
    fill(0);
  }
  if (blueInstructions) {
    fill("blue");
    text("Player 1 Place your Ships", windowWidth / 4, windowHeight / 2 - 100);
    text("You have 5 Boats to places", windowWidth / 4, windowHeight / 2);
    text("Each Boat is One Sqaure", windowWidth / 4, windowHeight / 2 + 100);
    text("Press S When you are done", windowWidth / 4, windowHeight / 2 + 200);
  }
}
function displayGridForPlayer1() {
  stroke("blue");
  cellWidth = (width / 2.5) / gridSize;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (gridForPlayer1[y][x] === 0 || gridForPlayer1[y][x] === 3) {
        fill("white");
      }
      else if (gridForPlayer1[y][x] === 1) {
        fill("black");
      }
      if (gridForPlayer1[y][x] === 2) {
        fill("red");
      }
      if (gridForPlayer1[y][x] === 4) {
        fill("green");
      }
      // noStroke();
      rect(x * cellWidth + width / 50, y * cellWidth + 100, cellWidth, cellWidth);
      rect(0 * cellWidth + width / 50, 0 * cellWidth + 100, cellWidth, cellWidth);
    }
    fill(0);
    textSize(cellWidth);
    textAlign(CENTER);
    text(y, cellWidth, y * cellWidth + 150);
    text(numbersToLetters.get(y), y * cellWidth + 59, cellWidth + 95);
    fill(0);
  }
  if (whiteInstructions) {
    fill("white");
    text("Player 2 Place your Ships", windowWidth / 4 * 3, windowHeight / 2 - 100);
    text("You have 5 Boats to places", windowWidth / 4 * 3, windowHeight / 2);
    text("Each Boat is One Sqaure", windowWidth / 4 * 3, windowHeight / 2 + 100);
    text("Press A When you are done", windowWidth / 4 * 3, windowHeight / 2 + 200);
    fill("black");
  }
}
function battleshipGame() {
  background(0);
  rectMode(CORNER);
  if (whiteGrid) {
    displayGridForPlayer1();
    // whiteGridHoverDetection();
  }
  if (!whiteGrid) {
    displayGridForPlayer2();
    // blueGridHoverDetection();
  }
}

function whiteGridHoverDetection() {
  let cellX = Math.floor((mouseX - width / 50) / cellWidth);
  let cellY = Math.floor((mouseY - 100) / cellWidth);
  previousVariable = gridForPlayer1[cellY][cellX];
  if (cellX !== 0 && cellY !== 0) {
    gridForPlayer1[cellY][cellX] = 4;
  }



}

function blueGridHoverDetection() {
  let cellX = Math.floor((mouseX - width / 1.75) / cellWidth);
  let cellY = Math.floor((mouseY - 100) / cellWidth);
  let previousVariableForBlue = gridForPlayer2[cellY][cellX];

}



function whiteGridGotAttacked() {
  let cellX = Math.floor((mouseX - width / 50) / cellWidth);
  let cellY = Math.floor((mouseY - 100) / cellWidth);
  if (cellX !== 0 && cellY !== 0) {
    if (boatsForWhite && !whiteInstructions) {
      if (gridForPlayer1[cellY][cellX] === 0) {
        gridForPlayer1[cellY][cellX] = 1;
        changeGrid();
      }
      else if (gridForPlayer1[cellY][cellX] === 3) {
        gridForPlayer1[cellY][cellX] = 2;
        whiteShipsAlive--;
      }
    }
    else if (gridForPlayer1[cellY][cellX] === 0) {
      if(whiteBoatCount !== 0){
        gridForPlayer1[cellY][cellX] = 3;
        whiteBoatCount--;
      }
    }
  }
}

function changeGrid() {
  // timerForScreenChange = millis();
  // while (millis() > timerForScreenChange + 500) {
  //   whiteGrid = !whiteGrid;
  // }
  whiteGrid = !whiteGrid;
}
function blueGridGotAttacked() {

  let cellX = Math.floor((mouseX - width / 1.75) / cellWidth);
  let cellY = Math.floor((mouseY - 100) / cellWidth);
  if (cellX !== 0 && cellY !== 0) {
    if (boatsForBlue && !blueInstructions) {
      if (gridForPlayer2[cellY][cellX] === 0) {
        gridForPlayer2[cellY][cellX] = 1;
        changeGrid();
      }
      else if (gridForPlayer2[cellY][cellX] === 3) {
        gridForPlayer2[cellY][cellX] = 2;
        blueShipsAlive--;
      }
    }
    else if (gridForPlayer2[cellY][cellX] === 0) {
      if (blueBoatCount !==0){
        gridForPlayer2[cellY][cellX] = 3;
        blueBoatCount--;
      }
    }
  }
}


function mousePressed() {
  if (stateOfGame === "loadingScreen") {
    if (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 * 3 + 100 && mouseX > width / 4 * 3 - 100) {
      stateOfGame = "instructionsOfBattleship";
    }
  }
  // mousepress location for whiteGrid or leftside of the screen
  if (stateOfGame === "battleshipGame") {
    if (whiteGrid) {
      whiteGridGotAttacked();
    }
    // mousepress location for player2 or rightside of the screen
    if (!whiteGrid) {
      blueGridGotAttacked();
    }

    if (whiteBoatCount === 0 && boatsForWhite === false) {

      boatsForWhite = true;
    }
    if (blueBoatCount === 0 && boatsForBlue === false) {
      boatsForBlue = true;
    }
  }
}

function keyPressed() {
  if (key === " ") {
    if (stateOfGame === "instructionsOfBattleship") {
      stateOfGame = "battleshipGame";
    }
  }
  if (key === "a") {
    whiteInstructions = false;
    whiteGrid = !whiteGrid;
  }
  if (key === "s") {
    blueInstructions = false;
    whiteGrid = !whiteGrid;
  }
}

function whiteWins() {
  background("white");
}

function blueWins() {
  background("blue");
}

function draw() {
  stateChecker();
  if (whiteShipsAlive === 0) {
    whiteWins();
  }
  if (blueShipsAlive === 0) {
    blueWins();
  }
}