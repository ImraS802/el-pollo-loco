class CoinBar extends DrawableObject {
  IMAGES_COINS = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
  ];

  percentage = 0;

  /**
   * Creates a new coin status bar instance.
   *
   * Loads all coin bar images, sets initial size and position on the screen,
   * and initializes the bar to 0% completion.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_COINS);
    this.x = 40;
    this.y = 100;
    this.width = 170;
    this.height = 50;
    this.setPercentage(0);
  }

  /**
   * Updates the coin bar's displayed image based on the given percentage.
   *
   * The method determines which image to show depending on the
   * progress level and updates the visual representation accordingly.
   *
   * @param {number} percentage - The current coin collection percentage (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_COINS[this.lifeBarIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the appropriate index in the {@link IMAGES_COINS} array
   * based on the current percentage value.
   *
   * @returns {number} The index of the corresponding image to display.
   */
  lifeBarIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
