/* 
    Created on : 17-Aug-2014
    Author     : Xinchro
*/

var player = new Player("Player name");

log("Player " + player.getName() + " spawned at " + player.getPos());
//enemy.start("Enemy name", 0, 1);

var map = new Map();

var gameScreen = $("#gameScreen");
gameScreen.append(player.getName() + ". Try moving North first.");

var phoneScreen = $("#phoneScreen");

var inventoryOpen = false;
var statsOpen = false;
var mapOpen = false;
var socialOpen = false;
var aboutOpen = false;

var xSize = 5 - 1;//because 0
var ySize = 5 - 1;

var invCheckBoxArray = [];

var availablePos = {};

//for(var x=0;x<xSize;x++){
//    //availablePos[x] = [true];
//    //log("Available places x: " + availablePos);
//    for(var y=0;y<ySize;y++){
//        availablePos[x][y] = true;
//        //availablePos[y] = true;
//        //log("Available places y: " + availablePos);
//    }    
//}

//log("Available places : " + availablePos[1][1]);

/*
 * Phone button clicked event handling
 */
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

/*
 * Update the current phone screen with the relevant information
 */
function updatePhone(){
    if(inventoryOpen){
        updateInventory();        
    }else if(statsOpen){
        updateStats();
    }else if(mapOpen){
        updateMap();
    }else if(socialOpen){
        updateSocial();
    }else if(aboutOpen){
        updateAbout();
    }
}

/*
 * Update the phone screen with the inventory information
 */
for(var i=0;i<50;i++){
    var string = "";
    for(var j=0;j<i;j++){
        if(j<50){
            string += "*";
        }
    }
    if(i<50){
        string += "Length" + i;
    }else{
        string += "Length" + "50";
    }
    
    for(var j=0;j<i;j++){
        if(j<50){
            string += "*";
        }
    }
    player.addItem(string);
}
function updateInventory(){
    var outputString = "";
    var outputStringBoxes = "";
//    outputString += "<select size=\"10\" style=\"width:100%; height:90%;\">"
//    +   "<option>apple</option>"
//    +   "<option>pineapple</option>"
//    +   "<option>f0rum</option>"
//    +   "<option>wat</option>"
//    +   "<option>hullo?</option>"
//    +   "<option>test1</option>"
//    +"</select>"
//    ;
    
    //create the divs inside of "#phonescreen"
    //outputString += "<div id=\"inventoryCheckBoxes\">" + "</div>";
    outputString += "<div id=\"inventoryItemList\">";

    //loop throuth player inventory, adding items to the lists (check boxes and text)
    for(var i=0;i<player.getInventory().length;i++){
//        outputString += "<span style=\"width:100%;\"><u>" + player.getInventory()[i] +"</u></span>";//.getName();
        outputString += "<div style=\"width:100%;border-bottom:1px solid #303030;\">";
        outputString += "<div style=\"float:left;\"><input type=\"checkbox\" id=\"invid" + i + "\"";
        outputString += "title=\"" + player.getInventory()[i] + "\"";
        outputString += "></div>";
        outputString += "<div style=\"margin: 0 auto;\">" + player.getInventory()[i] +"</div></div>";//.getName();
//        outputStringBoxes += "<div style=\"width:100%;border-bottom:1px solid #303030;line-height:100%;\"><input type=\"checkbox\" id=\"invid" + i + "\"";
//        outputStringBoxes += "title=\"" + player.getInventory()[i] + "\"";
//        outputStringBoxes += "></div>";//<input type="checkbox" id="invid1" name="applepie"><br>
        outputString += "";
    }
    outputString += "</div>";//.getName();
    
    //to screen
    phoneScreen.html("<center>" + outputString + "</center>");
    
    
    $("#inventoryItemList").css("overflow-x", "auto");
    $("#inventoryItemList").css("overflow-y", "scroll");
    $("#phone").css("overflow", "scroll");
    var areaWidth = $("#phone")[0].scrollWidth;
    var width = $("#phone").width();
    
    $("#inventoryItemList").width(width + (width-areaWidth));
    
    var areaHeight = $("#phone")[0].scrollHeight;
    var height = $("#phone").height();
    
    $("#inventoryItemList").height(height + (height-areaHeight));
    
    $("#phone").css("overflow", "hidden");
    //$("#inventoryCheckBoxes").html("<center>" + outputStringBoxes + "</center>");
    for(var i=0;i<invCheckBoxArray.length;i++){
        if(invCheckBoxArray[i]){
            $("#invid"+i).attr("checked", true);
        }else{
            $("#invid"+i).attr("checked", false);
        }
    }
    for(var i=0;i<player.getInventory().length;i++){
        $("#invid"+i).click(function(){updateChecks();});
    }
}

