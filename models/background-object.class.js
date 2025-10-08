class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   *
   * @param {string} imagePath - The file path or URL of the background image.
   * @param {number} x - The x-coordinate position where the background should be placed.
   * @param {number} y - The y-coordinate position where the background should be placed.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
  }
}
