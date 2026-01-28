class StatusBar extends DrawableObject {
  IMAGES_LIFE = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ];

  percentage = 100;
  type;

  /**
   * Creates a new StatusBar instance, initializes its position, size,
   * loads all health images, and sets the default health to 100%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_LIFE);
    this.x = 40;
    this.y = 20;
    this.width = 170;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
   * Sets the current health percentage of the status bar and updates its image accordingly.
   * @param {number} percentage - The new health percentage (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_LIFE[this.lifeBarIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the image to display based on the current health percentage.
   * @returns {number} The index of the corresponding health bar image.
   */
  lifeBarIndex() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage > 90) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 30) {
      return 2;
    } else if (this.percentage > 10) {
      return 1;
    } else {
      return 0;
    }
  }
}
