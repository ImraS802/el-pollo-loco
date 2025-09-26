class World {
  character = new Character();
  statusBarHealth = new StatusBar('health', 20, 10); // top left
  statusBarBottle = new StatusBar('bottle', 20, 70);
  statusBarCoin = new StatusBar('coin', 20, 130);
  throwableObject = [];
  level = level1;
  ctx; // context
  camera_x = 0;
  keyboard;
  canvas;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.character.animate();
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 1000);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObject.push(bottle);
    }
  }

  checkCollisions() {
    // check collisions
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });

    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottle();
        this.statusBarBottle.setPercentage(this.character.bottlesCollected);

        // remove collected bottle from level
        this.level.bottles.splice(index, 1);
      }
    });

    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.collectBottle();
        this.statusBarCoin.setPercentage(this.character.coinsCollected);

        // remove collected bottle from level
        this.level.coins.splice(index, 1);
      }
    });
  }

  draw() {
    // clears canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);

    // back
    this.ctx.translate(-this.camera_x, 0);
    // ----- Space for fixed objects -------
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);

    // forward
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObject);

    this.ctx.translate(-this.camera_x, 0);

    //draws world/animations as soon as page is loaded, draw() gets called many times instantly
    // "this" points to World instance
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(movable) {
    if (!movable.img || !movable.img.complete) return;
    this.ctx.save();

    if (movable.otherDirection) {
      this.flipImageBack(movable);
    } else {
      movable.draw(this.ctx);
      movable.drawFrame(this.ctx);
    }
    this.ctx.restore();
  }

  flipImage(movable) {
    this.ctx.translate(movable.x + movable.width, movable.y);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(movable.img, 0, 0, movable.width, movable.height);
  }

  flipImageBack(movable) {
    // turn around
    this.flipImage(movable);
    // draw rectangle
    movable.drawRectangle(this.ctx);
  }
}
