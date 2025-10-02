class GameOver extends DrawableObject {
  width = 720;
  height = 480;
  y = 0;
  x = 0;
  lostGame = false;
  gameFinished = false;

  IMAGE_LOST = ['img/9_intro_outro_screens/game_over/oh no you lost!.png'];
  IMAGE_WON = ['img/You won, you lost/You Won B.png'];

  constructor() {
    super().loadImage('img/9_intro_outro_screens/game_over/game over!.png');
  }

  showEndscreen() {
    if (this.lostGame) {
      this.loadImage(this.IMAGE_LOST);
      document.getElementById('tryAgain').classList.remove('d-none');
    } else {
      this.loadImage(this.IMAGE_WON);
      document.getElementById('playAgain').classList.remove('d-none');
    }
  }
}
