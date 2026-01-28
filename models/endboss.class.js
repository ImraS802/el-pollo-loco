class Endboss extends MovableObject {
  y = 145;
  height = 300;
  width = 250;
  dead = false;
  currentImage = 0;
  energyEndboss = 100;
  characterEscaped = false;
  characterCloseToEndboss = false;
  killedCharacter = false;
  bottleAvailable = false;
  attacking = false;
  hurt = false;
  isMoving = false;
  lastTimePressKeyD = 0;
  lastCollisionEndboss = 0;

  offset = {
    top: 80,
    right: 50,
    bottom: 10,
    left: 30,
  };

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  AUDIO_HURT = new Audio('audio/endboss-hurt.mp3');
  AUDIO_SCREAM = new Audio('audio/scream.mp3');

  /**
   * Initializes the Endboss, loads images and audio, sets initial position and speed,
   * and starts animations.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 6200;
    this.speed = 1.3;
    this.endbossBar = new EndbossStatusBar(this.x + 100, this.y - 10);
    this.AUDIO_SCREAM.volume = 0.1;
    this.animate();
  }

  /**
   * Starts the Endboss behavior: movement and other behaviors.
   */
  animate() {
    let frameCounter = 0;
    setInterval(() => {
      if (this.dead) return;
      if (this.characterCloseToEndboss && !this.characterEscaped) {
        this.otherDirection = false;
        this.moveLeft();
      } else if (this.characterEscaped) {
        this.otherDirection = true;
        this.moveRight();
      }
      frameCounter++;
      if (frameCounter % 12 === 0) {
        if (this.endbossIsDead()) {
          this.performDeathBehavior();
        } else if (this.endbossIsHurt()) {
          this.performHurtBehavior();
        } else if (this.shouldAttack()) {
          this.performAttack();
        } else if (this.killedCharacter) {
          this.performAlert();
        } else {
          this.performIdleOrWalk();
        }
      }
      this.updateEndbossBar();
    }, 1000 / 60);
  }

  /**
   * Moves the Endboss to the left and updates its status bar.
   */
  moveEndbossLeft() {
    this.otherDirection = false;
    this.moveLeft();
    this.updateEndbossBar();
  }

  /**
   * Moves the Endboss to the right and updates its status bar.
   */
  moveEndbossRight() {
    this.otherDirection = true;
    this.moveRight();
    this.updateEndbossBar();
  }

  /**
   * Plays hurt animation and sound, then continues attack if not dead.
   */
  performHurtBehavior() {
    this.hurt = true;
    this.playAnimation(this.IMAGES_HURT);
    safePlayAudio(this.AUDIO_HURT);
    setTimeout(() => {
      this.hurt = false;
      this.attacking = true;
    }, 2000);
  }

  /**
   * Plays death animation, stops screaming audio, applies gravity, and sets dead flag.
   */
  performDeathBehavior() {
    this.playAnimation(this.IMAGES_DEAD);
    this.dead = true;
    this.AUDIO_SCREAM.pause();
    setTimeout(() => this.applyGravity(), 2000);
  }

  shouldAttack() {
    return (
      !this.bottleAvailable &&
      this.x <= 6000 &&
      !this.killedCharacter &&
      !this.characterEscaped
    );
  }

  /**
   * Determines whether the Endboss should attack without a bottle available.
   * @returns {boolean} True if conditions for attacking without bottle are met.
   */
  shouldAttackWithoutBottle() {
    return (
      !this.bottleAvailable &&
      this.x <= 6000 &&
      !this.killedCharacter &&
      !this.characterEscaped
    );
  }

  /**
   * Performs attack animation and updates position and status bar.
   */
  performAttack() {
    this.attacking = true;
    this.playAnimation(this.IMAGES_ATTACK);
    safePlayAudio(this.AUDIO_SCREAM);
  }

  /**
   * Performs alert animation and pauses scream audio.
   */
  performAlert() {
    this.playAnimation(this.IMAGES_ALERT);
    this.AUDIO_SCREAM.pause();
  }

  performIdleOrWalk() {
    if (
      (this.characterCloseToEndboss && this.x > 5500) ||
      this.characterEscaped
    ) {
      this.playAnimation(this.IMAGES_WALKING);
      safePlayAudio(this.AUDIO_SCREAM);
    } else if (this.x <= 6000 && this.bottleAvailable) {
      this.playAnimation(this.IMAGES_ALERT);
    }
  }

  /**
   * Performs idle or walking animation based on character position and bottle availability.
   */
  performIdleOrAttack() {
    if (
      (this.characterCloseToEndboss && this.x > 5500) ||
      this.characterEscaped
    ) {
      this.playAnimation(this.IMAGES_WALKING);
      safePlayAudio(this.AUDIO_SCREAM);
    } else if (!this.pressKeyD() && this.x <= 6000 && this.bottleAvailable) {
      this.playAnimation(this.IMAGES_ATTACK);
      safePlayAudio(this.AUDIO_SCREAM);
    } else if (this.x <= 6000) {
      this.playAnimation(this.IMAGES_ALERT);
    }
  }

  /**
   * Updates the Endboss status bar position to follow the Endboss.
   */
  updateEndbossBar() {
    this.endbossBar.x = this.x + 100;
  }

  /**
   * Checks whether the player has pressed the "D" key recently.
   * @returns {boolean} True if "D" key was pressed within last 5 seconds.
   */
  pressKeyD() {
    let timepassed = new Date().getTime() - this.lastTimePressKeyD;
    timepassed = timepassed / 1000;
    return timepassed < 5;
  }

  /**
   * Reduces the Endboss's energy by 3 points when hit.
   */
  hitEndboss() {
    this.energyEndboss -= 3;
    if (this.energyEndboss < 0) {
      this.energyEndboss = 0;
    } else {
      this.lastCollisionEndboss = new Date().getTime();
    }
  }

  /**
   * Checks if the Endboss was recently hurt.
   * @returns {boolean} True if hurt within last 0.5 seconds.
   */
  endbossIsHurt() {
    let timepassed = new Date().getTime() - this.lastCollisionEndboss;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
   * Checks if the Endboss is dead.
   * @returns {boolean} True if energy is 0.
   */
  endbossIsDead() {
    return this.energyEndboss == 0;
  }
}
