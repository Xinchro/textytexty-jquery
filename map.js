/* 
    Created on : 25-Aug-2014
    Author     : Xinchro
*/

function Map(){
    
    this.positions = [[]];
    this.availablePos = [[]];
    this.xSize = 10;
    this.ySize = 10;
    this.enemies = [];
    this.merchants = [];
    this.exits = [];
    
    this.closed = false;
    
    this.width = 10;
    this.height = 10;
    
    this.nodes = [];
    
    this.x = 0;
    this.y = 0;
    
    
    Map.prototype.getEnemies = function(){
        return this.enemies;
    };
    
    Map.prototype.getMerchants = function(){
        return this.merchants;
    };
    
    Map.prototype.getExits = function(){
        return this.exits;
    };
    
    Map.prototype.generate = function(){
//        for(var x=0;x<this.xSize;x++){
//            //availablePos[x] = [true];
//            //log("Available places x: " + availablePos);
//            this.availablePos[x] = [];
//            //log(x + "X set");
//            for(var y=0;y<this.ySize;y++){
//                this.availablePos[x][y] = true;
//                log(x + "X " + y + "Y set");
//                //availablePos[y] = true;
//                //log("Available places y: " + availablePos);
//            }    
//        }
        //System.out.println("City.doNodes - making city");
	    var finished = false;

		while (this.x < this.width && !this.closed) {
		    while (this.y < this.height && !this.closed) {

			var node = new MapNode(this.x, this.y);

			if((this.x === 0 || this.x === this.width-1)
				||(this.y === 0 || this.y === this.length-1)){
			    node.setCityEdge(true);
			}
			//node.setSurroundingNodes(getSurroundingNodes(node));
			this.nodes.push(node);
			//node.setBlock(makeCubeAt(node.getPos(), node.getType()));   
//			if(node.getType() !== node.getType().AIR){
//			    this.renderableNodes.push(node);
//			}
			//this.nodes.trimToSize();
			//this.renderableNodes.trimToSize();
			this.y++;
                        console.log("looping");
			//System.out.println("City.simpleUpdate - pos: " +x+" "+y+" "+z);
			//System.out.println("City.simpleUpdate - z tick");
		    }
		    this.x++;
		    this.y = 0;
		}
		var tempNodeArr = [];
		for(var a=0; a < this.nodes.length; a++){
		    var tempNode = this.nodes[a];
		    if(tempNode.getType() === nodeTypes.AIR
			    && tempNode.getPos().getY() === y
			    && !this.closed){
			tempNodeArr.push(tempNode);			
		    }
		}
		if(tempNodeArr.length >= this.width*this.length && !this.closed){
		    //System.out.println("City.doNodes - full air layer");
		    var tempY = this.height - this.y;
		    while(this.y < this.height && !this.closed){
			while (this.x < this.width && !this.closed) {
                            var node = new MapNode(this.x, this.y);
                            node.setType(nodeTypes.AIR);
                            this.nodes.push(node);
                            this.nodes.trimToSize();
			    this.x++;
			}
			this.y++;
		    }
		}
		this.y++;
		this.x = 0;
		//try{
		    //Thread.sleep(1000);
		//}catch(Exception e){

		//}
	    //}
	    if(this.enableBrethren){
		for(var i=0;i<this.nodes.size();i++){
		    if(!this.closed){
			this.nodes[i].setSurroundingNodes(getSurroundingNodes(this.nodes[i]));
			//System.out.println("City.doNodes - getting nodes");
		    }
		}
	    }

//	    System.out.println("City.doNodes - node " + nodes.get(nodes.size()/2).getPos() + " " + nodes.get(nodes.size()/2).getType());
//	    for(int i=0;i<nodes.get(nodes.size()/2).getSurroundingNodes().size();i++){
//		System.out.println("City.doNodes - sur nodes " + nodes.get(nodes.size()/2).getSurroundingNodes().get(i).getPos()
//			+ " " + 
//			nodes.get(nodes.size()/2).getSurroundingNodes().get(i).getType());
//	    }
//	    System.out.println("City.doNodes - sur nodes " + nodes.get(nodes.size()/2).getSurroundingNodes());

//	    if(enableBrethren){
//		for(var i=0;i<nodes.size();i++){
//		    if(!closed){
//			nodes.get(i).checkForBrethren();
//		    }
//		}
//	    }
	    
	    //System.out.print("City.doNodes - arrays: ");
	    //System.out.print(" renderableNodes " + renderableNodes.size());
	    //System.out.print(" renderableCubes " + renderableCubes.size());
	    //System.out.print(" nodeCubes " + nodeCubes.size());
	    //System.out.print(" nodes " + nodes.size());
	    //System.out.println("");
	    this.finished = true;
	    this.x=0;
	    this.y=0;
	    this.z=0;
            if(this.finished){
                return "Finished";
            }else{
                return "Not finished";
            }
    };
    
    Map.prototype.getX = function(x){
        return Math.floor(x * (this.xSize*2)-this.xSize);
    };
    
    Map.prototype.getY = function(y){
        return Math.floor(y * (this.ySize*2)-this.ySize);
    };
    
    Map.prototype.getPos = function(x, y){
        return [this.getX(x), this.getY(y)];
    };
    
    switch(arguments.length){
        //xSize, ySize, NA
        case 3:
        //xSize, ySize
        case 2:
            this.ySize = arguments[1];
        //xSize
        case 1:
            this.xSize = arguments[0];
        //nothing
        case 0:
            this.generate();
            break;
    }
    
}