/* 
    Created on : 05-Sep-2014
    Author     : Xinchro
*/

function EquippableItem(){
    
    this.parts = [];
    this.name = "";
    this.value = -1;
    this.effects = [];
    
    EquippableItem.prototype.setParts = function(inArray){
        console.log("setting parts");
        this.parts = inArray;
    };
    
    EquippableItem.prototype.getParts = function(){
        return this.parts;
    };
    
    EquippableItem.prototype.getName = function(){
        return this.name;
    };
    
    EquippableItem.prototype.genSword = function(){
        var bladeIndex = Math.floor(Math.random()*(swordBlades.length));
        var guardIndex = Math.floor(Math.random()*(swordGuards.length));
        var gripIndex = Math.floor(Math.random()*(swordGrips.length));
        var pommelIndex = Math.floor(Math.random()*(swordPommels.length));
        
        console.log("Blade index: " + bladeIndex);
        console.log("Hilt index: " + guardIndex);
        console.log("Grip index: " + gripIndex);
        console.log("Pommel index: " + pommelIndex);
        
        var blade = new swordBlades[bladeIndex];
        var guard= new swordGuards[guardIndex];
        var grip = new swordGrips[gripIndex];
        var pommel = new swordPommels[pommelIndex];
        
        this.parts.push(blade);
        this.parts.push(guard);
        this.parts.push(grip);
        this.parts.push(pommel);
        
        this.name = blade.getName();
        
        console.log("-----Sword parts: " + this.parts.length + "-----");
        console.log("Blade: " + this.parts[0].getName());
        console.log("Hilt: " + this.parts[1].getName());
        console.log("Grip: " + this.parts[2].getName());
        console.log("Pommel: " + this.parts[3].getName());
    };
    
    EquippableItem.prototype.getValue = function(){
        return this.value;
    };
    
    EquippableItem.prototype.genEffects = function(){
        this.effects = [];
        for(var i=0;i<this.parts.length;i++){
            this.effects.push(this.parts[i].effect);
        }
    };
    
    EquippableItem.prototype.getEffects = function(){
        return this.effects;
    };
    
    switch(arguments.length){
        //specific parts array
        case 1:
            this.setParts(arguments[0]);
            break;
        //nothing
        case 0:
            this.genSword();
            break;
    }
};