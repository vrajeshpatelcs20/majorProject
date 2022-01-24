/* eslint-disable no-extra-parens */
// Major Project/ Battleship
// Vrajesh Patel
// 2021/2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let cellWidth, timerForScreenChange;
let hoverXForPlayer1 = 0;
let hoverYForPlayer1 = 0;
let hoverXForPlayer2 = 0;
let hoverYForPlayer2 = 0;
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
let whiteInstructions = true;
let blueInstructions = true;
let previousBlockForPlayer1 = 1;
let previousBlockForPlayer2 = 1;
let stateOfGame = "loadingScreen";
let battleshipState = "instructionsOfBattleship";


function setup() {
  createCanvas(windowWidth, windowHeight);
  gridForPlayer1 = createGridOfPlayer(gridSize, gridSize);
  gridForPlayer2 = createGridOfPlayer(gridSize, gridSize);
  // stateOfGame = "battleshipGame";
  setupOfMap();
  gridForPlayer1[hoverYForPlayer1][hoverXForPlayer1] = 9;
  gridForPlayer2[hoverYForPlayer2][hoverXForPlayer2] = 9;
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

function gameChecker(){
  if (stateOfGame === "loadingScreen") {
    starterScreen();
  }
  if (stateOfGame === "battleshipStart"){
    battleshipStateChecker();
  }
}


function battleshipStateChecker() {
  if (battleshipState === "instructionsOfBattleship") {
    pregameBattleship();
  }
  if (battleshipState === "battleshipGame") {
    battleshipGame();
  }
}

function mousePressed() {
  if (stateOfGame === "loadingScreen") {
    if (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 * 3 + 100 && mouseX > width / 4 * 3 - 100) {
      stateOfGame = "battleshipStart";
    }
    if (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 * 2 + 100 && mouseX > width / 4 * 2 - 100){
      stateOfGame ="g";
      background("yellow");
    }
    if(mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 + 100 && mouseX > width / 4 - 100){
      stateOfGame ="a";
      background("red");
    }
  }
}

function winCheckerForBattleship(){
  if (whiteShipsAlive === 0) {
    whiteWins();
  }
  if (blueShipsAlive === 0) {
    blueWins();
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
  textSize(width / 45);
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
  text("Player 2 will be the Blue grid/Right grid", width / 2, 350);
  text("Both Players Must Use WASD To move your target location", width/2 ,450);
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
  if (blueBoatCount === 0 && boatsForBlue === false) {
    boatsForBlue = true;
  }
  if (blueBoatCount === 0 && blueInstructions) {
    fill("white");
    text("All Boats Have Been Placed", width / 4, height / 2 - 200);
  }
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
      if (gridForPlayer2[y][x] === 9) {
        fill("green");
      }
      rect(x * cellWidth + (width / 1.75), y * cellWidth + 100, cellWidth, cellWidth);
      // rect(0 * cellWidth + (width / 1.75), 0 * cellWidth + 100, cellWidth, cellWidth);
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
    text("Press Z When you are done", windowWidth / 4, windowHeight / 2 + 200);
  }
}
function displayGridForPlayer1() {
  if (whiteBoatCount === 0 && boatsForWhite === false) {
    boatsForWhite = true;
  }
  if (whiteBoatCount === 0 && whiteInstructions) {
    fill("blue");
    text("All Boats Have Been Placed", width / 4 * 3, height / 2 - 200);
  }
  stroke("blue");
  cellWidth = (width / 2.5) / gridSize;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (gridForPlayer1[y][x] === 9) {
        fill("green");
      }
      else if (gridForPlayer1[y][x] === 0 || gridForPlayer1[y][x] === 3) {
        fill("white");
      }
      else if (gridForPlayer1[y][x] === 1) {
        fill("black");
      }
      else if (gridForPlayer1[y][x] === 2) {
        fill("red");
      }
      // noStroke();
      rect(x * cellWidth + width / 50, y * cellWidth + 100, cellWidth, cellWidth);
      // rect(0 * cellWidth + width / 50, 0 * cellWidth + 100, cellWidth, cellWidth);
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
    text("Player 2 Place your Ships", width / 4 * 3, height / 2 - 100);
    text("You have 5 Boats to places", width / 4 * 3, height / 2);
    text("Each Boat is One Sqaure", width / 4 * 3, height / 2 + 100);
    text("Press Z When you are done", width / 4 * 3, height / 2 + 200);
    text("Player 1 will start", width / 4 * 3, height / 2 + 300);
    fill("black");
  }
}
function battleshipGame() {
  background(0);
  rectMode(CORNER);
  if (whiteGrid) {
    displayGridForPlayer1();
  }
  if (!whiteGrid) {
    displayGridForPlayer2();
  }
}


function whiteGridGotAttacked() {
  let cellX = hoverXForPlayer1;
  let cellY = hoverYForPlayer1;
  recenterHover(1);
  if (cellX !== 0 && cellY !== 0) {
    if (boatsForWhite && !whiteInstructions) {
      if (previousBlockForPlayer1 === 0) {
        gridForPlayer1[cellY][cellX] = 1;
        changeGrid();
      }
      else if (previousBlockForPlayer1 === 3) {
        gridForPlayer1[cellY][cellX] = 2;
        whiteShipsAlive--;
      }
      else{
        hoverYForPlayer1 = 0;
        hoverXForPlayer1 = 0;
      }
    }
    else if (previousBlockForPlayer1 === 0) {
      if (whiteBoatCount !== 0) {
        gridForPlayer1[cellY][cellX] = 3;
        whiteBoatCount--;
      }
      else{
        hoverYForPlayer1 = 0;
        hoverXForPlayer1 = 0;
      }
    }
  }
  previousBlockForPlayer1 = 0;
}

