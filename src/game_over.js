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