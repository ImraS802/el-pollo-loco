class Bottle extends DrawableObject {
  // Standard sprite dimensions
  width = 70;
  height = 70;
  groundLevel = 355;

  /**
   * Represents a salsa bottle item on the floor.
   * @param {number} xPos - Horizontal placement in the level.
   */
  constructor(xPos) {
    super();
    this.x = xPos;
    this.y = this.groundLevel;
    this.initSprite();
  }

  /**
   * Loads the static texture for the bottle entity.
   */
  initSprite() {
    this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
  }
}
