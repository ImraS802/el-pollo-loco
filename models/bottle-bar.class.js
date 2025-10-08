class BottleBar extends DrawableObject {
  IMAGES_BOTTLE = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];

  percentage = 0;

  /**
   * Creates a new instance of the BottleBar.
   *
   * Loads all bottle bar images and sets the initial position, size,
   * and percentage value.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 40;
    this.y = 60;
    this.width = 170;
    this.height = 50;
    this.setPercentage(0);
  }

  /**
   * Updates the bottle bar’s fill level and corresponding image.
   *
   * @param {number} percentage - The new bottle fill percentage (0–100).
   *
   * @example
   * // Set the bottle bar to 80%
   * bottleBar.setPercentage(80);
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_BOTTLE[this.lifeBarIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the correct image index for the current percentage.
   *
   * @returns {number} The index of the image corresponding to the current bottle fill level.
   *
   * @example
   * For 75% the result is 4 (the 80% image)
   * const index = bottleBar.lifeBarIndex();
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
