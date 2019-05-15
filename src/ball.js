import { detectCollision } from "./collisionDetection.js";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.size = 20;
    this.reset();
  }

  reset() {
    this.position = { x: 10, y: 400 };
    this.prevPosition = {};
    this.speed = { x: 4, y: -2 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.prevPosition.x = this.position.x;
    this.prevPosition.y = this.position.y;
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // Wall on left or right
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // Wall on top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // Bottom of the game
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }
    const { isCollision, axis } = detectCollision(this, this.game.paddle);
    if (isCollision) {
      this.speed[axis] = -this.speed[axis];
      this.game.ball.position[axis] = this.game.ball.prevPosition[axis];
      // this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
