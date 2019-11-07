import * as _ from "lodash";
import { Vector2 } from "./util/Vector2";
import { Direction } from "./Direction";

export class AccelerableObject {
  velocity = new Vector2(0, 0);

  constructor(
    public position: Vector2,
    readonly size: Vector2
  ) { }

  accelerate(direction: Direction, force: number) {
    switch (direction) {
      case Direction.Up:
        return this.velocity.y += force;
      case Direction.Down:
        return this.velocity.y -= force;
      case Direction.Left:
        return this.velocity.x -= force;
      case Direction.Right:
        return this.velocity.x += force;
    }
  }

  decelerate(increment: number) {
    this.velocity = new Vector2(this.velocity.map(v => {
      if (v > 0) { return v - increment; }
      else if (v < 0) { return v + increment; }
      return 0;
    }));
  }

  move() {
    this.position = this.position.add(this.velocity);
  }

  /**
   *
   * @returns true if clamped
   */
  clampToBounds(min: Vector2, max: Vector2): boolean {
    const oldPosition = new Vector2(this.position);
    this.position = this.position.clamp(min, max.subtract(this.size));
    let wasClamped = false;
    if (this.position.x !== oldPosition.x) {
      this.velocity.x = 0;
      wasClamped = true;
    }
    if (this.position.y !== oldPosition.y) {
      this.velocity.y = 0;
      wasClamped = true;
    }
    return wasClamped;
  }

  isColliding(other: AccelerableObject): boolean {
    return (
      this.position.x < other.position.x + other.size.x &&
      this.position.x + this.size.x > other.position.x &&
      this.position.y < other.position.y + other.size.y &&
      this.position.y + this.size.y > other.position.y
    );
  }
}