function changeGrid() {
  // timerForScreenChange = millis();
  // while (millis() > timerForScreenChange + 500) {
  //   whiteGrid = !whiteGrid;
  // }
  whiteGrid = !whiteGrid;
}
function blueGridGotAttacked() {
  if (blueBoatCount === 0) {
    text("All Boats Have Been Placed", width / 4, - 200);
  }
  if (hoverXForPlayer2 !== 0 && hoverYForPlayer2 !== 0) {
  let cellX = hoverXForPlayer2;
  let cellY = hoverYForPlayer2;
  recenterHover(2);
    if (boatsForBlue && !blueInstructions) {
      if (previousBlockForPlayer2 === 0) {
        gridForPlayer2[cellY][cellX] = 1;
        // recenterHover(2);
        changeGrid();
      }
      else if (previousBlockForPlayer2 === 3) {
        gridForPlayer2[cellY][cellX] = 2;
        blueShipsAlive--;
      }
      else {
        hoverYForPlayer2 = 0;
        hoverXForPlayer2 = 0;
      }
    }
    else if (previousBlockForPlayer2 === 0) {
      if (blueBoatCount !== 0) {
        gridForPlayer2[cellY][cellX] = 3;
        // recenterHover(2);
        blueBoatCount--;
      }
      else {
        hoverYForPlayer2 = 0;
        hoverXForPlayer2 = 0;
      }
    }
  }
  previousBlockForPlayer2 = 0;
}

function recenterHover(gridNum) {
  if (gridNum === 2) {
    hoverXForPlayer2 = 0;
    hoverYForPlayer2 = 0;
    gridForPlayer2[hoverYForPlayer2][hoverXForPlayer2];
  }
  if (gridNum === 1) {
    hoverXForPlayer1 = 0;
    hoverYForPlayer1 = 0;
    gridForPlayer1[hoverYForPlayer1][hoverXForPlayer1];
  }

}


function keyPressed() {
  if (key === "r"){
    stateOfGame = "loadingScreen";
  }
  if (key === " ") {
    if (battleshipState === "instructionsOfBattleship") {
      battleshipState = "battleshipGame";
    }
  }
  if (key === "z") {
    if (whiteBoatCount === 0) {
      whiteInstructions = false;
      whiteGrid = !whiteGrid;
    }
    if (blueBoatCount === 0) {
      blueInstructions = false;
      whiteGrid = !whiteGrid;
    }
  }
  if (whiteGrid) {
    if (key === "s") {
      tryToMoveToPlayer1(hoverXForPlayer1, hoverYForPlayer1 + 1);
    }
    else if (key === "w") {
      tryToMoveToPlayer1(hoverXForPlayer1, hoverYForPlayer1 - 1);
    }
    else if (key === "a") {
      tryToMoveToPlayer1(hoverXForPlayer1 - 1, hoverYForPlayer1);
    }
    else if (key === "d") {
      tryToMoveToPlayer1(hoverXForPlayer1 + 1, hoverYForPlayer1);
    }
  }


  if (!whiteGrid) {
    if (key === "s") {
      tryToMoveToPlayer2(hoverXForPlayer2, hoverYForPlayer2 + 1);
    }
    else if (key === "w") {
      tryToMoveToPlayer2(hoverXForPlayer2, hoverYForPlayer2 - 1);
    }
    else if (key === "a") {
      tryToMoveToPlayer2(hoverXForPlayer2 - 1, hoverYForPlayer2);
    }
    else if (key === "d") {
      tryToMoveToPlayer2(hoverXForPlayer2 + 1, hoverYForPlayer2);
    }
  }
  if (battleshipState === "battleshipGame") {
    if (key === " ") {
      if (whiteGrid) {
        if (previousBlockForPlayer1 === 0 || previousBlockForPlayer1 === 3){
          whiteGridGotAttacked();
        }
      }
      if (!whiteGrid) {
        if(previousBlockForPlayer2 === 0 || previousBlockForPlayer2 === 3){
          blueGridGotAttacked();
        }
      }
    }
  }
}
function tryToMoveToPlayer1(newX, newY) {
  if (newX >= 0 && newY >= 0 && newX < gridSize && newY < gridSize) {
    // reset current hover spot to 0/empty  
    gridForPlayer1[hoverYForPlayer1][hoverXForPlayer1] = previousBlockForPlayer1;
    previousBlockForPlayer1 = gridForPlayer1[newY][newX];
    hoverXForPlayer1 = newX;
    hoverYForPlayer1 = newY;
    gridForPlayer1[hoverYForPlayer1][hoverXForPlayer1] = 9;
  }
}
function tryToMoveToPlayer2(newX, newY) {
  if (newX >= 0 && newY >= 0 && newX < gridSize && newY < gridSize) {
    // reset current hover spot to 0/empty  
    gridForPlayer2[hoverYForPlayer2][hoverXForPlayer2] = previousBlockForPlayer2;
    previousBlockForPlayer2 = gridForPlayer2[newY][newX];
    hoverXForPlayer2 = newX;
    hoverYForPlayer2 = newY;
    gridForPlayer2[hoverYForPlayer2][hoverXForPlayer2] = 9;
  }

}

function whiteWins() {
  background("white");
  text("White Wins!", width / 2, height / 2);
}

function blueWins() {
  background("blue");
  text("Blue Wins!", width / 2, height / 2);
}

function draw() {
  gameChecker();
  winCheckerForBattleship();
}




