class Cloud extends MovableObject {
  y = 30;
  width = 500;
  height = 250;

  constructor(startingX) {
    super();
    this.setupVisuals();
    this.x = startingX;

    this.driftSpeed = 0.1 + Math.random() * 0.15;

    this.initFloatingEffect();
  }

  /**
   * Loads the cloud texture from the assets folder.
   */
  setupVisuals() {
    this.loadImage('img/5_background/layers/4_clouds/1.png');
  }

  /**
   * Starts the background drifting logic.
   */
  initFloatingEffect() {
    this.processDrift();
  }

  /**
   * Constant movement loop to simulate wind.
   * Runs at a standard 60 FPS refresh rate.
   */
  processDrift() {
    setInterval(() => {
      this.x -= this.driftSpeed;
    }, 1000 / 60);
  }
}
