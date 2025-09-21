class Endboss extends MovableObject {
  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  constructor() {
    super();
    this.width = 350;
    this.height = 400;
    this.y = 455 - this.height; // standing on ground
    this.x = 2400; // starting position

    // Immediately assign first image
    this.img = new Image();
    this.img.src = this.IMAGES_WALKING[0];

    // Preload all walking images
    this.loadImages(this.IMAGES_WALKING);

    // Start animation
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
