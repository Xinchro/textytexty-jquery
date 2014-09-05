/* 
    Created on : 17-Aug-2014
    Author     : Xinchro
*/

//document.onkeydown = keyDown;
//document.onkeyup = keyUp;

//document.addEventListener("keydown", keyDown);
//document.addEventListener("keyup", keyUp);

$(document).on("keydown", keyDown);
$(document).on("keyup", keyUp);

var critString = [];
var critStringColor = [];
var flavString = [];
var flavStringColor = [];

var phoneActive = false;
var canMoveNorth = true;
var canMoveWest = false;
var canMoveSouth = false;
var canMoveEast = false;

var phone;
phone = $("phoneScreen");

var armorTypes = Object.freeze({HEAD:0, ARM:1, TORSO:2, LEGS:3, FOOT:4});

var debug = false;
$("#log").hide(); //.css("display", "none");

$(".gameButton").click(function(){doClick($(this).attr("id"));});

$("#gameScreen").scroll($("#gameScreen").scrollTop(1));

$(".phoneButtonIcon").css("height", "90%");
$(".phoneButtonIcon").css("margin-top", $(".phoneButton").height()/100*5);
$(".phoneButtonIcon").css("width", "90%");
$(".phoneButtonIcon").css("margin-left", $(".phoneButton").width()/100*5);

var textAreaWidth = $("#gameScreen")[0].scrollWidth;
var areaWidth = $("#gameScreen").width();

$("#gameScreen").width(areaWidth + (areaWidth-textAreaWidth));

log("textareaWidth: " + textAreaWidth);

//var inventoryAreaWidth = $("#inventoryItemList")[0].scrollWidth;
//var inventoryWidth = $("#inventoryItemList").width();
//
//$("#inventoryItemList").width($("#inventoryItemList").width() + (inventoryWidth-inventoryAreaWidth));
//
//log("inventoryAreaWidth: " + inventoryAreaWidth);

$("#buttonE").html("E"+"<br>"+"North");
$("#buttonE").css("background-color", "rgba(255,255,255,0.7)");


function resizeButtons(){
    //needs to resize buttons if resolution is not divisible equally by 5
    //center "cross" gets slightly bigger
    //if width/5 != floor(width/5)*5
    //log("widths " + $("#gameButtons").width()/5 + " " + Math.floor($("#gameButtons").width()/5)*5);
    //log("widths check " + ($("#gameButtons").width()/5 !== Math.ceil($("#gameButtons").width()/5)*5));
    if($("#gameButtons").width()/5 !== Math.floor($("#gameButtons").width()/5)*5){
        ////buttons 3 E D C CTRL get bigger
        ////// buttonwidth += (width - floor(width/5)*5)/2
        //var newWidth = $("#button3").width()
        //+ ($("#gameButtons").width()
        //- Math.floor($("#gameButtons").width()/5)*5)*2;
        
        log("old width: " + $("#button3").width()); //borders make it 4 pixels less
        
//        var newWidth = $("#button3").width()
//        + (($("#gameButtons").width()
//        - ((Math.floor($("#gameButtons").width()/5))
//        *5))/2)
//        ;
        
        //newwidth = oldwidth -> original button width
        //         + ((canvasWidth -> the whole thing
        //         - (floored(canvasWidth/5) -> the whold thing divided by5, floored
        //         * 5) -> gives us the floored value multiplied by 5 (smaller than the whole thing)
        //         -> by this stage we have the difference between whole and floored
        //         /2) -> to give us half of the leftover
        //         -> now you should have everythign properly, OR NOT

        //floor(233/5) = 46
        //ceil(233/5) = 47
        //log(Math.ceil(233/5));
        
        //log("new width: " + newWidth);
        log("additional width: " + ($("#gameButtons").width() - ((Math.floor($("#gameButtons").width()/5))*5)));
        
//        $("#button3").width(newWidth);
//        $("#buttonE").width(newWidth);
//        $("#buttonD").width(newWidth);
//        $("#buttonC").width(newWidth);
//        $("#buttonCTRL").width(newWidth);
    }else{
        //else
        ////do nothing
    }

    //log("heights " + $("#gameButtons").height()/5 + " " + Math.floor($("#gameButtons").height()/5));//  *5);
    //log("heights check " + ($("#gameButtons").height()/5 !== Math.ceil($("#gameButtons").height()/5)*5));
    //if height/5 != floor(height/5)*5    
    if($("#gameButtons").height()/5 !== Math.ceil($("#gameButtons").height()/5)*5){
        ////buttons A S D F G get bigger
        //////buttonheight += (height - floor(height/5)*5)/2
        //var newHeight = $("#buttonA").height()
        //+ Math.ceil(($("#gameButtons").height()
        //- ($("#gameButtons").height()/5)*5))*2;

        //let's try something else:
        
//        var newHeight = Math.ceil($("#gameButtons").height()/5);
//        
//        //log("new height: " + newHeight);
//        
//        $("#buttonA").height(newHeight);
//        $("#buttonS").height(newHeight);
//        $("#buttonD").height(newHeight);
//        $("#buttonF").height(newHeight);
//        $("#buttonG").height(newHeight);
    }else{
        //else
        ////do nothing
    }
    
    //log("Buttons resized");
}
resizeButtons();


