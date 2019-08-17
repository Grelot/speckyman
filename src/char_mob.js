// draw and position of sprites of a mob
var mob = {
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
      this.currentLoopIndex++;
      this.frameCount =0;
    }    
    if(this.currentLoopIndex >= this.cycleLoop.length){
      this.currentLoopIndex = 0;
    }

    context.drawImage(charMob,
      SpriteLinePx*this.currentLoopIndex, 64,
      32, 64,
      this.x, this.y,
      scaledWidth,scaledHeight);
  }
}
