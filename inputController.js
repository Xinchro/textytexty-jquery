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

var phone;
phone = $("phoneScreen");

var debug = false;
$("#log").hide(); //.css("display", "none");

$('.gameButton').click(function(){doClick($(this).attr('id'));});

function invClick(){
    log("invClick()");
    //loadHTML("inventory");
    checkInventory();
}

function mapClick(){
    log("mapClick()");
    //loadHTML("maps");
    checkMap();
}

function statsClick(){
    log("statsClick()");
    //loadHTML("stats");
    checkStats();
}

function socialClick(){
    log("socialClick()");
    //loadHTML("social");
    checkSocial();
}

function aboutClick(){
    log("aboutClick()");
    //loadHTML("about");
    checkAbout();
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
    
    document.getElementById("log").innerHTML = timestamp + ": " + message + "<br>" + document.getElementById("log").innerHTML;
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

function loadHTML(filename){
    var xhr= new XMLHttpRequest();
    xhr.open('GET', filename+'.html', true);
    xhr.onreadystatechange= function() {
    if (this.readyState!==4) return;
    if (this.status!==200) return; // or whatever error handling you want
    phone.innerHTML= this.responseText;
    };
    xhr.send();
}

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
    
    var press = jQuery.Event("keydown");
    
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
            log("1 down");
            checkStats();
            break;
        case 50://2
            log("2 down");
            break;
        case 51://3
            log("3 down");
            break;
        case 52://4
            log("4 down");
            break;
        case 53://5
            log("5 down");
            break;
        case 81://q
            log("Q down");
            break;
        case 87://w
            log("W down");
            break;
        case 69://e
            log("E down");
            move("up");
            break;
        case 82://r
            log("R down");
            break;
        case 84://t
            log("T down");
            break;
        case 65://a
            log("A down");
            break;
        case 83://s
            log("S down");
            move("left");
            break;
        case 68://d
            log("D down");
            break;
        case 70://f
            log("F down");
            move("right");
            break;
        case 71://g
            log("G down");
            break;
        case 90://z
            log("Z down");
            break;
        case 88://x
            log("X down");
            break;
        case 67://c
            log("C down");
            move("down");
            break;
        case 86://v
            log("V down");
            break;
        case 66://b
            log("B down");
            break;
        case 9://tab
            log("TAB down");
            break;
        case 16://shift
            log("SHIFT down");
            break;
        case 17://ctrl
            log("CTRL down");
            break;
        case 18://alt
            log("ALT down");
            break;
        case 32://space
            log("SPACE down");
            break;
    }
}

function keyUp(e){
    e.preventDefault();
    switch(e.keyCode){
        case 49://1
            log("1 up");
            break;
        case 50://2
            log("2 up");
            break;
        case 51://3
            log("3 up");
            break;
        case 52://4
            log("4 up");
            break;
        case 53://5
            log("5 up");
            break;
        case 81://q
            log("Q up");
            break;
        case 87://w
            log("W up");
            break;
        case 69://e
            log("E up");
            break;
        case 82://r
            log("R up");
            break;
        case 84://t
            log("T up");
            break;
        case 65://a
            log("A up");
            break;
        case 83://s
            log("S up");
            break;
        case 68://d
            log("D up");
            break;
        case 70://f
            log("F up");
            break;
        case 71://g
            log("G up");
            break;
        case 90://z
            log("Z up");
            break;
        case 88://x
            log("X up");
            break;
        case 67://c
            log("C up");
            break;
        case 86://v
            log("V up");
            break;
        case 66://b
            log("B up");
            break;
        case 9://tab
            log("TAB up");
            break;
        case 16://shift
            log("SHIFT up");
            break;
        case 17://ctrl
            log("CTRL up");
            break;
        case 18://alt
            log("ALT up");
            break;
        case 32://space
            log("SPACE up");
            break;
            
        case 72://h
            log("H up");
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

