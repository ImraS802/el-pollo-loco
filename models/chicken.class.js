class Chicken extends MovableObject {
  y = 280;
  currentImage = 0;
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  constructor(x = 500 + Math.random() * 500) {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.x = x;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      this.otherDirection = true; // make them face left when moving left
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
