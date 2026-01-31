class Coin extends MovableObject {
  // Dimensions and Hitbox
  width = 110;
  height = 110;
  hitbox = {top: 35, right: 35, bottom: 35, left: 35};

  COIN_FRAMES = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  constructor(posX, posY) {
    super();
    this.initCoinVisuals();
    this.setSpawnPoint(posX, posY);
    this.startGlimmerEffect();
  }

  /**
   * Pre-loads images and sets the initial sprite.
   */
  initCoinVisuals() {
    this.loadImage(this.COIN_FRAMES[0]);
    this.loadImages(this.COIN_FRAMES);
  }

  /**
   * Defines the coordinate placement and collision offset.
   * @param {number} x
   * @param {number} y
   */
  setSpawnPoint(x, y) {
    this.x = x;
    this.y = y;
    // Overwriting the inherited offset with our specific hitbox
    this.offset = this.hitbox;
  }

  /**
   * Cycles through the frames to create a spinning/glimmering animation.
   */
  startGlimmerEffect() {
    setInterval(() => {
      this.playAnimation(this.COIN_FRAMES);
    }, 250);
  }
}