phoneClick("inventory");

function updateChecks(){
    invCheckBoxArray = [];
//    for(var i=0;i<player.getInventory().length;i++){
//        log("pushing: " + player.getInventory()[i]);
//        //add item to checks array
//        invCheckBoxArray.push(player.getInventory()[i]);
//    }
    
//    log("Items pushed: " + invCheckBoxArray);
    
    //update list
    var outputString = "";
    for(var i=0;i<player.getInventory().length;i++){
        //log("Checking checkbox: invid" + i + " " + $("#invid"+i).is(':checked'));
        if($("#invid"+i).is(":checked")){
            invCheckBoxArray.push(true);//[i].checked = true;
        }else{
            invCheckBoxArray.push(false);//[i].checked = false;
        }
        outputString += invCheckBoxArray[i] + " ";
    }
    
    //log("checks #: " + invCheckBoxArray.length);
    //log("checks: " + outputString);
}

/*
 * Play a sound
 */
function playSound(soundfile) {
    var sound = new Audio(soundfile);
    sound.play();
}


/*
 * Update the phone screen with the stats information
 */
function updateStats(){
    log("Checking stats");
    //$("#stats").replaceWith(player.getName());
    
    var outputString = "";
    
    outputString += "Name: "
    +player.getName()
    +"<br>"
    +"Health: "
    +player.getHealth() + " / " + player.getMaxHealth()
    +"<br>";
    
    outputString += "Armor: "
    +player.getCombinedArmor()
    +"<br>";
    //+"Health: "
    //+player.getHealth() + " / " + player.getMaxHealth()
    //+"<br>";
    
    var bodyPieceWidth = $("#phone").width()/7;
    var bodyPieceHeight = 10;
    if($("#phoneScreen").height()/7 < bodyPieceWidth){
        bodyPieceHeight = $("#phone").height()/7;
    }else{
        bodyPieceHeight = bodyPieceWidth;
    }
    
    var percentage = 100/7;
    var onepercent = 1/100;
    var marginT = bodyPieceHeight * onepercent;
    var marginR = bodyPieceWidth * onepercent;
    var marginB = bodyPieceHeight * onepercent;
    var marginL = bodyPieceWidth * onepercent;

    var tempTestColor = "#303030";
    
    var headColor = tempTestColor;
    var armLeftColor = tempTestColor;
    var torsoColor = tempTestColor;
    var armRightColor = tempTestColor;
    var legsColor = tempTestColor;
    var feetLeftColor = tempTestColor;
    var feetRightColor = tempTestColor;
    
    outputString+= "<div id=\"playerHead\" class=\"armorSlot\""
                    + "style=\""
                        + "margin-top:" + marginT*1 + "%;"
                        + "margin-right:" + marginR*1 + "%;"
                        + "margin-bottom:" + marginB*1 + "%;"
                        + "margin-left:" + (percentage*3 + marginL) + "%;"
                        + "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                        + "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                        + "background-color:" + headColor + ";"
                    +"\">"
            + "<div>" 
                    + "<img src=\""
                    + player.armorHead.getImg() + "\""
                    //+ "background-position: center center;"
                    //+ "background-repeat: no-repeat;"
                    //+ "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                    //+ "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                    + "height=\"" + 100 + "%\""
                    + "width=\"" + 100 + "%\""
                +">"
            + "</div>"
                //+"<img href=\"" + player.armorHead.getImg() + "\" height=\"" + (bodyPieceHeight-marginT-marginB) + "\"" + "width=\"" + (bodyPieceWidth-marginR-marginL) + "\"></img>"
                //+   player.armorHead.getName()
                //+   "<br>"
                //+   player.armorHead.getArmor()
                +   "</div>"
            + "<br>";
    
    outputString+= "<div id=\"playerArmLeft\" class=\"armorSlot\""
                    + "style=\""
                        + "margin-top:" + marginT*1 + "%;"
                        + "margin-right:" + marginR*1 + "%;"
                        + "margin-bottom:" + marginB*1 + "%;"
                        + "margin-left:" + (percentage*2 - (marginL/2)) + "%;"// /2 cuz even number
                        + "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                        + "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                        + "background-color:" + armLeftColor + ";"
                    +"\">"
            + "<div>" 
                    + "<img src=\""
                    + player.armorArmLeft.getImg() + "\""
                    //+ "background-position: center center;"
                    //+ "background-repeat: no-repeat;"
                    //+ "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                    //+ "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                    + "height=\"" + 100 + "%\""
                    + "width=\"" + 100 + "%\""
                +">"
            + "</div>"
//                +  player.armorArmLeft.getName()
//                +  "<br>"
//                +  player.armorArmLeft.getArmor()
                +  "</div>"
            ;
    
    outputString+= "<div id=\"playerTorso\" class=\"armorSlot\""
                    + "style=\""
                        + "margin-top:" + marginT*1 + "%;"
                        + "margin-right:" + marginR*1 + "%;"
                        + "margin-bottom:" + marginB*1 + "%;"
                        + "margin-left:" + (percentage*0 + marginL) + "%;"
                        + "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                        + "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                        + "background-color:" + torsoColor + ";"
                    +"\">"
            + "<div>" 
                    + "<img src=\""
                    + player.armorTorso.getImg() + "\""
                    //+ "background-position: center center;"
                    //+ "background-repeat: no-repeat;"
                    //+ "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                    //+ "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                    + "height=\"" + 100 + "%\""
                    + "width=\"" + 100 + "%\""
                +">"
            + "</div>"
//                +  player.armorTorso.getName()
//                +  "<br>"
//                +  player.armorTorso.getArmor()
                +  "</div>"
            ;
    
    outputString+= "<div id=\"playerArmRight\" class=\"armorSlot\""
                    + "style=\""
                        + "margin-top:" + marginT*1 + "%;"
                        + "margin-right:" + marginR*1 + "%;"
                        + "margin-bottom:" + marginB*1 + "%;"
                        + "margin-left:" + (percentage*0 + marginL) + "%;"
                        + "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                        + "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                        + "background-color:" + armRightColor + ";"
                    +"\">"
            + "<div>" 
                    + "<img src=\""
                    + player.armorArmRight.getImg() + "\""
                    //+ "background-position: center center;"
                    //+ "background-repeat: no-repeat;"
                    //+ "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                    //+ "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                    + "height=\"" + 100 + "%\""
                    + "width=\"" + 100 + "%\""
                +">"
            + "</div>"
//                +  player.armorArmRight.getName()
//                +  "<br>"
//                +  player.armorArmRight.getArmor()
                +  "</div>"
//            + "<br>"
            ;
    
    outputString+= "<div id=\"playerLegs\" class=\"armorSlot\""
                    + "style=\""
                        + "margin-top:" + marginT*1 + "%;"
                        + "margin-right:" + marginR*1 + "%;"
                        + "margin-bottom:" + marginB*1 + "%;"
                        + "margin-left:" + (percentage*3 + marginL) + "%;"
                        + "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                        + "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                        + "background-color:" + legsColor + ";"
                    +"\">"
            + "<div>" 
                    + "<img src=\""
                    + player.armorLegs.getImg() + "\""
                    //+ "background-position: center center;"
                    //+ "background-repeat: no-repeat;"
                    //+ "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                    //+ "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                    + "height=\"" + 100 + "%\""
                    + "width=\"" + 100 + "%\""
                +">"
            + "</div>"
//                +  player.armorLegs.getName()
//                +  "<br>"
//                +  player.armorLegs.getArmor()
                +  "</div>"
//            + "<br>"
            ;
    outputString+= "<div id=\"playerFeetLeft\" class=\"armorSlot\""
                    + "style=\""
                        + "margin-top:" + marginT*1 + "%;"
                        + "margin-right:" + marginR*1 + "%;"
                        + "margin-bottom:" + marginB*1 + "%;"
                        + "margin-left:" + (percentage*2.5 -(marginL/2)) + "%;"// /2 cuz even number
                        + "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                        + "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                        + "background-color:" + feetLeftColor + ";"
                    +"\">"
            + "<div>" 
                    + "<img src=\""
                    + player.armorFootLeft.getImg() + "\""
                    //+ "background-position: center center;"
                    //+ "background-repeat: no-repeat;"
                    //+ "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                    //+ "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                    + "height=\"" + 100 + "%\""
                    + "width=\"" + 100 + "%\""
                +">"
            + "</div>"
//                +  player.armorFootLeft.getName()
//                +  "<br>"
//                +  player.armorFootLeft.getArmor()
                +  "</div>"
            ;
            
    outputString+= "<div id=\"playerFeetRight\" class=\"armorSlot\""
                    + "style=\""
                        + "margin-top:" + marginT*1 + "%;"
                        + "margin-right:" + marginR*1 + "%;"
                        + "margin-bottom:" + marginB*1 + "%;"
                        + "margin-left:" + (percentage*0 + marginL) + "%;"
                        + "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                        + "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                        + "background-color:" + feetRightColor + ";"
                    +"\">"
            + "<div>" 
                    + "<img src=\""
                    + player.armorFootRight.getImg() + "\""
                    //+ "background-position: center center;"
                    //+ "background-repeat: no-repeat;"
                    //+ "height:" + (bodyPieceHeight-marginT-marginB) + ";"
                    //+ "width:" + (bodyPieceWidth-marginR-marginL) + ";"
                    + "height=\"" + 100 + "%\""
                    + "width=\"" + 100 + "%\""
                +">"
            + "</div>"
//                +  player.armorFootRight.getName()
//                +  "<br>"
//                +  player.armorFootRight.getArmor()
                +  "</div>"
//            + "<br>"
            ;
            
    
    outputString += "<div id=\"playerStats\" style=\"float:left;overflow=scroll;\">"
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
    +"</div>"
    ;
            
    phoneScreen.html("<center>" + outputString + "</center>");
}

