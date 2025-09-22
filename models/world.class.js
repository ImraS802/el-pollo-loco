class World {
  character = new Character();
  level = level1;
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;
  ctx; // context
  canvas;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
    this.character.animate();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0);

    //draws world/animations as soon as page is loaded, draw() gets called many times instantly
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
