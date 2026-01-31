class GameOver extends DrawableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 480;

  isSessionActive = true;
  hasPlayerLost = false;
  screenLock = false;

  // Paths defined as single strings to avoid array indexing confusion
  ASSET_FAILURE = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';
  ASSET_VICTORY = 'img/You won, you lost/You Won B.png';
  ASSET_DEFAULT = 'img/9_intro_outro_screens/game_over/game over!.png';

  constructor() {
    super();
    this.loadImage(this.ASSET_DEFAULT);
  }

  /**
   * Triggers the end-of-game visual sequence.
   * Switches between victory and defeat assets and toggles UI buttons.
   */
  resolveGameSession() {
    if (this.screenLock) return;
    this.screenLock = true;
    this.isSessionActive = false;

    this.toggleOverlayVisibility(true);
    this.updateEndVisuals();
  }

  /**
   * Updates the graphic and specific action button based on the outcome.
   */
  updateEndVisuals() {
    const retryBtn = document.getElementById('tryGameAgain');
    const restartBtn = document.getElementById('playGameAgain');

    if (this.hasPlayerLost) {
      this.loadImage(this.ASSET_FAILURE);
      retryBtn.classList.remove('d-none');
    } else {
      this.loadImage(this.ASSET_VICTORY);
      restartBtn.classList.remove('d-none');
    }
  }

  /**
   * Resets the UI state for a fresh game start.
   */
  clearResolutionScreen() {
    this.screenLock = false;
    this.toggleOverlayVisibility(false);

    // Ensure both buttons are tucked away
    document.getElementById('tryGameAgain').classList.add('d-none');
    document.getElementById('playGameAgain').classList.add('d-none');
  }

  /**
   * Helper to manage the CSS class for the main overlay.
   * @param {boolean} show
   */
  toggleOverlayVisibility(show) {
    const overlay = document.getElementById('gameOverOverlay');
    if (show) {
      overlay.classList.remove('d-none');
    } else {
      overlay.classList.add('d-none');
    }
  }
}
