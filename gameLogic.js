/* 
    Created on : 17-Aug-2014
    Author     : Xinchro
*/

var player = new Player("Player name");

log("Player " + player.getName() + " spawned at " + player.getPos());
//enemy.start("Enemy name", 0, 1);

var gameScreen = $("#gameScreen");
gameScreen.append(player.getName() + ".");

var phoneScreen = $("#phoneScreen");

var inventoryOpen = false;
var statsOpen = false;
var mapOpen = false;
var socialOpen = false;
var aboutOpen = false;

function phoneClick(inChoice){
    inventoryOpen = false;
    statsOpen = false;
    mapOpen = false;
    socialOpen = false;
    aboutOpen = false;
    
    switch(inChoice){
        case "inventory":
            inventoryOpen = true;
            break;
        case "stats":
            statsOpen = true;
            break;
        case "map":
            mapOpen = true;
            break;
        case "social":
            socialOpen = true;
            break;
        case "about":
            aboutOpen = true;
            break;
    }
    updatePhone();
}

function updatePhone(){
    if(inventoryOpen){
        updateInventory();        
    }else if(statsOpen){
        updateStats();
    }else if(mapOpen){
        updateMap();
    //}else if(socialOpen){
    //}else if(aboutOpen){
    }
}

function updateInventory(){
    var outputString = ""
    +"<select size=\"10\" style=\"width:100%; height:90%;\">"
    +   "<option>apple</option>"
    +   "<option>pineapple</option>"
    +   "<option>f0rum</option>"
    +   "<option>wat</option>"
    +   "<option>hullo?</option>"
    +   "<option>test1</option>"
    +"</select>"
    ;
    phoneScreen.html("<center>" + outputString + "</center>");
}

function updateStats(){
    log("Checking stats");
    //$("#stats").replaceWith(player.getName());
    
    var outputString = ""
    +"Name: "
    +player.getName()
    +"<br>"
    +"Level: "
    +player.getLevel()
    +"<br>"
    +"Experience: "
    +player.getExp()
    +"<br>"
    +"Experience to next level: "
    +player.getExpToNextLevel()
    +"<br>"
    +"Power: "
    +player.getPow()
    +"<br>"
    +"Dexterity: "
    +player.getDex()
    +"<br>"
    +"Wisdom: "
    +player.getWis()
    +"<br>"
    +"Actions: "
    +player.getTick()
    +"<br>"
    ;
            
    phoneScreen.html("<center>" + outputString + "</center>");
}

function updateMap(){
    var outputString = "MAP GOES HERE!";
    
    phoneScreen.html("<center>" + outputString + "</center>");
}

function updateSocial(){
    var outputString = "SOCIALS GO HERE!";
    
    phoneScreen.html("<center>" + outputString + "</center>");
}

function updateAbout(){
    var outputString = "ABOUT GOES HERE!";
    
    phoneScreen.html("<center>" + outputString + "</center>");
}

function move(dir){
//    log("moving");
    var outputString = "You moved.";
    switch(dir){
        case "up":
//            log("moving up");
            player.move(0,1);
            outputString = "You moved up.";
            break;
        case "left":
            player.move(-1,0);
            outputString = "You moved left.";
            break;
        case "down":
            player.move(0,-1);
            outputString = "You moved down.";
            break;
        case "right":
            player.move(1,0);
            outputString = "You moved right.";
            break;
    }
    outputString += " (" + player.getPos() + ")";  
    
    //tellPlayer(outputString);
    addCriticalInfo(outputString);
    //tick();
    //log(enemy.getName() + " pos: " + enemy.getPos() + " " + player.getName() + " pos: " + player.getPos());
}
var enemy;
function tick(){
    var outputString;
    
    player.addTick();
    for(var i=0;i<enemies.length;i++){
        enemy=enemies[i];
        if(player.getPos()[0] === enemy.getPos()[0]
            && player.getPos()[1] === enemy.getPos()[1]
            && !enemy.isDead()){    
            //log("Enemy and player in the same room " +  enemy.getPos()  +  " " + player.getPos());
            if(!player.isBattleReady()){
                outputString = "There is a(n) " + enemy.getName() + " here.";
                addCriticalInfo(outputString);
            }
            player.setBattleReady(true);
            $("#buttonD").html("D<br>Attack");
            break;
        }else{
            player.setBattleReady(false);
            $("#buttonD").html("D");
        }
    }
    
    tellCriticalInfo();
    tellFlavorInfo();
    
    updatePhone();
}


function addCriticalInfo(inInfo){
    critString.push(inInfo);
}
    
function tellCriticalInfo(){
    for(i=0;i<critString.length;i++){
        tellPlayer(critString[i]);
    }
    critString = [];
}

function addFlavorInfo(inInfo){
    flavString.push(inInfo);
}
    
function tellFlavorInfo(){
    for(i=0;i<flavString.length;i++){
        tellPlayer(flavString[i]);
    }
    flavString = [];
}

function tellPlayer(inText){
    var playerTick = player.getTick();
    
    if(playerTick >= 1000){
    }else if(playerTick >= 100){
        playerTick = "0" + playerTick;
    }else if(playerTick >= 10){
        playerTick = "00" + playerTick;
    }else{
        playerTick = "000" + playerTick;
    }
    
    gameScreen.prepend(playerTick + "-" + inText + "<br>");
}

function questionPlayerActions(){
    var outputString;
    
    outputString = "What are you trying to do?";
    
    addFlavorInfo(outputString);
}

function makeQuote(inActorName, inText){
    return inActorName + ": \"" + inText  +"\"";
}

function getRandomEnemyName(){
    var randomName = "Apricot";
    return randomName;
}
function randomX(){
    var randomX = Math.floor((Math.random() * 100) + 1); ;
    //log("X: " + randomX);
    return randomX;
}
function randomY(){
    var randomY = Math.floor((Math.random() * 100) + 1); ;
    //log("Y: " + randomY);
    return randomY;
}

var enemies = [];
function addNewEnemy(inName, inX, inY){
    if(inX===0 && inY===0){
        addNewEnemy(new Enemy(getRandomEnemyName(), randomX(), randomY()));
    }
    var newEnemy = new Enemy(inName, inX, inY);
    enemies.push(newEnemy);
    log("New enemy: " + newEnemy.getName() + " " + newEnemy.getPos());
}

function addEnemies(inNumber){
    for(var i=0; i<inNumber; i++){
        var newEnemy = new Enemy(getRandomEnemyName(), randomX(), randomY());
        enemies.push(newEnemy);
        log("Enemy #"+i+" " + newEnemy.getName() + " spawned at " + newEnemy.getPos());
    }
//         = enemies[enemies.length-1];
}

addNewEnemy("Albatros", 0, 1);
addEnemies(5);

function removeEnemy(inEnemy){
    var indexOf = enemies.indexOf(inEnemy);
    enemies.splice(indexOf, 1);
}

//player.printStats();