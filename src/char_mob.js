// draw and position of sprites of a mob
class mob {
  constructor(charSet,x,y,height,width) {
    this.charSet=charSet
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.cycleLoop= [0, 1, 2, 3,4 , 5 ,6,7];
    this.currentLoopIndex= 0;
    this.frameCount=0;

  } 
  draw(x, y){
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

    context.drawImage(this.charSet,
      SpriteLinePx*this.currentLoopIndex, 64,
      32, 64,
      this.x, this.y,
      scaledWidth,scaledHeight);
  }
}

monmob1 = new mob(charMob1,0,0,32,32);
monmob4 = new mob(charMob4,30,0,32,32);