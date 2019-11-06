import { expect } from "chai";
import { AccelerableObject } from "./AccelerableObject";
import { Vector2 } from "./util/Vector2";
import { Direction } from "./Direction";

describe("AccelerableObject", () => {
  describe("#accelerate()", () => {
    it("should accelerate correctly", () => {
      const obj = new AccelerableObject(new Vector2(0, 0), new Vector2(1, 1));
      obj.accelerate(Direction.Up, 1);
      obj.move();
      expect(obj.position.equals(new Vector2(1, 1)));
    });
  });
  describe("#clampToBounds", () => {
    it("should clamp to bounds correctly", () => {
      const obj = new AccelerableObject(new Vector2(-1, -1), new Vector2(1, 1));
      obj.accelerate(Direction.Down, 1);
      obj.move();
      obj.clampToBounds(Vector2.zero(), new Vector2(10, 10));
      expect(obj.position.equals(Vector2.zero()));
      expect(obj.velocity.equals(Vector2.zero()));
    });
  });
  describe("#isColliding", () => {
    it("should detect collision correctly", () => {
      const a = new AccelerableObject(new Vector2(0, 0), new Vector2(2, 2));
      const b = new AccelerableObject(new Vector2(1, 1), new Vector2(2, 2));
      expect(a.isColliding(b)).to.equal(true);
    });
  });
});
