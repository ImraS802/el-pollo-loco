class Coin extends MovableObject {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.loadImage('img/8_coin/coin_1.png');
  }
}
