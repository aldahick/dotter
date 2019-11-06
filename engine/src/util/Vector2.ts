import * as _ from "lodash";
import { BaseVector2 } from "./BaseVector2";

export class Vector2 extends BaseVector2<number> {
  negative(): Vector2 {
    return new Vector2(this.map(v => -v));
  }

  add(other: Vector2): Vector2 {
    return new Vector2(this.both(other, (a, b) => a + b));
  }

  subtract(other: Vector2): Vector2 {
    return this.add(other.negative());
  }

  clamp(min: Vector2, max: Vector2): Vector2 {
    return new Vector2(this
      .both(min, (v, m) => Math.max(v, m))
      .both(max, (v, M) => Math.min(v, M)));
  }

  static random(min: Vector2, max: Vector2): Vector2 {
    return new Vector2(min.both(max, (m, M) => _.random(m, M)));
  }

  static zero(): Vector2 {
    return new Vector2(0, 0);
  }
}
