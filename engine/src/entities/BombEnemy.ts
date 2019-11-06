import { Vector2 } from "../util/Vector2";
import { Enemy } from "./Enemy";

export class BombEnemy extends Enemy {
  static readonly size = new Vector2(32, 32);
  // Milliseconds
  static readonly duration = 10 * 1000;

  readonly createdAt = Date.now();

  constructor(position: Vector2) {
    super(position, BombEnemy.size);
  }

  hasWon(): boolean {
    return Date.now() - this.createdAt > BombEnemy.duration;
  }
}