/*
 * Update the phone screen with the map information
 */
function updateMap(){
    var outputString = "MAP GOES HERE!";
    var outputString = "";
    
    outputString += player.getName() + ": " + player.getPos() + "<br>";
    
    
    var percentage = 100/7;
    
    var blockColor = "#333333";
    
    for(var y=0;y<5;y++){
        blockColor = "#333333";
        for(var x=0;x<5;x++){
            blockColor = "#333333";
            for(var i=0;i<enemies.length;i++){
                blockColor = "#333333";
                if((enemies[i].getPos()[0] === (player.getPos()[0]-2+x))
                        && (enemies[i].getPos()[1] === (player.getPos()[1]+2-y))
                        && (!enemies[i].isDead())){
                    blockColor = "#800000";
                    break;
                }else{
                    blockColor = "#333333";
                }
            }
            
            if(x === 0){
                outputString += "<div id=\"map"+x+""+y+"\""
                +"style=\""
                    +"margin-left:"+percentage+"%;"
                    +"width:"+percentage+"%;"
                    +"height:"+percentage+"%;"
                    +"background-color:" + blockColor + ";"
                    +"float:left;"
                    +"\""
                +"></div>";
            }else if(x === 2 && y === 2){
                outputString += "<div id=\"map"+x+""+y+"\""
                +"style=\""
                    +"width:"+percentage+"%;"
                    +"height:"+percentage+"%;"
                    +"background-color:#000080;"
                    +"float:left;"
                    +"\""
                +">You are here</div>";
            }else{
                outputString += "<div id=\"map"+x+""+y+"\""
                +"style=\""
                    +"width:"+percentage+"%;"
                    +"height:"+percentage+"%;"
                    +"background-color:" + blockColor + ";"
                    +"float:left;"
                    +"\""
                +"></div>";
            }
        }
    }
    
    outputString += "<div style=\"float:left;overflow-y:scroll;width:100%;height:20%;\">";
    for(var i=0;i<enemies.length;i++){
        outputString += enemies[i].getName();
        outputString += ": ";
        outputString += enemies[i].getPos();
        outputString += " ";
        outputString += "(" + getDistanceFromPlayer(enemies[i].getPos()) +")";
        outputString += "<br>";
    }
    outputString += "</div>";
    
    phoneScreen.html("<center>" + outputString + "</center>");
}

