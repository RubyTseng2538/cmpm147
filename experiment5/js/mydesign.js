/* exported p4_inspirations, p4_initialize, p4_render, p4_mutate */


function getInspirations() {
  return [
    {
      name: "circle", 
      assetUrl: "img/circle.jpg",
      credit: "https://in.pinterest.com/pin/elegant-black-and-white-party-lights-bokeh-effect-background-elegant-black-white-background-image-and-wallpaper-for-free-download--462041243027303084/"
    },
    {
      name: "mountains", 
      assetUrl: "img/mountains.jpg",
      credit: "https://wallpaperset.com/black-white-background"
    },
    {
      name: "Line", 
      assetUrl: "img/rock.jpg",
      credit: "https://www.creative-photographer.com/black-white-landscape-photos/"
    }
  ];
}

function initDesign(inspiration) {
  // set the canvas size based on the container
  let canvasContainer = $('.image-container'); // Select the container using jQuery
  let canvasWidth = canvasContainer.width(); // Get the width of the container
  let aspectRatio = inspiration.image.height / inspiration.image.width;
  let canvasHeight = canvasWidth * aspectRatio; // Calculate the height based on the aspect ratio
  resizeCanvas(canvasWidth/1.5, canvasHeight/1.5);
  $(".caption").text(inspiration.credit); // Set the caption text

  // add the original image to #original
  const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`
  $('#original').empty();
  $('#original').append(imgHTML);

  let shapeSize =  Math.min(inspiration.image.height , inspiration.image.width) / 4
  
  let design = {
    bg: 40,
    fg: []
  }
  if(inspiration.name == "circle"){
    for(let i = 0; i < 300; i++) {
      design.fg.push({x: random(width),
                      y: random(height),
                      w: random(shapeSize),
                      h: random(shapeSize),
                      fill: 'black'})  
    }
  }else if(inspiration.name == "mountains"){
    for(let i = 0; i < 300; i++) {
      let mountainsShape = random(shapeSize)
      let w = random(width);
      let h = random(height);
      let angle = random(360);
      let mountains = getmountainsPoints(mountainsShape, mountainsShape, w, h, angle);
      design.fg.push({x1: mountains[0].x,
                      y1: mountains[0].y,
                      x2: mountains[1].x,
                      y2: mountains[1].y,
                      x3: mountains[2].x,
                      y3: mountains[2].y,
                      shape: mountainsShape,
                      w: w,
                      h: h,
                      angle: angle,
                      fill: random(255)})
    }
  }
  else{
    for(let i = 0; i < 300; i++) {
      design.fg.push({x: random(width),
                      y: random(height),
                      w: random(shapeSize),
                      h: random(shapeSize),
                      fill: random(255)})
    
  }
}
  return design;
}

function renderDesign(design, inspiration) {
  
  background(design.bg);
  noStroke();
  if(inspiration.name == "circle"){
    for(let box of design.fg) {
      fill(box.fill, 90);
      if(box.w > box.h){
        circle(box.x, box.y, box.h);
      }else{
        circle(box.x, box.y, box.w);
      }
    }
  }else if(inspiration.name == "mountains"){
    for(let box of design.fg) {
      fill(box.fill, 90);
      triangle(box.x1, box.y1, box.x2, box.y2, box.x3, box.y3);
    }
  }else{
    for(let box of design.fg) {
      fill(box.fill, 90);
      rect(box.x, box.y, box.w, box.h);
    }
  }
}

function mutateDesign(design, inspiration, rate) {
  design.bg = mut(design.bg, 0, 255, rate);
  if(inspiration.name == "circle"){
    for(let box of design.fg) {
      box.fill = mut(box.fill, 0, 255, rate);
      box.x = mut(box.x, 0, width, rate);
      box.y = mut(box.y, 0, height, rate);
      box.w = mut(box.w, 0, width/2, rate);
      box.h = mut(box.h, 0, height/2, rate);
    }
  }else if(inspiration.name == "mountains"){
    for(let box of design.fg) {
      box.shape = mut(box.shape, 0, box.shape+50, rate);
      box.w = mut(box.w, 0, width, rate);
      box.h = mut(box.h, 0, height, rate);
      box.angle = mut(box.angle, 0, 360, rate);
      let mountains = getmountainsPoints(box.shape, box.shape, box.w, box.h, box.angle);
      box.fill = mut(box.fill, 0, 255, rate);
      box.x1 = mountains[0].x;
      box.y1 = mountains[0].y;
      box.x2 = mountains[1].x;
      box.y2 = mountains[1].y;
      box.x3 = mountains[2].x;
      box.y3 = mountains[2].y;
    }
  }
  else{
    for(let box of design.fg) {
      box.fill = mut(box.fill, 0, 255, rate);
      box.x = mut(box.x, 0, width, rate);
      box.y = mut(box.y, 0, height, rate);
      box.w = mut(box.w, 0, width/2, rate);
      box.h = mut(box.h, 0, height/2, rate);
    }
  }
}


function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
}

function getmountainsPoints(width, height, x, y, rotation) {
  // Convert rotation from degrees to radians
  var rotationRad = rotation * Math.PI / 180;

  // Calculate the coordinates of the three vertices of the mountains
  var x1 = x;
  var y1 = y;

  var x2 = x + width * Math.cos(rotationRad);
  var y2 = y + width * Math.sin(rotationRad);

  var x3 = x + height * Math.cos(rotationRad + Math.PI / 3); // 120 degrees rotation
  var y3 = y + height * Math.sin(rotationRad + Math.PI / 3); // 120 degrees rotation

  // Return an array containing the coordinates of the three vertices
  return [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x3, y: y3 }
  ];
}