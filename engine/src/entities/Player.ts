import { Vector2 } from "../util/Vector2";
import { Dot } from "./Dot";

export class Player extends Dot {
  static readonly size = new Vector2(32, 32);

  score = 0;

  constructor(position: Vector2) {
    super(position, Player.size);
  }
}
