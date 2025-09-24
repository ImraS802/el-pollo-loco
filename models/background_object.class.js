class BackgroundObject extends MovableObject {
  constructor(imagePath, x, canvasHeight = 480) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.canvasHeight = canvasHeight;

    this.img.onload = () => {
      const scale = canvasHeight / this.img.height;
      this.width = this.img.width * scale;
      this.height = this.img.height * scale;
      this.y = canvasHeight - this.height;
    };
  }
}
