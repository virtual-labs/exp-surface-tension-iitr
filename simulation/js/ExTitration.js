let canvasWidth = 800;
let canvasHeight = 600;

let knob, knob_base, nextimg, bgImg;
let knobImage;
let markerAngle = 0;
let knobRadius = 8;
let isDragging = false;
let offsetX, offsetY;
let stepSize = 10;
let currentStep = 0;
let markerRadius =10;
let Gcapped=false;

let PipetX = 290, PipetY = 354;

let Pstart, Poverflow;

let increaseDH = true, dropHeight = 0, speed = 0;
let raindrops=[];
const drop_dis=[10,20,30];

// let knob_click;--
let shownext;
let nxtx = 740; nxty = 540; nxtw = 50; nxth = 50;
const knob_click = new Audio('songs/drachetOneCut.mp3');
const pumpS = new Audio('songs/pump.mp3');
const knobX =-22, knobY = -100;
let rectX = 100, rectY = 100;
let rectX2 = 145, rectY2 = 40;
let rectX3=30,rectY3=200;

let x1=40,y1=30,x2=150,y2=30,x3=243,y3=365;


let vi;
let waterheight=0,flaskheight=100,flaskY=450;

let pump = false;
let pastDropHeight=0;

let dragging1 = false;
let dragging2 = false;
let dragging3 = false;
let dropCounter=0;
let Bwater=-60;
let weight=0.0;
let process=0;
let machineOn=false, tare=false, tareValue=0;
let newStep;
let frame=0;
let ranWeight=0,ranDrop=0;
let showOnce=true;
// let Gcapped
runOnce=true;
let blinking = true;
let blinkInterval = 200;

let screenOn=false, stopC=false;



class Raindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = (1.1+ranDrop);
    this.radius = 2.2;
    this.active = true;
  }

  update() {
    // console.log('hii upd')
    if (this.active &&Gcapped==false) {
      this.y += this.speed;
      console.log(currentStep)
      // Check if the raindrop has reached the specified y-coordinate
      if (this.y > y3 + flaskheight - waterheight ) { 
        this.active = false; // Set raindrop as inactive   

      }


    }
  }

  display() {
    if (this.active&&this.y > PipetY) {
      noStroke();
      push();
      fill(255, 255, 255, 90);
      ellipse(this.x, this.y, this.radius * 2, this.radius * 2 + 2); pop();
    }
  }
}





function preload() {
  // Load your images
  knob = loadImage('images/knob.png');
  // knob_base = loadImage('knob_base.png');
  // knobM = loadImage('knobMark.png')
  bgImg = loadImage('images/bg.png');
  console.log("Image uploaded---------------")
  nextimg = loadImage('images/Forward.png')
  digitalFont = loadFont('images/DS-DIGIB.TTF');
  console.log("Not uploaded")
  gravity = loadImage('images/gravity.png');
  gravityC = loadImage('images/gravityCap.png');
  gravityW = loadImage('images/gravityWater.png');
  pippet = loadImage('images/pippet.png');
  pumpI = loadImage('images/pump.png');
  SOn=loadImage('images/switchON.png');
  SOff=loadImage('images/switchOF.png');
  buretteStand=loadImage('images/burette51.png');
  beaker=loadImage('images/PotasiumChromate2.png');
  screen=loadImage('images/screenDropC.png')
}

function setup() {
  ranWeight=getRandomNumber(.44,.48);
  ranDrop=getRandomNumber(.1,.2)
  

  canvos = createCanvas(canvasWidth, canvasHeight);
  canvos.parent("#container");
  nxtx = 740; nxty = 540; nxtw = 50; nxth = 50;
  textFont(digitalFont);
  // textColor(0,255,0);
  gravityW.resize(100, 100);


  Pstart = color(0, 255, 0, 100);
  Poverflow = color(255, 0, 0, 100);
  raindrops.length=0;
  console.log(ranWeight,' ',ranDrop);


}


