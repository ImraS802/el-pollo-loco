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
  speedY = 0;
  acceleration = 2; // how fast item accelerates

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    //141 falling spot on ground
    return this.y < 141;
  }

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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'blue';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  drawRectangle(ctx) {
    ctx.beginPath();
    ctx.lineWidth = '4';
    ctx.strokeStyle = 'blue';
    ctx.rect(0, 0, this.width, this.height);
    ctx.stroke();
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
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  jump() {
    this.speedY = 30;
  }
}
