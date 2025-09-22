class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 100;
  y = 250;
  height = 150;
  width = 200;

  // Immediately assign a default image
  loadImage(path) {
    //creates a new image element in memory
    this.img = new Image();
    //tells the image what file to load the path of the image
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
