class MovableObject {
  currentImage = 0;
  x = 100;
  y = 250;
  img;
  height = 150;
  width = 200;
  imageCache = {};
  speed = 0.15;
  otherDirection = false;

  // Immediately assign a default image
  loadImage(path) {
    //creates a new image element in memory
    this.img = new Image();
    //tells the image what file to load the path of the image
    this.img.src = path;
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

  playAnimation(images) {
    if (!images || images.length === 0) return;

    let i = this.currentImage % images.length;
    let path = images[i];

    // Only assign if the image exists and is fully loaded
    if (this.imageCache[path] && this.imageCache[path].complete) {
      this.img = this.imageCache[path];
      this.currentImage++; // only increment if image is ready
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }
}
