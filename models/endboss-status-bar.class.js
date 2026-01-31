class EndbossStatusBar extends DrawableObject {
  // Visual Asset Configuration
  VITALITY_FRAMES = [
    'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
  ];

  bossHealth = 100;

  /**
   * Initializes the health overlay for the final boss.
   * @param {number} posX - Horizontal coordinate.
   * @param {number} posY - Vertical coordinate.
   */
  constructor(posX, posY) {
    super();
    this.prepareHealthBar();
    this.x = posX;
    this.y = posY;
    this.updateHealth(100);
  }

  /**
   * Pre-loads sprites and sets initial bar dimensions.
   */
  prepareHealthBar() {
    this.loadImages(this.VITALITY_FRAMES);
    this.width = 135; // Slightly tweaked dimensions
    this.height = 35;
  }

  /**
   * Updates the visual state of the bar based on boss health.
   * @param {number} currentHP - The boss's current health (0-100).
   */
  updateHealth(currentHP) {
    this.bossHealth = currentHP;
    const spritePath = this.VITALITY_FRAMES[this.resolveFrameIndex()];
    this.img = this.imageCache[spritePath];
  }

  /**
   * Resolves the percentage into an array index using early returns.
   * @returns {number} Corresponding index (0 to 5).
   */
  resolveFrameIndex() {
    if (this.bossHealth >= 100) return 5;
    if (this.bossHealth > 80) return 4;
    if (this.bossHealth > 60) return 3;
    if (this.bossHealth > 40) return 2;
    if (this.bossHealth > 20) return 1;
    return 0;
  }
}
