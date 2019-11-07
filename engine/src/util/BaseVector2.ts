export class BaseVector2<Value> {
  x: Value;
  y: Value;

  constructor(vector: BaseVector2<Value>);
  constructor(x: Value, y: Value);
  constructor(vectorOrX: BaseVector2<Value> | Value, y?: Value) {
    if (vectorOrX instanceof BaseVector2) {
      this.x = vectorOrX.x;
      this.y = vectorOrX.y;
    } else {
      this.x = vectorOrX;
      this.y = y!;
    }
  }

  equals(other: BaseVector2<Value>): boolean {
    return this.x === other.x && this.y === other.y;
  }

  both<Other, Return>(other: BaseVector2<Other> | Other, predicate: (a: Value, b: Other, key: "x" | "y") => Return): BaseVector2<Return> {
    if (!(other instanceof BaseVector2)) {
      return this.both(new BaseVector2(other, other), predicate);
    }
    return this.map((value, key) => predicate(value, other[key], key));
  }

  map<Return>(predicate: (value: Value, key: "x" | "y") => Return): BaseVector2<Return> {
    return new BaseVector2(
      predicate(this.x, "x"),
      predicate(this.y, "y")
    );
  }
}
