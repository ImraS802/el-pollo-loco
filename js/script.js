let canvas;
let world;
let keyboard = new KeyboardObject();
let gameOver = new GameOver();

/**
 * Safely attempts to play an HTMLAudioElement.
 * Prevents AbortError when playback is interrupted or blocked.
 * @param {HTMLAudioElement} audio
 */
function safePlayAudio(audio) {
  if (audio) {
    audio.play().catch(() => {});
  }
}

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
 * Initializes and starts the game.
 *
 * This function performs the following actions:
 * 1. Hides the game over screen if it is visible.
 * 2. Hides the "Try Again" and "Play Again" buttons.
 * 3. Hides the start screen and description panel.
 * 4. Displays the game canvas and relevant UI elements for gameplay:
 *    - Fullscreen button
 *    - Music mute button
 *    - Sound mute button
 *    - Touch control overlay (if applicable)
 * 5. Initializes the canvas element for drawing the game world.
 * 6. Creates a new GameOver instance and resets game over states.
 * 7. Initializes the first level (level1) of the game.
 * 8. Creates a new World instance with the canvas, keyboard, and GameOver instance.
 * 9. Initializes touch controls for mobile devices.
 *
 * @function
 * @global
 */
function startGame() {
  gameOver?.hideEndscreen?.();
  document.getElementById('tryGameAgain').classList.add('d-none');
  document.getElementById('playGameAgain').classList.add('d-none');
  document.getElementById('startscreen').classList.add('d-none');
  document.getElementById('description').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  document.getElementById('fullscreen').classList.remove('d-none');
  document.getElementById('muteMusic').classList.remove('d-none');
  document.getElementById('muteSound').classList.remove('d-none');
  document.getElementById('touchControl').classList.remove('d-none');
  canvas = document.getElementById('canvas');
  gameOver = new GameOver();

  level1 = initLevel1();

  world = new World(canvas, keyboard, gameOver);

  applySavedAudioSettings();
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
 * Reloads the page to restart the game and unmutes sound and music.
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
  let isMuted = localStorage.getItem('musicMuted') === 'true';
  isMuted = !isMuted;
  localStorage.setItem('musicMuted', isMuted);
  document.getElementById('music').src = isMuted
    ? 'icons/mute.png'
    : 'icons/speaker.png';
  if (world) {
    if (world.AMBIENT_TRACK) world.AMBIENT_TRACK.muted = isMuted;
    if (world.SFX_GAME_OVER) world.SFX_GAME_OVER.muted = isMuted;
  }
}

/**
 * Toggles all game sound effects on or off.
 */
function muteSound() {
  let isMuted = localStorage.getItem('soundMuted') === 'true';
  isMuted = !isMuted;
  localStorage.setItem('soundMuted', isMuted);
  if (isMuted) {
    muteAllSounds();
  } else {
    unmuteAllSounds();
  }
}

/**
 * Mutes all in-game sounds including character, world, and endboss.
 */
function muteAllSounds() {
  const soundIcon = document.getElementById('sound');
  if (soundIcon) soundIcon.src = 'icons/mute.png';

  if (world) {
    toggleCharacterSounds(true);
    toggleWorldSounds(true);
    toggleEndbossSounds(true);
  }
}

/**
 * Unmutes all in-game sounds including character, world, and endboss.
 */
function unmuteAllSounds() {
  const soundIcon = document.getElementById('sound');
  if (soundIcon) soundIcon.src = 'icons/speaker.png';

  if (world) {
    toggleCharacterSounds(false);
    toggleWorldSounds(false);
    toggleEndbossSounds(false);
  }
}

/**
 * Toggles sound effects for world-level sounds (e.g., chicken noises).
 * @param {boolean} state - Whether to mute (`true`) or unmute (`false`) the sounds.
 */
function toggleWorldSounds(state) {
  if (world && world.SFX_CHICKEN) {
    world.SFX_CHICKEN.muted = state;
  }
}

/**
 * Toggles sound effects for the character (walking, jumping, collecting).
 * @param {boolean} state - Whether to mute (`true`) or unmute (`false`) the sounds.
 */
function toggleCharacterSounds(state) {
  if (world && world.hero) {
    world.hero.RUN_SOUND.muted = state;
    world.hero.PAIN_SOUND.muted = state;
    world.hero.JUMP_SOUND.muted = state;
    world.hero.AUDIO_BOTTLE.muted = state;
    world.hero.AUDIO_COIN.muted = state;
  }
}

/**
 * Toggles sound effects for the endboss.
 * @param {boolean} state - Whether to mute (true) or unmute (false) the sounds.
 */
function toggleEndbossSounds(state) {
  if (world && world.bossEntity) {
    if (world.bossEntity.SFX_ROAR) world.bossEntity.SFX_ROAR.muted = state;
    if (world.bossEntity.SFX_PAIN) world.bossEntity.SFX_PAIN.muted = state;

    if (world.bossEntity.AUDIO_SCREAM)
      world.bossEntity.AUDIO_SCREAM.muted = state;
    if (world.bossEntity.AUDIO_HURT) world.bossEntity.AUDIO_HURT.muted = state;
  }
}

/**
 * Applies saved audio mute settings from localStorage when the game starts.
 */
function applySavedAudioSettings() {
  const musicMuted = localStorage.getItem('musicMuted') === 'true';
  const soundMuted = localStorage.getItem('soundMuted') === 'true';

  if (world) {
    if (world.AMBIENT_TRACK) world.AMBIENT_TRACK.muted = musicMuted;
    if (world.SFX_GAME_OVER) world.SFX_GAME_OVER.muted = musicMuted;

    let musicIcon = document.getElementById('music');
    if (musicIcon)
      musicIcon.src = musicMuted ? 'icons/mute.png' : 'icons/speaker.png';

    toggleCharacterSounds(soundMuted);
    toggleWorldSounds(soundMuted);
    toggleEndbossSounds(soundMuted);

    let soundIcon = document.getElementById('sound');
    if (soundIcon)
      soundIcon.src = soundMuted ? 'icons/mute.png' : 'icons/speaker.png';
  }
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
