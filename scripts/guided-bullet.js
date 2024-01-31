class GuidedBullet extends Player{
    constructor(gameScreen, left, top, width, height, imgSrc){
      super(gameScreen, left, top, width, height, imgSrc); 
    }

    shoot(playerTop){
        let top = this.top;
        this.left += 4;
        this.top += playerTop - top;
        this.updatePosition();
    } 
} 
