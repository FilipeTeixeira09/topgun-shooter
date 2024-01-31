class GuidedBullet extends Player{
    constructor(gameScreen, left, top, width, height, imgSrc){
      super(gameScreen, left, top, width, height, imgSrc); 
    }

    shoot(){
       this.left += 4;
       this.updatePosition();
    }
}