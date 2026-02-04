class Character extends MovableObject {
  LOOK_WALK = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  LOOK_JUMP = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  LOOK_DIE = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  LOOK_PAIN = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  LOOK_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  LOOK_SLEEP = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  height = 240;
  width = 170;
  x = 120;
  y = 190;

  world;
  speed = 5;
  isDead = false;

  RUN_SOUND = new Audio('audio/running.mp3');
  PAIN_SOUND = new Audio('audio/hurt.mp3');
  JUMP_SOUND = new Audio('audio/jump.mp3');

  /**
   * Initializes the hero with physical boundaries and preloaded visuals.
   */
  constructor() {
    super();
    this.setupVisuals();
    this.collisionPadding();
    this.applyGravity();
    this.lastActionTime = Date.now();
    this.initControllers();
  }

  setupVisuals() {
    this.loadImage(this.LOOK_WALK[0]);
    this.loadImages(this.LOOK_IDLE);
    this.loadImages(this.LOOK_WALK);
    this.loadImages(this.LOOK_SLEEP);
    this.loadImages(this.LOOK_JUMP);
    this.loadImages(this.LOOK_PAIN);
    this.loadImages(this.LOOK_DIE);
  }

  collisionPadding() {
    this.offset = {top: 100, right: 60, bottom: 10, left: 40};
  }

  initControllers() {
    this.processPhysics();
    this.processVisualState();
  }

  /**
   * High-frequency loop for movement and camera updates (60 FPS).
   */
  processPhysics() {
    setInterval(() => {
      this.RUN_SOUND.pause();

      if (this.canMoveRight()) this.executeMoveRight();
      if (this.canMoveLeft()) this.executeMoveLeft();
      if (this.canJump()) this.executeJump();

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Lower-frequency loop for switching sprite frames.
   */
  processVisualState() {
    setInterval(() => {
      const secondsIdle = (Date.now() - this.lastActionTime) / 1000;

      if (this.isHurt()) return this.triggerPainSeq();
      if (this.energy <= 0) return this.triggerDeathSeq();
      if (this.isAboveGround()) return this.playAnimation(this.LOOK_JUMP);

      this.resolveGroundAnimation(secondsIdle);
    }, 100);
  }

  canMoveRight() {
    return this.world.input.KEY_RIGHT && this.x < this.world.stage.level_end_x;
  }

  canMoveLeft() {
    return this.world.input.KEY_LEFT && this.x > 0;
  }

  canJump() {
    return this.world.input.KEY_UP && !this.isAboveGround();
  }

  executeMoveRight() {
    this.moveRight();
    this.otherDirection = false;
    this.resetIdleTimer();
    if (!this.isAboveGround()) safePlayAudio(this.RUN_SOUND);
  }

  executeMoveLeft() {
    this.moveLeft();
    this.otherDirection = true;
    this.resetIdleTimer();
    if (!this.isAboveGround()) safePlayAudio(this.RUN_SOUND);
  }

  executeJump() {
    this.jump();
    this.resetIdleTimer();
    safePlayAudio(this.JUMP_SOUND);
  }

  triggerPainSeq() {
    this.playAnimation(this.LOOK_PAIN);
    this.PAIN_SOUND.volume = 0.1;
    safePlayAudio(this.PAIN_SOUND);
  }

  triggerDeathSeq() {
    this.playAnimation(this.LOOK_DIE);
    setTimeout(() => this.applyGravity(), 2000);
    this.isDead = true;
  }

  resolveGroundAnimation(idleTime) {
    if (this.world.input.KEY_RIGHT || this.world.input.KEY_LEFT) {
      this.playAnimation(this.LOOK_WALK);
    } else if (idleTime > 5) {
      this.cyclicAnimation(this.LOOK_SLEEP);
    } else {
      this.cyclicAnimation(this.LOOK_IDLE);
    }
  }

  /**
   * Refined looping logic for stationary animations.
   */
  cyclicAnimation(frames) {
    let index = this.currentImage % frames.length;
    this.img = this.imageCache[frames[index]];
    this.currentImage++;
  }

  resetIdleTimer() {
    this.lastActionTime = Date.now();
  }

  forceGameOver() {
    this.energy = 0;
    this.isDead = true;
    this.triggerDeathSeq();
    if (typeof stopGame === 'function') stopGame();
  }
}
