/* 
    Created on : 17-Aug-2014
    Author     : Xinchro
*/

var player;
//if(isScriptPresent("player.js")){
    player = new Player();
    player.start("Player name");
//}

//function isScriptPresent(url) {
//    if (!url){
//        url = "gameLogic.js";
//    }
//    scripts = document.getElementsByTagName('script');
//    for (var i = scripts.length; i--;) {
//        if (scripts[i].src == url) return true;
//    }
//    return false;
//}

function checkInventory(){
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
    $("#phoneScreen").html("<center>" + outputString + "</center>");
}

function checkStats(){
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
    ;
            
    $("#phoneScreen").html("<center>" + outputString + "</center>");
}

function checkMap(){
    var outputString = "MAP GOES HERE!";
    
    $("#phoneScreen").html("<center>" + outputString + "</center>");
}

function checkSocial(){
    var outputString = "SOCIALS GO HERE!";
    
    $("#phoneScreen").html("<center>" + outputString + "</center>");
}

function checkAbout(){
    var outputString = "ABOUT GOES HERE!";
    
    $("#phoneScreen").html("<center>" + outputString + "</center>");
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
    outputString += " " + player.getPos();
    $("#gameScreen").prepend(outputString + "<br>");
}

//player.printStats();