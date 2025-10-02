class Endboss extends MovableObject {
  y = 145;
  height = 300;
  width = 250;
  dead = false;
  lastTimePressedD = 0;
  currentImage = 0;
  energyEndboss = 100;
  characterEscaped = false;
  bottleAvailable = false;
  characterNearEndboss = false;
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

  AUDIO_SCREAM = new Audio('audio/scream.mp3');
  AUDIO_HURT = new Audio('audio/endboss_hurt.mp3');

  constructor() {
    super();
    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 6500;
    this.speed = 2;
    this.animate();
    this.endbossBar = new EndbossStatusBar(this.x + 100, this.y - 10);
    // this.speed = 0.2 + Math.random() * 0.3; // random speed
  }

  animate() {
    setInterval(() => {
      if (this.characterNearEndboss && this.x > 6000) {
        this.otherDirection = false;
        this.moveLeft();
        this.endbossBar.x = this.x + 100;
      }
      if (this.characterEscaped) {
        this.speed = 5;
        this.otherDirection = true;
        this.moveRight();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.endbossIsHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.AUDIO_HURT.play();
        if (!this.endbossIsDead()) {
          setTimeout(() => {
            this.playAnimation(this.IMAGES_ATTACK);
            this.AUDIO_SCREAM.play();
            this.x -= 20;
            this.endbossBar.x = this.x + 100;
          }, 2000);
        }
      } else if (this.endbossIsDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.AUDIO_SCREAM.pause();
        setTimeout(() => {
          this.applyGravity();
        }, 2000);
        setTimeout(() => {
          this.dead = true;
        }, 2000);
      } else if (
        !this.bottleAvailable &&
        this.x <= 6000 &&
        !this.killedCharacter &&
        !this.characterEscaped
      ) {
        this.playAnimation(this.IMAGES_ATTACK);
        this.AUDIO_SCREAM.play();
        this.x -= 25;
        this.endbossBar.x = this.x + 100;
      } else if (this.killedCharacter) {
        this.playAnimation(this.IMAGES_ALERT);
        this.AUDIO_SCREAM.pause();
      } else {
        if (
          (this.characterNearEndboss && this.x > 6000) ||
          this.characterEscaped
        ) {
          this.playAnimation(this.IMAGES_WALKING);
          this.AUDIO_SCREAM.play();
        } else if (!this.pressedD() && this.x <= 6000 && this.bottleAvailable) {
          this.playAnimation(this.IMAGES_ATTACK);
          this.AUDIO_SCREAM.play();
          this.x -= 20;
          this.endbossBar.x = this.x + 100;
        } else if (this.x <= 6000) {
          this.playAnimation(this.IMAGES_ALERT);
        }
      }
    }, 200);
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

  pressedD() {
    let timepassed = new Date().getTime() - this.lastTimePressedD;
    timepassed = timepassed / 1000;
    return timepassed < 6;
  }
}
