class Chicks extends MovableObject {
  y = 370;
  height = 50;
  width = 60;
  currentImage = 0;

  offset = {
    top: 40,
    right: 50,
    bottom: 40,
    left: 50,
  };

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.x = 200 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      // make them face left when false, if true => right
      this.otherDirection = false;
    }, 2000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
