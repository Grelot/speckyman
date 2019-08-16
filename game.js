var canvas = document.getElementById('game');
canvas.width=window.innerWidth
canvas.height=window.innerHeight

//canvas.width=640
//canvas.height=360

console.log(canvas.width)

var context = canvas.getContext('2d');
var gameStarted = false;
var keys = [];
var friction = 0.8;
var gravity = 0.98;
var completed = false;

var bg_image = new Image();
bg_image.src = "ressources/images/backgrounds/paris_street1.png"

var door_image = new Image();
door_image.src = "door.png";

var charPlayer = new Image();
charPlayer.src = "ressources/images/characters/specky_walk.png";

var charTest = new Image();
charTest.src = "ressources/images/characters/gorilla_mob4_walk.png";


console.log(charPlayer.width)





function drawFrame(img,frameX, frameY, canvasX, canvasY, width,height,scaledWideth,scaledHeight) {
  context.drawImage(img,
                frameX * width, frameY * height, width, height,
                canvasX, canvasY, scaledWidth, scaledHeight);
}


var ctest = {
  x: 0,
  y: 0,
  height: 32,
  width: 32,  
  cycleLoop: [0, 1, 2, 3,4 , 5 ,6,7],
  currentLoopIndex: 0,
  frameCount:0,
  draw: function(x, y){
  scaledWidth= 64
  scaledHeight= 128
  SpriteLinePx=32
  //this.frameCount++
    if(this.frameCount > 5) {
      ctest.currentLoopIndex++;
      this.frameCount =0;
    }    
    if(this.currentLoopIndex >= this.cycleLoop.length){
      this.currentLoopIndex = 0;
    }
    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    //sx: the x-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
    //sWidth: the width of the sub-rectangle of the source image to draw into the destination context. 
    //If not specified, the entire rectangle from the coordinates specified by sx and sy to the bottom-right corner of the image is used.
    //dx: the x-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
    //dWidth: the width to draw the image in the destination canvas. This allows scaling of the drawn image. 
    //If not specified, the image is not scaled in width when drawn.
    context.drawImage(charTest,
      SpriteLinePx*this.currentLoopIndex, 64,
      32, 64,
      this.x, this.y,
      scaledWidth,scaledHeight);
  }
}


