const gameSize = 600;
const blockSize = 20;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const snake = new Snake(blockSize);
const span = document.querySelector("span");
const pomme = new Image();
pomme.src =
  "./pngtree-pixel-game-fruit-red-apple-png-image_3287470-removebg-preview.png";

let food = {};
let foodCreated = false;
let direction;

window.addEventListener("keypress", (e) => {
  direction = e.key;
});

function launch() {
  snake.update();
  update();
}
launch();

function update() {
  setInterval(() => {
    let mange = false;
    span.textContent = "Win : " + snake.blocks.length + " /100";
    snake.headMove(direction);
    snake.bodyMove();
    snake.update();
    snake.out();
    snake.checkApple();
    win();

    if (!foodCreated) {
      createFood();
    }
    if (snake.blocks[0].x == food.x && snake.blocks[0].y == food.y) {
      foodCreated = false;
      snake.eat(0, 0);
      mange = true;
      snake.bodyTouch(mange);
    } else {
      snake.bodyTouch(mange);
    }
  }, 100);
}

function createFood() {
  let coordx = Math.floor(Math.random() * 600);
  let coordy = Math.floor(Math.random() * 600);
  food = new Food(
    coordx - (coordx % blockSize),
    coordy - (coordy % blockSize),
    blockSize
  );
  drawFood(food.x, food.y);
  foodCreated = true;
}

function win() {
  if (snake.blocks.length >= 100) {
    canvas.remove();
    document.body.innerHTML = `
            <div>
            <h2>Gagné !</h2>
            </div>
            `;
  }
}

function drawFood(x, y) {
  ctx.drawImage(pomme, x, y, 22, 22);
}
