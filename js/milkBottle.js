class milkBottle{
   
    constructor(){
       this.foodStock = 0;
       this.lastFed;
        this.image = loadImage("Milk.png");
    }
   
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }
    getFedTime(lastFed){
        this.lastFed = lastFed;
    }
    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }

    }
    getFoodStock(){
       /* foodStock = database.ref("Food").on("value",function(data){
         foodStock = data.val();
         console.log(data);
        })*/
        return this.foodStock;
        
     }
    display(){
        var x = 80, y = 100;
        //var pos = this.body.position

        imageMode(CENTER);
       // image(this.image,720,220,70,70);
       console.log(this.foodStock);
        if(this.foodStock != 0){
           
            for(var i = 0; i < this.foodStock; i++){
                if(i % 10 == 0){
                    x = 80;
                    y = y + 50;

                    image(this.image,x,y,50,50);
                    x = x + 30;
                }
               
            }
        }

    }
    bedroom(){
        background(brImg,550,500);
    }
    garden(){
        background(gardenImg,550,500);
    }
    washroom(){
        background(WrImg,550,500);
    }
}