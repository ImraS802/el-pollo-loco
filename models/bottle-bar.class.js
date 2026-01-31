class BottleBar extends DrawableObject {
  UI_IMAGES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];

  currentStock = 0;

  /**
   * Constructs the visual inventory bar for salsa bottles.
   */
  constructor() {
    super();
    this.loadImages(this.UI_IMAGES);
    this.x = 40;
    this.y = 60;
    this.width = 170;
    this.height = 50;
    this.refreshProgress(0);
  }

  /**
   * Syncs the bar's appearance with the character's inventory.
   * @param {number} val - The current percentage value (0-100).
   */
  refreshProgress(val) {
    this.currentStock = val;
    let path = this.UI_IMAGES[this.calculateIconIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Logic to determine which image index matches the inventory level.
   * @returns {number} Array index for the UI image.
   */
  calculateIconIndex() {
    if (this.currentStock >= 100) return 5;
    if (this.currentStock >= 80) return 4;
    if (this.currentStock >= 60) return 3;
    if (this.currentStock >= 40) return 2;
    if (this.currentStock >= 20) return 1;
    return 0;
  }
}
