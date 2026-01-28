let canvas;
let world;
let keyboard = new Keyboard();
let activeIntervals = [];
let gameRunning = false;

let backgroundMusic = new Audio(
  'audio/ambient-desert-atmosphere-with-dry-wind-sounds-1-377883.mp3',
);

let sounds = {
  walking: new Audio('audio/walking1.mp3'),
  throwBottle: new Audio('audio/throw.wav'),
  jump: new Audio('audio/jump.wav'),
  snore: new Audio('audio/snore.wav'),
  hurt: new Audio('audio/characterhurt.wav'),
  dead: new Audio('audio/characterdead.wav'),
  chickenDead: new Audio('audio/chickenhurt.wav'),
  endbossHurt: new Audio('audio/endbosshurt.wav'),
  endbossDead: new Audio('audio/endbossdead.wav'),
  coinCollect: new Audio('audio/coin.mp3'),
  bottleCollect: new Audio('audio/bottleCollect.ogg'),
  bottleBreaks: new Audio('audio/bottleBreaksShort.wav'),
};

/**
 * Initializes the game and displays the start screen.
 */
function init() {
  canvas = document.getElementById('canvas');
  showStartScreen();
}

/**
 * Starts the game by creating the world and hiding the start screen.
 */
function startGame() {
  resetGame();
  hideStartScreen();
  document.querySelector('.mobile-button-container').style.display = 'flex';
  world = new World(canvas, keyboard);
  backgroundMusic.play();
  gameRunning = true;
}

/**
 * Resets the game, removes active intervals, and hides end screens.
 */
function resetGame() {
  if (world) {
    world.clearAllIntervals();
    world.stopAllSounds();
    world = null;
  }
  level1 = resetLevel();
  clearAllIntervals();
  gameRunning = false;
  hideEndScreens();
}

/**
 * Removes all active intervals and clears the interval list.
 */
function clearAllIntervals() {
  activeIntervals.forEach(clearInterval);
  activeIntervals = [];
}

/**
 * Hides all end screens.
 */
function hideEndScreens() {
  document.getElementById('game-over-screen').classList.add('hidden');
  document.getElementById('you-win-screen').classList.add('hidden');
}

/**
 * Returns to the main menu by resetting the game and displaying the start screen.
 */
function goToMainMenu() {
  resetGame();
  showStartScreen();
}

/**
 * Displays the start screen and hides the canvas element.
 */
function showStartScreen() {
  document.getElementById('start-screen').classList.remove('hidden');
  document.querySelector('.mobile-button-container').style.display = 'flex';
  canvas.style.display = 'none';
}

/**
 * Hides the start screen and displays the canvas element.
 */
function hideStartScreen() {
  const startScreen = document.getElementById('start-screen');
  if (startScreen) {
    startScreen.classList.add('hidden');
  }
  canvas.style.display = 'block';
}

/**
 * Opens an overlay by making it visible.
 * @param {string} id - The ID of the overlay to open.
 */
function openOverlay(id) {
  document.getElementById(id).classList.remove('hidden');
}

/**
 * Closes an overlay by hiding it.
 * @param {string} id - The ID of the overlay to close.
 */
function closeOverlay(id) {
  document.getElementById(id).classList.add('hidden');
}

/**
 * Checks the screen orientation and displays a warning if the device is in portrait mode.
 */
function checkOrientation() {
  const warning = document.getElementById('orientation-warning');

  if (window.innerWidth < 1200 && window.innerWidth < window.innerHeight) {
    warning.classList.add('visible');
  } else {
    warning.classList.remove('visible');
  }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);

/**
 * Handles key press events and sets the corresponding property in the `keyboard` object to `true`.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 */
window.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowRight') keyboard.RIGHT = true;
  if (event.code === 'ArrowLeft') keyboard.LEFT = true;
  if (event.code === 'ArrowUp') keyboard.UP = true;
  if (event.code === 'ArrowDown') keyboard.DOWN = true;
  if (event.code === 'Space') keyboard.SPACE = true;
  if (event.code === 'KeyD') keyboard.D = true;
});

/**
 * Handles key release events and sets the corresponding property in the `keyboard` object to `false`.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 */
window.addEventListener('keyup', (event) => {
  if (event.code === 'ArrowRight') keyboard.RIGHT = false;
  if (event.code === 'ArrowLeft') keyboard.LEFT = false;
  if (event.code === 'ArrowUp') keyboard.UP = false;
  if (event.code === 'ArrowDown') keyboard.DOWN = false;
  if (event.code === 'Space') keyboard.SPACE = false;
  if (event.code === 'KeyD') keyboard.D = false;
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
  if (world.AUDIO_BACKGROUND.muted == false) {
    world.AUDIO_BACKGROUND.muted = true;
    world.AUDIO_GAMEOVER.muted = true;
    document.getElementById('music').src = 'icons/mute.png';
    localStorage.setItem('musicMuted', 'true');
  } else {
    world.AUDIO_BACKGROUND.muted = false;
    world.AUDIO_GAMEOVER.muted = false;
    document.getElementById('music').src = 'icons/speaker.png';
    localStorage.setItem('musicMuted', 'false');
  }
}

/**
 * Toggles all game sound effects on or off.
 */
function muteSound() {
  if (world.AUDIO_CHICKEN.muted === false) {
    muteAllSounds();
    localStorage.setItem('soundMuted', 'true');
  } else {
    unmuteAllSounds();
    localStorage.setItem('soundMuted', 'false');
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
 * Applies saved audio mute settings from localStorage when the game starts.
 */
function applySavedAudioSettings() {
  const musicMuted = localStorage.getItem('musicMuted') === 'true';
  const soundMuted = localStorage.getItem('soundMuted') === 'true';
  world.AUDIO_BACKGROUND.muted = musicMuted;
  world.AUDIO_GAMEOVER.muted = musicMuted;
  document.getElementById('music').src = musicMuted
    ? 'icons/mute.png'
    : 'icons/speaker.png';
  toggleCharacterSounds(soundMuted);
  toggleWorldSounds(soundMuted);
  toggleEndbossSounds(soundMuted);
  document.getElementById('sound').src = soundMuted
    ? 'icons/mute.png'
    : 'icons/speaker.png';
}
