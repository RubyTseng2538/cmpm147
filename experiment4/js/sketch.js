// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

let grass;
let flower;
let flower2;
let flower3;
let log;
let bush;
let bush2;
let dirt;
let worldSeed;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function preload() {
  // tilesetImage = loadImage('./img/tiles.png');
  grass = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_037.png?v=1714020250808");
  bush2 = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_040.png?v=1714020251469");
  bush = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_029.png?v=1714020249032");
  flower = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_041.png?v=1714020251677");
  flower2 = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_046.png?v=1714020252881");
  flower3 = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_044.png?v=1714020252398");
  log = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_051.png?v=1714020254184");
  dirt = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_007.png?v=1714020244110");
}

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function regenerateGrid() {
  select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

function generateGrid(numCols, numRows) {
  let grid = [];

  // Fill the grid with background code
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }
  
  // Fill grid with dots in random locations
  for (let i = 0; i < numRows - Math.floor(Math.random() * 5); i++) {
    for (let j = 2; j < Math.floor(Math.random() * (numCols - 4)) + 4; j++) {
      grid[i][j] = "."; 
    }
  }

  // Fill grid with '#' from row 3 to numRows
  for (let i = 3; i < numRows; i++) {
    for (let j = 15; j < numCols; j++) {
      grid[i][j] = "#";
    }
  }

  // Fill grid with '_' in random locations
  for (let i = 0; i < numRows - Math.floor(Math.random() * 5); i++) {
    for (let j = 0; j < Math.floor(Math.random() * 4) + 3; j++) {
      grid[i][j] = "_"; 
    }
  }

  // Fill grid with '_' in random locations from column 13 to a random column within range
  for (let i = 3; i < numRows; i++) {
    for (let j = 13; j < Math.floor(Math.random(0) * 5) + 13; j++) {
      grid[i][j] = "_"; 
    }
  }
  
  // Place chests '!' in random locations
  let ranChest = Math.floor(Math.random() * 5) + 1;
  let chestCount = 0;
  let x;
  let y;
  
  while (chestCount < ranChest) {
    x = Math.floor(Math.random() * numRows);
    y = Math.floor(Math.random() * numCols);
    if (grid[x][y] === "_") {
      grid[x][y] = "!";
      chestCount++;
    }
  }

  return grid;
}


function drawGrid(grid) {
  background(128);
  
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == '_') {
        placeTile(i, j, random(3), 12);
        drawContext2(grid, i, j, ".", 15, 12);
      }
      if (grid[i][j] == '.') {
        placeTile(i, j, 0, 1);
        placeTile(i, j, 16, 13);
      }
      if (grid[i][j] == "#"){
        placeTile(i, j, random(3), 13);
        drawContext(grid, i, j, "_", 9, 12);
      }
      if(grid[i][j] == "!"){
        placeTile(i, j, random(3), 12);
        placeTile(i, j, 27, 0);
      }
    }
  }
  noStroke();
  let currentTime = millis();

  // Calculate time difference since last frame
  let deltaTime = currentTime - lastTime;

  // Update y position based on deltaTime
  y += (deltaTime / 1000) * speed;

  for (let s = 0; s < snowflakes; s++) {
    let x = random(width);
    let size = random(1, 6);
    ellipse(x, y + random(1200), size, size); // Changed to ellipse
  }

  // Reset y position if it exceeds window height
  if (y > height) {
    y = -600;
  }

  lastTime = currentTime;
} 
 

// Function to check if location (i, j) is inside the grid and equals the target
function gridCheck(grid, i, j, target) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  return i >= 0 && i < numRows && j >= 0 && j < numCols && grid[i][j] === target;
}

// Function to form a 4-bit code using gridCheck on the north/south/east/west neighbors of (i, j) for the target code
function gridCode(grid, i, j, target) {
  let code = 0;
  if (gridCheck(grid, i - 1, j, target)) code += 1; // North neighbor
  if (gridCheck(grid, i + 1, j, target)) code += 2; // South neighbor
  if (gridCheck(grid, i, j + 1, target)) code += 4; // East neighbor
  if (gridCheck(grid, i, j - 1, target)) code += 8; // West neighbor
  return code;
}

// Function to draw the tile based on context
function drawContext(grid, i, j, target, ti, tj) {
  const code = gridCode(grid, i, j, target);
  const [tiOffset, tjOffset] = lookup[code];
  placeTile(i, j, ti + tiOffset, tj + tjOffset);
}

function drawContext2(grid, i, j, target, ti, tj) {
  const code = gridCode(grid, i, j, target);
  const [tiOffset, tjOffset] = lookup2[code];
  placeTile(i, j, ti + tiOffset, tj + tjOffset);
}

// // Global variable referring to an array of 16 elements for tile offset pairs
const lookup = [
  [1, 1], [1, 0], [1, 2], [0, 0],
  [2, 1], [2, 0], [2, 2], [1, 1],
  [0, 1], [0, 0], [0, 2], [0, 0],
  [2, 2], [1, 1], [1, 1], [1, 1]
];

const lookup2 = [
  [-1, 2], [1, 2], [1, 0], [2, 2],
  [0, 1], [0, 2], [0, 0], [-1, 0],
  [1, 2], [0, 0], [2, 0], [2, 1],
  [0, 0], [0, 1], [1, 0], [1, 1]
];

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  // resize canvas is the page is resized
  numCols = select("#asciiBox").attribute("rows") | 0;
  numRows = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvas-container");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);
  select("#asciiBox").input(reparseGrid);

  reseed();

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);
  drawGrid(currentGrid);
}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}