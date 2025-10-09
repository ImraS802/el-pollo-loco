let canvas;
let world;
let keyboard = new KeyboardObject();
let gameOver = new GameOver();

/**
 * Initializes the game by displaying the start screen.
 */
function init() {
  showStartScreen();
}

/**
 * Displays the start screen and hides other UI elements.
 */
function showStartScreen() {
  document.getElementById('startscreen').classList.remove('d-none');
  document.getElementById('description').classList.remove('d-none');
  document.getElementById('canvas').classList.add('d-none');
  document.getElementById('playGameAgain').classList.add('d-none');
  document.getElementById('tryGameAgain').classList.add('d-none');
  document.getElementById('touchControl').classList.add('d-none');
}

/**
 * Starts the main game by initializing the world, level, and controls.
 *
 * Loads the canvas, sets up event listeners, and begins gameplay.
 */
function startGame() {
  document.getElementById('startscreen').classList.add('d-none');
  document.getElementById('description').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  document.getElementById('fullscreen').classList.remove('d-none');
  document.getElementById('muteMusic').classList.remove('d-none');
  document.getElementById('muteSound').classList.remove('d-none');
  document.getElementById('touchControl').classList.remove('d-none');
  canvas = document.getElementById('canvas');
  level1 = initLevel1();
  world = new World(canvas, keyboard, gameOver);
  touchControl();
}

/**
 * Handles keyboard keydown events to set movement and action flags.
 * @param {KeyboardEvent} event - The keyboard event.
 */
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      keyboard.KEY_LEFT = true;
      keyboard.KEY_PRESS = true;
      break;
    case 'ArrowRight':
      keyboard.KEY_RIGHT = true;
      keyboard.KEY_PRESS = true;
      break;
    case 'ArrowUp':
      keyboard.KEY_UP = true;
      keyboard.KEY_PRESS = true;
      break;
    case 'ArrowDown':
      keyboard.KEY_DOWN = true;
      keyboard.KEY_PRESS = true;
      break;
    case ' ':
      keyboard.KEY_SPACE = true;
      keyboard.KEY_PRESS = true;
      break;
    case 'd':
    case 'D':
      keyboard.KEY_D = true;
      keyboard.KEY_PRESS = true;
      break;
  }
});

/**
 * Handles keyboard keyup events to release movement and action flags.
 * @param {KeyboardEvent} event - The keyboard event.
 */
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      keyboard.KEY_LEFT = false;
      break;
    case 'ArrowRight':
      keyboard.KEY_RIGHT = false;
      break;
    case 'ArrowUp':
      keyboard.KEY_UP = false;
      break;
    case 'ArrowDown':
      keyboard.KEY_DOWN = false;
      break;
    case ' ':
      keyboard.KEY_SPACE = false;
      break;
    case 'd':
    case 'D':
      keyboard.KEY_D = false;
      break;
  }
});

/**
 * Opens the information modal or overlay.
 */
function openInformation() {
  document.getElementById('info').classList.remove('d-none');
}

/**
 * Closes the information modal or overlay.
 */
function closeInformation() {
  document.getElementById('info').classList.add('d-none');
}

/**
 * Reloads the page to restart the game.
 */
function playAgain() {
  location.reload();
}

/**
 * Activates fullscreen mode for the game canvas.
 */
function goFullScreen() {
  canvas.requestFullscreen();
}

/**
 * Toggles background and game-over music on or off.
 */
function muteMusic() {
  if (world.AUDIO_BACKGROUND.muted == false) {
    world.AUDIO_BACKGROUND.muted = true;
    world.AUDIO_GAMEOVER.muted = true;
    document.getElementById('music').src = 'icons/mute.png';
  } else {
    world.AUDIO_BACKGROUND.muted = false;
    world.AUDIO_GAMEOVER.muted = false;
    document.getElementById('music').src = 'icons/speaker.png';
  }
}

/**
 * Toggles all game sound effects on or off.
 */
function muteSound() {
  if (world.AUDIO_CHICKEN.muted === false) {
    muteAllSounds();
  } else {
    unmuteAllSounds();
  }
}

/**
 * Mutes all in-game sounds including character, world, and endboss.
 */
function muteAllSounds() {
  document.getElementById('sound').src = 'icons/mute.png';
  toggleCharacterSounds(true);
  toggleWorldSounds(true);
  toggleEndbossSounds(true);
}

/**
 * Unmutes all in-game sounds including character, world, and endboss.
 */
function unmuteAllSounds() {
  document.getElementById('sound').src = 'icons/speaker.png';
  toggleCharacterSounds(false);
  toggleWorldSounds(false);
  toggleEndbossSounds(false);
}

/**
 * Toggles sound effects for world-level sounds (e.g., chicken noises).
 * @param {boolean} state - Whether to mute (`true`) or unmute (`false`) the sounds.
 */
function toggleWorldSounds(state) {
  world.AUDIO_CHICKEN.muted = state;
}

/**
 * Toggles sound effects for the character (walking, jumping, collecting).
 * @param {boolean} state - Whether to mute (`true`) or unmute (`false`) the sounds.
 */
function toggleCharacterSounds(state) {
  world.character.AUDIO_WALKING.muted = state;
  world.character.AUDIO_HURTING.muted = state;
  world.character.AUDIO_JUMPING.muted = state;
  world.character.AUDIO_BOTTLE.muted = state;
  world.character.AUDIO_COIN.muted = state;
}

/**
 * Toggles sound effects for the endboss.
 * @param {boolean} state - Whether to mute (`true`) or unmute (`false`) the sounds.
 */
function toggleEndbossSounds(state) {
  world.endBoss.AUDIO_SCREAM.muted = state;
  world.endBoss.AUDIO_HURT.muted = state;
}

/**
 * Sets up touch-based controls for mobile devices.
 *
 * Handles directional movement and throwing bottles using touchstart and touchend events.
 */
function touchControl() {
  document
    .getElementById('touchRight')
    .addEventListener('touchstart', function (e) {
      e.preventDefault();
      keyboard.KEY_RIGHT = true;
    });

  document
    .getElementById('touchRight')
    .addEventListener('touchend', function (e) {
      e.preventDefault();
      keyboard.KEY_RIGHT = false;
    });

  document
    .getElementById('touchLeft')
    .addEventListener('touchstart', function (e) {
      e.preventDefault();
      keyboard.KEY_LEFT = true;
    });

  document
    .getElementById('touchLeft')
    .addEventListener('touchend', function (e) {
      e.preventDefault();
      keyboard.KEY_LEFT = false;
    });

  document
    .getElementById('touchUp')
    .addEventListener('touchstart', function (e) {
      e.preventDefault();
      keyboard.KEY_UP = true;
    });

  document.getElementById('touchUp').addEventListener('touchend', function (e) {
    e.preventDefault();
    keyboard.KEY_UP = false;
  });

  document
    .getElementById('touchThrow')
    .addEventListener('touchstart', function (e) {
      e.preventDefault();
      keyboard.KEY_D = true;
    });

  document
    .getElementById('touchThrow')
    .addEventListener('touchend', function (e) {
      e.preventDefault();
      keyboard.KEY_D = false;
    });
}
