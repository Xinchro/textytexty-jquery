/* 
    Created on : 05-Sep-2014
    Author     : Xinchro
*/

window.onbeforeunload = function () {
};

if($(document).width() > $(document).height()){
    $(".layer").height($(document).height()/100*80);
    $(".layer").width($(".layer").height());
}else{
    $(".layer").width($(document).width()/100*60);
    $(".layer").height($(".layer").width());
}
//$(".layer").height($(".layer").width());
$("#swordStats").height($("#swordStats").width());

var sword;

$("#swordStats").html("Number of possible swords: "
+ swordBlades.length * swordGuards.length * swordGrips.length * swordPommels.length
+ "<br>");

function genSwordButton(){
    console.log("-----Generating sword.-----");
    sword = new EquippableItem();
    
    //sword.genSword();
    
//    console.log("Temp getParts() " + sword.getParts());
//    console.log("Temp getName() " + sword.getName());
    renderSword();
    window.location.href = $("#genURLinput").attr("value");
}

function renderSword(){
    $("#swordLay1").css("background-image", "url(\"../swordParts/" + sword.getParts()[0].getImg() + "\")");//blade
    $("#swordLay4").css("background-image", "url(\"../swordParts/" + sword.getParts()[1].getImg() + "\")");//guard
    $("#swordLay3").css("background-image", "url(\"../swordParts/" + sword.getParts()[2].getImg() + "\")");//grip
    $("#swordLay2").css("background-image", "url(\"../swordParts/" + sword.getParts()[3].getImg() + "\")");//pommel
    
    var blade, guard, grip, pommel;
    
    for(var i=0;i<swordBlades.length;i++){
        if(sword.getParts()[0] instanceof swordBlades[i]){
            blade = i;
            break;
        }
    }
    for(var i=0;i<swordGuards.length;i++){
        if(sword.getParts()[1] instanceof swordGuards[i]){
            guard = i;
            break;
        }
    }
    for(var i=0;i<swordGrips.length;i++){
        if(sword.getParts()[2] instanceof swordGrips[i]){
            grip = i;
            break;
        }
    }
    for(var i=0;i<swordPommels.length;i++){
        if(sword.getParts()[3] instanceof swordPommels[i]){
            pommel = i;
            break;
        }
    }
    
    $("#genURLinput").attr("value", window.location.origin
                +window.location.pathname
//                +"?blade="+swordBlades.indexOf(sword.getParts()[0])
//                +"&guard="+swordGuards.indexOf(sword.getParts()[1])
//                +"&grip="+swordGrips.indexOf(sword.getParts()[2])
//                +"&pommel="+swordPommels.indexOf(sword.getParts()[3])
                +"?blade="+blade
                +"&guard="+guard
                +"&grip="+grip
                +"&pommel="+pommel
                );
    
    
    var outputStats = "";
    
    outputStats += "Number of possible swords: ";
    outputStats += swordBlades.length * swordGuards.length * swordGrips.length * swordPommels.length;
    outputStats += "<br>";
    
    outputStats += "<br>";    
    
    outputStats += "Blade name: ";
    outputStats += sword.getParts()[0].getName();
    outputStats += "<br>";
    outputStats += "Hilt name: ";
    outputStats += sword.getParts()[1].getName();
    outputStats += "<br>";
    outputStats += "Grip name: ";
    outputStats += sword.getParts()[2].getName();
    outputStats += "<br>";
    outputStats += "Pommel name: ";
    outputStats += sword.getParts()[3].getName();
    outputStats += "<br>";
    
    outputStats += "<br>";
    
    outputStats += "Blade description: ";
    outputStats += sword.getParts()[0].getDesc();
    outputStats += "<br>";
    outputStats += "Hilt description: ";
    outputStats += sword.getParts()[1].getDesc();
    outputStats += "<br>";
    outputStats += "Grip description: ";
    outputStats += sword.getParts()[2].getDesc();
    outputStats += "<br>";
    outputStats += "Pommel description: ";
    outputStats += sword.getParts()[3].getDesc();
    outputStats += "<br>";
    
    $("#swordStats").html(outputStats);
}

function adjustScreen(){
    if($(document).width() > $(document).height()){
        $(".layer").height($(document).height()/100*80);
        $(".layer").width($(".layer").height());
    }else{
        $(".layer").width($(document).width()/100*60);
        $(".layer").height($(".layer").width());
    }
    $("#swordStats").height($("#swordStats").width());
}

$(window).on('resize orientationChanged', function() {adjustScreen();});

function getUrlParams() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    console.log(vars);
    //window.location.href += "?a=1";
    return vars;
}

//getUrlParams();

function urlSword(){
    params = getUrlParams();
//    console.log("Temp params: " + params);
    if(params.keys !== "unidentified"){//&& params.keys.length > 2){
        var blade = new swordBlades[params.blade];
        var guard = new swordGuards[params.guard];
        var grip = new swordGrips[params.grip];
        var pommel = new swordPommels[params.pommel];

        console.log("Temp blade: " + blade);

        sword = new EquippableItem([blade, guard, grip, pommel]);

        
        console.log("Temp parts: " + sword.getParts());

        renderSword();
    }
}

urlSword();