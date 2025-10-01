class Chicken extends MovableObject {
  y = 365;
  height = 60;
  width = 60;
  chickenAlive = true;

  offset = {
    top: 30,
    right: 20,
    bottom: 10,
    left: 30,
  };

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = 350 + Math.random() * 6100;
    this.speed = 0.15 + Math.random() * 0.25;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
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
