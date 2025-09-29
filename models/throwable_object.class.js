class ThrowableObject extends MovableObject {
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

  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_ROTATING[0]);
    this.loadImages(this.IMAGES_ROTATING);
    this.loadImages(this.IMAGES_SPLASHING);

    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 90;

    this.throw();
  }

  throw() {
    this.speedY = 20;
    this.applyGravity();

    this.moveForwardInterval = setInterval(() => {
      this.x += 5;
      // check if it hits the ground
      if (this.y > 280) {
        this.splash();
      }
    }, 40);

    // cycles through the rotation images
    this.rotationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATING);
    }, 200);
  }

  splash() {
    // stop movement + rotation
    clearInterval(this.moveInterval);
    clearInterval(this.rotationInterval);

    // play splash animation
    let i = 0;
    let splashInterval = setInterval(() => {
      this.loadImage(this.IMAGES_SPLASHING[i]);
      i++;
      if (i >= this.IMAGES_SPLASHING.length) {
        clearInterval(splashInterval);

        // remove bottle from world after splash
        if (this.world) {
          const index = this.world.throwableObject.indexOf(this);
          if (index > -1) {
            this.world.throwableObject.splice(index, 1);
          }
        }
      }
    }, 80);
  }
}