var player = {
	x: 5,
	y: canvas.height-381,
	width: playerScaledWidth=64,
	height: playerScaledHeight=128,
	speed: 5,
	velX: 0,
	velY: 0,
	color: "#ff0000",
	jumping: false,
	grounded: false,
	jumpStrength: 7,
	position: "idle",
	prePosition: "idle",
	//animation
	cycleLoop: [0, 1, 2, 3,4 , 5 ,6,7],
    currentLoopIndex: 0,
    frameCount:0,
	draw: function(){
		scaledWidth= 64
  		scaledHeight= 128
  		SpriteLinePx=32
  		if(this.frameCount > 5) {
      		this.currentLoopIndex++;
      		this.frameCount =0;
    	}    
    	if(this.currentLoopIndex >= this.cycleLoop.length){
      		this.currentLoopIndex = 0;
    	}
    	//idle
		if(this.prePosition == "left" && this.position == "idle")  {
    		context.drawImage(charPlayer, 224, 0, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
    	} else if(this.position == "right" && this.prePosition == "right") {
    		console.log("toujours à gauche")
    		console.log(this.currentLoopIndex)
    		context.drawImage(charPlayer, SpriteLinePx*this.currentLoopIndex, 64, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
    	} else if(this.position == "right" && this.prePosition != "right") {
    		console.log("chgt de direction !!!")
    		this.currentLoopIndex = 0;
    		this.frameCount =0;
    		context.drawImage(charPlayer, SpriteLinePx*this.currentLoopIndex, 64, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
    	} else if(this.position == "left" && this.prePosition == "left") {
    	    context.drawImage(charPlayer, SpriteLinePx*this.currentLoopIndex, 128, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);	
    	} else if(this.position == "left" && this.prePosition != "left") {
    		this.currentLoopIndex = 5;
    		this.frameCount =0;
    		context.drawImage(charPlayer, SpriteLinePx*this.currentLoopIndex, 128, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
 	
    	} else {
    		context.drawImage(charPlayer, 0, 0, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
    	}

	}
	
}






var goal = {
	x: canvas.width-90,
	y: 0,
	width:40,
	height:45,
	color: "#0098cb",
	draw: function(){
		context.drawImage(door_image, this.x, this.y);
	}
}

var background = {
	x: 0,
	y: 0,
	width:canvas.width,
	height:canvas.height,
	draw: function(){
		context.drawImage(bg_image, this.x, this.y,canvas.width,canvas.height);
	}
}



var platforms = [];
var platform_width = 120;
var platform_height = 10;

platforms.push({
    x: canvas.width-170,
    y: 50,
    width: platform_width,
    height: platform_height,
});
platforms.push({
    x: canvas.width-170,
    y: canvas.height-50,
    width: platform_width,
    height: platform_height,
});
platforms.push({
    x: canvas.width-380,
    y: canvas.height-120,
    width: platform_width,
    height: platform_height,
});
platforms.push({
    x: canvas.width-380,
    y: canvas.height-240,
    width: platform_width,
    height: platform_height,
});

platforms.push({
    x: canvas.width-590,
    y: canvas.height-180,
    width: platform_width,
    height: platform_height,
});

// Bottom
platforms.push({
	x: 0,
	y: canvas.height-130,
	width: canvas.width,
	height: platform_height
});

// Left Wall
platforms.push({
	x: -10,
	y: 0,
	width: 10,
	height: canvas.height
});

// Left Wall
platforms.push({
	x: canvas.width,
	y: 0,
	width: 10,
	height: canvas.height
});

// Floor
platforms.push({
	x: 0,
	y: 0,
	width: canvas.width,
	height: platform_height
});

document.body.addEventListener("keydown", function(event){

	if(event.keyCode == 13 && !gameStarted){
		startGame();
	}
	if(event.keyCode == 13 && completed){
		reset();
	}
	keys[event.keyCode] = true;

});

document.body.addEventListener("keyup", function(event){
	keys[event.keyCode] = false;
});

intro_screen();

function intro_screen(){
	context.font = "120px Impact";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.fillText("SPECKYMAN", canvas.width/2, canvas.height/2);

	context.font = "20px Arial";
	context.fillText("Press Enter To Start", canvas.width/2, canvas.height/2 + 50);
}

function startGame(){
	gameStarted = true;
	clearCanvas();

	requestAnimationFrame(loop);

}

function complete(){
	clearCanvas();
	completed = true;

	context.font = "50px Impact";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.fillText("Congrats! You've Won!", canvas.width/2, canvas.height/2);

	context.font = "20px Arial";
	context.fillText("Press Enter to Play Again", canvas.width/2, canvas.height/2 + 50);
}

function reset(){
	player.x = 5;
	player.y = canvas.height-25;
	player.grounded = true;
	player.velY = 0;
	player.velX = 0;
	completed = false;

	requestAnimationFrame(loop);
}

function draw_platforms(){
	context.fillStyle = "#907020";
	for(var i = 0; i < platforms.length; i++){
		context.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
		context.lineWidth = 5;
		context.strokeStyle = "#90D030";
		context.strokeRect(platforms[i].x, platforms[i].y-2, platforms[i].width, 5);
	}
}




function loop(){

	clearCanvas();
	background.draw();
	draw_platforms();
	player.draw();
	goal.draw();
	ctest.draw();
	ctest.frameCount++;
	player.frameCount++;

	if(player.position != "idle") {
		player.prePosition = player.position;
	} 
	//player.position = "idle";

	if(keys[38] || keys[32]){
		if(!player.jumping){
			player.velY = -player.jumpStrength*2;
			player.jumping = true;
		}
	}

	if(keys[39]){
		player.position = "right";
		if(player.velX < player.speed){
			player.velX+=2;
		}
	} else if(keys[37]){
		player.position = "left";
		if(player.velX > -player.speed){
			player.velX-=2;
		}
	} else {
		player.position = "idle";
	}

	player.x += player.velX;
	player.y += player.velY;

	player.velX *= friction;
	player.velY += gravity;

	player.grounded = false;
	for(var i = 0; i < platforms.length; i++){
		var direction = collisionCheck(player, platforms[i]);

		if(direction == "left" || direction == "right"){
			player.velX = 0;
		} else if(direction == "bottom"){
			player.jumping = false;
			player.grounded = true;
		} else if(direction == "top"){
			player.velY *= -1;
		}

	}

	if(player.grounded){
		player.velY = 0;
	}

	if(collisionCheck(player, goal)){
		complete();
	}

	if(!completed){
		requestAnimationFrame(loop);
	}

}

function collisionCheck(character, platform){

	var vectorX = (character.x + (character.width/2)) - (platform.x + (platform.width/2));
	var vectorY = (character.y + (character.height/2)) - (platform.y + (platform.height/2));

	var halfWidths = (character.width/2) + (platform.width/2);
	var halfHeights = (character.height/2) + (platform.height/2);

	var collisionDirection = null;

	if(Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights){

		var offsetX = halfWidths - Math.abs(vectorX);
		var offsetY = halfHeights - Math.abs(vectorY);
		if(offsetX < offsetY){

			if (vectorX > 0){
				collisionDirection = "left";
				character.x += offsetX;
			} else {
				collisionDirection = "right";
				character.x -= offsetX;
			}

		} else {

			if (vectorY > 0){
				collisionDirection = "top";
				character.y += offsetY;
			} else {
				collisionDirection = "bottom";
				character.y -= offsetY;
			}

		}

	}

	return collisionDirection;

}

function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}