class GameOver extends DrawableObject {
  width = 720;
  height = 480;
  y = 0;
  x = 0;
  gameFinished = false;
  lostGame = false;
  endscreenShown = false;

  IMAGE_LOST = ['img/9_intro_outro_screens/game_over/oh no you lost!.png'];
  IMAGE_WON = ['img/You won, you lost/You Won B.png'];

  /**
   * Initializes the GameOver screen by loading the default game over image.
   */
  constructor() {
    super().loadImage('img/9_intro_outro_screens/game_over/game over!.png');
  }

  /**
   * Displays the game over screen overlay.
   * Shows either the "won" or "lost" image based on the game outcome.
   * Ensures that the endscreen is only shown once per game over event.
   */
  showEndscreen() {
    if (this.endscreenShown) return;
    this.endscreenShown = true;
    const overlay = document.getElementById('gameOverOverlay');
    const tryBtn = document.getElementById('tryGameAgain');
    const playBtn = document.getElementById('playGameAgain');
    overlay.classList.remove('d-none');
    tryBtn.classList.add('d-none');
    playBtn.classList.add('d-none');
    if (this.lostGame) {
      this.loadImage(this.IMAGE_LOST);
      tryBtn.classList.remove('d-none');
    } else {
      this.loadImage(this.IMAGE_WON);
      playBtn.classList.remove('d-none');
    }
  }

  /**
   * Hides the game over screen overlay and resets button visibility.
   * Resets the internal endscreenShown flag to allow future displays.
   */
  hideEndscreen() {
    this.endscreenShown = false;
    document.getElementById('gameOverOverlay').classList.add('d-none');
    document.getElementById('tryGameAgain').classList.add('d-none');
    document.getElementById('playGameAgain').classList.add('d-none');
  }
}
