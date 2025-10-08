class World {
  character = new Character();
  level = level1;
  ctx; // canvas
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  bottleBar = new BottleBar();
  coinBar = new CoinBar();
  throwableObjects = [];
  endBoss = this.level.enemies[this.level.enemies.length - 1];
  gameOver;

  AUDIO_BACKGROUND = new Audio(
    'audio/ambient-desert-atmosphere-with-dry-wind-sounds-1-377883.mp3'
  );
  AUDIO_CHICKEN = new Audio('audio/chicken.mp3');
  AUDIO_GAMEOVER = new Audio('audio/game-over.mp3');

  /**
   * Creates a new game world instance.
   * Initializes the canvas, keyboard input, audio, and game objects.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
   * @param {Object} keyboard - The keyboard input handler.
   * @param {GameOver} gameOver - The game over screen object.
   */
  constructor(canvas, keyboard, gameOver) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.gameOver = gameOver;
    this.draw();
    this.setWorld();
    this.checkCollision();
    this.checkCollisonBottle();
    this.run();
    this.AUDIO_GAMEOVER.pause();
    this.AUDIO_GAMEOVER.muted = false;
    this.AUDIO_BACKGROUND.play();
    this.AUDIO_BACKGROUND.volume = 0.1;
    this.AUDIO_BACKGROUND.muted = false;
    this.AUDIO_CHICKEN.muted = false;
    this.character.AUDIO_WALKING.muted = false;
    this.character.AUDIO_HURTING.muted = false;
    this.character.AUDIO_JUMPING.muted = false;
    this.endBoss.AUDIO_SCREAM.muted = false;
    this.endBoss.AUDIO_HURT.muted = false;
    this.character.AUDIO_BOTTLE.muted = false;
    this.character.AUDIO_COIN.muted = false;
  }

  /** Sets the world reference for the main character. */
  setWorld() {
    this.character.world = this;
  }

  /** Draws all objects in the game world and handles camera translation. */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    if (!this.endBoss.dead) {
      this.addToMap(this.endBoss.endbossBar);
    }
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    if (this.gameOver.gameFinished) {
      this.addToMap(this.gameOver);
    }
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /** Starts the main game loop, updating character actions, collected objects, endboss interactions, and game state. */
  run() {
    setInterval(() => {
      this.updateCharacterActions();
      this.updateStateCollectedObjects();
      this.updateEndbossInteractions();
      this.updateGameState();
    }, 200);
  }

  /** Updates character-related actions like throwing bottles, position, and chicken detection. */
  updateCharacterActions() {
    this.throwBottle();
    this.calculateCharacterPosition();
    this.timePassedSinceThrowEvent();
    this.checkChickenPosition();
  }

  /** Updates the state of collected objects (bottles, coins) and checks bottle availability. */
  updateStateCollectedObjects() {
    this.checkCollisonBottle();
    this.checkCollisonCoin();
    this.checkBottleAvailable();
  }

  /** Updates interactions between the character and the endboss. */
  updateEndbossInteractions() {
    this.checkCollision();
    this.checkCollisionEndboss();
    this.checkCollisionBottleEndboss();
    this.escapedEndboss();
    this.checkIfCharacterIsDead();
  }

  /** Updates the overall game state and checks if the game is over. */
  updateGameState() {
    this.checkIfGameOver();
  }

  /**
   * Adds multiple objects to the map for rendering.
   * @param {DrawableObject[]} objects - Array of drawable objects.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a single object on the canvas, handling flipping if necessary.
   * @param {DrawableObject} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an object horizontally on the canvas.
   * @param {DrawableObject} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores an object to its original orientation after flipping.
   * @param {DrawableObject} mo - The object to flip back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /** Checks collisions between the main character and enemies. */
  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.chickenAlive) {
        if (
          this.character.isColliding(enemy) &&
          !this.character.isAboveGround()
        ) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        } else if (
          this.character.isColliding(enemy) &&
          this.character.isAboveGround()
        ) {
          this.chickenDead(enemy);
          this.deleteChicken(enemy);
        }
      }
    });
  }

  /** Checks collisions between the character and collectible bottles. */
  checkCollisonBottle() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottle();
        this.bottleBar.setPercentage(this.character.bottleAmount);
        this.removeBottle(index);
      }
    });
  }

  /**
   * Removes a bottle from the game world.
   * @param {number} index - Index of the bottle in the array.
   */
  removeBottle(index) {
    this.level.bottles.splice(index, 1);
  }

  /** Throws a bottle if the key is pressed and bottles are available. */
  throwBottle() {
    if (this.keyboard.KEY_D && this.bottleBar.percentage > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 20,
        this.character.y + 80
      );
      this.throwableObjects.push(bottle);
      this.character.decreaseBottleStatus();
      this.bottleBar.setPercentage(this.character.bottleAmount);
    }
  }

  /** Checks collisions between the character and collectible coins. */
  checkCollisonCoin() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoin();
        this.coinBar.setPercentage(this.character.coinAmount);
        this.removeCoin(index);
      }
    });
  }

  /**
   * Removes a coin from the game world.
   * @param {number} index - Index of the coin in the array.
   */
  removeCoin(index) {
    this.level.coins.splice(index, 1);
  }

  /** Updates the character's position relative to the endboss. */
  calculateCharacterPosition() {
    if (this.character.x > this.level.level_end_x - 100) {
      this.endBoss.characterCloseToEndboss = true;
    }
  }

  /**
   * Checks if a bottle is colliding with the endboss.
   * @param {ThrowableObject} bottle - The throwable object.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isCollidingBottle(bottle) {
    return (
      bottle.x + bottle.width > this.endBoss.x &&
      bottle.y + bottle.height < this.endBoss.y + this.endBoss.height - 80 &&
      bottle.y + bottle.height > this.endBoss.y &&
      bottle.x + bottle.width < this.endBoss.x + this.endBoss.width
    );
  }

  /** Checks if the character collides with the endboss and updates health. */
  checkCollisionEndboss() {
    if (this.isCollidingEndboss()) {
      this.character.hitByEndboss();
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  /**
   * Checks if the character is colliding with the endboss.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isCollidingEndboss() {
    return (
      this.character.x + this.character.width > this.endBoss.x &&
      this.character.y + this.character.height <
        this.endBoss.y + this.endBoss.height &&
      this.character.y + this.character.height > this.endBoss.y &&
      this.character.x + this.character.width <
        this.endBoss.x + this.endBoss.width
    );
  }

  /** Checks collisions between throwable bottles and the endboss. */
  checkCollisionBottleEndboss() {
    this.throwableObjects.forEach((bottle) => {
      if (this.isCollidingBottle(bottle)) {
        this.endBoss.hitEndboss();
        this.endBoss.endbossBar.setPercentage(this.endBoss.energyEndboss);
      }
    });
  }

  /** Checks if the character has escaped past the endboss. */
  escapedEndboss() {
    return this.character.x > this.endBoss.x;
  }

  /** Records the time when the throw key was pressed. */
  timePassedSinceThrowEvent() {
    if (this.keyboard.KEY_D) {
      this.endBoss.lastTimePressKeyD = new Date().getTime();
    }
  }

  /** Updates whether bottles are available for the endboss to react. */
  checkBottleAvailable() {
    if (this.bottleBar.percentage == 0) {
      this.endBoss.bottleAvailable = false;
    } else {
      this.endBoss.bottleAvailable = true;
    }
  }

  /** Marks a chicken enemy as dead. */
  chickenDead(enemy) {
    enemy.chickenAlive = false;
  }

  /** Checks the position of chickens and plays audio if close to the character. */
  checkChickenPosition() {
    let chicken = this.level.enemies;
    for (let i = 0; i < chicken.length - 1; i++) {
      if (this.chickenisClose(chicken, i) && !this.gameOver.gameFinished) {
        this.AUDIO_CHICKEN.play();
        this.AUDIO_CHICKEN.volume = 0.1;
      }
    }
  }

  /**
   * Determines if a chicken enemy is close to the character.
   * @param {Array} chicken - Array of chicken enemies.
   * @param {number} i - Index of the chicken.
   * @returns {boolean} True if the chicken is close, false otherwise.
   */
  chickenisClose(chicken, i) {
    return (
      this.character.x > chicken[i].x - 200 &&
      this.character.x + this.character.width < chicken[i].x + chicken[i].width
    );
  }

  /** Deletes a chicken enemy from the level after a delay. */
  deleteChicken(enemy) {
    setTimeout(() => {
      let position = this.level.enemies.indexOf(enemy);
      this.level.enemies.splice(position, 1);
    }, 2000);
  }

  /** Checks if the character has passed the endboss. */
  checkCharacterPassedEndboss() {
    if (this.checkCharacterPassedEndboss()) {
      this.endBoss.characterEscaped = true;
    }
  }

  /** Checks if the character is dead and updates the endboss state. */
  checkIfCharacterIsDead() {
    if (this.character.dead) {
      this.endBoss.killedCharacter = true;
    }
  }

  /** Checks if the game is over (either character or endboss dead) and shows end screen. */
  checkIfGameOver() {
    if (this.character.dead || this.endBoss.dead) {
      this.gameOver.gameFinished = true;
      this.gameOver.lostGame =
        this.character.dead && !this.endBoss.dead ? true : false;
      this.gameOver.showEndscreen();
      this.AUDIO_BACKGROUND.pause();
      this.AUDIO_GAMEOVER.play();
      this.AUDIO_GAMEOVER.volume = 0.1;
      this.AUDIO_GAMEOVER.loop = false;
    }
  }
}
