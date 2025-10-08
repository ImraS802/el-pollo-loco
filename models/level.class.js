class Level {
  enemies;
  bottles;
  backgroundObjects;
  coins;
  clouds;
  level_end_x = 5650;

  /**
   * @param {Array} enemies - Array of enemy objects present in the level.
   * @param {Array} clouds - Array of cloud objects for background decoration.
   * @param {Array} backgroundObjects - Array of static background objects.
   * @param {Array} bottles - Array of collectible bottle objects.
   * @param {Array} coins - Array of collectible coin objects.
   */
  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
