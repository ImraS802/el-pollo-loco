class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 100;
  y = 250;
  height = 150;
  width = 200;

  rX;
  rY;
  rW;
  rH;

  offset = {
    top: 30,
    right: 10,
    bottom: 20,
    left: 15,
  };

  // draw compressed/narrow rectangle
  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rW = this.width - this.offset.left - this.offset.right;
    this.rH = this.height - this.offset.top - this.offset.bottom;
  }

  // Immediately assign a default image
  loadImage(path) {
    //creates a new image element in memory
    this.img = new Image();
    //tells the image what file to load the path of the image
    this.img.src = path;
  }

  draw(ctx) {
    this.getRealFrame();
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // beginPath() draws rectangle around
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Endboss ||
      this instanceof Chicks
    ) {
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.rX, this.rY, this.rW, this.rH);
      ctx.stroke();
    }
  }

  drawRectangle(ctx) {
    if (this instanceof Chicken) {
      this.getRealFrame();
      const relX = this.rX - this.x;
      const relY = this.rY - this.y;
      ctx.beginPath();
      ctx.lineWidth = '4';
      ctx.strokeStyle = 'red';
      ctx.rect(relX, relY, this.rW, this.rH);
      ctx.stroke();
    }
  }

  // Preload multiple images into cache
  loadImages(arr) {
    arr.forEach((path) => {
      //Create a new image
      let img = new Image();
      //Load the file
      img.src = path;
      //Save it in imageCache, so you can reuse it later
      this.imageCache[path] = img;
    });
  }
}
