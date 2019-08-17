// what happend in the game at each frame
function loop(){

	clearCanvas();
	background.draw();
	draw_platforms();
	player.draw();
	goal.draw();
	mob.draw();
	mob.frameCount++;
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