/*
 * Gets the distance from the player to the input
 */
function getDistanceFromPlayer(inPoint){
    var magnitude;
    //*****Vector mag:*****
    //var vectorDistance = [player.getPos()[0] - inPoint[0],
    //player.getPos()[1] - inPoint[1]];
    //
    //magnitude = Math.sqrt(Math.pow(vectorDistance[0], 2) + Math.pow(vectorDistance[1], 2));
    //magnitude = Math.floor(magnitude);
    //*****Move points mag:*****
    magnitude = Math.abs(player.getPos()[0] - inPoint[0]) + Math.abs(player.getPos()[1] - inPoint[1]);
    
    return magnitude;
}

/*
 * Update the phone screen with the social information
 */
function updateSocial(){
    var outputString = "SOCIALS GO HERE!";
    
    phoneScreen.html("<center>" + outputString + "</center>");
}

/*
 * Update the phone screen with the about information
 */
function updateAbout(){
    var outputString = "ABOUT GOES HERE!";
    var twitter = "<img src=\"TwitterIcon.svg\" height=\""+ $("#textHeightCheck").height() +"\"></img>";
    var steam = "<img src=\"SteamIcon.svg\" height=\"" + $("#textHeightCheck").height() + "\"></img>";
    
    var logoWidth = $("#phoneScreen").width();
    var logo = "";
    
    if(logoWidth <= 640){
        logo = "<img src=\"http://xinchronize.com/wp-content/uploads/2014/06/XincWingLogo640x125.png\"";
    }else{
        logo = "<img src=\"http://xinchronize.com/wp-content/uploads/2014/06/XincWingLogo-1024x256.png\"";
    }
    
    outputString = "";
    
    //outputString += "ABOUT <br>";
    outputString += "Fancypants people that helped: <br>";
    outputString += "<a href=\"http://twitter.com/bigmacbook\" style=\"text-decoration:none;\">"+twitter+"Bigmacbook</a> <br>";
    outputString += "<a href=\"http://twitter.com/epictek\" style=\"text-decoration:none;\">"+twitter+"Epictek</a> <br>";
    outputString += "<a href=\"http://twitter.com/f0rum1\" style=\"text-decoration:none;\">"+twitter+"F0rum</a> <br>";
    outputString += "<a href=\"http://twitter.com/kados\" style=\"text-decoration:none;\">"+twitter+"Kados</a> <br>";
    outputString += "<a href=\"http://twitter.com/kniffen\" style=\"text-decoration:none;\">"+twitter+"Kniffen</a> <br>";
    outputString += "<a href=\"http://twitter.com/thejapester\" style=\"text-decoration:none;\">"+twitter+"Japester</a> <br>";
    outputString += "<a href=\"http://steamcommunity.com/profiles/76561197994506706/\" style=\"text-decoration:none;\">"+steam+"Tiddl3ywinks</a> <br>";
    outputString += "<br>";
    outputString += "<br>";
    outputString += "Author: <br>";
    outputString += "<a href=\"http://twitter.com/xinchronize\" style=\"text-decoration:none;\">"+twitter+"Xinchronize</a> <br>";
    outputString += "<a href=\"http://xinchronize.com\">";
        outputString += logo;
             outputString += "alt=\"Xinchronize\"";
             outputString += "title=\"Xinchronize\"";
             outputString += "style=\"width:100%;\">";
    outputString += "</a>";
    
    phoneScreen.html("<center>" + outputString + "</center>");
}

