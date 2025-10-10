class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0; // how many pixels he falls
  acceleration = 1; // how fast item accelerates
  energy = 100;
  lastCollision = 0;
  bottleAmount = 0;
  coinAmount = 0;
  AUDIO_BOTTLE = new Audio('audio/bottle.mp3');
  AUDIO_COIN = new Audio('audio/coin.mp3');

  /**
   * Decreases the object's energy by 5 and records the collision time.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastCollision = new Date().getTime();
    }
  }

  /**
   * Decreases the object's energy by 20 (used when hit by the Endboss) and records the collision time.
   */
  hitByEndboss() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastCollision = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently hurt.
   * @returns {boolean} True if the object was hit within the last 0.5 seconds.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastCollision;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} True if the object's energy is 0.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object is colliding with another MovableObject.
   * @param {MovableObject} mo - Another movable object to check collision against.
   * @returns {boolean} True if the objects are colliding.
   */
  isColliding(mo) {
    const o1 = this.offset || {top: 0, right: 0, bottom: 0, left: 0};
    const o2 = mo.offset || {top: 0, right: 0, bottom: 0, left: 0};

    return (
      this.x + this.width - o1.right > mo.x + o2.left &&
      this.y + this.height - o1.bottom > mo.y + o2.top &&
      this.x + o1.left < mo.x + mo.width - o2.right &&
      this.y + o1.top < mo.y + mo.height - o2.bottom
    );
  }

  /**
   * Collects a bottle and increases the bottle amount.
   */
  collectBottle() {
    this.bottleAmount += 10;
    safePlayAudio(this.AUDIO_BOTTLE);
  }

  /**
   * Decreases the bottle amount by 10.
   */
  decreaseBottleStatus() {
    this.bottleAmount -= 10;
  }

  /**
   * Moves the object to the left based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Moves the object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Plays an animation by cycling through an array of images.
   * @param {string[]} images - Array of image paths to play in sequence.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Applies gravity to the object, making it fall if above the ground.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is in the air or cannot fall further.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject || this instanceof Endboss) {
      return true;
    } else if (this.isDead()) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Makes the object jump by setting the vertical speed.
   */
  jump() {
    this.speedY = 18;
  }

  /**
   * Collects a coin and increases the coin amount.
   */
  collectCoin() {
    this.coinAmount += 5;
    safePlayAudio(this.AUDIO_COIN);
  }
}
