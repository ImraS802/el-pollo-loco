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

  animate() {
    this.handleMovement();
    this.handleBehavior();
  }

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

  moveEndbossLeft() {
    this.otherDirection = false;
    this.moveLeft();
    this.updateEndbossBar();
  }

  moveEndbossRight() {
    this.otherDirection = true;
    this.moveRight();
    this.updateEndbossBar();
  }

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

  performDeathBehavior() {
    this.playAnimation(this.IMAGES_DEAD);
    this.AUDIO_SCREAM.pause();
    setTimeout(() => this.applyGravity(), 2000);
    setTimeout(() => (this.dead = true), 2000);
  }

  shouldAttackWithoutBottle() {
    return (
      !this.bottleAvailable &&
      this.x <= 6000 &&
      !this.killedCharacter &&
      !this.characterEscaped
    );
  }

  performAttack() {
    this.playAnimation(this.IMAGES_ATTACK);
    this.AUDIO_SCREAM.play();
    this.x -= this.speed;
    this.updateEndbossBar();
  }

  performAlert() {
    this.playAnimation(this.IMAGES_ALERT);
    this.AUDIO_SCREAM.pause();
  }

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

  updateEndbossBar() {
    this.endbossBar.x = this.x + 100;
  }

  pressKeyD() {
    let timepassed = new Date().getTime() - this.lastTimePressKeyD;
    timepassed = timepassed / 1000;
    return timepassed < 6;
  }

  hitEndboss() {
    this.energyEndboss -= 3;
    if (this.energyEndboss < 0) {
      this.energyEndboss = 0;
    } else {
      this.lastCollisionEndboss = new Date().getTime();
    }
  }

  endbossIsHurt() {
    let timepassed = new Date().getTime() - this.lastCollisionEndboss;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  endbossIsDead() {
    return this.energyEndboss == 0;
  }
}
