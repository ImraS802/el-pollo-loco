class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 300;

  /**
   * Creates a new cloud instance at the specified horizontal position.
   *
   * Loads the cloud image and starts the movement animation loop.
   *
   * @param {number} x - The initial horizontal position of the cloud.
   */
  constructor(x) {
    super().loadImage('img/5_background/layers/4_clouds/1.png');
    this.x = x;
    this.animate();
  }

  /**
   * Starts the automatic horizontal movement of the cloud.
   *
   * The cloud moves left at a consistent rate to simulate
   * background motion. The update runs approximately 60 times per second.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
