import { detectCollision } from "./collisionDetection.js";

export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("img_brick");

    this.game = game;

    this.position = position;
    this.width = 80;
    this.height = 24;

    this.markedForDeletion = false;
  }

  update() {
    const { isCollision, axis } = detectCollision(this.game.ball, this);
    if (isCollision) {
      if (this.game.ball.speed.x < 0) {
        this.game.ball.speed.x -= 0.5;
      } else {
        this.game.ball.speed.x += 0.5;
      }
      this.game.ball.speed[axis] = -this.game.ball.speed[axis];
      this.game.ball.position[axis] = this.game.ball.prevPosition[axis];

      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
