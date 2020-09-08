//Create variables here
var dog, dogImg, happyDogImg;
var database;
var foodS, foodStock;


function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
 // console.log(database);
	createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addImage(dogImg);  
  foodStock = database.ref("Food").on("value",function(data){
    foodStock = data.val();
});
  
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    foodS = foodStock - 1;
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  //add styles here
  textSize(15);
  fill("cyan");
  text(foodStock,230,150);
}

/*function readStock(data){
  foodStock = data.val();
}*/

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food  : x
  })
}



