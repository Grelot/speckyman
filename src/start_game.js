// start a game
function startGame(){
	gameStarted = true;
	clearCanvas();
	audio.play();
	canvas.width=world_frame.width;
	canvas.height=world_frame.height;
	// set camera
	CAMERA = new Camera(player);
	CAMERA.x = canvas.width/2+10;
	CAMERA.y = canvas.height/2+10;
	// enter into the loop of the game
	requestAnimationFrame(loop); // run loop.js
}