/* eslint-disable no-extra-parens */
// Major Project/ Battleship
// Vrajesh Patel
// 2021/2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Battleship Variables and Some whole Game Variables
let cellWidth, timerForScreenChange;
let hoverXForPlayer1 = 0;
let hoverYForPlayer1 = 0;
let hoverXForPlayer2 = 0;
let hoverYForPlayer2 = 0;
let numbersToLetters = new Map();
let whiteGrid = false;
let gridForPlayer1;
let gridForPlayer2;
let gridSizeForBattleShip = 11;
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

// SnakeGameStuff
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

// GridBasedGame Variables
let gridSizeForGridBasedGame = 20;
let grid;
let water, sand, grass, wall, bot, end, level1, level2, level3, level4, level5, level6, level7, level8;
let levelSelect;
let playerX = 0;
let playerY = 0;
let playerSpeed, terrainChecker, blank;
let counter;
let lastTimeSwitched = 0;
let theTime = 200;
let previousBlock = 1;
let blockNumber = 0;
let stateOfGridGame = "starterScreenForGridGame";
let winState;
let winStateForBoxes = false;

// Preload the images and 2d arrays
function preload() {
  grass = loadImage("assets/grass.jpg");
  water = loadImage("assets/water.jpg");
  sand = loadImage("assets/sand.jpg");
  wall = loadImage("assets/wall.png");
  bot = loadImage("assets/bot.png");
  end = loadImage("assets/end.png");
  level1 = loadJSON("assets/level1.json");
  level2 = loadJSON("assets/level2.json");
  level3 = loadJSON("assets/level3.json");
  level4 = loadJSON("assets/level4.json");
  level5 = loadJSON("assets/level5.json");
  level6 = loadJSON("assets/level6.json");
  level7 = loadJSON("assets/level7.json");
  level8 = loadJSON("assets/level8.json");
}


// Setup the Basic variables
function setup() {
  createCanvas(windowWidth, windowHeight);
  // BattleShipSetup
  gridForPlayer1 = createGridOfPlayer(gridSizeForBattleShip, gridSizeForBattleShip);
  gridForPlayer2 = createGridOfPlayer(gridSizeForBattleShip, gridSizeForBattleShip);
  setupOfMap();
  gridForPlayer1[hoverYForPlayer1][hoverXForPlayer1] = 9;
  gridForPlayer2[hoverYForPlayer2][hoverXForPlayer2] = 9;

  // Snake Setup
  scoreElem = createDiv("Score = 0");
  scoreElem.position(20, 20);
  scoreElem.style("color", "white");
  createCanvas(windowWidth, windowHeight);
  frameRate(15);
  stroke(r, g, b);
  strokeWeight(10);
  updateappleCoordinates();
  for (let i = 0; i < numSegments; i++) {
    snakeXCordinate.push(xStart + i * spaceBetweenCircles);
    snakeYCordinate.push(yStart);
  }
}

// setup for number to letters for battleship
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

// display a starter screen and check which game needs to run
function gameChecker() {
  if (stateOfGame === "loadingScreen") {
    starterScreen();
  }
  if (stateOfGame === "battleshipStart") {
    battleshipStateChecker();
  }
  if (stateOfGame === "snakeGameStart") {
    background(backR, backG, backB);
    for (let i = 0; i < numSegments - 1; i++) {
      line(snakeXCordinate[i], snakeYCordinate[i], snakeXCordinate[i + 1], snakeYCordinate[i + 1]);
    }
    updateSnakeCoordinates();
    checkGameStatus();
    checkForapple();
  }
  if (stateOfGame === "gridGameStart") {
    stateCheckerForGridGame();
  }
}

