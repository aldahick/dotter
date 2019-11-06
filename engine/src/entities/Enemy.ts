import { Dot } from "./Dot";

export abstract class Enemy extends Dot {
  abstract hasWon(): boolean;
}
