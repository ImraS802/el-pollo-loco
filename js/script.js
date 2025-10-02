let canvas;
let world;
let keyboard = new KeyboardObject();
let gameOver = new GameOver();

function init() {
  // canvas = document.getElementById('canvas');
  // world = new World(canvas, keyboard);
  showStartScreen();
}

function showStartScreen() {
  document.getElementById('startscreen').classList.remove('d-none');
  document.getElementById('description').classList.remove('d-none');
  document.getElementById('canvas').classList.add('d-none');
  document.getElementById('playAgain').classList.add('d-none');
  document.getElementById('tryAgain').classList.add('d-none');
  document.getElementById('touchControl').classList.add('d-none');
}

function startGame() {
  document.getElementById('startscreen').classList.add('d-none');
  document.getElementById('description').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  document.getElementById('fullscreen').classList.remove('d-none');
  document.getElementById('mute1').classList.remove('d-none');
  document.getElementById('mute2').classList.remove('d-none');
  document.getElementById('touchControl').classList.remove('d-none');
  canvas = document.getElementById('canvas');
  level1 = initLevel1();
  world = new World(canvas, keyboard, gameOver);
  touchControl();
}

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

function openStory() {
  document.getElementById('story').classList.remove('d-none');
}

function closeStory() {
  document.getElementById('story').classList.add('d-none');
}

function playAgain() {
  location.reload();
}

function goFullScreen() {
  canvas.requestFullscreen();
}

function muteMusic() {
  if (world.AUDIO_BACKGROUND.muted == false) {
    world.AUDIO_BACKGROUND.muted = true;
    world.AUDIO_GAMEOVER.muted = true;
    document.getElementById('music').src = 'icon/mute.png';
  } else {
    world.AUDIO_BACKGROUND.muted = false;
    world.AUDIO_GAMEOVER.muted = false;
    document.getElementById('music').src = 'icon/speaker.png';
  }
}

function muteSound() {
  if (world.AUDIO_CHICKEN.muted == false) {
    document.getElementById('sound').src = 'icon/mute.png';
    world.AUDIO_CHICKEN.muted = true;
    world.AUDIO_THROWING.muted = true;
    world.character.AUDIO_WALKING.muted = true;
    world.character.AUDIO_HURTING.muted = true;
    world.character.AUDIO_JUMPING.muted = true;
    world.endBoss.AUDIO_SCREAM.muted = true;
    world.endBoss.AUDIO_HURT.muted = true;
    world.character.AUDIO_BOTTLE.muted = true;
    world.character.AUDIO_COIN.muted = true;
  } else {
    document.getElementById('sound').src = 'icon/speaker.png';
    world.AUDIO_CHICKEN.muted = false;
    world.AUDIO_THROWING.muted = false;
    world.character.AUDIO_WALKING.muted = false;
    world.character.AUDIO_HURTING.muted = false;
    world.character.AUDIO_JUMPING.muted = false;
    world.endBoss.AUDIO_SCREAM.muted = false;
    world.endBoss.AUDIO_HURT.muted = false;
    world.character.AUDIO_BOTTLE.muted = false;
    world.character.AUDIO_COIN.muted = false;
  }
}

// mobile
function touchControl() {
  // moving right
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

  // moving left
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

  // jumping
  document
    .getElementById('touchUp')
    .addEventListener('touchstart', function (e) {
      e.preventDefault();
      keyboard.KEY_SPACE = true;
    });

  document.getElementById('touchUp').addEventListener('touchend', function (e) {
    e.preventDefault();
    keyboard.KEY_SPACE = false;
  });

  // throwing
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
