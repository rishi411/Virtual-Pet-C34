//Create variables here
var dogimg, dog, happydog;
var database;
var foodS, foodStock;
function preload(){
  //load images here
  dogimg = loadImage('images/dogImg.png');
  happydog = loadImage('images/dogImg1.png');
}

function setup(){
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogimg); 
  dog.scale = 0.5;
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  console.log(foodStock);
}


function draw() {  
background(46, 139, 87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogHappy);
}

  drawSprites();
  //add styles here
  textSize(18);
  stroke("black");
  fill("white");
  text("Press UP ARROW to feed your pet", 150, 30);
  text("Food remaining : "+foodS, 200, 50);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

