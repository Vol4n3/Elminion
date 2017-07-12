"use strict";
const express = require('express');
const app = express();
const server = require('http').createServer(app);
app.use(express.static(__dirname + '/app'));
server.listen(8081, function () {
    console.log('server http launched');
});
const io = require('socket.io').listen(server);
import Point from './class/Point';
var p = new Point(-1,1);
var p1 = new Point(0,0);
var p2 = new Point(0,10);
var p3 = new Point(10,0);
p.inTriangle(p1,p2,p3);
console.log(p.inTriangle(p1,p2,p3));
console.log(p.signTo(p1,p2));
io.on('connection',function(socket){

    setTimeout(function(){
    socket.emit('point',p);

    },1000)
})
