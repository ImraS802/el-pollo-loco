class Chick extends MovableObject {
  y = 380;
  height = 40;
  width = 40;
  chickenAlive = true;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  /**
   * Creates a new chick instance with randomized position and speed.
   *
   * Loads walking and dead animations, initializes the starting image,
   * and begins movement and animation intervals.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.x = 350 + Math.random() * 5900;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.speed = 0.15 + Math.random() * 1.0;
    this.offset = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  }

  /**
   * Initializes both movement and animation loops for the chick.
   */
  animate() {
    this.startMovement();
    this.startAnimationLoop();
  }

  /**
   * Starts the movement loop for the chick.
   *
   * Moves the chick continuously to the left while it is alive.
   * Runs at approximately 60 frames per second.
   */
  startMovement() {
    setInterval(() => {
      if (this.chickenAlive) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  /**
   * Starts the animation loop for the chick.
   *
   * Updates the displayed image every 100ms, switching between
   * walking and dead animations based on the chick’s state.
   */

  startAnimationLoop() {
    setInterval(() => {
      if (this.chickenAlive) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.img = this.imageCache[this.IMAGES_DEAD[0]];
      }
    }, 100);
  }
}
