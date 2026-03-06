class World {
  hero = new Character();
  stage = level1;
  ctx;
  canvas;
  input;
  camera_x = 0;

  healthStatus = new StatusBar();
  inventoryBar = new BottleBar();
  wealthBar = new CoinBar();

  projectiles = [];
  isThrowing = false;
  bossEntity = this.stage.enemies[this.stage.enemies.length - 1];
  sessionOver;

  AMBIENT_TRACK = new Audio(
    'audio/ambient-desert-atmosphere-with-dry-wind-sounds-1-377883.mp3',
  );
  SFX_CHICKEN = new Audio('audio/chicken.mp3');
  SFX_GAME_OVER = new Audio('audio/game-over.mp3');

  constructor(canvas, input, sessionOver) {
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.canvas = canvas;
    this.input = input;
    this.sessionOver = sessionOver;

    this.linkHeroToWorld();
    this.setupAudioEngine();
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

    const audioTargets = [
      this.SFX_CHICKEN,
      this.hero.RUN_SOUND,
      this.hero.PAIN_SOUND,
      this.hero.JUMP_SOUND,
    ];

    audioTargets.forEach((track) => {
      if (track) track.muted = false;
    });

    if (this.bossEntity) {
      if (this.bossEntity.SFX_ROAR) this.bossEntity.SFX_ROAR.muted = false;
      if (this.bossEntity.SFX_PAIN) this.bossEntity.SFX_PAIN.muted = false;
      if (this.bossEntity.AUDIO_SCREAM)
        this.bossEntity.AUDIO_SCREAM.muted = false;
      if (this.bossEntity.AUDIO_HURT) this.bossEntity.AUDIO_HURT.muted = false;
    }
  }

  prepareScenario() {
    this.linkHeroToWorld();
  }

  linkHeroToWorld() {
    this.hero.world = this;
    this.regularEnemies = this.stage.enemies.filter(
      (e) => !(e instanceof Endboss),
    );
  }

  /**
   * Core rendering cycle using requestAnimationFrame.
   */
  render() {
    this.runLogic();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.renderEnvironment();
    this.renderEntities();

    this.ctx.translate(-this.camera_x, 0);
    this.renderInterface();
    requestAnimationFrame(() => this.render());
  }

  runLogic() {
    if (!this.sessionOver.gameFinished) {
      this.handleHeroLogic();
      this.handleItemLogic();
      this.handleBossLogic();
      this.handleFinalLogic();
    }
  }

  renderEnvironment() {
    const viewLeft = -this.camera_x - 100;
    const viewRight = -this.camera_x + this.canvas.width + 100;

    this.optimizedBatchRender(
      this.stage.backgroundObjects,
      viewLeft,
      viewRight,
    );
    this.optimizedBatchRender(this.stage.clouds, viewLeft, viewRight);
  }

  optimizedBatchRender(list, left, right) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item.x + item.width > left && item.x < right) {
        this.paintToCanvas(item);
      }
    }
  }

  renderEntities() {
    const vLeft = -this.camera_x - 100;
    const vRight = -this.camera_x + this.canvas.width + 100;

    this.addBatchToCanvas(this.stage.enemies, vLeft, vRight);
    this.addBatchToCanvas(this.projectiles, vLeft, vRight);
    this.addBatchToCanvas(this.stage.bottles, vLeft, vRight);
    this.addBatchToCanvas(this.stage.coins, vLeft, vRight);

    if (!this.bossEntity.isDefeated) {
      this.paintToCanvas(this.bossEntity.endbossBar);
    }
    this.paintToCanvas(this.hero);
  }

  renderInterface() {
    this.paintToCanvas(this.healthStatus);
    this.paintToCanvas(this.inventoryBar);
    this.paintToCanvas(this.wealthBar);
    if (!this.sessionOver.isSessionActive) {
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
  addBatchToCanvas(list, viewLeft, viewRight) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item.x + item.width > viewLeft && item.x < viewRight) {
        this.paintToCanvas(item);
      }
    }
  }

  /**
   * Draws a single frame, handling horizontal mirroring.
   */
  paintToCanvas(obj) {
    if (obj.otherDirection) this.reflectEntity(obj);
    obj.render(this.ctx);
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

  processBottlePickups() {
    const bottles = this.stage.bottles;
    for (let i = bottles.length - 1; i >= 0; i--) {
      const bottle = bottles[i];
      if (this.hero.isColliding(bottle)) {
        this.hero.collectBottle();
        this.inventoryBar.refreshProgress(this.hero.bottleAmount);
        bottles.splice(i, 1);
      }
    }
  }

  fireProjectile() {
    const hasAmmo = this.inventoryBar.currentStock > 0;
    if (this.input.KEY_D && hasAmmo && !this.isThrowing) {
      this.isThrowing = true;
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
    const coins = this.stage.coins;
    for (let i = coins.length - 1; i >= 0; i--) {
      const coin = coins[i];
      if (this.hero.isColliding(coin)) {
        this.hero.collectCoin();
        this.wealthBar.updateLevel(this.hero.coinAmount);
        coins.splice(i, 1);
      }
    }
  }

  processBossCombat() {
    if (this.isTouchingBoss()) {
      this.hero.energy = 0;
      this.hero.dead = true;
      this.healthStatus.updateStatus(0);
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
        this.bossEntity.receiveDamage();
        this.bossEntity.endbossBar.updateHealth(this.bossEntity.health);
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
      this.bossEntity.targetSpotted = true;
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
    const now = Date.now();
    const enemies = this.regularEnemies;

    for (let i = 0; i < enemies.length; i++) {
      const chicken = enemies[i];
      if (!chicken.chickenAlive) continue;

      const isNear =
        this.hero.x > chicken.x - 200 &&
        this.hero.x + this.hero.width < chicken.x + chicken.width;

      if (isNear && !this.sessionOver.gameFinished) {
        if (!chicken.lastSoundTime || now - chicken.lastSoundTime > 2000) {
          safePlayAudio(this.SFX_CHICKEN);
          chicken.lastSoundTime = now;
        }
      }
    }
  }

  processCollisions() {
    const vLeft = -this.camera_x - 100;
    const vRight = -this.camera_x + this.canvas.width + 100;
    const enemies = this.stage.enemies;

    for (let i = 0; i < enemies.length; i++) {
      const foe = enemies[i];
      if (foe.x < vLeft || foe.x > vRight || !foe.chickenAlive) continue;

      if (this.hero.isColliding(foe)) {
        if (this.hero.isAboveGround() && this.hero.speedY < 0) {
          this.eliminateChicken(foe);
          this.hero.speedY = 15;
        } else if (!this.hero.isHurt()) {
          this.hero.hit();
          this.healthStatus.updateStatus(this.hero.energy);
          this.evaluateEndState();
        }
      }
    }
  }

  evaluateEndState() {
    if (this.sessionOver.screenLock) return;
    if (this.hero.energy <= 0 || this.bossEntity.isDefeated) {
      this.sessionOver.hasPlayerLost = this.hero.energy <= 0;
      this.sessionOver.resolveGameSession();
      this.AMBIENT_TRACK.pause();
      safePlayAudio(this.SFX_GAME_OVER);
    }
  }
}
