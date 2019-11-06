import { BombEnemy } from "./entities/BombEnemy";
import { Vector2 } from "./util/Vector2";
import { GameSession } from "./GameSession";

export class EnemySpawner {
  static maxCount = 25;
  /** Milliseconds */
  static spawnInterval = 500;

  private lastSpawnTime = 0;

  constructor(
    private session: GameSession
  ) { }

  update() {
    const now = Date.now();
    if (now - this.lastSpawnTime > EnemySpawner.spawnInterval && this.session.enemies.length < EnemySpawner.maxCount) {
      this.lastSpawnTime = Date.now();
      this.spawnEnemy();
    }
  }

  spawnEnemy() {
    const position = Vector2.random(BombEnemy.size, this.session.size.subtract(BombEnemy.size));
    this.session.enemies.push(new BombEnemy(position));
  }
}
