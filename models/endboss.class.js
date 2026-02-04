class Endboss extends MovableObject {
  y = 145;
  height = 300;
  width = 250;

  isDefeated = false;
  health = 100;
  isAggressive = false;
  isRecovering = false;

  targetSpotted = false;
  targetEscaping = false;
  ammoInStock = false;

  offset = {top: 85, right: 55, bottom: 15, left: 35};

  SPRITES_IDLE = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  SPRITES_WALK = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  SPRITES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  SPRITES_PAIN = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  SPRITES_DEATH = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  SFX_PAIN = new Audio('audio/endboss-hurt.mp3');
  SFX_ROAR = new Audio('audio/scream.mp3');

  constructor() {
    super();
    this.initializeAssets();
    this.x = 6200;
    this.speed = 1.4;
    this.endbossBar = new EndbossStatusBar(this.x + 100, this.y - 10);
    this.beginBehaviorCycles();
  }

  /** * Loads all visual resources */
  initializeAssets() {
    this.loadImage(this.SPRITES_IDLE[0]);
    this.loadImages(this.SPRITES_IDLE);
    this.loadImages(this.SPRITES_WALK);
    this.loadImages(this.SPRITES_ATTACK);
    this.loadImages(this.SPRITES_PAIN);
    this.loadImages(this.SPRITES_DEATH);
  }

  /** * Orchestrates logic and visual loops */
  beginBehaviorCycles() {
    setInterval(() => this.processAI(), 1000 / 60);
    setInterval(() => this.updateGraphics(), 100);
  }

  /** * Core AI Decision Making */
  processAI() {
    if (this.isDefeated) return;

    if (this.targetSpotted && !this.targetEscaping) {
      this.otherDirection = false;
      this.moveLeft();
    } else if (this.targetEscaping) {
      this.otherDirection = true;
      this.moveRight();
    }
    this.endbossBar.x = this.x + 100;
  }

  /** * Animation State Machine */
  updateGraphics() {
    if (this.health <= 0) {
      this.triggerDeathSequence();
    } else if (this.isRecovering) {
      this.playAnimation(this.SPRITES_PAIN);
    } else if (this.isAggressive) {
      this.playAnimation(this.SPRITES_ATTACK);
    } else if (this.targetSpotted || this.targetEscaping) {
      this.playAnimation(this.SPRITES_WALK);
    } else {
      this.playAnimation(this.SPRITES_IDLE);
    }
  }

  /** * Handles logic when the boss is damaged */
  receiveDamage() {
    this.health -= 5;
    this.isRecovering = true;
    safePlayAudio(this.SFX_PAIN);

    setTimeout(() => {
      this.isRecovering = false;
      this.isAggressive = true;
    }, 1500);

    if (this.health <= 0) this.health = 0;
  }

  /** * Final animation sequence */
  triggerDeathSequence() {
    if (this.isDefeated) return;
    this.isDefeated = true;
    this.playAnimation(this.SPRITES_DEATH);
    this.SFX_ROAR.pause();
    setTimeout(() => this.applyGravity(), 1000);
  }
}
