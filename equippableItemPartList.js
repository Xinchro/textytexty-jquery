/* 
    Created on : 05-Sep-2014
    Author     : Xinchro
    Last update: 07-Sep-2014
*/

//name, type, img, effect
swordBlades = [];
swordGuards = [];
swordGrips = [];
swordPommels = [];

var type = -1;

//blades 

function LightBlade(){
    EquippableItemPart.call(this, "Light Blade", "I am light.", type, "bladeLight.svg");
};
LightBlade.prototype = new EquippableItemPart;
LightBlade.prototype.constructor = LightBlade;
LightBlade.prototype.effect = function(){return "";};
swordBlades.push(LightBlade);

function CurvedBlade(){
    EquippableItemPart.call(this, "Curved Blade", "I am curved.", type, "bladeCurved.svg");
};
CurvedBlade.prototype = new EquippableItemPart;
CurvedBlade.prototype.constructor = CurvedBlade;
CurvedBlade.prototype.effect = function(){return "";};
swordBlades.push(CurvedBlade);

function PokerBlade(){
    EquippableItemPart.call(this, "Poker", "Pokey poke.", type, "bladePoker.svg");
};
PokerBlade.prototype = new EquippableItemPart;
PokerBlade.prototype.constructor = PokerBlade;
PokerBlade.prototype.effect = function(){return "";};
swordBlades.push(PokerBlade);

function FalchionBlade(){
    EquippableItemPart.call(this, "Falchion", "Falchion bist gud.", type, "bladeFalchion.svg");
};
FalchionBlade.prototype = new EquippableItemPart;
FalchionBlade.prototype.constructor = FalchionBlade;
FalchionBlade.prototype.effect = function(){return "";};
swordBlades.push(FalchionBlade);

function SawBlade(){
    EquippableItemPart.call(this, "Saw", "Saws through things.", type, "bladeSaw.svg");
};
SawBlade.prototype = new EquippableItemPart;
SawBlade.prototype.constructor = SawBlade;
SawBlade.prototype.effect = function(){return "";};
swordBlades.push(SawBlade);

//guards type GUARD
type=swordPartTypes.GUARD;

function LightGuard(){
    EquippableItemPart.call(this, "Light Guard", "I am light.", type, "guardLight.svg");
};
LightGuard.prototype = new EquippableItemPart;
LightGuard.prototype.constructor = LightGuard;
LightGuard.prototype.effect = function(){return "";};
swordGuards.push(LightGuard);

function CurvedGuard(){
    EquippableItemPart.call(this, "Curved Guard", "I am curved.", type, "guardCurved.svg");
};
CurvedGuard.prototype = new EquippableItemPart;
CurvedGuard.prototype.constructor = CurvedGuard;
CurvedGuard.prototype.effect = function(){return "";};
swordGuards.push(CurvedGuard);

function HookGuard(){
    EquippableItemPart.call(this, "Hooked Guard", "Hookidy hook.", type, "guardHook.svg");
};
HookGuard.prototype = new EquippableItemPart;
HookGuard.prototype.constructor = HookGuard;
HookGuard.prototype.effect = function(){return "";};
swordGuards.push(HookGuard);

function FullGuard(){
    EquippableItemPart.call(this, "Full Guard", "Protects your hand.", type, "guardFull.svg");
};
FullGuard.prototype = new EquippableItemPart;
FullGuard.prototype.constructor = FullGuard;
FullGuard.prototype.effect = function(){return "";};
swordGuards.push(FullGuard);

function SpikeGuard(){
    EquippableItemPart.call(this, "Spike Guard", "As dangerous as the blade.", type, "guardSpike.svg");
};
SpikeGuard.prototype = new EquippableItemPart;
SpikeGuard.prototype.constructor = SpikeGuard;
SpikeGuard.prototype.effect = function(){return "";};
swordGuards.push(SpikeGuard);

//grips type GRIP
type=swordPartTypes.GRIP;

function LightGrip(){
    EquippableItemPart.call(this, "Light Grip", "I am light.", type, "gripLight.svg");
};
LightGrip.prototype = new EquippableItemPart;
LightGrip.prototype.constructor = LightGrip;
LightGrip.prototype.effect = function(){return "";};
swordGrips.push(LightGrip);

function CurvedGrip(){
    EquippableItemPart.call(this, "Light Grip", "I am curved.", type, "gripCurved.svg");
};
CurvedGrip.prototype = new EquippableItemPart;
CurvedGrip.prototype.constructor = CurvedGrip;
CurvedGrip.prototype.effect = function(){return "";};
swordGrips.push(CurvedGrip);

function BevelledGrip(){
    EquippableItemPart.call(this, "Bevelled Grip", "Grips very well.", type, "gripBevelled.svg");
};
BevelledGrip.prototype = new EquippableItemPart;
BevelledGrip.prototype.constructor = BevelledGrip;
BevelledGrip.prototype.effect = function(){return "";};
swordGrips.push(BevelledGrip);

function DualBevelledGrip(){
    EquippableItemPart.call(this, "Bevelled Grip", "Grips well.", type, "gripBevelledDual.svg");
};
DualBevelledGrip.prototype = new EquippableItemPart;
DualBevelledGrip.prototype.constructor = DualBevelledGrip;
DualBevelledGrip.prototype.effect = function(){return "";};
swordGrips.push(DualBevelledGrip);

