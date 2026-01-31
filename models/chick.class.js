class Chick extends MovableObject {
  // Positioning and Dimensions
  y = 385;
  height = 38;
  width = 38;
  chickenAlive = true;

  // Animation Assets
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  constructor() {
    super();
    this.setupVisuals();
    this.setRandomPosition();
    this.startEntityLoops();

    // Custom hitbox for better gameplay feel
    this.offset = {top: 2, left: 2, right: 2, bottom: 2};
  }

  /** * Loads all required textures */
  setupVisuals() {
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
  }

  /** * Randomizes spawn point and movement speed */
  setRandomPosition() {
    this.x = 400 + Math.random() * 5800;
    this.speed = 0.2 + Math.random() * 1.2;
  }

  /** * Initiates movement and animation intervals */
  startEntityLoops() {
    this.applyMovement();
    this.applyAnimation();
  }

  /** * 60 FPS movement loop */
  applyMovement() {
    setInterval(() => {
      if (this.chickenAlive) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  /** * Frame-switching logic */
  applyAnimation() {
    setInterval(() => {
      if (this.chickenAlive) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.img = this.imageCache[this.IMAGES_DEAD[0]];
      }
    }, 115);
  }
}
