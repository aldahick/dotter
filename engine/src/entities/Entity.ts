import { AccelerableObject } from "../AccelerableObject";

export class Entity extends AccelerableObject {
  private static lastId = 0;

  readonly id = ++Entity.lastId;
}