function StrappedGrip(){
    EquippableItemPart.call(this, "Strapped Grip", "Strapped grip.", type, "gripStrapped.svg");
};
StrappedGrip.prototype = new EquippableItemPart;
StrappedGrip.prototype.constructor = StrappedGrip;
StrappedGrip.prototype.effect = function(){return "";};
swordGrips.push(StrappedGrip);

//pommels type POMMEL
type=swordPartTypes.POMMEL;

function LightPommel(){
    EquippableItemPart.call(this, "Light Pommel", "I am light.", type, "pommelLight.svg");
};
LightPommel.prototype = new EquippableItemPart;
LightPommel.prototype.constructor = LightPommel;
LightPommel.prototype.effect = function(){return "";};
swordPommels.push(LightPommel);

function CurvedPommel(){
    EquippableItemPart.call(this, "Curved Pommel", "I am curved.", type, "pommelCurved.svg");
};
CurvedPommel.prototype = new EquippableItemPart;
CurvedPommel.prototype.constructor = CurvedPommel;
CurvedPommel.prototype.effect = function(){return "";};
swordPommels.push(CurvedPommel);

function DualStingerPommel(){
    EquippableItemPart.call(this, "Dual Stinger Pommel", "Grips well.", type, "pommelDualStinger.svg");
};
DualStingerPommel.prototype = new EquippableItemPart;
DualStingerPommel.prototype.constructor = DualStingerPommel;
DualStingerPommel.prototype.effect = function(){return "";};
swordPommels.push(DualStingerPommel);

function LanternPommel(){
    EquippableItemPart.call(this, "Lantern", "Lights the way.", type, "pommelLantern.svg");
};
LanternPommel.prototype = new EquippableItemPart;
LanternPommel.prototype.constructor = LanternPommel;
LanternPommel.prototype.effect = function(){return "";};
swordPommels.push(LanternPommel);

function StaticsPommel(){
    EquippableItemPart.call(this, "Statics", "For those that learned the way of statics.", type, "pommelStatics.svg");
};
StaticsPommel.prototype = new EquippableItemPart;
StaticsPommel.prototype.constructor = StaticsPommel;
StaticsPommel.prototype.effect = function(){return "";};
swordPommels.push(StaticsPommel);

function DynamicsPommel(){
    EquippableItemPart.call(this, "Statics", "For those that learned the way of dynamics.", type, "pommelDynamics.svg");
};
DynamicsPommel.prototype = new EquippableItemPart;
DynamicsPommel.prototype.constructor = DynamicsPommel;
DynamicsPommel.prototype.effect = function(){return "";};
swordPommels.push(DynamicsPommel);

function SynergeticsPommel(){
    EquippableItemPart.call(this, "Synergetics", "For those that learned the way of synergetics.", type, "pommelSynergetics.svg");
};
SynergeticsPommel.prototype = new EquippableItemPart;
SynergeticsPommel.prototype.constructor = SynergeticsPommel;
SynergeticsPommel.prototype.effect = function(){return "";};
swordPommels.push(SynergeticsPommel);

//----- ----- ----- specials ----- ----- -----

//KadoBlade
//blade
function KadoBladeBlade(){
    EquippableItemPart.call(this, "Kado Blade", "The blade of the KadoBlade.", swordPartTypes.BLADE, "kadoBladeBlade.svg");
};
KadoBladeBlade.prototype = new EquippableItemPart;
KadoBladeBlade.prototype.constructor = KadoBladeBlade;
KadoBladeBlade.prototype.effect = function(){return "";};
swordBlades.push(KadoBladeBlade);
//guard
function KadoBladeGuard(){
    EquippableItemPart.call(this, "Kado Blade", "The guard of the KadoBlade.", swordPartTypes.GUARD, "kadoBladeGuard.svg");
};
KadoBladeGuard.prototype = new EquippableItemPart;
KadoBladeGuard.prototype.constructor = KadoBladeGuard;
KadoBladeGuard.prototype.effect = function(){return "";};
swordGuards.push(KadoBladeGuard);
//grip
function KadoBladeGrip(){
    EquippableItemPart.call(this, "Kado Blade", "The grip of the KadoBlade.", swordPartTypes.GRIP, "kadoBladeGrip.svg");
};
KadoBladeGrip.prototype = new EquippableItemPart;
KadoBladeGrip.prototype.constructor = KadoBladeGrip;
KadoBladeGrip.prototype.effect = function(){return "";};
swordGrips.push(KadoBladeGrip);
//pomell
function KadoBladePommel(){
    EquippableItemPart.call(this, "Kado Blade", "The pommel of the KadoBlade.", swordPartTypes.POMMEL, "kadoBladePommel.svg");
};
KadoBladePommel.prototype = new EquippableItemPart;
KadoBladePommel.prototype.constructor = KadoBladePommel;
KadoBladePommel.prototype.effect = function(){return "";};
swordPommels.push(KadoBladePommel);

//final
console.log("-----All parts loaded.-----");
console.log("Blade: " + swordBlades.length);
console.log("Hilts: " + swordGuards.length);
console.log("Grips: " + swordGrips.length);
console.log("Pommels: " + swordPommels.length);