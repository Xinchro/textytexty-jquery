/* 
    Created on : 27-Aug-2014
    Author     : Xinchro
*/

function Item(){
    
    this.name = "New Item";
    this.value = 1;
    this.desc = "New Item Description";
    
    Item.prototype.getName = function(){
        return this.name;
    };
    
    Item.prototype.getValue = function(){
        return this.value;
    };
    
    Item.prototype.getDesc = function(){
        return this.desc;
    };
    
    Item.prototype.effect = function(){
        //todo from outside
        return "New Item Effect";
    };
    
    switch(arguments.length){
         //name, value, desc
        case 3:
            this.desc = arguments[2];
        //name, value
        case 2:
            if(typeof arguments[1] === "number"){
                this.value = arguments[1];
            }else{
                this.value = -1;
            }
        //name
        case 1:
            this.name = arguments[0];
        //nothing
        case 0:
            break;
        
       
    }
};