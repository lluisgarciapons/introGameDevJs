export function detectCollision(ball, gameObject) {
  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;

  let topOfObject = gameObject.position.y;
  let bottomOfObject = gameObject.position.y + gameObject.height;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.position.x + ball.size >= leftSideOfObject &&
    ball.position.x <= rightSideOfObject
  ) {
    if (
      ball.prevPosition.y + ball.size < topOfObject ||
      ball.prevPosition.y > bottomOfObject
    ) {
      console.log(ball.prevPosition.x, rightSideOfObject);
      return { isCollision: true, axis: "y" };
    } else {
      return { isCollision: true, axis: "x" };
    }
  } else {
    return { isCollision: false, axis: null };
  }
}
