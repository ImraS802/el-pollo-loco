class ThrowableObject extends MovableObject {
  width = 70;
  height = 70;
  isSplashing = false;

  FLIGHT_SPRITES = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  IMPACT_SPRITES = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  constructor(startX, startY) {
    super();
    this.prepareAnimationAssets();
    this.x = startX;
    this.y = startY;
    this.executeLaunch();
  }

  /** * Loads textures and sets initial frame */
  prepareAnimationAssets() {
    this.loadImage(this.FLIGHT_SPRITES[0]);
    this.loadImages(this.FLIGHT_SPRITES);
    this.loadImages(this.IMPACT_SPRITES);
  }

  /** * Initiates physics and visual loops */
  executeLaunch() {
    this.speedY = 15;
    this.acceleration = 1;
    this.applyGravity();

    this.flightInterval = setInterval(() => {
      if (!this.isSplashing) {
        this.x += 6;
      }
    }, 1000 / 60);

    setInterval(() => {
      this.refreshVisuals();
    }, 60);
  }

  /** * Handles switching between rotating and splashing states */
  refreshVisuals() {
    if (this.isSplashing) {
      this.playAnimation(this.IMPACT_SPRITES);
    } else {
      this.playAnimation(this.FLIGHT_SPRITES);
    }
  }

  /** * Call this method when the bottle hits the ground or an enemy */
  triggerImpact() {
    this.isSplashing = true;
    this.speedY = 0;
    this.acceleration = 0;
  }
}
