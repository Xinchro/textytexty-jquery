/* 
    Created on : 14-Nov-2014
    Author     : Xinchro
*/


/**
 *
 * @author Xinchro
 */
function MapNode(){

    //public enum Type {

	//BUILDING, PROP, ROAD, GRASS, AIR
    //}
//    private float weightRoad;
//    private float weightBuilding;
//    private float weightProp;
//    private float weightGrass;
//    private float weightAir;
//    private float[] globalWeights;
//    private Vector3f pos;
//    private Type type;
//    private ColorRGBA color;
//    private ColorRGBA white = new ColorRGBA(1.0f, 1.0f, 1.0f, 1.0f);
//    private ColorRGBA black = new ColorRGBA(0.0f, 0.0f, 0.0f, 1.0f);
//    private ColorRGBA red = new ColorRGBA(1.0f, 0.0f, 0.0f, 1.0f);
//    private ColorRGBA blue = new ColorRGBA(0.0f, 0.0f, 1.0f, 1.0f);
//    private ColorRGBA green = new ColorRGBA(0.0f, 1.0f, 0.0f, 1.0f);
//    private CityNode underNode;
//    private ArrayList<CityNode> surroundingNodes = new ArrayList<CityNode>();
//    private float[] weightsArr = new float[5];
    this.weightWall;
    this.weightEnemy;
    //this.weightProp;
    //this.weightGrass;
    this.weightAir;
    this.globalWeights = [];
    this.pos = [[]];
    this.type;
    this.color;
    ;
    this.surroundingNodes = [];
    this.weightsArr = [];
    
    
    MapNode.prototype.CityNode = function() {
	this.setDefaultWeights();

	this.fillWeightArray();

	type = null;
	//pos = new Vector3f(0.0f, 0.0f, 0.0f);
	color = "white";
    };

    MapNode.prototype.CityNode = function(){//(Vector3f pos) {
	setDefaultWeights();

	fillWeightArray();

	type = null;
	this.pos = pos;
	////System.out.println("Node(vec3f) - new node at " + pos.getX() + " " + pos.getY() + " " + pos.getZ());
    };
    
    MapNode.prototype.setDefaultWeights = function(){
	this.weightWall = 0.4;
	this.weightEnemy = 0.5;
	//weightProp = .5f;
	//weightGrass = 0.2f;
	this.weightAir = 0.1;
    };
    
    MapNode.prototype.randomizeWeights = function(){
	//var rand = Math.random();
	//float value = rand.nextFloat();

	this.weightEnemy += Math.random();
	//weightBuilding = 0.0f;
	//weightProp += rand.nextFloat();
	//weightProp = 0.0f;
	this.weightWall += Math.random();
	//weightRoad = 0.0f;
	//weightGrass += rand.nextFloat();
	//weightGrass = 0.0f;
	this.weightAir += Math.random();
	//weightAir = 0.0f;
    };

    MapNode.prototype.fillWeightArray = function() {
	this.weightsArr[0] = weightWall;
	this.weightsArr[1] = weightEnemy;
	//weightsArr[2] = weightProp;
	//weightsArr[3] = weightGrass;
	weightsArr[2] = weightAir;
        normalizeWeights();
    };

    MapNode.prototype.normalizeWeights = function() {
	var wallPercent = 0;
	var enemyPercent = 0;
	//float propPercent = 0;
	//float grassPercent = 0;
	var airPercent = 0;
	
	var totalValue =
		weightWall
		+ weightEnemy
		//+ weightProp
		//+ weightGrass
		+ weightAir
        ;
	
	wallPercent = weightWall/totalValue;
	enemyPercent = weightEnemy/totalValue;
	//propPercent = weightProp/totalValue;
	//grassPercent = weightGrass/totalValue;
	airPercent = weightAir/totalValue;
	
//	//System.out.println("CityNode.normalizeWeights - percentages");
//	//System.out.println("CityNode.normalizeWeights - roadPercent     - " + roadPercent);
//	//System.out.println("CityNode.normalizeWeights - buildingPercent - " + buildingPercent);
//	//System.out.println("CityNode.normalizeWeights - propPercent     - " + propPercent);
//	//System.out.println("CityNode.normalizeWeights - grassPercent    - " + grassPercent);
//	//System.out.println("CityNode.normalizeWeights - airPercent      - " + airPercent);
	
	weightWall = wallPercent;
	weightEnemy = enemyPercent;
	//weightProp = propPercent;
	//weightGrass = grassPercent;
	weightAir = airPercent;
	
    };
    
    //private boolean edge = false;
    this.edge = false;
    MapNode.prototype.setCityEdge = function(inEdge){//(boolean edge){
	this.edge = inEdge;
    };

    //private boolean roadReWeighted = false;
    this.roadReWeighted = false;
    
    MapNode.prototype.doWeights = function() {

	this.randomizeWeights();
	
	this.normalizeWeights();

	this.fillWeightArray();

	////System.out.println("Node.doWeights - float: " + value);

	var dist = Math.abs(this.weightsArr[0] - 1);
	var tempDist = 0;
	var index = 0;

	for (var i = 0; i < this.weightsArr.length; i++) {
	    tempDist = Math.abs(weightsArr[i] - 1);
	    if (tempDist < dist) {
		////System.out.println("CityNode.doWeights - BEFORE tempDist " + tempDist + " dist " + dist);
		dist = tempDist;
		index = i;
		////System.out.println("CityNode.doWeights - AFTER tempDist " + tempDist + " dist " + dist);
		////System.out.println("CityNode.doWeights - index picked " + index);
	    }
	}
	
	var tempRoadList = [];
	for(var i=0; i<this.surroundingNodes.length; i++){
	    if(this.surroundingNodes[i].getType() === nodeTypes.WALL){
		tempRoadList.add(this.surroundingNodes.get(i));
	    }
	}
	if((tempRoadList.size() === 2 )
		&& this.pos[1] === 0){
	    index = 0;
	}
	
	if(this.edge
		&& this.pos[1] === 0){
	    index = 0;
	}

	////System.out.println("CityNode.doWeights - setting type ");
	////System.out.println("CityNode.doWeights - value " + value);
	////System.out.println("CityNode.doWeights - road picked");
	switch (index) {
	    case 0:
		//road
		////System.out.println("CityNode.doWeights - road picked");
		type = nodeTypes.WALL;
		break;
	    case 1:
		//building
		////System.out.println("CityNode.doWeights - building picked");
		type = nodeTypes.ENEMY;
		break;
//	    case 2:
//		//prop
//		////System.out.println("CityNode.doWeights - prop picked");
//		type = Type.PROP;
//		break;
//	    case 3:
//		//grass
//		////System.out.println("CityNode.doWeights - grass picked");
//		type = Type.GRASS;
//		break;
	    case 2:
		//air
		////System.out.println("CityNode.doWeights - air picked");
		type = nodeTypes.AIR;
		break;
	}

	this.checkType();
    };

    MapNode.prototype.checkType = function() {
	//lose global weighting
//	//System.out.println("CityNode.checkType - typeset " + type);
//	if(pos.getX() != 0){
//	    try{
//		Thread.sleep(1000);
//	    }catch(Exception e){
//		
//	    }
//	}
	switch (type) {
	    case WALL:
		this.doWall();
		break;
	    case ENEMY:
		this.doEnemy();
		break;
//	    case ROAD:
//		doRoad();
//		break;
//	    case GRASS:
//		doGrass();
//		break;
	    case AIR:
		doAir();
		break;
	}
    };

    MapNode.prototype.getType = function() {
	return this.type;
    };

    MapNode.prototype.doWall = function() {
        type = nodeTypes.WALL;
    };
    
    MapNode.prototype.addBuildingBlocks = function(){//(CityNode node){
	//ArrayList<CityNode> nodesBlocks = node.getBuildingBlocks();
	//ArrayList<CityNode> blocksToBeAdded = new ArrayList<CityNode>();
	
	if(!this.buildingBlocks.contains(node)){
	    blocksToBeAdded.add(node);
	}
	
	for(var i=0;i<nodesBlocks.size();i++){
	    var tempNode = nodesBlocks[i];
	    if(!this.buildingBlocks.contains(tempNode)){
		blocksToBeAdded.add(tempNode);
	    }
	}
	
	this.buildingBlocks.addAll(blocksToBeAdded);
    };
    
    MapNode.prototype.getBuildingBlocks = function(){
	return buildingBlocks;
    };

    MapNode.prototype.setSurroundingNodes = function(){//(ArrayList nodes) {
	if (nodes !== null) {
	    surroundingNodes.clear();
	    surroundingNodes.addAll(nodes);
	    //for (int i = 0; i < surroundingNodes.size(); i++) {
		if (surroundingNodes.get(i).getPos().getX() === this.getPos().getX()
			&& surroundingNodes.get(i).getPos().getY() === this.getPos().getY() - 1
			&& surroundingNodes.get(i).getPos().getZ() === this.getPos().getZ()) {
		    underNode = surroundingNodes.get(i);
		    ////System.out.println("CityNode.setUnderNode - undernode set " + underNode.getType());
		} else {
		}
	    //}
	} else {
	}
	if(!generated){
	    doWeights();
	    generated = true;
	}
    };
    
    //private boolean generated = false;
    this.generated = false;

    MapNode.prototype.getSurroundingNodes = function() {
	return surroundingNodes;
    };
    
    MapNode.prototype.checkForBrethren = function(){
	if(type !== type.AIR){
	    for(var i=0;i<this.surroundingNodes.length;i++){
		////System.out.println("CityNode.checkForBrethren - in loop");
		////System.out.println("CityNode.checkForBrethren - checking against type " + surroundingNodes.get(i).getType());
		if(this.surroundingNodes.get(i).getType().equals(this.type)
		    && checkNodeForSiblings(this.surroundingNodes.get(i))){
		    ////System.out.println("CityNode.checkForBrethren - match! " + type + " to " + surroundingNodes.get(i).getType());
		}
	    }
	}
	if(type !== nodeTypes.AIR){
	    ////System.out.println("CityNode.checkForBrethren types");

	    ////System.out.print("CityNode.checkForBrethren ");
	    //for(int i=0;i<.size();i++){
		////System.out.print(.get(i).getType() + " ");
	    //}
	    ////System.out.println("");
	}
    };
    
    MapNode.prototype.checkNodeForSiblings = function(inNode){//(CityNode node){
	var tempNode = null;
	for(var j=0;j<inNode.getBuildingBlocks().size();j++){
	    tempNode = inNode.getBuildingBlocks().get(j);
	    this.addSibling(tempNode);
	    ////System.out.println("CityNode.checkForSiblings - adding temp node");
	}
    };
    
    MapNode.prototype.addSibling = function(inNode){//(CityNode node){
	if(!this.buildingBlocks.contains(inNode)){
	    ////System.out.println("CityNode.addSibling - adding sibling manually");
	    this.buildingBlocks.add(inNode);
	    inNode.addSibling(this);
	    checkNodeForSiblings(inNode);
	}
    };

    MapNode.prototype.doEnemy = function() {
        this.type = nodeTypes.ENEMY;
    };

    MapNode.prototype.doAir = function() {
	this.type = nodeTypes.AIR;
    };

    MapNode.prototype.getPos = function() {
	return this.pos;
    };

    MapNode.prototype.setGlobals = function(){//(float[] globals) {
	if (globals.length === 3) {
	    globalWeights = globals;
	    weightEnemy = globals[0];
	    //weightProp = globals[1];
	    weightWall = globals[2];
	    //weightGrass = globals[3];
	    weightAir = globals[2];
	} else {
	    //System.out.println("CityGen.Node.setGlobals - Invalid number of global weights!");
	}
    };
    
    //private ArrayList<Geometry> surroundingNodeBlocks = new ArrayList<Geometry>();
    //private Geometry block = null;
    
    MapNode.prototype.setBlock = function(){//(Geometry block){
	this.block = block;
	this.pos.set(block.getWorldTranslation());
    };
    
    MapNode.prototype.getBlock = function(){
	return block;
    };
    
    MapNode.prototype.setType = function(inType){//(Type type){
        this.type = inType;
    };
    
    MapNode.prototype.getType = function(){//(Type type){
	return this.type;
    };
    
    switch(arguments.length){
        //x,y
        case 2:
            this.pos[1] = arguments[1];
            break;
        //x
        case 1:
            this.pos[0] = arguments[0];
            break;
        //nothing
        case 0:
            this.setDefaultWeights();
            this.fillWeightArray();
            this.type = null;
            break;
    }
    
}
