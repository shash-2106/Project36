//Create variables here
var dog, dogImg, happyDogImg;
var database;
var foodS, foodStock;
var feedButton, addFood;
var fedTime, lastFed;
//var foodObj;


function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
 // console.log(database);
	createCanvas(1000, 700);
  dog = createSprite(250,250);
  dog.addImage(dogImg); 
  dog.scale = 0.5; 
  /*foodStock = database.ref("Food").on("value",function(data){
    foodStock = data.val();
});*/
foodObj = new milkBottle();

feedButton = createButton("Feed the dog");
feedButton.position(700,95);
feedButton.mousePressed(feedDog);

addFood = createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46,139,87);
  
  drawSprites();
  //add styles here
  textSize(15);
  fill("cyan");
  foodStock = foodObj.getFoodStock();
  console.log(foodStock);
foodObj.getFoodStock();
text(foodStock,230,150);
  foodObj.display();

  fedTime = database.ref('FeedTime').on("value",function(data){
    lastFed = data.val();
  });
  text(fedTime,230,180);
}

function addFoods(){
  foodStock++;
  database.ref('/').update({
    Food :foodStock
  }
  )
} 

function feedDog(){
  //dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  }    
  )
}

/*function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food  : x
  })
}*/



