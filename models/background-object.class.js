class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates a static background element for the game world.
   * @param {string} file - The path to the image resource.
   * @param {number} startX - Horizontal starting position.
   * @param {number} startY - Vertical starting position.
   */
  constructor(file, startX, startY) {
    super();
    this.loadImage(file);
    this.x = startX;
    this.y = startY;
  }
}
