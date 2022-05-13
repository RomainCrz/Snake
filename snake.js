class Snake {
  constructor(size) {
    this.x = 0;
    this.y = 0;
    this.size = size;
    this.blocks = [];
    this.addBlock(this.x, this.y);
  }

  addBlock(x, y) {
    this.blocks.push(new Block(x, y, this.size));
  }

  update() {
    for (let i = 0; i < this.blocks.length; i++) {
      if (i == 0 || i == 1) {
        this.blocks[i].draw("green");
      } else if (i == this.blocks.length - 1) {
        this.blocks[i].draw("yellow");
      } else {
        this.blocks[i].draw("rgb(0, 189, 0)");
      }
    }
  }
  headMove(direction) {
    this.blocks[0].move(direction);
  }
  bodyMove() {
    let previousLocX = [];
    let previousLocY = [];
    for (let i = 0; i < this.blocks.length; i++) {
      previousLocX.push(this.blocks[i].x);
      previousLocY.push(this.blocks[i].y);
    }
    for (let i = 1; i < this.blocks.length; i++) {
      this.blocks[i].undraw();
      this.blocks[i].x = previousLocX[i - 1];
      this.blocks[i].y = previousLocY[i - 1];
    }
  }

  out() {
    if (
      this.blocks[0].x < 0 ||
      this.blocks[0].x > 600 ||
      this.blocks[0].y < 0 ||
      this.blocks[0].y > 600
    ) {
      canvas.remove();
      document.body.innerHTML = `
      <div>
      <h2>Perdu !</h2>
      </div>
      `;
    }
  }

  eat(x, y) {
    this.blocks.push(new Block(x, y, this.size));
  }

  checkApple() {
    for (let i = 2; i < this.blocks.length; i++) {
      if (this.blocks[i].x == food.x && this.blocks[i].y == food.y) {
        createFood();
      }
    }
  }

  bodyTouch(mange) {
    if (!mange) {
      for (let i = 2; i < this.blocks.length; i++) {
        if (
          this.blocks[0].x == this.blocks[i].x &&
          this.blocks[0].y == this.blocks[i].y
        ) {
          canvas.remove();
          document.body.innerHTML = `
            <div>
            <h2>Perdu !</h2>
            </div>
            `;
        }
      }
    }
  }
}

class Block {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.loc = [];
  }

  draw(color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  undraw() {
    ctx.clearRect(this.x, this.y, this.size, this.size);
  }

  move(direction) {
    if (direction == "z") {
      this.undraw();
      this.y -= this.size;
    } else if (direction == "d") {
      this.undraw();
      this.x += this.size;
    } else if (direction == "s") {
      this.undraw();
      this.y += this.size;
    } else if (direction == "q") {
      this.undraw();
      this.x -= this.size;
    }
  }
}
