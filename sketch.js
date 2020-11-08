var dog,dogS, happyDog, foodS, foodStock, database;
var feed, addFood, fedTime, lastFed, foodObj;

function preload()
{
  dog = loadImage("images/dogImg.png");
 happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
   dogS = createSprite(250,250,60,100);
   dogS.addImage(dog);
   dogS.scale = 0.2;
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  
  
}


function draw() {  
background(0,200,100)
if(keyWentDown(UP_ARROW)){
  writeStock(foodS)
  dogS.addImage(happyDog);
}
  drawSprites();
  textSize(20);
  fill(0)
  text("Note: Click the UP ARROW to feed Draco", 50,100);
  text("Food Remaning: " + foodS, 50, 150);

}

function readStock(data){
  foodS=data.val();
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