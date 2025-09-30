class StatusBar extends DrawableObject {
  IMAGES_STATUSBAR_HEALTH = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ];

  IMAGES_STATUSBAR_BOTTLE = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];

  IMAGES_STATUSBAR_COIN = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
  ];

  percentage = 100;
  type;

  constructor(type, x, y) {
    super();
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 50;

    if (this.type === 'health') {
      this.loadImages(this.IMAGES_STATUSBAR_HEALTH);
      this.setPercentage(100);
    } else if (this.type === 'bottle') {
      this.loadImages(this.IMAGES_STATUSBAR_BOTTLE);
      this.setPercentage(0);
    } else if (this.type === 'coin') {
      this.loadImages(this.IMAGES_STATUSBAR_COIN);
      this.setPercentage(0);
    }
  }

  setPercentage(percentage) {
    this.percentage = percentage;

    let images;
    if (this.type === 'health') {
      images = this.IMAGES_STATUSBAR_HEALTH;
    } else if (this.type === 'bottle') {
      images = this.IMAGES_STATUSBAR_BOTTLE;
    } else if (this.type === 'coin') {
      images = this.IMAGES_STATUSBAR_COIN;
    }
    let imagePath = images[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  resolveImageIndex() {
    // if this.percentage === 100 is true, run this case (index of status bar)
    switch (true) {
      case this.percentage === 100:
        return 5;
      case this.percentage >= 80:
        return 4;
      case this.percentage >= 60:
        return 3;
      case this.percentage >= 40:
        return 2;
      case this.percentage >= 20:
        return 1;
      default:
        return 0;
    }
  }
}
