class DrawableObject {
  y;
  x;
  img;
  width = 100;
  height = 180;
  imageCache = {};
  currentImage = 0;

  /**
   * Loads a single image for this object.
   *
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Preloads multiple images and stores them in the image cache.
   *
   * @param {string[]} arr - Array of image paths to preload.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the current image of the object on the given canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a blue bounding box around the object for debugging purposes.
   * Only draws for Character, Chicken, Chick, Coin, Endboss, or ThrowableObject instances.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {}
}
