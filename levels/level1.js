let level1;

function initLevel1() {
  let enemies = [];
  let clouds = [];
  let bottles = [];
  let coins = [];
  let x = 0;
  let y = 0;

  // enemies
  for (let i = 0; i < 12; i++) {
    enemies.push(new Chicken());
  }

  for (let i = 0; i < 7; i++) {
    enemies.push(new Chick());
  }

  enemies.push(new Endboss());

  for (let i = 0; i < 15; i++) {
    let x = i * 700 + Math.random() * 100;
    clouds.push(new Cloud(x));
  }

  for (let i = 0; i < 10; i++) {
    let x = 450 + Math.random() * 5200;
    bottles.push(new Bottle(x));
  }

  for (let i = 0; i < 20; i++) {
    let x = 500 + Math.random() * 5300;
    let y = 100 + Math.random() * 200;
    coins.push(new Coin(x, y));
  }

  return new Level(
    enemies,
    clouds,

    [
      new BackgroundObject('img/5_background/layers/air.png', -719, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        -719,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        -719,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        -719,
        0
      ),

      new BackgroundObject('img/5_background/layers/air.png', 0, 0),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        0,
        0
      ),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),

      new BackgroundObject('img/5_background/layers/air.png', 719, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        719,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        719,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        719,
        0
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 2, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/1.png',
        719 * 2,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        719 * 2,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/1.png',
        719 * 2,
        0
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 3, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        719 * 3,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        719 * 3,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        719 * 3,
        0
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 4, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/1.png',
        719 * 4,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        719 * 4,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/1.png',
        719 * 4,
        0
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 5, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        719 * 5,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        719 * 5,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        719 * 5,
        0
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 6, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/1.png',
        719 * 6,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        719 * 6,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/1.png',
        719 * 6,
        0
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 7, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        719 * 7,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        719 * 7,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        719 * 7,
        0
      ),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 8, 0),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/1.png',
        719 * 8,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        719 * 8,
        0
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/1.png',
        719 * 8,
        0
      ),
    ],

    bottles,

    coins
  );
}
