class Chicken extends MovableObject {
  height = 120;
  width = 120;
  y = 310;
  chickenAlive = true;

  offset = {
    top: 10,
    right: 20,
    bottom: 20,
    left: 10,
  };

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  /**
   * Creates a new chicken instance with randomized position and speed.
   *
   * Loads walking and dead animations, initializes the default image,
   * and starts both movement and animation loops.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = 350 + Math.random() * 5900;
    this.speed = 0.15 + Math.random() * 0.25;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * Initializes both movement and animation loops for the chicken.
   */
  animate() {
    this.startMovement();
    this.startAnimationLoop();
  }

  /**
   * Starts the chicken’s continuous leftward movement.
   *
   * This loop runs at approximately 60 frames per second and
   * only executes while the chicken is alive.
   */
  startMovement() {
    setInterval(() => {
      if (this.chickenAlive) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  /**
   * Starts the animation loop for the chicken.
   *
   * Updates the displayed image every 100 milliseconds,
   * switching between walking and dead animations depending
   * on the chicken’s state.
   */
  startAnimationLoop() {
    setInterval(() => {
      if (this.chickenAlive) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 100);
  }
}
