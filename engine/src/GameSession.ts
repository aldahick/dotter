import { Vector2 } from "./util/Vector2";
import { Player } from "./entities/Player";
import { Enemy } from "./entities/Enemy";
import { EnemySpawner } from "./EnemySpawner";
import { EventEmitter } from "./EventEmitter";

export class GameSession extends EventEmitter {
  readonly size = new Vector2(800, 600);

  hasLost = false;
  readonly enemies: Enemy[] = [];
  readonly players: Player[] = [];

  private spawner = new EnemySpawner(this);

  update() {
    if (this.hasLost) {
      return;
    }
    this.spawner.update();
    for (const player of this.players) {
      for (const enemy of this.enemies) {
        if (player.isColliding(enemy)) {
          this.removeEntity(enemy);
          player.score++;
        }
      }
    }
    const isGameLost = this.enemies.some(e => e.hasWon());
    if (isGameLost) {
      this.emit("lose");
      this.hasLost = true;
    }
  }

  removeEntity<Entity extends Player | Enemy>(entity: Entity) {
    const array: (Enemy | Player)[] = entity instanceof Player ? this.players : this.enemies;
    array.splice(array.findIndex(e => e.id === entity.id), 1);
  }
}
