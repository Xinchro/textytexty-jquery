/* 
    Created on : 17-Aug-2014
    Author     : Xinchro
*/

function Player(){
    
    this.health = 10;
    this.maxHealth = this.health;
    this.name = "Not Burrito";
    this.pow = 5;
    this.dex = 3;
    this.wis = 4;
    this.inventory = [];
    this.specials = [];
    this.activeItem, this.activeSpecial;
    this.stockSpecials = [];
    this.availableSpecials = [];
    this.dead;
    this.model;
    this.level = 1;
    this.experience = 0;
    this.levelCap = 2;
    this.statPoints = 10;
    
    this.posX = 0;
    this.posY = 0;
    this.battleReady = false;
    this.tick = 0;
    
    this.armorHead = new ArmorPiece("HEAD armor", 3, armorTypes.HEAD, "heavyHelm1.svg");
    this.armorArmLeft = new ArmorPiece("ARM armor", 2, armorTypes.ARM, "heavyArm1.svg");
    this.armorTorso = new ArmorPiece("TORSO armor", 5, armorTypes.TORSO, "heavyTorso1.svg");
    this.armorArmRight = new ArmorPiece("ARM armor", 2, armorTypes.ARM, "heavyArm1.svg");
    this.armorLegs = new ArmorPiece("LEGS armor", 4, armorTypes.LEGS, "heavyLegs1.svg");
    this.armorFootLeft = new ArmorPiece("FOOT armor", 1, armorTypes.FOOT, "heavyFoot1.svg");
    this.armorFootRight = new ArmorPiece("FOOT armor", 1, armorTypes.FOOT, "heavyFoot1.svg");
    
    /*
     * Method to set up any variables properly, sets up name from input right now
     */
    
    
    //Safeguard to prevent endless loops
    this.ticker = 5;
    /*
     * Method to give random stats
     */
    Player.prototype.ranStats = function(){
        //check if the ticker has reached 0 and give any remaining points to health
        if(this.ticker === 0){
            this.maxHealth += this.statPoints * 10;
            this.statPoints = 0;
            log("Ticker at 0");
        }
        //a temporary variable to deal with the fact that health has to be higher than 1 per point
        var tempNo;
        tempNo = Math.floor(Math.random()*this.statPoints);
        this.maxHealth += Math.floor(tempNo*10);
        this.health = this.maxHealth;
        this.statPoints = this.statPoints - tempNo;
        
        //following the same convention as above
        tempNo = Math.floor(Math.random()*this.statPoints);
        this.pow += Math.floor(tempNo);
        this.statPoints = this.statPoints - tempNo;
        
        //this is for variables that are not being used currently
        //
        tempNo = Math.floor(Math.random()*this.statPoints);
        this.dex += Math.floor(tempNo);
        this.statPoints = this.statPoints - tempNo;
        tempNo = Math.floor(Math.random()*this.statPoints);
        this.wis += Math.floor(tempNo);
        this.statPoints = this.statPoints - tempNo;
        this.maxHealth = Math.floor(Math.random()*75+1);
        this.health = this.maxHealth;
        
        //checks to see if the ticker and stat points have not run out
        if(this.statPoints > 0 && this.ticker>0){
            //decrement the ticker
            this.ticker--;
            //do this again
            this.ranStats();
        }else{
            //print final stats
            log("------Player Final Stats------");
            log("Level: " + this.level);
            log("Max Health: " + this.maxHealth);
            log("Power: " + this.pow);
            log("Dexterity: " + this.dex);
            log("Wisdom: " + this.wis);
            log("Max points: " + this.level*10);
            log("Remaining points: " + this.statPoints);
            log("------End Player Stats------");
        }
    };
    
    /*
     * Method to get the model
     * 
     * @return model
     */
    Player.prototype.getModel = function(){
        //log("getting player model");
        model = new createjs.Bitmap("Assets/Models/Taco1.svg");
        return model;
    };
    
    /*
     * Method to force the exp to a certain value
     */
    Player.prototype.setExp = function(newExp){
        this.experience = newExp;
        //check for a level up
        this.checkLevelUp();
    };
        
    /*
     * Method to get the current exp
     * 
     * @return experience
     */
    Player.prototype.getExp = function(){
        return this.experience;
    };
    
    /*
     * Method to get the exp required for the next level up
     * 
     * @return gap
     */
    Player.prototype.getExpToNextLevel = function(){
        var gap = this.levelCap - this.experience;
        return gap;
    };
    
    /*
     * Method to give an amount of experience
     */
    Player.prototype.giveExp = function(addExp){
        //add the exprience to the current experience
        this.experience += addExp;
        //check for a level up
        //this.checkLevelUp();
    };
    
    /*
     * Method to check for a level up
     */
    Player.prototype.checkLevelUp = function(){
        //log("Checking levelCap/exp: " + levelCap + " " + experience);
        //
        //while the experience is above the cap loop through this
        while(this.experience >= this.levelCap){
            log("----LEVEL UP----");
            addCriticalInfo("darkpink", "***" + this.name + " levelled up!***");
            playSound("levelup.wav");
            //increment the  level
            this.level += 1;
            //level up the stats
            this.levelUpStats();
            //unlock the next skill, if applicable
            //unlockNextSkill();
            //remove the current level cap from the experience pool
            this.experience -= this.levelCap;
            //ramp up the level cap
            this.levelCap += Math.ceil(this.levelCap*0.5);
            //increment the enemy level, to keep up a challenge
            //enemyLevel += 1;
            //print the player's stats
            //player.printStats();
        }
    };
    
    /*
     * Method for checking and unlocking skills
     */
    function unlockNextSkill(){
        //log("Unlocking special");
        //switch to unlock based on level
        switch(this.level){
            case 2:
                //at level 2 add double attack
                var spec = new Special();
                spec.setName("Double Attack");
                player.addSpecial(spec);
                break;
            case 3:
                //at level 3 add tripel attack
                var spec = new Special();
                spec.setName("Triple Attack");
                player.addSpecial(spec);
                break;
            case 5:
                //at level 5 add lettuce slap
                var spec = new Special();
                spec.setName("Lettuce Slap");
                player.addSpecial(spec);
                break;
            case 10:
                //at level 10 add mince meat special
                var spec = new Special();
                spec.setName("Mince Meat Special");
                player.addSpecial(spec);
                break;
        }
    };
    
    /*
     * Method to level up the stats
     */
    Player.prototype.levelUpStats = function(){
        //increment maximum health by 10% of current maximum health
        this.maxHealth += Math.floor(this.maxHealth*0.1);
        //give full health
        this.health = this.maxHealth;
        //increment power by 20% of current power
        this.pow += Math.floor(this.pow*0.2);
        //increment dexterity by 20% of current dexterity
        this.dex += Math.floor(this.dex*0.2);
        //increment wisdom by 20% of current wisdom
        this.wis += Math.floor(this.wis*0.2);
    };
    
    /*
     * Method to get the player's level
     * 
     * @return level
     */
    Player.prototype.getLevel = function(){
        return this.level;
    };
    
    /*
     * Method to add a specific item
     */
    Player.prototype.addItem = function(item){
        //adds the items to the items array(or inventory)
        this.inventory.push(item);
    };
    
    /*
     * Method to add a random item
     */
    Player.prototype.giveRandomItem = function(){
        log("giving random item");
        //get a random number, based on how many item variations there are(3 now)
        var rand = Math.floor(Math.random()*2);
        log("Rand: " + rand);
        var randItem;
        
        //switch to check the random number and to check what what item to add
        switch(rand){
            case 0:
                //add a normal potion
                randItem = new Item();
                randItem.setName("Potion");
                
                log("Adding potion");
                break;
            case 1:
                //add a better potion
                randItem = new Item();
                randItem.setName("Better Potion");
                
                log("Adding better potion");
                break;
            case 2:
                //add an ultra potion
                randItem = new Item();
                randItem.setName("Ultra Potion");
                
                log("Adding ultra potion");
                break;
        }
        //add that item
        this.addItem(randItem);
    };
    
    /*
     * Method to remove an item from the array(or inventory)
     */
    Player.prototype.removeItem = function(item){
        //temp variable to act as the item's index
        var tempNo;
        //cycle through items
        for(var i=0;i<items.length;i++){
            //check if the input item's ID is the same as the current cycle item's ID
            if(item.getID() === this.inventory[i].getID()){
                //set the temp varaible to the current index
                tempNo = i;
            }
        }
        //remove that index from items(or inventory)
        items.splice(tempNo, 1);
        //set the text of the "items" field in the battle screen
        //also set the active item
        if(items.length === 0){
            //if no more items, set it back "Items" and "nullify" the active item
            this.activeItem = "";
            battle.writeItemText("Items");
        }else if(tempNo+1 >= items.length){
            //if only 1 item left, set it to the first index(or 0)
            this.activeItem = inventory[0];
            battle.writeItemText(this.activeItem.getName());
        }else if(tempNo+1 < items.length){
            //if more than 1 item left, then set it to the next item
            this.activeItem = inventory[tempNo];
            battle.writeItemText(this.activeItem.getName());
        }
    };
    
    /*
     * Method to pick the next item
     */
    Player.prototype.nextItem = function(){
        //check if the active item is null
        if(!this.activeItem){
            //set the active item to the item at the first index
            this.activeItem = this.inventory[0];
        }else{
            var currentIndex;
            //cycle through the items
            for(var i=0;i<items.length;i++){
                //check if the active item and cycled item IDs match
                if(this.activeItem.getID() === this.inventory[i].getID()){
                    //set the variable to the current index
                    currentIndex = i;
                }
            }
            //increment the current index
            currentIndex++;
            
            if(currentIndex >= items.length){
                //if it goes over the items length set it to 0
                currentIndex = 0;
            }else{
                currentIndex;
            }
            log("Current index: "  + currentIndex);
            //set the active item to the index we set
            this.activeItem = inventory[currentIndex];
        }
    };
    
    /*
     * Method to pick the previous items
     */
    Player.prototype.prevItem = function(){
        //this is the same as for the next item, but in reverse
        if(!this.activeItem){
            this.activeItem = inventory[items.length-1];
        }else{
            var currentIndex;
            for(var i=0;i<items.length;i++){
                if(this.activeItem.getID() === inventory[i].getID()){
                    currentIndex = i;
                }
            }
            currentIndex--;
            if(currentIndex < 0){
                currentIndex = items.length-1;
            }else{
                currentIndex;
            }
            log("Current index: "  + currentIndex);
            this.activeItem = inventory[currentIndex];
        }
    };
    
    /*
     * Method to get the array of items
     * 
     * @return items
     */
    Player.prototype.getInventory = function(){
        return this.inventory;
    };
    
    /*
     * Method to get the current active item
     * 
     * @return activeItem
     */
    Player.prototype.getActiveItem = function(){
        return this.activeItem;
    };
    
    /*
     * Method to add a special attack
     */
    Player.prototype.addSpecial = function(special){
        //add the special to both the 
        //normal array(used in battles)
        //and to the stock array(used to reset the specials between battles)
        specials.push(special);
        stockSpecials.push(special);
    };
    
    /*
     * Method to remove a special attack
     */
    Player.prototype.removeSpecial = function(special){
        //temp variable
        var tempNo;
        //cycle through specials
        for(var i=0;i<specials.length;i++){
            //check if the names (there will never be more than one with the same name)
            if(special.getName() === specials[i].getName()){
                //set our temp variable
                tempNo = i;
            }
        }
        //log("special removed  at " + tempNo + " " + specials[tempNo].getName());
        
        //remove the special at the temp variable as an index
        specials.splice(tempNo, 1);
        //set the text of the "specials" field in the battle screen
        //also set the active special
        if(specials.length === 0){
            //if no more specials "nullify" the active special
            //write "Specials" on the battle screens button
            //log("changing text to specials");
            this.activeSpecial = null;
            battle.writeSpecialText("Specials");
        }else if(tempNo+1 >= specials.length){
            //if only one special left set the active special to the one at the first index
            this.activeSpecial = specials[0];
            //log("active special forced to items[0]");
            battle.writeSpecialText(this.activeSpecial.getName());
        }else if(tempNo+1 < specials.length){
            //if more than 1 special left, pick the next special
            this.activeSpecial = specials[tempNo];
            //log("active special set to specials["+tempNo+"]");
            battle.writeSpecialText(this.activeSpecial.getName());
        }
    };
    
    /*
     * Method for picking the next special
     */
    Player.prototype.nextSpecial = function(){
        //this is essentially a duplicate of the nextItem method, but for specials instead
        if(!this.activeSpecial){
            this.activeSpecial = specials[0];
        }else{
            var currentIndex;
            for(var i=0;i<specials.length;i++){
                if(this.activeSpecial.getName() === specials[i].getName()){
                    currentIndex = i;
                }
            }
            currentIndex++;
            if(currentIndex >= specials.length){
                currentIndex = 0;
            }else{
                currentIndex;
            }
            this.activeSpecial = specials[currentIndex];
        }
    };
    
    /*
     * Method for picking the previous special
     */
    Player.prototype.prevSpecial = function(){
        //this is essentially a duplicate of the prevItem method, but for specials instead
        if(!this.activeSpecial){
            this.activeSpecial = specials[specials.length-1];
        }else{
            var currentIndex;
            for(var i=0;i<specials.length;i++){
                if(this.activeSpecial.getName() === specials[i].getName()){
                    currentIndex = i;
                }
            }
            currentIndex--;
            if(currentIndex < 0){
                currentIndex = specials.length-1;
            }else{
                currentIndex;
            }
            this.activeSpecial = specials[currentIndex];
        }
    };
    
    /*
     * Method for re-filling the specials
     */
    function fillAvailSpec(){
        //this fills an array with ALL the specials that can be made available
//        var spec = new Special();
//        spec.setName("Double Attack");
//        availableSpecials.push(spec);
//        
//        spec = new Special();
//        spec.setName("Triple Attack");
//        availableSpecials.push(spec);
//        
//        spec = new Special();
//        spec.setName("Lettuce Slap");
//        availableSpecials.push(spec);
//        
//        spec = new Special();
//        spec.setName("Mince Meat Special");
//        availableSpecials.push(spec);
        
        //log("Available skills: " + availableSpecials.length);
    };
    
    /*
     * Method for getting the active special
     * 
     * @return activeSpecial
     */
    Player.prototype.getActiveSpecial = function(){
        return this.activeSpecial;
    };
    
    /*
     * Method for getting the specials array
     * 
     * @return specials
     */
    Player.prototype.getSpecials = function(){
        return stockSpecials;
    };
    
    /*
     * method for getting the name of the next special to be unlocked
     */
    Player.prototype.getNextSpecialName = function(){
        var nextSpecial = "";
        
        //check if the stock array is smaller than the available array
        if(stockSpecials.length < availableSpecials.length){
            //the next special will be the one that is 1 over the current unlocked skills array size
            nextSpecial = availableSpecials[stockSpecials.length].getName();
        }else{
            //nothing to unlock
            nextSpecial = "Nothing to unlock";
        }
        
        return nextSpecial;
    };
    
    /*
     * Method to reset the usable specials to all the unlock specials
     */
    Player.prototype.resetSpecials = function(){
        //variable to check if it is necassary to add any specials
        var okayToAdd = false;
        //cycle through the stock(unlocked) specials
        for(var i=0;i<stockSpecials.length;i++){
            //cycle through the specials that can currently be used
            for(var j=0;j<specials.length;j++){
                //log("Stock specials " + stockSpecials[i].getName() + " Specials " + specials[j].getName());
                //check if the names match
                if(stockSpecials[i].getName() === specials[j].getName()){
                    //if they match, just go to the next special
                    okayToAdd = false;
                    //log("Specials match, setting false");
                    break;
                }else{
                    //if they don't match, we need to add a special
                    okayToAdd = true;
                    //log("Specials do not match, setting true");
                }
            }
            //if we need to add or if the specials array is 0
            if(okayToAdd || specials.length === 0){
                //add the unlocked special at the current index
                specials.push(stockSpecials[i]);
                //log("Adding special " + stockSpecials[i].getName());
            }else{
                //log("Special already available " + stockSpecials[i].getName());
            }
        }
        //log(specials.length);
    };
    
    /*
     * Method to set the health to a specified value
     */
    Player.prototype.setHealth = function(inHealth){
        this.health = this.inHealth;
    };
    
    /*
     * Method to get the current health
     * 
     * @return health
     */
    Player.prototype.getHealth = function(){
        return this.health;
    };
    
    /*
     * Method to set the maximum health to a certain value
     */
    Player.prototype.setMaxHealth = function(inHealth){
        this.maxHealth = this.inHealth;
    };
    
    /*
     * Method to get the maximum health
     */
    Player.prototype.getMaxHealth = function(){
        return this.maxHealth;
    };
    
    /*
     * Method to set the name
     */
    Player.prototype.setName = function(playerName){
        this.name = playerName;
    };
    
    /*
     * Method to get the name
     * 
     * @return name
     */
    Player.prototype.getName = function(){
        return this.name;
    };
    
    /*
     * Kill the player
     */
    Player.prototype.setDead = function(){
        addFlavorInfo("white", "You have died. Game over.");
        tellFlavorInfo();
        //alert("");
        this.dead = true;
    };
    
    /*
     * Kill the player
     */
    Player.prototype.isDead = function(){
        return this.dead;
    };
    
    /*
     * Method to decrement the health
     */
    Player.prototype.decrementHealth = function(decrement){
        //if the input is not a number (null if not there, so fires too)
        if(typeof decrement != 'number'){
            //if health is about to drop to 0 or below
            if(this.health-1<=0){
                //set health to 0
                this.health = 0;
                //set dead
                this.setDead();
            }else{
                //decrement health by 1
                this.health--;
            }
        }else{
            //if health is about to drop to 0 or below
            if(this.health-decrement<=0){
                //set health to 0
                this.health = 0;
                //set dead
                //this.dead = true;
                this.setDead();
                //show the end screen
                //showEndScreen();
            }else{
                //decrement health by the input
                this.health = this.health - decrement;
            }
        }
    };
    
    /*
     * Method to attack a target
     */
    Player.prototype.attack = function(target){
        //if(typeof target === Enemy){
        //
        //decrement the target's health by the power
        target.decrementHealth(this.pow);
        if(!target.isDead()){
            addCombatText(this.name + " attacked " + target.getName() + " for " + this.pow + " and left them with " + target.getHealth() + " health!");
        }
        //set the player's action time to 0
        //battle.setActionTime(0);
        //}else{
          //  alert(typeof target);
        //}
    };
    
    /*
     * Method to attack a target with a special attack
     */
    Player.prototype.useSpecial = function(target){
        //check if the specials array size is bigger than 0
        if(specials.length > 0){
            //target.decrementHealth(pwr*2);
            //log("using " + this.activeSpecial.getName());
            //us the active special's effect on the target
            this.activeSpecial.effect(target);
            //remove this special from the usable specials array
            this.removeSpecial(this.activeSpecial);
            //set the player's battle timer to 0
            battle.setActionTime(0);
        }else{
            //no specials to use
            log("specials empty");
        }
    };
    
    /*
     * Method to get the power
     * 
     * @return pow
     */
    Player.prototype.getPow = function(){
        return this.pow;
    };
    
    /*
     * Method to get the dexterity
     * 
     * @return dex
     */
    Player.prototype.getDex = function(){
        return this.dex;
    };
    
    /*
     * Method to get the wisdom
     * 
     * @return wis
     */
    Player.prototype.getWis = function(){
        return this.wis;
    };
    
    /*
     * Method to use the active item
     */
    Player.prototype.useActiveItem = function(){
        //check if the items array(or inventory) size is bigger than 0
        if(items.length > 0){
            //log("using " + this.activeItem.getName());
            //use the item's effect on the player(though can be the enemy)
            this.activeItem.effect(player);
            //remove the item from the item array(or inventory)
            this.removeItem(this.activeItem);
            //set the player's battle timer to 0
            battle.setActionTime(0);
        }else{
            //no more items
            log("inventory empty");
        }
    };
    
    /*
     * Increment the health by an amount
     */
    Player.prototype.incrementHealth = function(increment){
        //if the input is not a number (null if not there, so fires too)
        if(typeof increment != 'number'){
            //if the input is not a number (null if not there, so fires too)
            if(this.health+1>=this.maxHealth){
                //current health becomes maximum health
                this.health = maxHealh;
            }else{
                //increment health by 1
                this.health++;
            }
        }else{
            //if the health is about to hit, or go above, the maximum health
            if(this.health +increment >= this.maxHealth){
                //current health becomes maximum health
                this.health = this.maxHealth;
            }else{
                //increment gets added to health
                this.health = this.health + increment;
            }
        }
    };
    
    /*
     * Methoed to print the player's stats to console
     */
    Player.prototype.printStats = function(){
        log("------Player Stats------");
        log("Level: " + this.level);
        log("Exp: " + this.experience);
        log("Level Cap: " + this.levelCap);
        log("Max Health: " + this.maxHealth);
        log("Health: " + this.health);
        log("Power: " + this.pow);
        log("Dex: " + this.dex);
        log("Will: " + this.wis);
        log("# Specials: " + this.specials.length);
        log("# Stock Specials: " + this.stockSpecials.length);
        log("# Items: " + this.inventory.length);
        log("Position: " + this.posX + ", " + this.posY);
        log("------End Player Stats------");
    };
    
    Player.prototype.move = function(x, y){
        this.posX += x;
        this.posY += y;
    };
    
    Player.prototype.getPos = function(){
        return [this.posX, this.posY];
    };
    
    Player.prototype.setBattleReady = function(inStatus){
        this.battleReady = inStatus;
    };
    
    Player.prototype.isBattleReady = function(){
        return this.battleReady;
    };
    
    Player.prototype.addTick = function(){
        this.tick++;
    };   
    
    Player.prototype.getTick = function(){
        return this.tick;
    };   
    
    Player.prototype.getCombinedArmor = function(){
        return (this.armorHead.getArmor()
        + this.armorArmLeft.getArmor()
        + this.armorTorso.getArmor()
        + this.armorArmRight.getArmor()
        + this.armorLegs.getArmor()
        + this.armorFootLeft.getArmor()
        + this.armorFootRight.getArmor());
    };
    
    switch(arguments.length){
        //nothing
        case 0:
            
            break;
        //name
        case 1:
            this.name = arguments[0];
            fillAvailSpec();
            this.ranStats();
            break;
        //name, pos array
        case 2:
            this.name = arguments[0];
            this.posX = arguments[1][0];
            this.posY = arguments[1][1];
            fillAvailSpec();
            this.ranStats();
            break;
        //name, x, y
        case 3:
            this.name = arguments[0];
            this.posX = arguments[1];
            this.posY = arguments[2];
            fillAvailSpec();
            this.ranStats();
            break;
    }
    
};