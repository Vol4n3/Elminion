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
import Mob from './class/Mob';
var m = new Mob();
io.on('connection',function(socket){

    setTimeout(function(){
    socket.emit('newMob',m);

    },1000)
})
