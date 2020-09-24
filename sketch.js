//Create variables here
var dog, dogImg, happyDogImg;
var database;
var foodS, foodStock;
var feedButton, addFood;
var fedTime, lastFed;
var readState, gameState;
var bedroom, garden, washroom;
var brImg, gardenImg, WrImg;
var sadDog;


function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
  brImg = loadImage("VP-images/virtual pet images/Bed Room.png");
  gardenImg = loadImage("VP-images/virtual pet images/Garden.png");
  WrImg = loadImage("VP-images/virtual pet images/Wash Room.png");

  sadDog = loadImage("VP-images/virtual pet images/deadDog.png");

}

function setup() {
  database = firebase.database();
 // console.log(database);
	createCanvas(1000, 700);
  dog = createSprite(450,250);
  dog.addImage(dogImg); 
  dog.scale = 0.5; 
  foodObj = new milkBottle();
  
  foodStock = database.ref("Food").on("value", readStock)
    //console.log(data);
;
readState = database.ref("gameState").on("value",function(data){
  gameState = data.val();
})



feedButton = createButton("Feed the dog");
feedButton.position(700,95);
feedButton.mousePressed(feedDog);

addFood = createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);
  
}


function draw() {  

  
  //background(46,139,87);
  
  drawSprites();
  //add styles here
  textSize(15);
  fill("black");
  
 // foodObj.display();
  text(foodS,230,190);
  currentTime = hour();
  if(currentTime == (lastFed + 1)){
    update("Playing");
    foodObj.garden();    
  }
  else if(currentTime ==(lastFed +2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }

  fedTime = database.ref('FeedTime').on("value",function(data){
    lastFed = data.val();
  });

  if(gameState != "Hungry"){
    feedButton.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feedButton.show();
    addFood.show();
    dog.addImage(sadDog);
  }
  
}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  }
  )
 
} 

function feedDog(){
  //dog.addImage(happyDogImg);
   foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
  database.ref('/').update({ 
    Food:foodObj.getFoodStock(),
     FeedTime:hour() }) 
  } //function to add food in stock function addFoods(){ foodS++; database.ref('/').update({ Food:foodS })

function update(state){
  database.ref('/').update({
    gameState : state
  })
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



