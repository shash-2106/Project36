class milkBottle{
   
    constructor(){
       // var foodStock, lastFed;
       // this.width = width;
       // this.height = height;
        this.image = loadImage("Milk.png");
    }
    getFoodStock(){
       foodStock = database.ref("Food").on("value",function(data){
        foodStock = data.val();
        console.log(data);
       })

    }
    updateFoodStock(){
        /*foodStock = database.ref('/').update({
            Food : 
        })*/
    }
    deductFood(){
        

    }
    display(){
        var x = 80, y = 100;
        //var pos = this.body.position

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock != 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i % 10 == 0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }

    }
}