// start screen in the begining to decide which game to play
function starterScreen() {
  strokeWeight(1);
  frameRate(60);
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
  text("Grids", width / 4, height / 2 + 10);
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


// Mouse press for all games including starter screen 
function mousePressed() {
  // chose which game you want to play
  if (stateOfGame === "loadingScreen") {
    if (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 * 3 + 100 && mouseX > width / 4 * 3 - 100) {
      stateOfGame = "battleshipStart";
    }
    if (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 * 2 + 100 && mouseX > width / 4 * 2 - 100) {
      stateOfGame = "snakeGameStart";
    }
    if (mouseY < height / 2 + 50 && mouseY > height / 2 - 50 && mouseX < width / 4 + 100 && mouseX > width / 4 - 100) {
      stateOfGame = "gridGameStart";
    }
  }
  // snake mouse press
  if (stateOfGame === "snakeGameStart") {
    frameRate(15);
    stroke(r, g, b);
    strokeWeight(10);
    r = random(255);
    g = random(255);
    b = random(255);
    stroke(r, g, b);
  }

  // gridGame mouse press
  if (stateOfGame === "gridGameStart") {
    if (stateOfGridGame === "starterScreenForGridGame") {
      if (mouseX >= width / 2 - 200 && mouseX <= width / 2 + 200 && mouseY >= height / 2 - 50 && mouseY <= height / 2 + 50) {
        stateOfGridGame = levelSelect;
      }
    }

    if (stateOfGridGame === levelSelect) {
      if (mouseX >= width / 5 - 15 && mouseX <= width / 5 + 15 && mouseY >= height / 3 - 15 && mouseY <= height / 3 + 15) {
        stateOfGridGame = level1;
      }
      if (mouseX >= width / 5 * 2 - 15 && mouseX <= width / 5 * 2 + 15 && mouseY >= height / 3 - 15 && mouseY <= height / 3 + 15) {
        stateOfGridGame = level2;
      }
      if (mouseX >= width / 5 * 3 - 15 && mouseX <= width / 5 * 3 + 15 && mouseY >= height / 3 - 15 && mouseY <= height / 3 + 15) {
        stateOfGridGame = level3;
      }
      if (mouseX >= width / 5 * 4 - 15 && mouseX <= width / 5 * 4 + 15 && mouseY >= height / 3 - 15 && mouseY <= height / 3 + 15) {
        stateOfGridGame = level4;
      }
      if (mouseX >= width / 5 - 15 && mouseX <= width / 5 + 15 && mouseY >= height / 3 * 2 - 15 && mouseY <= height / 3 * 2 + 15) {
        stateOfGridGame = level5;
      }
      if (mouseX >= width / 5 * 2 - 15 && mouseX <= width / 5 * 2 + 15 && mouseY >= height / 3 * 2 - 15 && mouseY <= height / 3 * 2 + 15) {
        stateOfGridGame = level6;
      }
      if (mouseX >= width / 5 * 3 - 15 && mouseX <= width / 5 * 3 + 15 && mouseY >= height / 3 * 2 - 15 && mouseY <= height / 3 * 2 + 15) {
        stateOfGridGame = level7;
      }
      if (mouseX >= width / 5 * 4 - 15 && mouseX <= width / 5 * 4 + 15 && mouseY >= height / 3 * 2 - 15 && mouseY <= height / 3 * 2 + 15) {
        stateOfGridGame = level8;
      }

    }
    if (stateOfGridGame === level5) {
      let cellWidth = width / gridSizeForGridBasedGame;
      let cellHeight = height / gridSizeForGridBasedGame;
      let cellX = Math.floor(mouseX / cellWidth);
      let cellY = Math.floor(mouseY / cellHeight);

      swap(cellX, cellY);
    }
    if (stateOfGridGame === level6) {
      let cellWidth = width / gridSizeForGridBasedGame;
      let cellHeight = height / gridSizeForGridBasedGame;
      let cellX = Math.floor(mouseX / cellWidth);
      let cellY = Math.floor(mouseY / cellHeight);

      swap(cellX, cellY);
      swap(cellX + 1, cellY);
      swap(cellX - 1, cellY);
    }
    if (stateOfGridGame === level7) {
      let cellWidth = width / gridSizeForGridBasedGame;
      let cellHeight = height / gridSizeForGridBasedGame;
      let cellX = Math.floor(mouseX / cellWidth);
      let cellY = Math.floor(mouseY / cellHeight);

      swap(cellX, cellY);
      swap(cellX, cellY + 1);
      swap(cellX, cellY - 1);
    }
    if (stateOfGridGame === level8) {
      let cellWidth = width / gridSizeForGridBasedGame;
      let cellHeight = height / gridSizeForGridBasedGame;
      let cellX = Math.floor(mouseX / cellWidth);
      let cellY = Math.floor(mouseY / cellHeight);

      swap(cellX, cellY);
      swap(cellX + 1, cellY);
      swap(cellX - 1, cellY);
      swap(cellX, cellY + 1);
      swap(cellX, cellY - 1);
    }
  }
}

// key press for all
function keyPressed() {
  if (key === "q") {
    stateOfGame = "loadingScreen";
  }

  // key presses for battleship
  if (stateOfGame === "battleshipStart") {
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
    // white grid hover move around
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
    //  blue grid hover move around
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
    //  attack for battleship
    if (battleshipState === "battleshipGame") {
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
  }

  // snake game key presses
  if (stateOfGame === "snakeGameStart") {
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
      break;
    }
  }

  // grid game key presses
  if (stateOfGame === "gridGameStart") {
    if (key === "s") {
      if (millis() > lastTimeSwitched + theTime) {
        trytoMoveCharacterInGridGame(playerX, playerY + 1);
        lastTimeSwitched = millis();
      }
    }
    if (key === "w") {
      if (millis() > lastTimeSwitched + theTime) {
        trytoMoveCharacterInGridGame(playerX, playerY - 1);
        lastTimeSwitched = millis();
      }
    }
    if (key === "a") {
      if (millis() > lastTimeSwitched + theTime) {
        trytoMoveCharacterInGridGame(playerX - 1, playerY);
        lastTimeSwitched = millis();
      }
    }
    if (key === "d") {
      if (millis() > lastTimeSwitched + theTime) {
        trytoMoveCharacterInGridGame(playerX + 1, playerY);
        lastTimeSwitched = millis();
      }
    }
    if (key === "r") {
      stateOfGridGame = levelSelect;
    }
  }
}

// battleship state checker so it basically runs which section of the game needs to run
function battleshipStateChecker() {
  if (battleshipState === "instructionsOfBattleship") {
    pregameBattleship();
  }
  if (battleshipState === "battleshipGame") {
    battleshipGame();
  }
}

// checks if someone has won in Battleship or not
function winCheckerForBattleship() {
  if (whiteShipsAlive === 0) {
    whiteWins();
  }
  if (blueShipsAlive === 0) {
    blueWins();
  }
}
// instructions for how to play battleship
function pregameBattleship() {
  stroke(0);
  background(255);
  text("Press Space to Countine", width / 2, height - 50);
  text("The Classic Game of Battleship", width / 2, 100);
  text("Expect it's not, This game is much worse than that", width / 2, 150);
  text("Anyways Lets Get to it", width / 2, 200);
  text("Player 1 will be the White grid/Left grid", width / 2, 300);
  text("Player 2 will be the Blue grid/Right grid", width / 2, 350);
  text("Both Players Must Use WASD To move your target location", width / 2, 400);
  text("Press Space to place ships", width / 2, 500);
  text("Once you finish placing your ships Press Z", width / 2, 550);
  text("Once both Players have placed their 5 ships press Z again", width / 2, 600);
  text("Use WASD to Move around and press SPACE to fire", width / 2, 650);
}


// creates a grid for battleship
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
// displays the blue grid in battleship
function displayGridForPlayer2() {
  if (blueBoatCount === 0 && boatsForBlue === false) {
    boatsForBlue = true;
  }
  if (blueBoatCount === 0 && blueInstructions) {
    fill("white");
    text("All Boats Have Been Placed", width / 4, height / 2 - 200);
  }
  stroke(255);
  cellWidth = (width / 2.5) / gridSizeForBattleShip;
  for (let y = 0; y < gridSizeForBattleShip; y++) {
    for (let x = 0; x < gridSizeForBattleShip; x++) {
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

// displays the white grid in battleship
function displayGridForPlayer1() {
  if (whiteBoatCount === 0 && boatsForWhite === false) {
    boatsForWhite = true;
  }
  if (whiteBoatCount === 0 && whiteInstructions) {
    fill("blue");
    text("All Boats Have Been Placed", width / 4 * 3, height / 2 - 200);
  }
  stroke("blue");
  cellWidth = (width / 2.5) / gridSizeForBattleShip;
  for (let y = 0; y < gridSizeForBattleShip; y++) {
    for (let x = 0; x < gridSizeForBattleShip; x++) {
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

// displays which grid needs to be displayed
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

// checks if a boat needs to be placed and if the attack missed or landed for white grid
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

// changes grid to other player
function changeGrid() {
  whiteGrid = !whiteGrid;
}

// checks if a boat needs to be placed and if the attack missed or landed for blue grid
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

// recenters the green hover character
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

// try to move the hover character for battleship for white grid
function tryToMoveToPlayer1(newX, newY) {
  if (newX >= 0 && newY >= 0 && newX < gridSizeForBattleShip && newY < gridSizeForBattleShip) {
    // reset current hover spot to 0/empty  
    gridForPlayer1[hoverYForPlayer1][hoverXForPlayer1] = previousBlockForPlayer1;
    previousBlockForPlayer1 = gridForPlayer1[newY][newX];
    hoverXForPlayer1 = newX;
    hoverYForPlayer1 = newY;
    gridForPlayer1[hoverYForPlayer1][hoverXForPlayer1] = 9;
  }
}

// try to move the hover character for battleship for blue grid
function tryToMoveToPlayer2(newX, newY) {
  if (newX >= 0 && newY >= 0 && newX < gridSizeForBattleShip && newY < gridSizeForBattleShip) {
    // reset current hover spot to 0/empty  
    gridForPlayer2[hoverYForPlayer2][hoverXForPlayer2] = previousBlockForPlayer2;
    previousBlockForPlayer2 = gridForPlayer2[newY][newX];
    hoverXForPlayer2 = newX;
    hoverYForPlayer2 = newY;
    gridForPlayer2[hoverYForPlayer2][hoverXForPlayer2] = 9;
  }
}

// when white wins in battleship
function whiteWins() {
  background("white");
  text("White Wins!", width / 2, height / 2);
}
// when blue wins in battleship
function blueWins() {
  background("blue");
  text("Blue Wins!", width / 2, height / 2);
}

// SnakeGame code below

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

// Grid Game code below

function stateCheckerForGridGame() {
  // fill("white");
  strokeWeight(1);
  stroke("white");
  if (stateOfGridGame === "starterScreenForGridGame") {
    starterScreenForGridGame();
  }
  else if (stateOfGridGame === levelSelect) {
    levelSelector(width / 5, height / 3, 100, 60);
  }
  if (stateOfGridGame === level1) {
    grid = level1;
    displayGridWorld();
  }
  if (stateOfGridGame === level2) {
    grid = level2;
    displayGridWorld();
  }
  if (stateOfGridGame === level3) {
    grid = level3;
    displayGridWorld();
  }
  if (stateOfGridGame === level4) {
    grid = level4;
    displayGridWorld();
  }
  if (stateOfGridGame === level5) {
    grid = level5;
    displayGridBoxes();
  }
  if (stateOfGridGame === level6) {
    grid = level6;
    displayGridBoxes();
  }
  if (stateOfGridGame === level7) {
    grid = level7;
    displayGridBoxes();
  }
  if (stateOfGridGame === level8) {
    grid = level8;
    displayGridBoxes();
  }
}

// The Starting Screen
function starterScreenForGridGame() {
  background(0, 255, 255);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height / 2, 400, 100);
  textAlign(CENTER);
  textSize(width / 13);
  text("Welcome To The Game", width / 2, 125);
  textSize(width / 20);
  text("Start", width / 2, height / 2 + 35);
  text("Water = 1x        Sand = 2X        Grass = 3X", width / 2, height / 2 + 200);
  textSize(width / 40);
  text("For Levels 1-4 Try To Get The Robot From The Top Left To The Bottom Right/Endzone", width / 2, height / 5 + 75);
  text("For Levels 5-8 Try To Get All The Square To Be White Levels 5-8 Will Be Much Harder", width / 2, height / 4 + 125);
  textSize(width / 60);
}

// Select Level Screen
function levelSelector(width, height, widthOfBox, heightOfBox) {
  background(0, 255, 255);
  textSize(width / 15);
  textAlign(CENTER);

  rect(width, height, widthOfBox, heightOfBox);
  text("Level 1", width, height + 10);

  rect(width * 2, height, widthOfBox, heightOfBox);
  text("Level 2", width * 2, height + 10);

  rect(width * 3, height, widthOfBox, heightOfBox);
  text("Level 3", width * 3, height + 10);

  rect(width * 4, height, widthOfBox, heightOfBox);
  text("Level 4", width * 4, height + 10);

  rect(width, height * 2, widthOfBox, heightOfBox);
  text("Level 5", width, height * 2 + 10);

  rect(width * 2, height * 2, widthOfBox, heightOfBox);
  text("Level 6", width * 2, height * 2 + 10);

  rect(width * 3, height * 2, widthOfBox, heightOfBox);
  text("Level 7", width * 3, height * 2 + 10);

  rect(width * 4, height * 2, widthOfBox, heightOfBox);
  text("Level 8", width * 4, height * 2 + 10);

  rectMode(CENTER);
}
// The Winner Screen
function winner() {
  background(255);
  text("You Won Press R to go to Level Selector", width / 2, height / 2);
  textSize(width / 20);
  textAlign(CENTER);
}


//  Moves the player/robot
function trytoMoveCharacterInGridGame(newX, newY) {

  // checker for the time delay needed
  terrainChecker = grid[newY][newX];
  if (terrainChecker === 1) {
    theTime = 200;
  }
  else if (terrainChecker === 2) {
    theTime = 400;
  }
  else if (terrainChecker === 0) {
    theTime = 600;
  }
  if (newX >= 0 && newY >= 0 && newX < gridSizeForGridBasedGame && newY < gridSizeForGridBasedGame) {
    if (grid[newY][newX] === 0 || grid[newY][newX] === 1 || grid[newY][newX] === 2 || grid[newY][newX] === 20) {
      // reset current player spot to 0/empty  
      grid[playerY][playerX] = previousBlock;
      previousBlock = grid[newY][newX];
      playerX = newX;
      playerY = newY;
      grid[playerY][playerX] = 9;
    }
  }
}

//  displays the images where they need to be displayed
function displayGridWorld() {
  let cellWidth = width / gridSizeForGridBasedGame;
  let cellHeight = height / gridSizeForGridBasedGame;
  grid[playerY][playerX] = 9;
  grid[gridSizeForGridBasedGame - 1][gridSizeForGridBasedGame - 1] = 20;
  for (let y = 0; y < gridSizeForGridBasedGame; y++) {
    for (let x = 0; x < gridSizeForGridBasedGame; x++) {
      if (grid[y][x] === 0) {
        image(water, x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 1) {
        image(grass, x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 2) {
        image(sand, x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 3) {
        image(wall, x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      }
      if (grid[y][x] === 9) {
        image(bot, x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      }
      if (grid[y][x] === 20) {
        image(end, x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      }
    }
  }
  // checks for win
  if (playerX === 19 && playerY === 19) {
    stateOfGridGame === blank;
    winner();
  }
}
// display the grid boxes
function displayGridBoxes() {
  counter = 0;
  let cellWidth = width / gridSizeForGridBasedGame;
  let cellHeight = height / gridSizeForGridBasedGame;
  for (let y = 0; y < gridSizeForGridBasedGame; y++) {
    for (let x = 0; x < gridSizeForGridBasedGame; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        counter++;
        fill("black");
      }
      stroke(0);
      rectMode(CORNER);
      rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
    }
  }
  if (counter === 0) {
    stateOfGridGame === blank;
    winner();
  }
}
// swaps black to white and vice versa
function swap(x, y) {
  if (x >= 0 && x < gridSizeForGridBasedGame && y >= 0 && y < gridSizeForGridBasedGame) {
    if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
  }
}
// calls the game checker
function draw() {
  gameChecker();
  winCheckerForBattleship();
}
