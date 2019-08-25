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
    this.pathCount=0;
    this.direction="idle";
    this.scaledWidth= 64;
    this.scaledHeight= 128;
    this.SpriteLinePx=32;

  } 
  draw(x, y){

    if(this.frameCount > 5) {
      this.currentLoopIndex++;
      this.frameCount =0;
    }    
    if(this.currentLoopIndex >= this.cycleLoop.length){
      this.currentLoopIndex = 0;
    }
    if(this.direction == "left") {
      context.drawImage(this.charSet,
      this.SpriteLinePx*this.currentLoopIndex, 128,
      32, 64,
      this.x, this.y,
      this.scaledWidth,this.scaledHeight);

    } else if(this.direction == "right") {
      context.drawImage(this.charSet,
      this.SpriteLinePx*this.currentLoopIndex, 64,
      32, 64,
      this.x, this.y,
      this.scaledWidth,this.scaledHeight);

    } else{
      context.drawImage(this.charSet,
      0, 0,
      32, 64,
      this.x, this.y,
      this.scaledWidth,this.scaledHeight);
    }
  }
 
}

mob1 = new mob(charMob1,0,0,32,32);
mob4 = new mob(charMob4,30,0,32,32);