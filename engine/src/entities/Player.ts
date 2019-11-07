import { Vector2 } from "../util/Vector2";
import { Dot } from "./Dot";

export class Player extends Dot {
  static readonly size = new Vector2(32, 32);
  static readonly trailLength = 30;

  trailPositions: Vector2[] = [];
  score = 0;

  constructor(position: Vector2) {
    super(position, Player.size);
  }

  move() {
    super.move();
    if (this.trailPositions.length > Player.trailLength) {
      this.trailPositions.splice(0, 1);
    }
    this.trailPositions.push(new Vector2(
      this.position.x + this.size.x * 0.375,
      this.position.y + this.size.y * 0.375
    ));
  }
}
