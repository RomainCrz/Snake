const gameSize = 600;
const blockSize = 20;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const snake = new Snake(blockSize);

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
      console.log("snake : " + snake.blocks[0].x + " " + snake.blocks[0].y);
      console.log("food : " + food.x + " " + food.y);
      foodCreated = false;
      snake.eat(snake.blocks[0].x, snake.blocks[0].y);
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
  food.draw("red");
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
