// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;
let seed = 0;
const skyColor = "#01B1FC";
const bridgeColor = "#A9A5A2";
const treeColor = "#3E572F";
const treeColor2 = "#8CAF47";
let t =0;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

$("#reimagine").click(function() {
  seed++;
});

// setup() function is called once when the program starts
function setup() {  
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  
}


// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);
  background(100);
  fill(skyColor);
  rect(0, 0, width, height);
  
  stroke("#031517");
  strokeWeight(1);
  line(0, height/2, width, height/2);
  
  
  
 
  
  // let noiseLevel2 = 100;
  // let noiseScale2 = 0.002;
  
  for(let i =0; i<100*(width/200); i++){
    noStroke();
    fill('rgba(220, 230, 255, 0.1)');
    ellipse(random(0, width), random(0, height/2-50), random(10, 20), random(10, 20));
    ellipse(random(0, width), random(0, height/2-50), random(30, 40), random(30, 40));
    ellipse(random(0, width), random(0, height/2-50), random(50, 60), random(30, 40));
    ellipse(random(0, width), random(0, height/2-50), random(70, 80), random(30, 40));
    ellipse(random(0, width), random(0, height/2-50), random(90, 100), random(30, 40));
    fill('rgba(168, 204, 228, 0.1)');
    ellipse(random(0, width), random(0, height/2-50), random(10, 20), random(10, 20));
    ellipse(random(0, width), random(0, height/2-50), random(30, 40), random(30, 40));
    ellipse(random(0, width), random(0, height/2-50), random(50, 60), random(30, 40));
    ellipse(random(0, width), random(0, height/2-50), random(70, 80), random(30, 40));
    ellipse(random(0, width), random(0, height/2-50), random(90, 100), random(30, 40));
    fill('rgba(110, 174, 212, 0.1)');
    ellipse(random(0, width), random(0, height/2-50), random(10, 20), random(10, 20));
    ellipse(random(0, width), random(0, height/2-50), random(30, 40), random(30, 40));
    ellipse(random(0, width), random(0, height/2-50), random(50, 60), random(30, 40));
    ellipse(random(0, width), random(0, height/2-50), random(70, 80), random(30, 40));
    ellipse(random(0, width), random(0, height/2-50), random(90, 100), random(30, 40));
    fill('rgba(255, 255, 255, 0.2)');
    ellipse(random(0, width), random(0, height/2-50), random(10, 20), random(10, 20));
    ellipse(random(0, width), random(0, height/2-50), random(30, 40), random(30, 40));
    ellipse(random(0, width), random(0, height/2-50), random(50, 60), random(30, 40));
    ellipse(random(0, width), random(0, height/2-50), random(70, 80), random(30, 40));
    ellipse(random(0, width), random(0, height/2-50), random(90, 100), random(30, 40));
    
    
  }
  filter(BLUR, 2);
  
  stroke("black");
  
  stroke("#031517");
  fill(treeColor);
  const trees = 150*(width/300) + floor(random(50*(width/300))) ; // Adjust the range to generate more trees
  for (let i = 0; i < trees; i++) {
    let z = random();
    let x = width * (random() / z % 1);
    let s = random(10, 70); // Keep the height less than 20
    let y = height / 2;
    triangle(x, y - s, x - s / 4, y, x + s / 4, y);
  }
  
  fill(treeColor2);
  const trees2 = 50*(width/300) + floor(random(25*(width/300))); // Adjust the range to generate more trees
  for (let i = 0; i < trees2; i++) {
    let z = random();
    let x = width * (random() / z % 1);
    let s = random(10, 70); // Keep the height less than 20
    let y = height / 2;
    triangle(x, y - s, x - s / 4, y, x + s / 4, y);
  }
  
  noStroke();
  fill('rgba(255, 255, 255, 0.05)');
  for (let i = 0; i < width; i += 1) { // Reduced step size for smoother appearance
    for (let j = height/2; j < height; j += 1) { // Reduced step size for smoother appearance
      let x = i;
      let y = j;
      let w = (sin(j * j + i / j - t * 7) + cos(j ** 5 - i / j * 6 + t) ** 3) * j / 50;
      rect(x, y, w, 1); // Keep the height of rectangles 1 for a smooth appearance
    }
  }
  t += 0.1*noise(millis() / 1000.0);
  
  
  stroke("#031517");
  fill(bridgeColor);
  quad(width/2-150, height, width/2-50, height/2+150, width/2+50, height/2+150, width/2+150, height);
  
  
  for(let i =1; i<(height/100);i++){
    stroke("#031517");
    strokeWeight(1);
    line(width/2-(150-15*i-(height/100*i)),height-(30*i), width/2+(150-15*i-(height/100*i)), height-(30*i));
  }
  
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}