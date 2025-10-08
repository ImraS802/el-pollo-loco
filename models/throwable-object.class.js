class ThrowableObject extends MovableObject {
  width = 70;
  height = 70;
  IMAGES_ROTATING = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  IMAGES_SPLASHING = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  /**
   * Creates a new ThrowableObject instance at a specified position.
   * Loads the rotating and splashing images, applies gravity, and starts the throw animation.
   * @param {number} x - The initial horizontal position of the object.
   * @param {number} y - The initial vertical position of the object.
   */
  constructor(x, y) {
    super().loadImage(
      'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'
    );
    this.loadImages(this.IMAGES_ROTATING);
    this.loadImages(this.IMAGES_SPLASHING);
    this.x = x;
    this.y = y;
    this.applyGravity();
    this.throw();
  }

  /**
   * Initiates the throw behavior of the object.
   * Sets an upward speed, moves the object horizontally over time,
   * and plays the rotation animation while in the air.
   */
  throw() {
    this.speedY = 20;
    setInterval(() => {
      this.x += 7;
    }, 25);
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATING);
    }, 100);
  }
}
