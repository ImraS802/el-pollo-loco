class GameOver extends DrawableObject {
  width = 720;
  height = 480;
  y = 0;
  x = 0;
  gameFinished = false;
  lostGame = false;

  IMAGE_LOST = ['img/9_intro_outro_screens/game_over/oh no you lost!.png'];
  IMAGE_WON = ['img/You won, you lost/You Won B.png'];

  /**
   * Initializes the GameOver screen by loading the default game over image.
   */
  constructor() {
    super().loadImage('img/9_intro_outro_screens/game_over/game over!.png');
  }

  /**
   * Displays the appropriate end screen image depending on whether the player lost or won.
   * Also reveals the corresponding "Try Again" or "Play Again" button in the DOM.
   */
  showEndscreen() {
    if (this.lostGame) {
      this.loadImage(this.IMAGE_LOST);
      document.getElementById('tryGameAgain').classList.remove('d-none');
    } else {
      this.loadImage(this.IMAGE_WON);
      document.getElementById('playGameAgain').classList.remove('d-none');
    }
  }
}
