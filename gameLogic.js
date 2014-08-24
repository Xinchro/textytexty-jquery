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

var xSize = 10;
var ySize = 10;

var invCheckBoxArray = [];


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
        if(j<24){
            string += "*";
        }
    }
    if(i<24){
        string += "Length" + i;
    }else{
        string += "Length" + "24";
    }
    
    for(var j=0;j<i;j++){
        if(j<24){
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
    
    
    $("#inventoryItemList").css("overflow-y", "scroll");
    //$("#inventoryItemList").css("overflow-x", "hidden");
    var inventoryAreaWidth = $("#inventoryItemList")[0].scrollWidth;
    var inventoryWidth = $("#inventoryItemList").width();
    
    $("#inventoryItemList").width(inventoryWidth + (inventoryWidth-inventoryAreaWidth));
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
    
    log("checks #: " + invCheckBoxArray.length);
    log("checks: " + outputString);
}

/*
 * Update the phone screen with the stats information
 */
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

/*
 * Update the phone screen with the map information
 */
function updateMap(){
    var outputString = "MAP GOES HERE!";
    var outputString = "";
    
    outputString += player.getName() + ": " + player.getPos() + "<br>";
    
    for(var i=0;i<enemies.length;i++){
        outputString += enemies[i].getName();
        outputString += ": ";
        outputString += enemies[i].getPos();
        outputString += " ";
        outputString += "(" + getDistanceFromPlayer(enemies[i].getPos()) +")";
        outputString += "<br>";
    }
    
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
    outputString = "";
    
    //outputString += "ABOUT <br>";
    outputString += "Fancypants people that helped: <br>";
    outputString += "twitter icon <a href=\"http://twitter.com/bigmacbook\">Bigmacbook</a> <br>";
    outputString += "twitter icon <a href=\"http://twitter.com/epictek\">Epictek</a> <br>";
    outputString += "twitter icon <a href=\"http://twitter.com/f0rum1\">F0rum</a> <br>";
    outputString += "twitter icon <a href=\"http://twitter.com/kados\">Kados</a> <br>";
    outputString += "twitter icon <a href=\"http://twitter.com/kniffen\">Kniffen</a> <br>";
    outputString += "twitter icon <a href=\"http://twitter.com/thejapester\">Japester</a> <br>";
    outputString += "steam icon <a href=\"http://steamcommunity.com/profiles/76561197994506706/\">Tiddl3ywinks</a> <br>";
    outputString += "<br>";
    outputString += "<br>";
    outputString += "Author: <br>";
    outputString += "twitter icon <a href=\"http://twitter.com/xinchronize\">@Xinchronize</a> <br>";
    outputString += "<a href=\"http://xinchronize.com\">";
        outputString += "<img src=\"http://xinchronize.com/wp-content/uploads/2014/06/XincWingLogo640x125.png\"";
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

/*
 * Main "loop" (activates every player action)
 */
function tick(){
    var outputString;
    
    player.addTick();
    
    if(player.isBattleReady()){
        enemy.attack(player);
        //log("enemy attacking player");
    }else{
    }
    
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
            player.setBattleReady(true);
            $("#buttonD").html("D<br>Attack");
            
            break;
        }else{
            player.setBattleReady(false);
            $("#buttonD").html("D");
        }
    }
    
    checkSelectedItems();
    
    tellCriticalInfo();
    tellFlavorInfo();
    
    updatePhone();
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
    
    
    var randomNo = Math.floor((Math.random() * names.length));
    
    var randomName = names[randomNo];
    
    return randomName;
}

/*
 * Get a random X value, between 0 and the x size of the map
 */
function randomX(){
    var randomX = Math.floor((Math.random() * xSize));
    //log("X: " + randomX);
    return randomX;
}

/*
 * Get a random X value, between 0 and the y size of the map
 */
function randomY(){
    var randomY = Math.floor((Math.random() * ySize));
    //log("Y: " + randomY);
    return randomY;
}

var enemies = [];
/*
 * Add a new enemy to the map and the array
 */
function addNewEnemy(inName, inX, inY){
    if(inX===0 && inY===0){
        addNewEnemy(new Enemy(getRandomEnemyName(), randomX(), randomY()));
    }
    var newEnemy = new Enemy(inName, inX, inY);
    enemies.push(newEnemy);
    log("New enemy: " + newEnemy.getName() + " " + newEnemy.getPos());
}

/*
 * Add x number of enemies
 */
function addEnemies(inNumber){
    for(var i=0; i<inNumber; i++){
        var newEnemy = new Enemy(getRandomEnemyName(), randomX(), randomY());
        enemies.push(newEnemy);
        log("Enemy #"+i+" " + newEnemy.getName() + " spawned at " + newEnemy.getPos());
    }
//         = enemies[enemies.length-1];
}

addNewEnemy("albatros", 0, 1);
addEnemies(20);

/*
 * Remove an enemy from the array, based on etiehr index #  or name
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