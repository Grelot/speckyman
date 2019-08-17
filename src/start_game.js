// start a game
function startGame(){
	gameStarted = true;
	clearCanvas();
	audio.play();
	// enter into the loop of the game
	requestAnimationFrame(loop);
}