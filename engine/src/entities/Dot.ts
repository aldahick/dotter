import { Vector2 } from "../util/Vector2";
import { GameSession } from "../GameSession";
import { Entity } from "./Entity";

/**
 * Could be a player-controlled or AI-controlled Dot.
 * Could also be a stationary target.
 */
export class Dot extends Entity {
  static readonly acceleration = 0.375;
  static readonly deceleration = Dot.acceleration / 4;

  update(session: GameSession) {
    this.decelerate(Dot.deceleration);
    this.move();
    this.clampToBounds(Vector2.zero(), session.size);
  }
}
