class Chicken extends MovableObject {
  y = 310;
  height = 120;
  width = 120;
  chickenAlive = true;

  offset = {top: 12, right: 18, bottom: 12, left: 18};

  WALK_TEXTURES = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  DEFEAT_TEXTURES = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  constructor() {
    super();
    this.prepareAssets();
    this.initSpawnSettings();
    this.activateBehavior();
  }

  /** * Loads necessary image files into cache */
  prepareAssets() {
    this.loadImage(this.WALK_TEXTURES[0]);
    this.loadImages(this.WALK_TEXTURES);
    this.loadImages(this.DEFEAT_TEXTURES);
  }

  /** * Defines randomized spawn point and drifting speed */
  initSpawnSettings() {
    this.x = 400 + Math.random() * 5900;
    this.speed = 0.2 + Math.random() * 0.45;
  }

  /** * Starts the asynchronous logic for movement and visuals */
  activateBehavior() {
    this.runPhysicsCycle();
    this.runAnimationCycle();
  }

  /** * Handles the horizontal translation at ~60fps */
  runPhysicsCycle() {
    setInterval(() => {
      if (this.chickenAlive) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  /** * Manages sprite switching based on life state */
  runAnimationCycle() {
    setInterval(() => {
      if (this.chickenAlive) {
        this.playAnimation(this.WALK_TEXTURES);
      } else {
        const deadSprite = this.DEFEAT_TEXTURES[0];
        this.img = this.imageCache[deadSprite];
      }
    }, 110);
  }
}
