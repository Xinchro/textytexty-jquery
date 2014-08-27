/* 
    Created on : 26-Aug-2014
    Author     : Xinchro
*/

function ArmorPiece(){
    this.type = "head armor piece";
    this.armor = 1;
    this.type = armorTypes.HEAD;
    this.img = "";
    
    ArmorPiece.prototype.getName = function(){
        return this.name;
    };
    
    ArmorPiece.prototype.getArmor = function(){
        return this.armor;
    };
    
    ArmorPiece.prototype.getType = function(){
        return this.type;
    };
    
    ArmorPiece.prototype.getImg = function(){
        return this.img;
    };
    
    switch(arguments.length){
        //nothing
        case 0:
            
            break;
        //name
        case 1:
            this.name = arguments[0];
            break;
        //name, armor value
        case 2:
            this.name = arguments[0];
            this.armor = arguments[1];
            break;
        //name, armor value, type
        case 3:
            this.name = arguments[0];
            this.armor = arguments[1];
            this.type = arguments[2];
            break;
        //name, armor value, type, img
        case 4:
            this.name = arguments[0];
            this.armor = arguments[1];
            this.type = arguments[2];
            this.img = arguments[3];
            break;
    }
    
    
};