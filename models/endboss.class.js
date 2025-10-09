class Endboss extends MovableObject {
  y = 145;
  height = 300;
  width = 250;
  dead = false;
  lastTimepressKeyD = 0;
  currentImage = 0;
  energyEndboss = 100;
  characterEscaped = false;
  bottleAvailable = false;
  characterCloseToEndboss = false;
  killedCharacter = false;
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
    this.handleMovement();
    this.handleBehavior();
  }

  /**
   * Handles horizontal movement of the Endboss based on character proximity and state.
   */
  handleMovement() {
    setInterval(() => {
      if (
        this.characterCloseToEndboss &&
        !this.characterEscaped &&
        !this.dead
      ) {
        this.moveEndbossLeft();
      } else if (this.characterEscaped && !this.dead) {
        this.moveEndbossRight();
      }
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
   * Handles Endboss behaviors such as hurt, death, attack, or idle based on game state.
   */
  handleBehavior() {
    setInterval(() => {
      if (this.endbossIsHurt()) {
        this.performHurtBehavior();
      } else if (this.endbossIsDead()) {
        this.performDeathBehavior();
      } else if (this.shouldAttackWithoutBottle()) {
        this.performAttack();
      } else if (this.killedCharacter) {
        this.performAlert();
      } else {
        this.performIdleOrAttack();
      }
    }, 200);
  }

  /**
   * Plays hurt animation and sound, then continues attack if not dead.
   */
  performHurtBehavior() {
    this.playAnimation(this.IMAGES_HURT);
    this.AUDIO_HURT.play();
    if (!this.endbossIsDead()) {
      setTimeout(() => {
        this.playAnimation(this.IMAGES_ATTACK);
        this.AUDIO_SCREAM.play();
        this.x -= this.speed;
        this.updateEndbossBar();
      }, 2000);
    }
  }

  /**
   * Plays death animation, stops screaming audio, applies gravity, and sets dead flag.
   */
  performDeathBehavior() {
    this.playAnimation(this.IMAGES_DEAD);
    this.AUDIO_SCREAM.pause();
    setTimeout(() => this.applyGravity(), 2000);
    setTimeout(() => (this.dead = true), 2000);
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
    this.playAnimation(this.IMAGES_ATTACK);
    this.AUDIO_SCREAM.play();
    this.x -= this.speed;
    this.updateEndbossBar();
  }

  /**
   * Performs alert animation and pauses scream audio.
   */
  performAlert() {
    this.playAnimation(this.IMAGES_ALERT);
    this.AUDIO_SCREAM.pause();
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
      this.AUDIO_SCREAM.play();
    } else if (!this.pressKeyD() && this.x <= 6000 && this.bottleAvailable) {
      this.performAttack();
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
