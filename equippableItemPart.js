/* 
    Created on : 05-Sep-2014
    Author     : Xinchro
*/

var swordPartTypes = Object.freeze({BLADE:0, GUARD:1, GRIP:3, POMMEL:4});

function EquippableItemPart(){
    
    this.name = "";
    this.type = swordPartTypes.BLADE;
    this.img = 0;
    this.defaultImage = "";
    this.description = "";
    //this.effect = function(){};
    
    EquippableItemPart.prototype.getName = function(){
        return this.name;
    };
    
    EquippableItemPart.prototype.getType = function(){
        return this.type;
    };
    
    EquippableItemPart.prototype.getImg = function(){
        if(typeof this.img !== "number"){
            return this.img;
        }else{
            switch(this.type){
                case swordPartTypes.BLADE:
                    this.defaultImage = "bladeLight.svg";
                    break;
                case swordPartTypes.GUARD:
                    this.defaultImage = "hiltLight.svg";
                    break;
                case swordPartTypes.GRIP:
                    this.defaultImage = "gripLight.svg";
                    break;
                case swordPartTypes.POMMEL:
                    this.defaultImage = "pommelLight.svg";
                    break;
            }
            return this.defaultImage;
        }
    };
    
    EquippableItemPart.prototype.setDesc = function(inDesc){
        this.description = inDesc;
    };
    
    EquippableItemPart.prototype.getDesc = function(){
        return this.description;
    };
    
    EquippableItemPart.prototype.effect = function(){
        //TODO outside
    };
        
    EquippableItemPart.prototype.genEffect = function(){
        
    };
    
    EquippableItemPart.prototype.getEffect = function(){
        //return this.effect;
    };
    
    switch(arguments.length){
        //name, desc, type, img, effect
        case 5:
            //this.effect = arguments[3];
        //name, desc, type, img
        case 4:
            this.img = arguments[3];
        //name, desc, type
        case 3:
            this.type = arguments[2];
        //name, desc
        case 2:
            this.description = arguments[1];
        //name
        case 1:
            this.name = arguments[0];
        //nothing
        case 0:
            break;
    }
};