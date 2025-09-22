class StatusBar extends DrawableObject {
  IMAGES_STATUSBAR_BLUE = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSBAR_BLUE);
    this.setPercentage(100); // default full health
    this.x = 20; // position on canvas
    this.y = 10;
    this.width = 200;
    this.height = 50;
  }

  // updates the health
  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this.IMAGES_STATUSBAR_BLUE[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath]; // update the displayed image
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
