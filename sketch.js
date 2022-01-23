/* eslint-disable no-extra-parens */
// Major Project/ Battleship
// Vrajesh Patel
// 2021/2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



// BattleshipVariables
let battleshipGameChecker, cellWidth, timerForScreenChange, stateOfGame;
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
let previousBlockForPlayer1 = 0;
let previousBlockForPlayer2 = 0;


// Snake Game Variables
let numSegments = 10;
let direction = "right";
// stater cordinates and spacer
let xStart = 0;
let yStart = 250;
let spaceBetweenCircles = 10;
let snakeXCordinate = [];
let snakeYCordinate = [];
let appleXCordinate = 0;
let appleYCordinate = 0;
let scoreElem;
let r = 255;
let g = 255;
let b = 255;
let backR = 0;
let backB = 0;
let backG = 0;


function setup() {
  stateOfGame = "loadingScreen";
  battleshipGameChecker = "instructionsOfBattleship"
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

function gameChecker() {
  if (stateOfGame === "loadingScreen") {
    starterScreen();
  }
  if (stateOfGame === "startBattleship") {
    battleshipStateChecker();
    battleshipWinChecker();
  }
  if (stateOfGame === "snakeGame") {
    startSnake();
  }
}


function battleshipStateChecker() {
  battleshipWinChecker();
  if (battleshipGameChecker === "instructionsOfBattleship") {
    pregameBattleship();
  }
  if (battleshipGameChecker === "battleshipGame") {
    battleshipGame();
  }
}


function mousePressed() {
  if (stateOfGame === "loadingScreen") {
    if (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 * 3 + 100 && mouseX > width / 4 * 3 - 100) {
      stateOfGame = "startBattleship";
    }
    if (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 * 2 + 100 && mouseX > width / 4 * 2 - 100) {
      stateOfGame = "snakeGame";
    }
    if (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 + 100 && mouseX > width / 4 - 100) {
      stateOfGame = "g"
      background("red");
    }
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
  text("Both Players Must Use WASD To move your target location", width / 2, 450);
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
  if (hoverXForPlayer1 !== 0 && hoverYForPlayer1 !== 0) {
    let cellX = hoverXForPlayer1;
    let cellY = hoverYForPlayer1;
    recenterHover(1);
    if (boatsForWhite && !whiteInstructions) {
      if (previousBlockForPlayer1 === 0) {
        gridForPlayer1[cellY][cellX] = 1;
        changeGrid();
      }
      else if (previousBlockForPlayer1 === 3) {
        gridForPlayer1[cellY][cellX] = 2;
        whiteShipsAlive--;
      }
      else {
        hoverYForPlayer1 = 0;
        hoverXForPlayer1 = 0;
      }
    }
    else if (previousBlockForPlayer1 === 0) {
      if (whiteBoatCount !== 0) {
        gridForPlayer1[cellY][cellX] = 3;
        whiteBoatCount--;
      }
      else {
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
  // Battleship Keys
  if (key === "r") {
    stateOfGame = "loadingScreen";
  }

  if (key === " ") {
    if (battleshipGameChecker === "instructionsOfBattleship") {
      battleshipGameChecker = "battleshipGame";
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
    if (battleshipGameChecker === "battleshipGame") {
      if (key === " ") {
        if (whiteGrid) {
          if (previousBlockForPlayer1 === 0 || previousBlockForPlayer1 === 3) {
            whiteGridGotAttacked();
          }
        }
        if (!whiteGrid) {
          if (previousBlockForPlayer2 === 0 || previousBlockForPlayer2 === 3) {
            blueGridGotAttacked();
          }
        }
      }
    }
    


        // SnakeGame Keys
        if (stateOfGame === "snakeGame") {
          switch (keyCode) {
            case 65:
              if (direction !== "right") {
                direction = "left";
              }
              break;
            case 68:
              if (direction !== "left") {
                direction = "right";
              }
              break;
            case 87:
              if (direction !== "down") {
                direction = "up";
              }
              break;
            case 83:
              if (direction !== "up") {
                direction = "down";
              }
              break;
            case 81:
              backR = random(255);
              backB = random(255);
              backG = random(255);
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



function battleshipWinChecker() {
  if (whiteShipsAlive === 0) {
    whiteWins();
  }
  if (blueShipsAlive === 0) {
    blueWins();
  }
}



// Snake Game

// update/change the direction of the snake
function updateSnakeCoordinates() {
  for (let i = 0; i < numSegments - 1; i++) {
    snakeXCordinate[i] = snakeXCordinate[i + 1];
    snakeYCordinate[i] = snakeYCordinate[i + 1];
  }
  if (direction === "right") {
    snakeXCordinate[numSegments - 1] = snakeXCordinate[numSegments - 2] + spaceBetweenCircles;
    snakeYCordinate[numSegments - 1] = snakeYCordinate[numSegments - 2];
  }

  if (direction === "up") {
    snakeXCordinate[numSegments - 1] = snakeXCordinate[numSegments - 2];
    snakeYCordinate[numSegments - 1] = snakeYCordinate[numSegments - 2] - spaceBetweenCircles;
  }
  if (direction === "left") {
    snakeXCordinate[numSegments - 1] = snakeXCordinate[numSegments - 2] - spaceBetweenCircles;
    snakeYCordinate[numSegments - 1] = snakeYCordinate[numSegments - 2];

  }
  if (direction === "down") {

    snakeXCordinate[numSegments - 1] = snakeXCordinate[numSegments - 2];
    snakeYCordinate[numSegments - 1] = snakeYCordinate[numSegments - 2] + spaceBetweenCircles;

  }
}
// check to see if snake is out of bounds or not
function checkGameStatus() {
  if (
    snakeXCordinate[snakeXCordinate.length - 1] > width ||
    snakeXCordinate[snakeXCordinate.length - 1] < 0 ||
    snakeYCordinate[snakeYCordinate.length - 1] > height ||
    snakeYCordinate[snakeYCordinate.length - 1] < 0 ||
    checkSnakeCollision()
  ) {
    noLoop();
    let ScoreCounter = parseInt(scoreElem.html().substring(8));
    scoreElem.html("Game ended! Your score was : " + ScoreCounter);
  }
}
// checker to see if the snake hits the snake
function checkSnakeCollision() {
  let snakeHeadX = snakeXCordinate[snakeXCordinate.length - 1];
  let snakeHeadY = snakeYCordinate[snakeYCordinate.length - 1];
  for (let i = 0; i < snakeXCordinate.length - 1; i++) {
    if (snakeXCordinate[i] === snakeHeadX && snakeYCordinate[i] === snakeHeadY) {
      return true;
    }
  }
}
// checker to see if the apple is consumed or not
function checkForapple() {
  point(appleXCordinate, appleYCordinate);
  if (snakeXCordinate[snakeXCordinate.length - 1] === appleXCordinate && snakeYCordinate[snakeYCordinate.length - 1] === appleYCordinate) {
    let prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html("Score = " + (prevScore + 1));
    snakeXCordinate.unshift(snakeXCordinate[0]);
    snakeYCordinate.unshift(snakeYCordinate[0]);
    numSegments++;
    updateappleCoordinates();
  }
}
// place a new apple
function updateappleCoordinates() {
  appleXCordinate = floor(random(10, (width - 100) / 10)) * 10;
  appleYCordinate = floor(random(10, (height - 100) / 10)) * 10;
}
// keyboard functions
function keyPressed() {

}
// color changer
function changeColorOfObjectSpecified() {
  if (mouseIsPressed) {
    r = random(255);
    g = random(255);
    b = random(255);
    stroke(r, g, b);
  }
}
// function setup() {
//   scoreElem = createDiv("Score = 0");
//   scoreElem.position(20, 20);
//   scoreElem.style("color", "white");
//   createCanvas(windowWidth, windowHeight);
//   frameRate(15);
//   stroke(r, g, b);
//   strokeWeight(10);
//   updateappleCoordinates();
//   for (let i = 0; i < numSegments; i++) {
//     snakeXCordinate.push(xStart + i * spaceBetweenCircles);
//     snakeYCordinate.push(yStart);
//   }
// }
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
// main
// function draw() {
//   background(backR, backG, backB);
//   for (let i = 0; i < numSegments - 1; i++) {
//     line(snakeXCordinate[i], snakeYCordinate[i], snakeXCordinate[i + 1], snakeYCordinate[i + 1]);
//   }
//   updateSnakeCoordinates();
//   checkGameStatus();
//   checkForapple();
//   changeColorOfObjectSpecified();
// }








function draw() {
  gameChecker();
}