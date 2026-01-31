class World {
  hero = new Character();
  stage = level1;
  ctx;
  canvas;
  input;
  camera_x = 0;

  // Interface Elements
  healthStatus = new StatusBar();
  inventoryBar = new BottleBar();
  wealthBar = new CoinBar();

  projectiles = [];
  isThrowing = false;
  bossEntity = this.stage.enemies[this.stage.enemies.length - 1];
  sessionOver;

  // Sound Assets
  AMBIENT_TRACK = new Audio(
    'audio/ambient-desert-atmosphere-with-dry-wind-sounds-1-377883.mp3',
  );
  SFX_CHICKEN = new Audio('audio/chicken.mp3');
  SFX_GAME_OVER = new Audio('audio/game-over.mp3');

  constructor(canvas, input, sessionOver) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.input = input;
    this.sessionOver = sessionOver;

    this.linkHeroToWorld(); // Link first
    this.setupAudioEngine(); // Audio second
    this.initLoop(); // Logic third
    this.render();
  }

  /**
   * Configures volume, loops, and muted states for all game audio.
   */
  setupAudioEngine() {
    this.SFX_GAME_OVER.pause();
    this.SFX_GAME_OVER.muted = false;
    this.AMBIENT_TRACK.volume = 0.1;
    this.AMBIENT_TRACK.loop = true;
    safePlayAudio(this.AMBIENT_TRACK);

    // Use a safer way to mute tracks only if they exist
    const audioTargets = [
      this.SFX_CHICKEN,
      this.hero.RUN_SOUND, // Changed from AUDIO_WALKING to match your Character rewrite
      this.hero.PAIN_SOUND, // Changed from AUDIO_HURTING
      this.hero.JUMP_SOUND, // Changed from AUDIO_JUMPING
    ];

    audioTargets.forEach((track) => {
      if (track) track.muted = false;
    });

    // Mute boss separately to prevent crashes if the boss isn't loaded yet
    if (this.bossEntity && this.bossEntity.AUDIO_SCREAM) {
      this.bossEntity.AUDIO_SCREAM.muted = false;
      this.bossEntity.AUDIO_HURT.muted = false;
    }
  }

  initLoop() {
    setInterval(() => {
      // Move ALL "Process" and "Handle" functions here
      this.handleHeroLogic();
      this.handleItemLogic();
      this.handleBossLogic();
      this.handleFinalLogic();
    }, 1000 / 25);
  }

  prepareScenario() {
    this.linkHeroToWorld();
  }

  linkHeroToWorld() {
    this.hero.world = this;
  }

  /**
   * Core rendering cycle using requestAnimationFrame.
   */
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.renderEnvironment();
    this.renderEntities();
    this.ctx.translate(-this.camera_x, 0);
    this.renderInterface();
    requestAnimationFrame(() => this.render());
  }

  renderEnvironment() {
    this.addBatchToCanvas(this.stage.backgroundObjects);
    this.addBatchToCanvas(this.stage.clouds);
  }

  renderEntities() {
    this.addBatchToCanvas(this.stage.enemies);
    if (!this.bossEntity.dead) {
      this.paintToCanvas(this.bossEntity.endbossBar);
    }
    this.addBatchToCanvas(this.projectiles);
    this.addBatchToCanvas(this.stage.bottles);
    this.addBatchToCanvas(this.stage.coins);
    this.paintToCanvas(this.hero);
  }

  renderInterface() {
    this.paintToCanvas(this.healthStatus);
    this.paintToCanvas(this.inventoryBar);
    this.paintToCanvas(this.wealthBar);
    if (this.sessionOver.gameFinished) {
      this.paintToCanvas(this.sessionOver);
    }
  }

  handleHeroLogic() {
    this.fireProjectile();
    this.trackHeroMovement();
    this.monitorChickenProximity();
  }

  /**
   * Removes bottles from memory once they are done splashing to prevent lag.
   */
  clearOldProjectiles() {
    this.projectiles = this.projectiles.filter((p) => !p.splashFinished);
  }

  /**
   * Updated loop to clean up bottles that have finished their splash animation.
   */
  handleItemLogic() {
    this.processBottlePickups();
    this.processCoinPickups();
    this.syncInventoryState();
    this.clearOldProjectiles();
  }

  handleBossLogic() {
    this.processCollisions();
    this.processBossCombat();
    this.processProjectileImpacts();
  }

  handleFinalLogic() {
    this.evaluateEndState();
  }

  /**
   * Loops through arrays to draw multiple objects.
   */
  addBatchToCanvas(list) {
    list.forEach((item) => this.paintToCanvas(item));
  }

  /**
   * Draws a single frame, handling horizontal mirroring.
   */
  paintToCanvas(obj) {
    if (obj.otherDirection) this.reflectEntity(obj);
    obj.render(this.ctx);
    obj.debugFrame(this.ctx);
    if (obj.otherDirection) this.restoreEntity(obj);
  }

  reflectEntity(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x *= -1;
  }

  restoreEntity(obj) {
    obj.x *= -1;
    this.ctx.restore();
  }

  processCollisions() {
    this.stage.enemies.forEach((foe) => {
      if (!foe.chickenAlive) return;

      if (this.hero.isColliding(foe)) {
        if (this.hero.isAboveGround() && this.hero.speedY < 0) {
          this.eliminateChicken(foe);
          this.hero.speedY = 15;
        } else {
          this.hero.hit();
          this.healthStatus.setPercentage(this.hero.energy);
          this.evaluateEndState();
        }
      }
    });
  }

  processBottlePickups() {
    this.stage.bottles.forEach((bottle, i) => {
      if (this.hero.isColliding(bottle)) {
        this.hero.collectBottle();
        // Fixed: Matching the updated BottleBar method refreshProgress
        this.inventoryBar.refreshProgress(this.hero.bottleAmount);
        this.stage.bottles.splice(i, 1);
      }
    });
  }

  fireProjectile() {
    const hasAmmo = this.inventoryBar.currentStock > 0;
    if (this.input.KEY_D && hasAmmo && !this.isThrowing) {
      this.isThrowing = true; // Lock the "trigger"
      let flask = new ThrowableObject(this.hero.x + 80, this.hero.y + 100);
      this.projectiles.push(flask);

      this.hero.decreaseBottleStatus();
      this.inventoryBar.refreshProgress(this.hero.bottleAmount);
      setTimeout(() => {
        this.isThrowing = false;
      }, 500);
    }
  }

  processCoinPickups() {
    this.stage.coins.forEach((coin, i) => {
      if (this.hero.isColliding(coin)) {
        this.hero.collectCoin();
        this.wealthBar.updateLevel(this.hero.coinAmount);
        this.stage.coins.splice(i, 1);
      }
    });
  }

  processBossCombat() {
    if (this.isTouchingBoss()) {
      this.hero.energy = 0;
      this.hero.dead = true;
      this.healthStatus.setPercentage(0);
      this.evaluateEndState();
    }
  }

  isTouchingBoss() {
    return (
      this.hero.x + this.hero.width > this.bossEntity.x &&
      this.hero.y + this.hero.height <
        this.bossEntity.y + this.bossEntity.height &&
      this.hero.y + this.hero.height > this.bossEntity.y &&
      this.hero.x + this.hero.width < this.bossEntity.x + this.bossEntity.width
    );
  }

  processProjectileImpacts() {
    this.projectiles.forEach((flask) => {
      if (this.isFlaskHittingBoss(flask)) {
        this.bossEntity.hitEndboss();
        this.bossEntity.endbossBar.setPercentage(this.bossEntity.energyEndboss);
      }
    });
  }

  isFlaskHittingBoss(flask) {
    return (
      flask.x + flask.width > this.bossEntity.x &&
      flask.y + flask.height <
        this.bossEntity.y + this.bossEntity.height - 80 &&
      flask.y + flask.height > this.bossEntity.y &&
      flask.x + flask.width < this.bossEntity.x + this.bossEntity.width
    );
  }

  trackHeroMovement() {
    if (this.hero.x > this.stage.level_end_x - 100) {
      this.bossEntity.characterCloseToEndboss = true;
    }
  }

  syncInventoryState() {
    this.bossEntity.bottleAvailable = this.inventoryBar.currentStock > 0;
  }

  eliminateChicken(foe) {
    foe.chickenAlive = false;
    setTimeout(() => {
      let idx = this.stage.enemies.indexOf(foe);
      if (idx > -1) this.stage.enemies.splice(idx, 1);
    }, 2000);
  }

  monitorChickenProximity() {
    this.stage.enemies.slice(0, -1).forEach((chicken) => {
      const isNear =
        this.hero.x > chicken.x - 200 &&
        this.hero.x + this.hero.width < chicken.x + chicken.width;

      if (isNear && !this.sessionOver.gameFinished) {
        safePlayAudio(this.SFX_CHICKEN);
        this.SFX_CHICKEN.volume = 0.1;
      }
    });
  }

  evaluateEndState() {
    if (this.sessionOver.gameFinished) return;

    if (this.hero.energy <= 0 || this.bossEntity.dead) {
      this.sessionOver.gameFinished = true;
      this.sessionOver.lostGame =
        this.hero.energy <= 0 && !this.bossEntity.dead;
      this.sessionOver.showEndscreen();

      this.AMBIENT_TRACK.pause();
      safePlayAudio(this.SFX_GAME_OVER);
    }
  }
}
