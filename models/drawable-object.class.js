class DrawableObject {
  x = 0;
  y = 0;
  width = 100;
  height = 180;

  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Assigns a single source to the main image object.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
    this.img.onerror = () => console.error(`Failed to load asset: ${path}`);
  }

  /**
   * Populates the internal cache with an array of sprites.
   */
  loadImages(paths) {
    paths.forEach((path) => {
      const sprite = new Image();
      sprite.src = path;
      this.imageCache[path] = sprite;
    });
  }

  /**
   * Renders the entity's current sprite onto the canvas.
   */
  render(context) {
    try {
      if (this.img) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
      }
    } catch (e) {}
  }

  /**
   * Debug method left empty to ensure no frames are drawn.
   * This prevents ReferenceErrors when called by the engine.
   */
  debugFrame(context) {}
}
