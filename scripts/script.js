let canvas;
let character = new Character();
let ctx;

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  console.log('My character is', world.character);
}