function draw() {
  frame +=1;
  // print(raindrops.length)
  // console.log(waterheight)
  weight=0-tareValue;
  let v2=rectanglesIntersect(x1,y1,100,100,rectX2,rectY2,100,100);
  let u2=rectanglesIntersect(x2,y2,100,100,rectX2,rectY2,100,100);
  let w2=rectanglesIntersect(x3,y3-50,100,100,rectX2,rectY2,100,100);
  let v=rectanglesIntersect(x1,y1,100,100,rectX,rectY,100,100);
let u=rectanglesIntersect(x2,y2,100,100,rectX,rectY,100,100);
let w=rectanglesIntersect(x3,y3,100,100,rectX,rectY,100,100);
  


  // console.log('speed',speed)
  // push();
  // translate(0, 0);
  background(bgImg);
  if(!w||!w2){
    process=0;
  }
  if (waterheight>63){
    waterheight=62;
    if (showOnce){
    alert('The pycnometer is full now put on the cap \n Check the weight of liquid. \n Rest liquid will flow out.')
  showOnce=false;
  shownext=true;
  }}

    // Update and display each drop
    for (let rd = 0; rd < raindrops.length; rd++) {
      const currentRaindrop = raindrops[rd];
      
      currentRaindrop.update();
      currentRaindrop.display();
      
      if (currentRaindrop.y > y3 + flaskheight - waterheight) {
        console.log(raindrops.length)

       if(!stopC){
        dropCounter+=1;}
        waterheight += 1/100*125;
        // weight+=1.2;
        // Remove the raindrop from the array
        raindrops.splice(rd, 1);
        rd--; // Decrement rd to account for the removed element
      }
    }

  

  //pump;
  image(pumpI,PipetX+54,PipetY-200,60,100)
 

  //Pippet
  image(pippet, PipetX-13, PipetY-292, 100, 300);
 
  image(gravityC,rectX3,rectY3,25,100);
  push();
  fill(255,255,255,150);
  rect(rectX2+17,rectY2+78,70,Bwater);pop();
  image(beaker,rectX2,rectY2-10,100,100);


  image(screen, 500,400,180,100)
  
  if (screenOn){push();
  fill(81,101,89,250)
  rect(520,421,140,44)
  // Display the current angle and step
  textStyle(BOLD);
  // Set the text color to green
  
  fill('#DBD706');
  textSize(21);
  textAlign(CENTER, CENTER);
  // text(`Angle: ${markerAngle}`, 0, knobRadius + 80);
  text(`No. of drops: ${dropCounter}`, 590, 440);
   pop();}

  push()
  translate(0, 0);


  // console.log(v,'hhj',u)
  if (!dragging2 && v2) {
    rectX2 = x1; rectY2 = y1+12;
  }
  else if (dragging2 && u2) {
    rectX2 = x2;
    rectY2 = y2+12;
  }
  else if(!dragging2 && w2){
    rectX2=x3;
    rectY2=y3-50;
    process=1;
  }

  // console.log(v,'hhj',u)
  if (!dragging1 && v) {
    rectX = x1; rectY = y1;
  }
  else if (!dragging1 && u) {
    rectX = x2;
    rectY = y2;
  }
  else if(!dragging1 && w){
    rectX=x3;
    rectY=y3;
    weight+=22.3;
    weight+=ranWeight*waterheight;
    process=2;
    pump=false;
    

  }
// console.log(waterheight)


  
  if (rectanglesIntersect(rectX3,rectY3,25,100,rectX,rectY,100,20)){
    rectX3=rectX+37;
    rectY3=rectY-50;
    Gcapped=true;
    if (w){
      weight+=5.12;
    }
  }
  else if (!rectanglesIntersect(rectX3,rectY3,25,100,rectX,rectY,100,20)){
    Gcapped=false;
  }
  if (rectanglesIntersect(rectX3,rectY3,25,100,30,200,100,30)){
    rectX3=30;
    rectY3=200;
    // Gcapped=true;
  }
  if (rectanglesIntersect(rectX3,rectY3,25,100,30,200,100,30)){
    rectX3=30;
    rectY3=200;
    // Gcapped=true;
  }
  
  if(rectanglesIntersect(rectX3,rectY3,25,100,260,445,60,-22)){
    rectX3=280;
    rectY3=360;
    weight=weight +.05;
  }
  
  // rect(rectX,rectY,100,100);
  // image(gravityW, rectX, rectY, 100, 100);
  if (waterheight < 98) {
    c = gravityW.get(0, 100 - waterheight, 100, 100);
    image(c, rectX , rectY  + 100 - waterheight);
  } else {
    // If waterheight exceeds flaskheight, draw the entire image without cropping
    image(gravityW, rectX, rectY);
  }
  image(gravity, rectX, rectY, 100, 100);

  if((process==2)&&currentStep>=5 && dropHeight>0 && !pump){
    console.log(dropHeight);
    push();
    fill(255,255,255,150);
    rect(PipetX,PipetY,currentStep/6, 15+ flaskheight - waterheight);
    if(waterheight<85){
    waterheight +=1/100*10;
    // weight+=1.2;

    // console.log('weight', waterheight);
      pop();
  }}


  noStroke();
  push();
  fill(255, 255, 255, 150);
  rect(PipetX-2, PipetY, 6, -dropHeight);
  pop();

  image(buretteStand,PipetX-220,PipetY-325,370,470)
  //indicator to indicate starting or stoping of a pump
  push();
  fill(Pstart)
  stroke(255, 255, 255,100);
  ellipse(370, 225, 10, 10)
  pop();
  push();
  fill(Poverflow)
  stroke(255, 255, 255,100);
  ellipse(393, 223, 10, 10)
  pop();
  //For showing water in the droper

  if (pump == true&&process==1) {
    Pstart = color(0, 255, 0, 250);
    // console.log(dropHeight);
    pumpS.play();
    dropHeight += 1 / 70 * speed;
    Bwater+=1/700*speed;

    if (dropHeight > 160) {
      Poverflow = color(255, 0, 0, 255);
      if (currentStep > 10) {
        currentStep = 10;
      }
      overflow();

    }


  }
  else if (pump == false&&(process==2||process==1)) {
    Pstart = color(0, 255, 0, 50);
    Poverflow = color(255, 0, 0, 50);
    if (dropHeight > 0) {
      if(currentStep>5&&process==2){
      dropHeight -= 1 / 100 * 25;}
      else if(currentStep<5&&currentStep!=0&&process==2){
        dropHeight -= 1 / 100 * 15;
        console.log('gh',waterheight)
      }
      else if(process==1){
        dropHeight -= 1 / 100 * speed;
      }
      Bwater-=1/1400*speed;
      console.log();
      // waterheight += 1/215*speed;
      // if(Gcapped==false&&process==2){
      // waterheight += 1/250*speed;
      // // raindrops.push(new Raindrop(PipetX +2, (PipetY -50+(frame%5)*10)));
      // }
      // droperDrop= new DropF(currentPoint_2.x + 15,150 + 130);
      
    }

  }



  translate(knobX, knobY);
  translate(width / 2, height / 2);

  // Draw the rotating knob image
  push();
  rotate(radians(markerAngle));
  imageMode(CENTER);
  image(knob, 0, 0, 40, 40);
  pop();

  // Draw the marker (red ball)
  let x = cos(radians(markerAngle)) * knobRadius;
  let y = sin(radians(markerAngle)) * knobRadius;
  fill(100, 100, 100);
  stroke(255,255,255);
  ellipse(x, y, markerRadius * .8, markerRadius * .8);
  noStroke();
  // push();
  // imageMode(CENTER);
  // image(knobM, x-10 , y, markerRadius, markerRadius); pop();
  push();
  // Display the current angle and step
  textStyle(BOLD);
  // Set the text color to green
  
  fill(50, 150, 50);
  textSize(20);
  textAlign(CENTER, CENTER);

  // text(`Angle: ${markerAngle}`, 0, knobRadius + 80);
  text(`Step: ${currentStep}`, 0, knobRadius + 80);
   pop();




  speed = currentStep;


  let d = dist(mouseX - width / 2 - knobX, mouseY - height / 2 - knobY, cos(radians(markerAngle)) * knobRadius, sin(radians(markerAngle)) * 2);
  if (d < markerRadius & !isDragging) {
    cursor('grab');
  }
  else if (isDragging) {
    cursor('grabbing');
  }
  else {
    cursor('auto');
  }


  //Other things
  translate(-width / 2, -height / 2);
  translate(-knobX, -knobY);

push();
  fill(255, 255, 255, 0);
  rect(x1, y1, 100, 100);
  rect(x2, y2, 100, 100);
  rect(x3,y3,100,100);
  rect(30,200,30,100);
  // fill(255, 255, 255, 100);
  // rect(240,365+100,100,-20);
  pop();

  //To show toogle switch
  if(pump){
    image(SOn, 375, 219, 12, 40);}
    if(!pump){
    image(SOff, 375, 219, 12, 40);}

    if(machineOn){
      push();
      fill(102, 220, 20,150);
    rect(250,498,77,17);
    fill(60, 100, 60,255);
    textSize(21);
    textAlign(LEFT, CENTER);
    text(`${weight.toFixed(2)}  `,270 ,505 );
    textSize(13);
    textAlign(LEFT, CENTER);
    text('9',321 ,508 );

     pop();
    }



  if (shownext == true) {
    // Check if it's time to blink
    if (millis() % (2 * blinkInterval) < blinkInterval) {
      // Display the image
      image(nextimg, nxtx, nxty, nxtw, nxth);
    }

  }

  // if ((mouseX > 450 - 40 + 50 && mouseX < 450 + 40 + 50 && mouseY > 440 - 40 + 30 && mouseY < 440 + 40 + 30)) {
  //   cursor('pointer');
  // }
  else if (((mouseX > 385 - 20 && mouseX < 385 + 20 && mouseY > 230 - 10 && mouseY < 230 + 10))) {
    cursor('pointer');
  }
  else if (((mouseX > 375 - 15 && mouseX < 375 + 15 && mouseY > 515 - 20 && mouseY < 515 + 20))) {
    cursor('pointer');
    // console.log('button2')
  }
  else if (((mouseX > 340 - 20 && mouseX < 340 + 20 && mouseY > 515 - 20 && mouseY < 515 + 20))) {
    cursor('pointer');
    // console.log('button')
  }
  else if(((mouseX > 568 - 18 && mouseX < 568 + 18 && mouseY > 480 - 10 && mouseY < 480 + 10))){
    cursor('pointer');
    console.log('button2')
  }
  else if(((mouseX > 600 - 20 && mouseX < 600 + 20 && mouseY > 480 - 10 && mouseY < 480 + 10))){
    cursor('pointer');
    console.log('button')
  }

  // else if (mouseX > rectX && mouseX < rectX + 100 &&
  //   mouseY > rectY && mouseY < rectY + 100) {
  //   cursor('pointer');

  // }
  push();
  // Display buttons
  textStyle(BOLD);
  // Set the text color to green
  
  fill(0, 0, 0);
  textSize(13);
  textAlign(CENTER, CENTER);

  // text(`Angle: ${markerAngle}`, 0, knobRadius + 80);
  text(`On/Off`, 345, 510);
  text ('Tare', 380,510)
   pop();



}



