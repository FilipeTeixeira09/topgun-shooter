class GuidedBullet extends Player {
  constructor(gameScreen, left, top, width, height, imgSrc, initialDirection) {
    super(gameScreen, left, top, width, height, imgSrc);
  }

  shoot(playerTop) {
    this.left += 2.5;
    this.top += (playerTop - this.top)*0.02; // This gives us a delay, so that it starts closer to the aircraft enemy position
    this.updatePosition();
  }
}