/*
 * Move the player
 */
function move(dir){
//    log("moving");
    var outputString = "You moved.";
    switch(dir){
        case "north":
//            log("moving up");
            player.move(0,1);
            outputString = "You moved North.";
            break;
        case "west":
            player.move(-1,0);
            outputString = "You moved West.";
            break;
        case "south":
            player.move(0,-1);
            outputString = "You moved South.";
            break;
        case "east":
            player.move(1,0);
            outputString = "You moved East.";
            break;
    }
    outputString += " (" + player.getPos() + ")";  
    
    //tellPlayer(outputString);
    addCriticalInfo(outputString);
    //tick();
    //log(enemy.getName() + " pos: " + enemy.getPos() + " " + player.getName() + " pos: " + player.getPos());
}
var enemy;

var playerAttacking = false;

/*
 * Main "loop" (activates every player action)
 */
function tick(){
    if(!player.isDead()){
        var outputString;

        player.addTick();

//        if(player.isBattleReady()){
//            enemy.attack(player);
//            //log("enemy attacking player");
//        }else{
//        }

        for(var i=0;i<enemies.length;i++){
            enemy=enemies[i];
            if(player.getPos()[0] === enemy.getPos()[0]
                && player.getPos()[1] === enemy.getPos()[1]
                && !enemy.isDead()){    
                //log("Enemy and player in the same room " +  enemy.getPos()  +  " " + player.getPos());
                if(!player.isBattleReady()){
                    outputString = "There is " + getProperIndefinite(enemy.getName()) + " here.";
                    addCombatText(outputString);
                }
                if(!phoneActive){
                    canMoveNorth = false;
                }
                player.setBattleReady(true);
                if(playerAttacking){
                    addAttackBuffer(player, enemy);
                }
                addAttackBuffer(enemy, player);
                //$("#buttonD").html("D<br>Attack");

                break;
            }else{
                player.setBattleReady(false);
                //$("#buttonD").html("D");
            }
        }

        

        checkSelectedItems();

        doAttackBuffer();
        player.checkLevelUp();
        tellCriticalInfo();
        tellFlavorInfo();

        updatePhone();
        
        playerAttacking = false;
    }else{
        
    }
    updateButtonText();
}

