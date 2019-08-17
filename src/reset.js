
function reset(){
	player.x = 5;
	player.y = canvas.height-25;
	player.grounded = true;
	player.velY = 0;
	player.velX = 0;
	completed = false;

	requestAnimationFrame(loop);
}