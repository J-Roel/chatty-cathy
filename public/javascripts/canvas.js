document.addEventListener("DOMContentLoaded", function() {
'use strict';
   
   //Get room
   var roomCode = $('#roomCode').text();

   //build palette
   var clientColor = 'rgb(0,0,0)';
   buildPalette();


   //SETUP CANVAS
   var canvasDiv = document.getElementById('canvasDiv');
   var canvas = document.createElement('canvas');
   canvas.setAttribute('id', 'canvas');
   canvasDiv.appendChild(canvas);
   if(typeof G_vmlCanvasManager != 'undefined') {
   	canvas = G_vmlCanvasManager.initElement(canvas);
   }

var width   = document.querySelector('#canvasDiv').scrollWidth;
var height  = document.querySelector('#canvasDiv').scrollHeight;

   var mouse = {

      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev: false
   };

   var context = canvas.getContext('2d');
   var width   = document.querySelector('#canvasDiv').scrollWidth;
   var height  = document.querySelector('#canvasDiv').scrollHeight;
   var socket  = io.connect();

   canvas.width = width * 2;
   canvas.height = height * 2;

   canvas.onmousedown = function(e){
      mouse.click = true;
   };

   canvas.onmouseup = function(e){
      mouse.click = false;
   };

   canvas.onmousemove = function(e) {
      mouse.pos.x = e.offsetX / width;
      mouse.pos.y = e.offsetY / height;
      mouse.move = true;
   };

   socket.on('draw_line', function (data) {
      var line = data.line;
      context.beginPath();
      context.lineWidth = 4;
      context.strokeStyle = line[2];
      context.moveTo(line[0].x * width, line[0].y * height);
      context.lineTo(line[1].x * width, line[1].y * height);
      context.stroke();
   });

   update_room();

   function mainLoop() {
      if (mouse.click && mouse.move && mouse.pos_prev) {
         socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev, clientColor] });
         mouse.move = false;
      }
      mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
      setTimeout(mainLoop, 25);
   }
   mainLoop();

   function update_room(){
      socket.emit('update_room');
   };

   socket.on('clearHistory', function (data){
      context.clearRect(0,0, canvas.width, canvas.height);
   });

   $('#clear').click(function(){
      socket.emit('clearHistory');
   });

   socket.on('connect', function(data){
      socket.emit('newClient', {
         username: 'user1',
         room: roomCode
      });
   });



function buildPalette() {

      var colors = ['#660000','#bb0000','#ff0000','#006600','#00bb00','#00ff00','#000066','#0000bb','#0000ff'
         ,'#660066','#bb00bb','#ff00ff','#666600','#bbbb00','#ffff00'
         ,'#006666','#00bbbb','#00ffff','#ff0066','#ff00bb','#ff6600','#ffbb00','#66ff00','#bbff00','#0066ff'
			,'#00bbff','#6600ff','#bb00ff','#543210','#765432','#ba9876'
			,'#fedcba','#000000','#212121','#656565','#989898','#bababa'
			,'#dcdcdc','#ffffff'];

      for (var i = 0; i < colors.length; i++) { //loop through our color palette array
         var aColor = document.createElement('div'); //create a new element for our color
         aColor.className = 'color';//assign the class to our element.
         aColor.style.backgroundColor = colors[i]; //then color it per our palette.
         palette.appendChild(aColor); //append this to our color container "colorS"
      }
}; //end Build palette

//MOUSE ACTION TO CHANGE THE COLOR  ---------------------------
   //this is our main action handler.
   function selectColor(event) {
      if(event.target.className == 'color')
      {
         clientColor = event.target.style.backgroundColor; //get the color
      
      }
   };//END FUNCTION
   window.addEventListener('mousedown', selectColor);

});












