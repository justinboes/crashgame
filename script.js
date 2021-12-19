//declaring new variables
let balance;
let bet;
let current;
let speed;
let rocket;
let rocketIcon;
let anim;
let click = false;
let pmouse = false;
let multipliers = [0,0,0,0,0,0,0,0,0,0,0];
let difficulty;

//loading up the rocket image
function preload(){rocketIcon = loadImage("images/rocket-ship-png-7.png");}

//sets up canvas
function setup() {
canvas.position=(0,0);  
createCanvas(windowWidth, windowHeight);
background(51);

//setting the balance
updateBalance(1000);
//setting the multiplier to 1 – current is the current multiplier (white on the side of the screen) 
current = 1;
//Speed is the speed the multiplier increases at
speed = 2; 
//this creates the rocket object  
rocket = new Rocket();
imageMode(CENTER);
//sets rocket to animation 0 which is nothign
anim = 0;
//creates input box needs
let input = createInput();
//sets position of input box  
input.position(width*0.1-input.width/2,height*0.315);
input.id("input");
}

function draw() {
//draws the two rectangles around game controls and game settings  
fill(6,6,41)
strokeWeight(4);
stroke(255);
rect(width*0.015,height*0.66,width*0.17,height*0.22)
stroke(255);
rect(width*0.015,height*0.265,width*0.17,height*0.22)

//removes stroke for all other images
noStroke();

background(0,0,35,20);
fill(255);

//creates the galaxy background. Code sourced from https://editor.p5js.org/ag3439/sketches/Skgh1ZQtQ
var galaxy = { 
locationX : random(width),
locationY : random(height),
size : random(5,10)}
ellipse(mouseX ,mouseY, galaxy.size, galaxy.size);
ellipse(galaxy.locationX ,galaxy.locationY, galaxy.size, galaxy.size);

//calls function to print previous multipliers across top of screen
draw_multipliers();

//switch statement has different cases. Switch anim is a bunch of if statements. If anim=1 rocket.animation 1, etc..
switch(anim){
case 1:
rocket.anim1();
break;
case 2:
rocket.render();
break;
case 3:
rocket.anim2();
break;}

//Calls function to set up text and buttons 
drawtext();

//sets the value to either 1 or 0 if the mouse is clicked in previous frame  
pmouse = mouseIsPressed;}

//this function creates the text and the buttons
function drawtext(){
textAlign(CENTER);
textSize(60);
fill(255);
text("Balance:",width*0.1,height*0.1 );
text("$" + balance,width*0.1,height*0.17);
textSize(15);
text("Insert Bet Below:",width*0.1,height*0.22);
fill(255,0,0);
textSize(50);
fill(255)
fill(255, 165, 0);
text("START",width*0.1,height*0.38);

//If statement uses the clicked function and if clicked around the start button calls the start function
if(clicked(width*0.038,height*0.33,width*0.125,height*0.06)){on_start();}
textSize(30);
fill(255);
textAlign(LEFT);
  
//When the code starts there would NaN as a value because it has no bet included. This function checks that it is a number.
if(current*bet){
text("Potential Earnings:",width*0.01,height*0.56)
textAlign(CENTER);
fill(0,255,0);
text("$" +round((current*bet),2),width*0.1,height*0.61)} else {
text("Potential Earnings:",width*0.01,height*0.56);
textAlign(CENTER);
fill(255);
text("$0",width*0.1,height*0.61)}
textAlign(CENTER);
textSize(33);
fill(0,255,0);
text("CASH OUT",width*0.1,height*0.45);

//If statement uses the clicked function and if clicked around the cash out button button calls the cash out function
if(clicked(width*0.038,height*0.405,width*0.125,height*0.06)){
on_cash();}
  
textSize(20);
fill(255,255,0);
text("DIFFICULTY:",width*0.065,height*0.79 ); 
fill(255);
text("EASY",width*0.042,height*0.83);
fill(255,255,0);

//if clicked in the area of easy text, it calls the easy function which sets difficulty to easy
if(clicked(width*0.022,height*0.808,width*0.042,height*0.03)){
easy();}  
fill(255);

//if clicked in the area of hard text, it calls the hard function which sets difficulty to hard
text("HARD",width*0.13,height*0.83);
if(clicked(width*0.109,height*0.808,width*0.042,height*0.03)){
hard();}

//Creates the selected difficulty in the top right of screen and prints the difficulty the user has set
fill(255,255,0);
text("Selected Difficulty:",width*0.92,height*0.1);
fill(255);
if(difficulty==2){
text("Hard",width*0.91+width*0.1/2,height*0.14);}
else{
text("Easy",width*0.91+width*0.1/2,height*0.14);}

//Creates the reset balance button and if its clicked and the animation is 0 it calls the update balance function and resets it back to 1000. Animation must be 0 so user cannot update in the middle of a game when the rocket is launched.
textSize(20); 
fill(255,0,0);
text("Reset Balance",width*0.07,height*0.74);  
if(clicked(width*0.022,height*0.718,width*0.098,height*0.03)&& anim==0 )  {
updateBalance(1000);

//Text for game settings and game control boxes
textSize(25); 
fill(255);
text("Game Settings",width*0.1,height*0.695);
text("Game Controls",width*0.1,height*0.305);

}}