function invClick(){
    log("invClick()");
    //loadHTML("inventory");
    phoneClick("inventory");
}

function statsClick(){
    log("statsClick()");
    //loadHTML("stats");
    phoneClick("stats");
}

function mapClick(){
    log("mapClick()");
    //loadHTML("maps"); 
    phoneClick("map");
}

function socialClick(){
    log("socialClick()");
    //loadHTML("social");
    //updatePhone();
    phoneClick("social");
}

function aboutClick(){
    log("aboutClick()");
    //loadHTML("about");
    //updatePhone();
    phoneClick("about");
}

function log(message){
    var date = new Date(); 
    
    var millis = getTime(date.getMilliseconds());
    var seconds = getTime(date.getSeconds());
    var minutes = getTime(date.getMinutes());
    var hours = getTime(date.getHours());
    var days = getTime(date.getDate());
    var months = getTime(date.getMonth()+1);
    var years = getTime(date.getFullYear());
    
    var timestamp = days + "/"
                + (months)  + "/" 
                + years + " @ "  
                + hours + ":"  
                + minutes + ":" 
                + seconds + ":"
                + millis;
    
    $("#log").html(timestamp + ": " + message + "<br>" + $("#log").html());
}

function getTime(variable){
    var tempVar;
    if(variable >= 100){
        tempVar = variable;
    }else if(variable >= 10){
        tempVar = "0" + variable;
    }else{
        tempVar = "00" + variable;
    }
    
    return tempVar;
}

//function loadHTML(filename){
//    var xhr= new XMLHttpRequest();
//    xhr.open('GET', filename+'.html', true);
//    xhr.onreadystatechange= function() {
//    if (this.readyState!==4) return;
//    if (this.status!==200) return; // or whatever error handling you want
//    phone.innerHTML= this.responseText;
//    };
//    xhr.send();
//}

function doClick(id){
    //var element = document.getElementById("button1");
    //element.addEventListener(function(e){ console.log(e.key, e.char, e.keyCode) });
    //log("id: " + id);
    
    var character = id.slice(6);
    
    //log("character: " + character);
    //log("character code: " + character.charCodeAt(0));
    //var keyEvent = new KeyboardEvent("keydown", {keyCode : character.charCodeAt(0)});
    
    //document.dispatchEvent(keyEvent);
    //$(document).keydown(character);
    
    var press = jQuery.Event("keyup");
    
    if(character === "TAB"){
        press.which = 9;
        press.keyCode = 9;
    }else if(character === "SHIFT"){
        press.which = 16;
        press.keyCode = 16;
    }else if(character === "CTRL"){
        press.which = 17;
        press.keyCode = 17;
    }else if(character === "ALT"){
        press.which = 18;
        press.keyCode = 18;
    }else if(character === "SPACE"){
        press.which = 32;
        press.keyCode = 32;
    }else{
        press.which = character.charCodeAt(0);
        press.keyCode = character.charCodeAt(0);
    }    
    
    //log("press: " + press);
    
    $(document).trigger(press);
    //log("Click done");
}   

/* Keyboard crap */ 
function keyDown(e){
    //e.preventDefault();
    //log("e: " + e);
    //log("e.keyCode(): " + e.keyCode);
    //log("e.charCode(): " + e.charCode);
    //log("e.key(): " + e.key);
    switch(e.keyCode){
        case 49://1
//            log("1 down");
            //checkStats();
            break;
        case 50://2
//            log("2 down");
            break;
        case 51://3
//            log("3 down");
            break;
        case 52://4
//            log("4 down");
            break;
        case 53://5
//            log("5 down");
            break;
        case 81://q
//            log("Q down");
            break;
        case 87://w
//            log("W down");
            break;
        case 69://e
//            log("E down");
            break;
        case 82://r
//            log("R down");
            break;
        case 84://t
//            log("T down");
            break;
        case 65://a
//            log("A down");
            break;
        case 83://s
//            log("S down");
            break;
        case 68://d
//            log("D down");
            break;
        case 70://f
//            log("F down");
            break;
        case 71://g
//            log("G down");
            break;
        case 90://z
//            log("Z down");
            break;
        case 88://x
//            log("X down");
            break;
        case 67://c
//            log("C down");
            break;
        case 86://v
//            log("V down");
            break;
        case 66://b
//            log("B down");
            break;
        case 9://tab
//            log("TAB down");
            break;
        case 16://shift
//            log("SHIFT down");
            break;
        case 17://ctrl
//            log("CTRL down");
            break;
        case 18://alt
//            log("ALT down");
            break;
        case 32://space
//            log("SPACE down");
            break;
    }
}