var attackBuffer = [];

function addAttackBuffer(actor1, actor2){
    attackBuffer.push([actor1, actor2]);
}

function doAttackBuffer(){
    for(var i=0; i<attackBuffer.length;i++){
       doAttack(attackBuffer[i][0], attackBuffer[i][1]);
    }
    attackBuffer =[];
}

function doAttack(actor1, actor2){
    //actor1.attack(actor2);
    if(player.isBattleReady() && actor2.getHealth() !== 0){
        actor1.attack(actor2);
    }else{
        questionPlayerActions();
    }
}

function updateButtonText(){
//    if(player.getPos()[0] === enemy.getPos()[0]
//            && player.getPos()[1] === enemy.getPos()[1]
//            && !enemy.isDead()){
//        $("#buttonD").html("D<br>Attack");
//    }else{
//        $("#buttonD").html("D");
//    }

    if(player.isBattleReady()){
        $("#buttonD").html("D<br>Attack");
    }else if(player.isDead()){
        $("#buttonD").html("D<br>Replay");
    }else{
        $("#buttonD").html("D");
    }
    
    $("#buttonE").html("E"+"<br>"+"");
    $("#buttonS").html("S"+"<br>"+"");
    $("#buttonC").html("C"+"<br>"+"");
    $("#buttonF").html("F"+"<br>"+"");
    
    if(canMoveNorth){
        $("#buttonE").html("E"+"<br>"+"North");
    }
    if(canMoveWest){
        $("#buttonS").html("S"+"<br>"+"West");
    }
    if(canMoveSouth){
        $("#buttonC").html("C"+"<br>"+"South");
    }
    if(canMoveEast){
        $("#buttonF").html("F"+"<br>"+"East");
    }
}

/*
 * Checks to see what inventory items have been checked?
 */
function checkSelectedItems(){
    updateChecks();
    //log("Checking selected items");
    //log("Items: " + player.getInventory().length);
    var buffer = [];
    for(var i=0;i<invCheckBoxArray.length;i++){
        if(invCheckBoxArray[i]){
            buffer.push(invCheckBoxArray[i]);
        }
    }
    
    //loop through items
//    for(var i=0;i<player.getInventory().length;i++){
//        //log("Adding item to buffer");
//        //
//        //need to save status
//        //array?
//        //add item -> add check(false) to array
//        //oncheck -> get item id -> check(true) in array
//        //remove item -> remove check from array
//        //
//        if($("#invid"+i).checked){
//            buffer.push(player.getInventory(i));
//        }
//    }
    //log("Buffer length: " + buffer.length);    
    
    //change button text
    if(buffer.length > 0){
        $("#buttonR").html(""
        + "R"
        + "<br>"
        + "Use items"
        );
        buffer = [];
    }else{
        $("#buttonR").html(""
        + "R"
        );
    }
    //loop through "invid\"" +X "\"" and add to buffer
    //if more than one
    ////change button texts
    //else
    ////empty button texts
}

/*
 * returns "a" or "an" when needed
 */
function getProperIndefinite(inWord){
    //aeiou
    if(inWord[0] === "a" || inWord[0] === "A" ||
            inWord[0] === "e" || inWord[0] === "E" ||
            inWord[0] === "i" || inWord[0] === "I" ||
            inWord[0] === "o" || inWord[0] === "O" ||
            inWord[0] === "u" || inWord[0] === "U"
    ){
        return "an " + inWord;
    }else{
        return "a " + inWord;
    }
}

/*
 * Add critical information to buffer to display on screen
 */
function addCombatText(inInfo){
    addCriticalInfo("darkred", inInfo);
}

/*
 * Add critical information to buffer to display on screen
 */
function addCriticalInfo(inColor, inText){
    if(typeof inText === "undefined"){
        //inInfo was undefined (no color)
        critString.push(inColor);
        critStringColor.push("darkred");
        return "no color";
    }else{
        critString.push(inText);
        critStringColor.push(inColor);
        return "with color";
    }
}
    
/*
* Critical information buffer to display on screen
*/
function tellCriticalInfo(){
    for(i=0;i<critString.length;i++){
        tellPlayer(critStringColor[i], critString[i]);
    }
    critString = [];
    critStringColor = [];
}

/*
 * Add flavor text to buffer to display on screen
 */
