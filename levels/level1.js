const level1 = new Level(
  [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicks(),
    new Chicks(),
    new Chicks(),
    new Chicks(),
    new Chicks(),
    new Chicken(1600),
    new Chicken(1650),
    new Chicken(1800),
    new Endboss(),
  ],
  [new Cloud(), new Cloud()],
  [
    new BackgroundObject('img/5_background/layers/air.png', -719),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/air.png', 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/air.png', 719),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

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
      'img/5_background/layers/2_second_layer/2.png',
      719 * 3
    ),
    new BackgroundObject(
      'img/5_background/layers/1_first_layer/2.png',
      719 * 3
    ),
    new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
    new BackgroundObject(
      'img/5_background/layers/3_third_layer/1.png',
      719 * 4
    ),
    new BackgroundObject(
      'img/5_background/layers/2_second_layer/1.png',
      719 * 4
    ),
    new BackgroundObject(
      'img/5_background/layers/1_first_layer/1.png',
      719 * 4
    ),
  ],
  [
    new Bottle(300, 350),
    new Bottle(500, 350),
    new Bottle(700, 350),
    new Bottle(800, 350),
    new Bottle(1000, 350),
    new Bottle(1200, 350),
    new Bottle(1250, 350),
    new Bottle(1700, 350),
  ],
  [
    new Coin(250, 140),
    new Coin(300, 140),
    new Coin(600, 140),
    new Coin(700, 140),
    new Coin(800, 140),
    new Coin(1000, 140),
    new Coin(1200, 140),
    new Coin(1050, 100),
    new Coin(1150, 100),
    new Coin(1100, 70),
  ]
);
