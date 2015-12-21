document.addEventListener("DOMContentLoaded", function() {
'use strict';

   //build palette
   var clientColor;
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
      context.strokeStyle = clientColor;
      context.moveTo(line[0].x * width, line[0].y * height);
      context.lineTo(line[1].x * width, line[1].y * height);
      context.stroke();
   });

   function mainLoop() {
      if (mouse.click && mouse.move && mouse.pos_prev) {
         socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
         mouse.move = false;
      }
      mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
      setTimeout(mainLoop, 25);
   }
   mainLoop();




   socket.on('clearHistory', function (data){
      console.log('clear');
      context.clearRect(0,0, canvas.width, canvas.height);
   });
            
      
   $('#clear').click(function(){  
      socket.emit('clearHistory');
   });





function buildPalette() {

      var colors = [ '#33FFFF','#33FFCC','#33FF99','#33FF66','#33FF33','#33FF00'
         ,'#33CCFF','#33CCCC','#33CC99','#33CC66','#33CC33','#33CC00'
         ,'#3399FF','#3399CC','#339999','#339966','#339933','#339900'
         ,'#3366FF','#3366CC','#336699','#336666','#336633','#336600'
         ,'#3333FF','#3333CC','#333399','#333366','#333333','#333300'
         ,'#3300FF','#3300CC','#330099','#330066','#330033','#330000'
         ,'#00FFFF','#00FFCC','#00FF99','#00FF66','#00FF33','#000000'
         ,'#ffffff','#CCCCCC','#DDDDDD'];

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
         console.log("COLOR: ", clientColor);
      }
   };//END FUNCTION
   window.addEventListener('mousedown', selectColor);

   


});