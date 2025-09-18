class BackgroundObject extends MovableObject {
  width = 720;
  height = 800;
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.y = 600 - this.height;
    this.x = x;
  }
}
