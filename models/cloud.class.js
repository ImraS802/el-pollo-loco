class Cloud extends MovableObject {
  // Dimensional settings
  y = 30; // Slightly adjusted height
  width = 500;
  height = 250; // Modified height for a sleeker look

  constructor(startingX) {
    super();
    this.setupVisuals();
    this.x = startingX;

    // Randomize speed slightly so clouds move at different paces
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
