class Chicken extends MovableObject {
  y = 280;
  currentImage = 0;

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

  constructor(x = 500 + Math.random() * 500) {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = x;
    this.speed = 0.15 + Math.random() * 0.5; // different speed for each chicken
    this.animate();
  }

  animate() {
    this.walkInterval = setInterval(() => {
      this.moveLeft();
      this.otherDirection = true; // make them face left when moving left
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      if (this.dead) {
        this.playAnimation(this.IMAGES_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
