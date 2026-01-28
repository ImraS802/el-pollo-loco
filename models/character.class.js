class Character extends MovableObject {
  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
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

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  IMAGES_STANDING = [
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

  IMAGES_SLEEPING = [
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

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  world;
  height = 240;
  width = 170;
  x = 120;
  y = 100;
  speed = 5;
  dead = false;
  AUDIO_WALKING = new Audio('audio/running.mp3');
  AUDIO_HURTING = new Audio('audio/hurt.mp3');
  AUDIO_JUMPING = new Audio('audio/jump.mp3');

  /**
   * Creates an instance of the character.
   *
   * Loads all required character images (standing, walking, jumping, hurt, dead, sleeping),
   * applies gravity, initializes animation state, and starts the animation loops.
   */
  constructor() {
    super();
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.offset = {
      top: 100,
      right: 60,
      bottom: 10,
      left: 40,
    };
    this.applyGravity();
    this.currentImage = 0;
    this.img = this.imageCache[this.IMAGES_STANDING[0]];
    this.idleStartTime = new Date().getTime();
    this.animate();
  }

  /**
   * Starts the main animation and movement handling loops.
   *
   * This method initializes two independent timed loops:
   * one for handling character movement and one for updating animations.
   */
  animate() {
    this.handleMovement();
    this.handleAnimations();
  }

  /**
   * Handles player movement based on keyboard input.
   *
   * Moves the character left, right, or makes it jump.
   * Also updates camera position to follow the character.
   *
   * @fires Character#moveCharacterRight
   * @fires Character#moveCharacterLeft
   * @fires Character#jumpCharacter
   */
  handleMovement() {
    setInterval(() => {
      this.AUDIO_WALKING.pause();
      if (
        this.world.keyboard.KEY_RIGHT &&
        this.x < this.world.level.level_end_x
      )
        this.moveCharacterRight();
      if (this.world.keyboard.KEY_LEFT && this.x > 0) this.moveCharacterLeft();
      if (this.world.keyboard.KEY_UP && !this.isAboveGround())
        this.jumpCharacter();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Handles animation updates depending on character state.
   *
   * Switches between standing, walking, jumping, hurt, or dead animations
   * depending on user input and internal status flags.
   */
  handleAnimations() {
    setInterval(() => {
      const idleTime = (new Date().getTime() - this.idleStartTime) / 1000;
      if (this.isHurt()) return this.playHurtAnimation();
      if (this.isDead()) return this.playDeadAnimation();
      if (this.isAboveGround()) return this.playAnimation(this.IMAGES_JUMPING);
      this.playIdleOrWalkAnimation(idleTime);
    }, 100);
  }

  /**
   * Moves the character to the right and plays walking sound if on the ground.
   */
  moveCharacterRight() {
    this.moveRight();
    this.otherDirection = false;
    this.idleStartTime = new Date().getTime();
    if (!this.isAboveGround()) safePlayAudio(this.AUDIO_WALKING);
  }

  /**
   * Moves the character to the left and plays walking sound if on the ground.
   */
  moveCharacterLeft() {
    this.moveLeft();
    this.otherDirection = true;
    this.idleStartTime = new Date().getTime();
    if (!this.isAboveGround()) safePlayAudio(this.AUDIO_WALKING);
  }

  /**
   * Makes the character jump and plays the jump sound.
   */
  jumpCharacter() {
    this.jump();
    this.idleStartTime = new Date().getTime();
    safePlayAudio(this.AUDIO_JUMPING);
  }

  /**
   * Plays the hurt animation and sound.
   * Reduces volume to prevent sound distortion.
   */
  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    safePlayAudio(this.AUDIO_HURTING);
    this.AUDIO_HURTING.volume = 0.1;
  }

  /**
   * Plays the death animation and sets the character state to dead.
   * Applies gravity after a delay to make the fall look natural.
   */
  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => this.applyGravity(), 2000);
    this.dead = true;
  }

  /**
   * Chooses between idle, walking, or sleeping animation
   * based on the character's idle time and movement input.
   *
   * @param {number} idleTime - The number of seconds since the last movement.
   */
  playIdleOrWalkAnimation(idleTime) {
    if (this.world.keyboard.KEY_RIGHT || this.world.keyboard.KEY_LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else if (idleTime > 5) {
      this.playLoopingAnimation(this.IMAGES_SLEEPING);
    } else {
      this.playLoopingAnimation(this.IMAGES_STANDING);
    }
  }

  /**
   * Plays a looping animation from the given image array.
   *
   * Cycles through all frames in the provided image list and updates
   * the displayed image accordingly.
   *
   * @param {string[]} images - The array of image paths to loop through.
   */
  playLoopingAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  die() {
    this.energy = 0;
    this.dead = true;
    this.playDeathAnimation();
    stopGame();
  }
}
