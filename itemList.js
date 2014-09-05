/* 
    Created on : 27-Aug-2014
    Author     : Xinchro
*/

function Potion(){
    Item.call(this ,"Potion", 1, "Heals you up.");
};
Potion.prototype = new Item;
Potion.prototype.constructor = Potion;
Potion.prototype.effect = function(){};

function CrazyFish(){
    Item.call(this ,"Crazy Fish", 5, "It's a crazy fish.");
};
CrazyFish.prototype = new Item;
CrazyFish.prototype.constructor = CrazyFish;
CrazyFish.prototype.effect = function(){};

function BabyCactus(){
    Item.call(this ,"Baby Cactus", 5, "A baby cactus, born of noble birth. Cactus loves you.<br>(◕ε ◕｡ )", "cactus.svg");
};
BabyCactus.prototype = new Item;
BabyCactus.prototype.constructor = BabyCactus;
BabyCactus.prototype.effect = function(){};

function Glasses(){
    Item.call(this ,"Glasses", 5, "Glasses. Not yours. Yes, you stole these.");
};
Glasses.prototype = new Item;
Glasses.prototype.constructor = Glasses;
Glasses.prototype.effect = function(){};

function ValuableRing(){
    Item.call(this ,"Valuable Ring", 50, "You stole this, too.");
};
ValuableRing.prototype = new Item;
ValuableRing.prototype.constructor = ValuableRing;
ValuableRing.prototype.effect = function(){};

function EvilBanana(){
    Item.call(this ,"Evil Banana", 5, "This is your accomplice for stealing.", "evilBanana.svg");//todo desc
};
EvilBanana.prototype = new Item;
EvilBanana.prototype.constructor = EvilBanana;
EvilBanana.prototype.effect = function(){};