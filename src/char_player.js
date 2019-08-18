// objet player position and animation to draw
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
    cycleLoopJump: [0,1,2],
    currentLoopIndex: 0,
    frameCount:0,
    // draw player sprite at a given frame
	draw: function(){
		scaledWidth= 64
  		scaledHeight= 128
  		SpriteLinePx=32
  		if(this.frameCount > 5) {
      		this.currentLoopIndex++;
      		this.frameCount =0;
    	}    

        if(this.jumping) {
            if (this.currentLoopIndex > 1) {
                this.currentLoopIndex = 2;
            }
            if( this.position == "left"){
                context.drawImage(charPlayerJump, SpriteLinePx*this.currentLoopIndex, 128, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
            } else if(this.position == "right") {
                context.drawImage(charPlayerJump, SpriteLinePx*this.currentLoopIndex, 64, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
            } else {
                if (this.prePosition == "left"){
                    context.drawImage(charPlayerJump, SpriteLinePx*this.currentLoopIndex,128, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
                }else {
                    context.drawImage(charPlayerJump, SpriteLinePx*this.currentLoopIndex, 64, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
                }
            }            
        }else {
            if(this.currentLoopIndex >= this.cycleLoop.length){
                this.currentLoopIndex = 0;
            }
            //idle left
            if(this.prePosition == "left" && this.position == "idle")  {
                context.drawImage(charPlayerWalk, 224, 0, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
            // keep walking on the right
            } else if(this.position == "right" && this.prePosition == "right") {
                context.drawImage(charPlayerWalk, SpriteLinePx*this.currentLoopIndex, 64, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
            // start to walk on the right
            } else if(this.position == "right" && this.prePosition != "right") {
                this.currentLoopIndex = 0;
                this.frameCount =0;
                context.drawImage(charPlayerWalk, SpriteLinePx*this.currentLoopIndex, 64, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
            // keep walking on the left
            } else if(this.position == "left" && this.prePosition == "left") {
                context.drawImage(charPlayerWalk, SpriteLinePx*this.currentLoopIndex, 128, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);  
            // start walking on the right
            } else if(this.position == "left" && this.prePosition != "left") {
                this.currentLoopIndex = 5;
                this.frameCount =0;
                context.drawImage(charPlayerWalk, SpriteLinePx*this.currentLoopIndex, 128, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
            // idle right (default)
            } else {
                context.drawImage(charPlayerWalk, 0, 0, 32, 64, this.x, this.y, playerScaledWidth, playerScaledHeight);
            }

        }

	}
	
}
//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
//sx: the x-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
//sWidth: the width of the sub-rectangle of the source image to draw into the destination context. 
//If not specified, the entire rectangle from the coordinates specified by sx and sy to the bottom-right corner of the image is used.
//dx: the x-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
//dWidth: the width to draw the image in the destination canvas. This allows scaling of the drawn image. 
//If not specified, the image is not scaled in width when drawn.