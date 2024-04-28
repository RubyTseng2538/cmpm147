"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/
let grass;
let flower;
let flower2;
let flower3;
let log;
let water;
let bush;
let bush2;
let dirt;
let worldSeed;

function p3_preload() {
  grass = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_037.png?v=1714020250808");
  bush2 = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_040.png?v=1714020251469");
  bush = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_029.png?v=1714020249032");
  flower = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_041.png?v=1714020251677");
  flower2 = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_046.png?v=1714020252881");
  flower3 = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_044.png?v=1714020252398");
  log = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_051.png?v=1714020254184");
  water = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_104.png?v=1714020239650");
  dirt = loadImage("https://cdn.glitch.global/9af21925-1dc0-494d-a213-c85dd70ad767/tile_007.png?v=1714020244110");
  
}

function p3_setup() {}


function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();

  if (XXH.h32("tile:" + [i, j], worldSeed) % 30 == 0) {
    image(bush, i, j-th, 64, 48);
  } else if(XXH.h32("tile:" + [i, j], worldSeed) % 6 == 0){
    image(grass, i, j-th, 64, 48);
    image(flower, i, j-th-10, 64, 48);
  }else if(XXH.h32("tile:" + [i, j], worldSeed) % 9 == 0){
    image(grass, i, j-th, 64, 48);
    image(flower2, i, j-th-10, 64, 48);
  }else if(XXH.h32("tile:" + [i, j], worldSeed) % 15 == 0){
    image(grass, i, j-th, 64, 48);
    image(log, i, j-th-15, 64, 48);
  }else if(XXH.h32("tile:" + [i, j], worldSeed) % 4 == 0){
    image(grass, i, j-th, 64, 48);
  }else if(XXH.h32("tile:" + [i, j], worldSeed) % 3 == 0){
    image(dirt, i, j-th+5, 64, 48);
  }
  
  else {
    image(bush, i, j-th, 64, 48);
  }

  push();

  beginShape();

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    image(flower3, i-tw, j-th-20, 64, 48);
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  vertex(-tw, -10);
  vertex(-tw, 0);
  vertex(0, th-5);
  vertex(tw, 0);
  vertex(tw, -10);
  vertex(0, -th-5);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}