function addFlavorInfo(inColor, inText){
    if(typeof inText === "undefined"){
        //inInfo was undefined (no color)
        flavString.push(inColor);
        flavStringColor.push("darkblue");
        return "no color";
    }else{
        flavString.push(inText);
        flavStringColor.push(inColor);
        return "with color";
    }
}
   
/*
 * Flavor text to buffer to display on screen
 */
function tellFlavorInfo(){
    for(i=0;i<flavString.length;i++){
        tellPlayer(flavStringColor[i], flavString[i]);
    }
    flavString = [];
    flavStringColor = [];
}

/*
 * Send text to screen with number of actions taken
 */
function tellPlayer(inColor, inText){
    var text = " ";
    
    if(typeof inText === "undefined"){
        text = inColor;
    }else{
        text = inText;
    }
    
    
    gameScreen.scrollTop(0);
    
    var playerTick = player.getTick();
    
    if(playerTick >= 1000){
    }else if(playerTick >= 100){
        playerTick = "0" + playerTick;
    }else if(playerTick >= 10){
        playerTick = "00" + playerTick;
    }else{
        playerTick = "000" + playerTick;
    }
    
    
    //capitalize the first character of every input string
    var tempChar = text[0].toUpperCase();
    var tempString = text.slice(1);
    var tempString2 = tempChar + tempString;;
    text = tempString2;
    //log("inText: " + inText);
    //log("tempChar: " + tempChar);
    //log("tempString: " + tempString);
    //log("text: " + text);
        
        
    //send crap to screen
    gameScreen.prepend(playerTick + "-" + "<font color=\"" + inColor + "\">" + text + "</font><br>");
}

/*
 * Send random "wtf u do?" text to screen
 */
function questionPlayerActions(){
    var outputString;
    var wtfLines = [];
    
    wtfLines.push("what are you trying to do?");
    wtfLines.push("what are you thinking?");
    wtfLines.push("that's...not the right thing to be doing.");
    wtfLines.push("nope.");
    wtfLines.push("try again.");
    wtfLines.push(player.getName() + ", are you hallucinating?");
    wtfLines.push("damnit " + player.getName() + ", you're an adventurer, not a random button pusher.");
    
    var randomNo = Math.floor((Math.random() * wtfLines.length));
    
    outputString = wtfLines[randomNo];
    //outputString = "What are you trying to do?";
    
    addFlavorInfo("darkblue", outputString);
}

/*
 * Return and turn text into into quote format with a name, to display on screen
 */
function makeQuote(inActorName, inText){
    return inActorName + ": \"" + inText  +"\"";
}

/*
 * Get a random name from a predefined list
 */
function getRandomEnemyName(){
    //var randomName = "Apricot";
    
    var names = [];
    
    names.push("apricot");
    names.push("bird");
    names.push("albatros");
    names.push("olive tree");
    names.push("cactus");
    names.push("beached whale");
    names.push("fighter pilot fish");
    names.push("enraged sprinkler system");
    names.push("rainbow bunny");
    names.push("funky badger");
    names.push("tastey, yet poisonous, taco");
    names.push("slice of pizza");
    names.push("dragon");
    names.push("pack of dragons");
    
    
    var randomNo = Math.floor((Math.random() * names.length));
    
    var randomName = names[randomNo];
    
    return randomName;
}

/*
 * Get a random X value, between the -ve x size and the +ve x size of the map
 */
function randomX(){
    var randomX = Math.floor((Math.random() * (xSize*2))-xSize);
    //log("X: " + randomX);
    return randomX;
}

/*
 * Get a random X value, between the -ve y size and the +ve y size of the map
 */
function randomY(){
    var randomY = Math.floor((Math.random() * (ySize*2)) - ySize);
    //log("Y: " + randomY);
    return randomY;
}

var enemies = [];
var enemySpawnTick = 0;
var enemySpawnMaxTick = 10;
/*
 * Add a new enemy to the map and the array
 */
