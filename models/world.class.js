class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundObjects = [
    new BackgroundObject('img/5_background/layers/air.png', -719),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719),

    new BackgroundObject('img/5_background/layers/air.png', 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/air.png', 719),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719),

    new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
    new BackgroundObject(
      'img/5_background/layers/3_third_layer/1.png',
      719 * 2
    ),
    new BackgroundObject(
      'img/5_background/layers/2_second_layer/1.png',
      719 * 2
    ),
    new BackgroundObject(
      'img/5_background/layers/1_first_layer/1.png',
      719 * 2
    ),
    new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
    new BackgroundObject(
      'img/5_background/layers/3_third_layer/2.png',
      719 * 3
    ),
    new BackgroundObject(
      'img/5_background/layers/2_second_layer/1.png',
      719 * 3
    ),
    new BackgroundObject(
      'img/5_background/layers/1_first_layer/1.png',
      719 * 3
    ),
  ];
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
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);
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
    this.ctx.save();

    if (movable.otherDirection) {
      // turn around
      this.ctx.translate(movable.x + movable.width, movable.y);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(movable.img, 0, 0, movable.width, movable.height);
    } else {
      this.ctx.drawImage(
        movable.img,
        movable.x,
        movable.y,
        movable.width,
        movable.height
      );
    }
    this.ctx.restore();
  }
}