//Clicked function if the user clicks with specified aread. It also takes into account that the user must not be holding the trackpad or mouse down and must release the click. 
function clicked(x1,y1,w1,h1){
  //if mouse x is inbetween right and left side of the box
	if(mouseX > x1 && mouseX < x1 + w1){
      //if the mouse is above the top and the bottom of the box
	if(mouseY > y1 && mouseY < y1 + h1){
      //if the mouse is not pressed and it was pressed
	if(!mouseIsPressed && pmouse){
		return true;}}}
	    else return false;}

//function updates balance rounding to two decimals
function updateBalance(a){
balance = round(a,2);}

//function to draw previous multipliers on top of screen
function draw_multipliers(){
  //takes width of screen / 10
let w = width/10;
  //for loop iterates through the 10 previous multipliers.
for(let i = 0; i < 10; i++){
textSize(20);
//if the current multiplier is most recent multiplier is greater than the previous, green
if(multipliers[i] > multipliers[i+1]){
fill(100,255,100); 
//if the current multiplier is most recent multiplier is less than the previous, red
} else if(multipliers[i] < multipliers[i+1]){
fill(255,100,100);
} else {
//if its the multipliers are the same then just white color of text
fill(255);}
//This shows the multipliers when they are greater than 1 as the multipliers start off stored in an array of 0's
if(multipliers[i] >= 1){
text(multipliers[i] +"x",width/10 * i + width/20,20);}  
}
}


//this. makes the variable stored only in the function
function Rocket(){
//sets the rocket x cordinate to x/2
this.x = width/2;
//sets size of rocket
this.s = width/4;
//position of spaceship when in view
this.targety = height * 0.65;
//position of spaceship when it is outside of the canvas
this.y = height + width;
//this is velocity of rocket moving on y axis
this.yvel = 0;

//this creates the multiplier based on difficulty	
//1 in 33 or 45 chance of multiplier being 1, else 1/x where x is integer from 0-1
this.randomize = function(){
  if(difficulty == 2){
   if(random(33) <= 1){this.crash = 1;} 
  else {this.crash = round(1/random(),2);} 
  }
  else{
   if(random(45) <= 1){this.crash = 1;} 
  else {this.crash = round(2);}
 }} 
  

//Displays white multiplier next to rocket
this.displayCash = function(){
textSize(64);
text(round(current,2)+"x",width/2 + this.s * 0.9, this.y);}

//render is the rocket on the screen when the game is running
this.render = function(){
image(rocketIcon,this.x,this.y,this.s,this.s);
//Increasing current multiplier and rocket speed
speed += 0.01;
current += speed*0.0005;
fill(255);
//calls function to display white multiplier next to rocket
this.displayCash();
//if the current multiplier is greater than equal to the set crash multiplier than the animation gets set to 3, which is called in the switch statement and sets the rocket animation to 2 which is the crashing animation. 
if(current >= this.crash)
anim = 3;}
 
//this animation is the rocket appearing on the screen
this.anim1 = function(){
//lerp function smoothly brings the rocket onto the screen
this.y = lerp(this.y,this.targety,0.04);
image(rocketIcon,this.x,this.y,this.s,this.s);
//since lerp would never actually get the rocket to the desired place, the if statement is needed to change animation in switch statement to 2, where the rocket is in its on screen position (rocket.render) and call the randomize function to set the crash value 
if(abs(this.y - this.targety) <= 3.5)
anim = 2;    
this.randomize();}
  
// this function is the rocket moving off the screen. The rocket speed increases over time as thi.yvel increases
this.anim2 = function(){
image(rocketIcon,this.x,this.y,this.s,this.s);
speed = lerp(speed,2,0.05);
this.y+=this.yvel;
this.yvel+=0.3
fill(255,100,100);
this.displayCash();
fill(255);
//when the animation is over, this resets to the begining speeds and states of the game. It also calls the mult function which is used to print the multipliers of the previous games
if(this.y > height + this.s * 0.5 && speed <= 2.05){
  mult();
  anim = 0;this.yvel = 0;current = 1;speed = 2;
}}
}

//this function sets difficulty to 1, or easy
function easy(){
difficulty=1;
}

//this function sets difficulty to 2, or hard
function hard(){
difficulty=2;
}

//When this function is called, the value in the input box is set to value. If the animation of the rocket is 0, or the start value and the value is greater than zero and less than the balance, it then starts the game with animation one of  the rocket appearing on the screen. It then updates the balance by subtracting the bet value from the users balance
function on_start(){
value = input.value;
if(anim == 0 && value > 0 && value <= balance){
anim = 1;
bet = value;
updateBalance(balance - value);
speed = 2;}
}

//when the rocket is crashing, it updates the balance once the user clicks cash out. The rocket animation must be 2, when the rocket is in render or on screen position. It then resets users bet to 0. 
function on_cash(){
if(anim == 2){
updateBalance(balance + bet * current);
bet = 0;
}}

//This function takes the multipliers and adds to first slot in array and then removes last number in array so length is the same.
function mult(){
multipliers.unshift(round(current,2));
multipliers.pop();
  
}