function addNewEnemy(inName, inX, inY){
    var genNew = false;
//    enemySpawnTick;
//    enemySpawnMaxTick;
    if(inX === 0 && inY === 0){
        genNew = true;
        log("need to regenerate enemy because spawn: " + inX + " " + inY);// + " vs " + 0 + " " + 0 + " in " + xSize + " " + ySize);
    }else{
        for(var i=0;i<enemies.length;i++){
//            log("enemy check: " + enemies[i].getPos()[0] + " " + enemies[i].getPos()[1]);
            if((enemies[i].getPos()[0] === inX && enemies[i].getPos()[1] === inY)){
//            if(!availablePos[inX][inY]){
                genNew = true;
                log("need to regenerate enemy because enemy: " + inX + " " + inY);// + " vs " + enemies[i].getPos()[0] + " " + enemies[i].getPos()[1]);
                break;
            }else{
                genNew = false;
            }
        }
    }
    
    if(enemySpawnTick >= enemySpawnMaxTick){
        genNew = false;
        log("too many recursions "  + enemySpawnTick + " / " + enemySpawnMaxTick);
    }
    
    log("gen new? " + genNew + " " + enemySpawnTick + " / " + enemySpawnMaxTick);
    
    if(genNew){
        enemySpawnTick += 1;
        log("regening enemy");
        addNewEnemy(getRandomEnemyName(), randomX(), randomY());
    }else{
        var newEnemy = new Enemy(inName, inX, inY);
        enemies.push(newEnemy);
//        availablePos[inX][inY] = false;
        log("New enemy: " + newEnemy.getName() + " " + newEnemy.getPos());
        enemySpawnTick = 0;
        return newEnemy;
    }
}

/*
 * Add x number of enemies
 */
function addEnemies(inNumber){
    for(var i=0; i<inNumber; i++){
//          var newEnemy = new Enemy(getRandomEnemyName(), randomX(), randomY());
            addNewEnemy(getRandomEnemyName(), randomX(), randomY());
//          enemies.push(newEnemy);
//          log("Enemy #"+i+" " + newEnemy.getName() + " spawned at " + newEnemy.getPos());
    }
//         = enemies[enemies.length-1];
}

function clearEnemies(){
    enemies = [];
    log("-----Enemies cleared-----");
}

/*
 * Remove an enemy from the array, based on either index #  or name
 */
//removeEnemy(enemies[0]);
function removeEnemy(inEnemy){
    //log("removing enemy-");
    if(inEnemy instanceof Enemy){
        //log("-based on enemy object");
        var indexOf = enemies.indexOf(inEnemy);
        enemies.splice(indexOf, 1);
    }else if(typeof inEnemy === "number"){
        //log("-based on enemy index number");
        enemies.splice(inEnemy, 1);
    }
}

var firstAlbatros = addNewEnemy("albatros", 0, 1);
addEnemies(10);

firstAlbatros.onDeath = function(){phoneSlideIn();};


function adjustGameScreen(){
    
    $("#gameButtons").css({"overflow-y": "scroll"});
    var textAreaWidth = $("#gameButtons")[0].scrollWidth;//area without scrollbar
    var areaWidth = $("#gameButtons").width();//area with scrollbar
    var newWidth = areaWidth + (areaWidth-textAreaWidth);
    //newWidth = newWidth/2;
    $("#gameButtons").css({"overflow-y": "hidden"});
    
    //$("#gameScreen").css({"overflow-y": "scroll"});
    //$("#gameScreen").width(areaWidth + (areaWidth-textAreaWidth));
    $("#gameScreen").css({width: newWidth});//, 1000, "", 
    //function(){log("game screen adjusted " + newWidth);});
    //$("#gameScreen").animate({width: 10});
    //log("newwidth " + " " + areaWidth + " " + textAreaWidth + " " + newWidth);
    
}

function phoneSlideIn(){
    addFlavorInfo("You find a dusty old smartphone on the floor.");
    $("#phone").show(0);
    $("#game").animate({width: "50%"}, 1000, "linear", function(){adjustGameScreen();});
    $("#phone").animate({"margin-right": "0"}, 1001, "linear", function(){});
    phoneActive = true;
    canMoveNorth = true;
    canMoveWest = true;
    canMoveSouth = true;
    canMoveEast = true;
//    $("#game").animate({width: "50%"}, 1000, "", function(){adjustGameScreen();});
    //$("#game").css({float:"left"});
    //$("#gameScreen").animate({width: "100%"}, 1000, "", adjustGameScreen());
    //$("#gameScreen").css({float:"left"});//, "overflow-y":"scroll"});
//    $("#phone").animate({width: "50%"}, 1000);//, "", adjustGameScreen());//, 1000, "", adjustGameScreen());
    //$("#phone").css({float:"right"});
    //adjustGameScreen();
}

$("#phone").css({width: "50%", "margin-right": "-50%", float:"right", "z-index":"10"});
$("#phone").hide(0);
$("#gameScreen").css({width: "100%", float:"left"});
$("#game").css({width: "100%", float:"left"});
adjustGameScreen();

$(window).on('resize orientationChanged', function() {adjustGameScreen(); updatePhone();});