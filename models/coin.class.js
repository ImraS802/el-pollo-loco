class Coin extends MovableObject {
  width = 100;
  height = 100;

  IMAGES_COINS = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  /**
   * Creates a new coin instance at the specified position.
   *
   * Loads the coin images and starts the animation loop.
   *
   * @param {number} x - The x-coordinate of the coin.
   * @param {number} y - The y-coordinate of the coin.
   */
  constructor(x, y) {
    super().loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.offset = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 30,
    };
    this.animate();
  }

  /**
   * Starts the coin's animation loop.
   *
   * The method alternates between the two coin images every 200 milliseconds
   * to create a simple spinning effect.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 200);
  }
}
