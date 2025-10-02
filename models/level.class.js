class Level {
  enemies;
  bottles;
  backgroundObjects;
  coins;
  clouds;
  level_end_x = 5800;

  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
