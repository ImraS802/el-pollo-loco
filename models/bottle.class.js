class Bottle extends DrawableObject {
  width = 70;
  height = 70;
  y = 355;

  /**
   * Creates a new instance of a bottle.
   *
   * Loads the bottle image and sets its horizontal position within the level.
   *
   * @param {number} x - The x-coordinate where the bottle should be placed on the ground.
   *
   * @example
   * Create a bottle at position x = 1200
   * const bottle = new Bottle(1200);
   */
  constructor(x) {
    super();
    this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.x = x;
  }
}