function overflow() {
  setTimeout(() => { pump = false; }, 3000);
}



function drop(){
  raindrops.length=0;
  for(let i=0; i<=Math.floor(pastDropHeight/3);i++){
    console.log('pushed')
    raindrops.push(new Raindrop(PipetX +2, (PipetY-i*25)));
  }
  console.log(dropHeight)
}
function doubleClicked(){

 
  // console.log(dropCounter)
  
}

function mousePressed() {
  


  // userStartAudio();
  if (mouseX > nxtx - nxtw / 4 && mouseX < nxtx + nxtw && mouseY > nxty - nxth / 4 && mouseY < nxty + nxth && shownext) {
    nextpressed();
  }
  else if (((mouseX > 385 - 20 && mouseX < 385 + 20 && mouseY > 230 - 10 && mouseY < 230 + 10))) {
    if (pump == true) {
      pump = false;
      vi = 2;
    }
    else {
      pump = true;
      vi = 2;
      // showDrop();
    }
  }
  else if(((mouseX > 375 - 15 && mouseX < 375 + 15 && mouseY > 515 - 20 && mouseY < 515 + 20))){
    tare=true;
    tareValue=weight;
  }
  else if (((mouseX > 340 - 20 && mouseX < 340 + 20 && mouseY > 515 - 20 && mouseY < 515 + 20))){
    if (machineOn==true){
      machineOn=false;
    }
    else{
      machineOn= true;
      tareValue=0;
    }
  }
  else if(((mouseX > 600 - 20 && mouseX < 600 + 20 && mouseY > 480 - 10 && mouseY < 480 + 10)&&screen)){
    stopC=true;

  }
  else if(((mouseX > 568 - 18 && mouseX < 568 + 18 && mouseY > 480 - 10 && mouseY < 480 + 10))){
    if (screenOn==true){
      screenOn=false;
    }
    else{
      screenOn= true;
      
    }
  }
  // Check if the mouse is over the rectangle when pressed
  if (mouseX > rectX && mouseX < rectX + 100 &&
    mouseY > rectY && mouseY < rectY + 100) {
    dragging1 = true;

    
  }
  if (mouseX > rectX2 && mouseX < rectX2 + 100 &&
    mouseY > rectY2 && mouseY < rectY2 + 100) {
    dragging2 = true;
  }
  if (mouseX > rectX3 && mouseX < rectX3 + 100 &&
    mouseY > rectY3 && mouseY < rectY3 + 100) {
    dragging3 = true;
  }

  // Check if the mouse is over the knob
  // Check if the mouse is over the knob
  let d = dist(mouseX - width / 2 - knobX, mouseY - height / 2 - knobY, cos(radians(markerAngle)) * knobRadius, sin(radians(markerAngle)) * knobRadius);
  if (d < markerRadius) {
    pastDropHeight=dropHeight;
    isDragging = true;
    offsetX = mouseX - width / 2 - cos(radians(markerAngle)) * knobRadius;
    offsetY = mouseY - height / 2 - sin(radians(markerAngle)) * knobRadius;
    // showDrop();

  }


}




