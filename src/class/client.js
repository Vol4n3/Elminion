import Geometry from './Geometry';
import Point from './Point'; 
import Circle from './Circle';
import Mob from './Mob';
import Equipement from './Equipement';
window.Geometry = Geometry;
window.Point = Point;
window.Circle = Circle;
window.Mob = Mob;
window.Equipement = Equipement;

(function(){
    "use strict";
    var socket = io();
    var m = new Mob();
    console.log(m);
    setTimeout(function(){
        m.update();
    console.log(m);
    },10000);
    
})();