function keyUp(e){
    //e.preventDefault();
    switch(e.keyCode){
        case 49://1
//            log("1 up");
            //questionPlayerActions();
            //clearEnemies();
            //addEnemies(10);
            log(player.getCombinedArmor());
            break;
        case 50://2
//            log("2 up");
            questionPlayerActions();
            break;
        case 51://3
//            log("3 up");
            questionPlayerActions();
            break;
        case 52://4
//            log("4 up");
            questionPlayerActions();
            break;
        case 53://5
//            log("5 up");
            questionPlayerActions();
            break;
        case 81://q
//            log("Q up");
            questionPlayerActions();
            break;
        case 87://w
//            log("W up");
            questionPlayerActions();
            break;
        case 69://e
//            log("E up");
            if(canMoveNorth){
                move("north");
            }
            break;
        case 82://r
//            log("R up");
            questionPlayerActions();
            break;
        case 84://t
//            log("T up");
            questionPlayerActions();
            break;
        case 65://a
//            log("A up");
            questionPlayerActions();
            break;
        case 83://s
//            log("S up");
            if(canMoveWest){
                move("west");
            }
            break;
        case 68://d
//            log("D up");
            //addAttackBuffer(player);
            playerAttacking = true;
            break;
        case 70://f
//            log("F up");
            if(canMoveEast){
                move("east");
            }
            break;
        case 71://g
//            log("G up");
            questionPlayerActions();
            break;
        case 90://z
//            log("Z up");
            questionPlayerActions();
            break;
        case 88://x
//            log("X up");
            questionPlayerActions();
            break;
        case 67://c
//            log("C up");
            if(canMoveSouth){
                move("south");
            }
            break;
        case 86://v
//            log("V up");
            questionPlayerActions();
            break;
        case 66://b
//            log("B up");
            questionPlayerActions();
            break;
        case 9://tab
//            log("TAB up");
            questionPlayerActions();
            break;
        case 16://shift
//            log("SHIFT up");
            questionPlayerActions();
            break;
        case 17://ctrl
//            log("CTRL up");
            questionPlayerActions();
            break;
        case 18://alt
//            log("ALT up");
            questionPlayerActions();
            break;
        case 32://space
//            log("SPACE up");
            adjustGameScreen();
            questionPlayerActions();
            break;
            
        case 72://h
//            log("H up");
            if(debug){
                log("Debug mode disabled");
                $("#log").hide();
                debug = false;
            }else{
                log("Debug mode enabled");
                $("#log").show();
                debug = true;                
            }
            break;
    }
    tick();
}


//char code cheat sheet
//
//backspace 	8
//tab 	9
//enter 	13
//shift 	16
//ctrl 	17
//alt 	18
//pause/break 	19
//caps lock 	20
//escape 	27
//page up 	33
//page down 	34
//end 	35
//home 	36
//left arrow 	37
//up arrow 	38
//right arrow 	39
//down arrow 	40
//insert 	45
//delete 	46
//0 	48
//1 	49
//2 	50
//3 	51
//4 	52
//5 	53
//6 	54
//7 	55
//8 	56
//9 	57
//a 	65
//b 	66
//c 	67
//d 	68
//	  	
//e 	69
//f 	70
//g 	71
//h 	72
//i 	73
//j 	74
//k 	75
//l 	76
//m 	77
//n 	78
//o 	79
//p 	80
//q 	81
//r 	82
//s 	83
//t 	84
//u 	85
//v 	86
//w 	87
//x 	88
//y 	89
//z 	90
//left window key 	91
//right window key 	92
//select key 	93
//numpad 0 	96
//numpad 1 	97
//numpad 2 	98
//numpad 3 	99
//numpad 4 	100
//numpad 5 	101
//numpad 6 	102
//numpad 7 	103
//	  	
//numpad 8 	104
//numpad 9 	105
//multiply 	106
//add 	107
//subtract 	109
//decimal point 	110
//divide 	111
//f1 	112
//f2 	113
//f3 	114
//f4 	115
//f5 	116
//f6 	117
//f7 	118
//f8 	119
//f9 	120
//f10 	121
//f11 	122
//f12 	123
//num lock 	144
//scroll lock 	145
//semi-colon 	186
//equal sign 	187
//comma 	188
//dash 	189
//period 	190
//forward slash 	191
//grave accent 	192
//open bracket 	219
//back slash 	220
//close braket 	221
//single quote 	222 

