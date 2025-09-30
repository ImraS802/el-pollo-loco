class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0; // how many pixels he falls
  acceleration = 2; // how fast item accelerates
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    // throwing bottle
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      //141 falling spot on ground for jump
      return this.y < 141;
    }
  }

  //mO = movable object the parameter which is the enemy(chicken or Endboss) that the function gets checked against
  isColliding(mO) {
    this.getRealFrame();
    mO.getRealFrame();
    return (
      this.rX + this.rW > mO.rX &&
      this.rY + this.rH > mO.rY &&
      this.rX < mO.rX + mO.rW &&
      this.rY < mO.rY + mO.rH
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      // point in time
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    // difference in ms
    let timePassed = new Date().getTime() - this.lastHit;
    // difference in s
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  // idle
  lastAction = new Date().getTime();

  setAction() {
    this.lastAction = new Date().getTime();
  }

  isIdle() {
    let now = new Date().getTime();
    let timePassed = (now - this.lastAction) / 1000;
    return timePassed > 1;
  }

  isLongIdle() {
    let now = new Date().getTime();
    let timePassed = (now - this.lastAction) / 1000;
    return timePassed > 5;
  }

  jump() {
    this.speedY = 30;
  }

  // animate images e.g. walking
  playAnimation(images) {
    if (!images || images.length === 0) return;

    let i = this.currentImage % images.length;
    let path = images[i];

    // Only assign if the image exists and is fully loaded
    if (this.imageCache[path] && this.imageCache[path].complete) {
      this.img = this.imageCache[path];
      this.currentImage++; // only increment if image is ready
    }
  }

  // for death, it stops at the last death image
  playAnimationOnce(images) {
    if (!images || images.length === 0) return;

    let i = this.currentImage;
    if (i < images.length) {
      let path = images[i];
      if (this.imageCache[path] && this.imageCache[path].complete) {
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }
}
