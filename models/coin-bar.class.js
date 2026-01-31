class CoinBar extends DrawableObject {
  // Asset configuration
  BAR_SPRITES = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
  ];

  currentWealth = 0;

  constructor() {
    super();
    this.initStatusBar();
    this.updateLevel(0);
  }

  /**
   * Sets the initial dimensions and loads assets.
   */
  initStatusBar() {
    this.loadImages(this.BAR_SPRITES);
    this.x = 40;
    this.y = 90; // Slightly adjusted for a custom layout
    this.width = 180;
    this.height = 55;
  }

  /**
   * Refreshes the bar's appearance based on coin progress.
   * @param {number} percentage - Progress from 0 to 100.
   */
  updateLevel(percentage) {
    this.currentWealth = percentage;
    let imagePath = this.BAR_SPRITES[this.calculateSpriteIndex()];
    this.img = this.imageCache[imagePath];
  }

  /**
   * Logic to map percentage to the correct image index.
   * @returns {number} Index 0-5.
   */
  calculateSpriteIndex() {
    if (this.currentWealth >= 100) return 5;
    if (this.currentWealth >= 80) return 4;
    if (this.currentWealth >= 60) return 3;
    if (this.currentWealth >= 40) return 2;
    if (this.currentWealth >= 20) return 1;
    return 0;
  }
}
