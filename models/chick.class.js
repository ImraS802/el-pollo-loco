class Chick extends MovableObject {
  y = 380;
  height = 40;
  width = 40;
  chickenAlive = true;

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
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.x = 350 + Math.random() * 6100;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.speed = 0.15 + Math.random() * 0.25;
  }

  animate() {
    setInterval(() => {
      if (this.chickenAlive) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.chickenAlive) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 100);
  }
}
