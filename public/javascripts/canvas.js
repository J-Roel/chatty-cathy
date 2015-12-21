document.addEventListener("DOMContentLoaded", function() {
var $clear = $('#clear');

canvasWidth = '0';
canvasHeight = '0';

var canvasDiv = document.getElementById('canvasDiv');
canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}

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
      context.lineWidth = 2;
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


	 $( "#clear" ).click(function() {
	   line_history = [];
	 	 context.clearRect(0, 0, canvas.width, canvas.height);
	 });

});
