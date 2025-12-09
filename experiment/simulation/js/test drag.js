let rectX, rectY;
let rectWidth = 50;
let rectHeight = 50;
let dragging = false;

function setup() {
  createCanvas(400, 400);
  rectX = width / 2 - rectWidth / 2;
  rectY = height / 2 - rectHeight / 2;
}

function draw() {
  background(220);

    let v=rectanglesIntersect(rectX,rectY,rectWidth,rectHeight,40,40,rectWidth,rectHeight)
u=rectanglesIntersect(rectX,rectY,rectWidth,rectHeight,width / 2 - rectWidth / 2,height / 2 - rectHeight / 2,rectWidth,rectHeight)
  if (!dragging&& v){
    rectX=40;rectY=40;
  }
  else if(!dragging&& u){
    rectX=width / 2 - rectWidth / 2;
    rectY=height / 2 - rectHeight / 2;
  }
  
  // Display the draggable rectangle
  fill(0, 128, 255);
  rect(rectX, rectY, rectWidth, rectHeight);
  
    fill(255, 255, 255,50);
  rect(40, 40, rectWidth, rectHeight);
  rect(width / 2 - rectWidth / 2, height / 2 - rectHeight / 2, rectWidth, rectHeight);
}

function mousePressed() {
  // Check if the mouse is over the rectangle when pressed
  if (mouseX > rectX && mouseX < rectX + rectWidth &&
      mouseY > rectY && mouseY < rectY + rectHeight) {
    dragging = true;
  }
}

function mouseDragged() {
  // If dragging, update the position

  if (dragging) {
    rectX = mouseX - rectWidth / 2;
    rectY = mouseY - rectHeight / 2;
  }
}

function mouseReleased() {
  // Stop dragging when the mouse is released
  dragging = false;
}
function rectanglesIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return (
    x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    y1 + h1 > y2
  );
}