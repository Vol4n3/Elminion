(function(){
    "use srtict";
    var socket = io();
    socket.on('point',function(data){
        console.log(data);
        data.translate(1,1);
        console.log(data);  
    })
})();