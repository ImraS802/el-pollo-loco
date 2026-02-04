let level1;

/**
 * Initializes and returns the first level configuration for the game.
 *
 * This function dynamically creates enemies, clouds, bottles, coins, and background layers,
 * then assembles them into a new {@link Level} instance.
 *
 * @function
 * @returns {Level} The fully constructed level instance containing all objects for Level 1.
 *
 * @example
 * Initialize the first level and assign it globally
 * level1 = initLevel1();
 */
function initLevel1() {
  let enemies = [];
  let clouds = [];
  let bottles = [];
  let coins = [];
  let x = 0;
  let y = 0;

  /**
   * Create 12 chickens and 7 chicks as part of the enemies array,
   * and add one Endboss at the end of the level.
   */
  for (let i = 0; i < 12; i++) {
    enemies.push(new Chicken());
  }

  for (let i = 0; i < 7; i++) {
    enemies.push(new Chick());
  }

  enemies.push(new Endboss());

  /**
   * Generate 18 cloud objects, each spaced roughly 700px apart with random offsets.
   */
  for (let i = 0; i < 18; i++) {
    let x = i * 700 + Math.random() * 100;
    clouds.push(new Cloud(x));
  }

  /**
   * Create 15 bottle objects scattered randomly across the level range.
   */
  for (let i = 0; i < 15; i++) {
    let x = 450 + Math.random() * 5200;
    bottles.push(new Bottle(x));
  }

  /**
   * Create 22 coins placed randomly in both x and y coordinates for variety.
   */
  for (let i = 0; i < 22; i++) {
    let x = 500 + Math.random() * 5300;
    let y = 100 + Math.random() * 200;
    coins.push(new Coin(x, y));
  }

  /**
   * Returns a new Level instance configured with all enemies, clouds, backgrounds, bottles, and coins.
   */
  return new Level(
    enemies,
    clouds,

    [
      new BackgroundObject('img/5_background/layers/air.png', -719, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        -719,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        -719,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        -719,
        0,
      ),

      new BackgroundObject('img/5_background/layers/air.png', 0, 0),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        0,
        0,
      ),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),

      new BackgroundObject('img/5_background/layers/air.png', 719, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        719,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        719,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        719,
        0,
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 2, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/1.png',
        719 * 2,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        719 * 2,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/1.png',
        719 * 2,
        0,
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 3, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        719 * 3,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        719 * 3,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        719 * 3,
        0,
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 4, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/1.png',
        719 * 4,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        719 * 4,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/1.png',
        719 * 4,
        0,
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 5, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        719 * 5,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        719 * 5,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        719 * 5,
        0,
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 6, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/1.png',
        719 * 6,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        719 * 6,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/1.png',
        719 * 6,
        0,
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 7, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        719 * 7,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        719 * 7,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        719 * 7,
        0,
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 8, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/1.png',
        719 * 8,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        719 * 8,
        0,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/1.png',
        719 * 8,
        0,
      ),
    ],

    bottles,

    coins,
  );
}
