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
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Chick ||
      this instanceof Coin ||
      this instanceof Endboss ||
      this instanceof ThrowableObject
    ) {
      const o = this.offset || {top: 0, left: 0, right: 0, bottom: 0};
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(
        this.x + o.left,
        this.y + o.top,
        this.width - o.left - o.right,
        this.height - o.top - o.bottom
      );
    }
  }
}
