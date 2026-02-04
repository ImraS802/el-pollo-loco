class StatusBar extends DrawableObject {
  STAGES = {
    HEALTH_LEVELS: [
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ],
  };

  currentValue = 100;

  constructor() {
    super();
    this.loadImages(this.STAGES.HEALTH_LEVELS);
    this.assignPosition(40, 20, 170, 50);
    this.updateStatus(100);
  }

  /**
   * Universal setter for UI progress.
   * @param {number} val - 0 to 100.
   */
  updateStatus(val) {
    this.currentValue = val;
    const index = this.calculateIconIndex();
    const assetPath = this.STAGES.HEALTH_LEVELS[index];
    this.img = this.imageCache[assetPath];
  }

  /**
   * Mathematically determines which sprite to show.
   * This replaces the long "if-else" chain with logic.
   */
  calculateIconIndex() {
    if (this.currentValue <= 0) return 0;
    if (this.currentValue >= 100) return 5;
    return Math.ceil(this.currentValue / 20);
  }

  /**
   * Helper to clean up the constructor appearance.
   */
  assignPosition(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }
}
