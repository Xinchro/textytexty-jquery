/* 
    Created on : 25-Aug-2014
    Author     : Xinchro
*/

function Map(){
    
    this.positions = [[]];
    this.availablePos = [[]];
    
    
    for(var x=0;x<xSize;x++){
        //availablePos[x] = [true];
        //log("Available places x: " + availablePos);
        for(var y=0;y<ySize;y++){
            this.availablePos[x][y] = true;
            //availablePos[y] = true;
            //log("Available places y: " + availablePos);
        }    
    }
    
    Map.prototype.getX = function(x){
        return Math.floor(x * (xSize*2)-xSize);
    };
    
    Map.prototype.getY = function(y){
        return Math.floor(y * (ySize*2)-ySize);
    };
    
    Map.prototype.getPos = function(x, y){
        return [this.getX(x), this.getY(y)];
    };
    
    switch(arguments.length){
        //nothing
        case 0:
            break;
        //NA
        case 1:
            break;
        //NA
        case 2:
            break;
        //NA
        case 3:
            break;
    }
    
}