function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}


function mouseReleased() {
  if(isDragging&&(process==2)&&currentStep<5&&currentStep!=0&&pump==false){console.log('hi 22');
  drop();
  runOnce=false;

}
  isDragging = false;
  cursor('auto')
  dragging1 = false;
  dragging2 = false;
  dragging3 = false;
}
function mouseDragged() {
  if (isDragging) {
    // Calculate the angle based on mouse position
    let mx = mouseX - width / 2 - offsetX;
    let my = mouseY - height / 2 - offsetY;
    markerAngle = atan2(my, mx) * 180 / PI;

    // Ensure the angle stays within 0 to 360 degrees
    markerAngle = (markerAngle + 360) % 360;

    // Calculate the current step
     newStep = floor(markerAngle / stepSize);

    // Check if the step has changed
    if (newStep !== currentStep && newStep < 25) {
      currentStep = newStep;
      knob_click.play();
      // console.log('Step changed:', currentStep);
    }
    else if (newStep > 25) {
      currentStep = 0;
    }
  }

  else if (dragging1) {
    // console.log('hii2')
    rectX = mouseX - 100 / 2;
    rectY = mouseY - 100 / 2;
  }
  else if (dragging2) {
    // console.log('hii2')
    rectX2 = mouseX - 100 / 2;
    rectY2 = mouseY - 100 / 2;
  }
  else if (dragging3) {
    // console.log('hii2')
    rectX3 = mouseX - 25 / 2;
    rectY3 = mouseY - 100 / 2;
    // Gcapped=false;
  }
}


function nextpressed() {
  // Store the calculated values in localStorage for access in the next page
  localStorage.setItem('ranWeight', JSON.stringify(ranWeight));
  localStorage.setItem('ranDrop', JSON.stringify(ranDrop));
  
  console.log('Data stored in localStorage:', { ranWeight, ranDrop });
  
  // Redirect to the second page
  window.location.href = './StartHtml2.html';
}

function rectanglesIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return (
    x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    y1 + h1 > y2
  );
}