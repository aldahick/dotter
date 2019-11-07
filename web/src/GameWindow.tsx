import { GameSession, BombEnemy, Direction, Player, Entity, Vector2 } from "@dottergame/engine";
import React from "react";

export class GameWindow extends React.Component<{}, {}> {
  private canvas!: HTMLCanvasElement;
  private renderContext!: CanvasRenderingContext2D;

  private keysPressed: {[key: string]: boolean} = {};
  private game = new GameSession();

  componentDidMount() {
    (window as any).gameWindow = this;
    this.game.players.push(new Player(this.game.size.divide(2)));
    window.addEventListener("keydown", evt => this.keysPressed[evt.key] = true);
    window.addEventListener("keyup", evt => this.keysPressed[evt.key] = false);
    this.renderContext = this.canvas.getContext("2d")!;
    this.game.on("lose", () => alert("You lost!"));
    this.loop();
  }

  private loop = () => {
    if (this.game.hasLost) {
      return;
    }
    this.checkKeysPressed();
    this.game.update();
    this.renderFrame();
    setTimeout(this.loop, 1000 / 60);
  };

  private checkKeysPressed() {
    if (this.keysPressed.ArrowUp || this.keysPressed.w) {
      this.game.players[0].accelerate(Direction.Down, Player.acceleration);
    }
    if (this.keysPressed.ArrowDown || this.keysPressed.s) {
      this.game.players[0].accelerate(Direction.Up, Player.acceleration);
    }
    if (this.keysPressed.ArrowLeft || this.keysPressed.a) {
      this.game.players[0].accelerate(Direction.Left, Player.acceleration);
    }
    if (this.keysPressed.ArrowRight || this.keysPressed.d) {
      this.game.players[0].accelerate(Direction.Right, Player.acceleration);
    }
    this.game.players.forEach(p => p.update(this.game));
  }

  private renderFrame() {
    this.renderContext.clearRect(0, 0, this.game.size.x, this.game.size.y);
    this.renderContext.textAlign = "center";
    this.renderContext.textBaseline = "middle";
    for (const enemy of this.game.enemies) {
      let color = "black";
      const elapsedMs = Date.now() - enemy.createdAt;
      if (enemy instanceof BombEnemy) {
        color = `rgb(255, ${0xFF - 0xFF * (elapsedMs / BombEnemy.duration)}, 0)`;
      }
      this.renderCircle(enemy.position, enemy.size.x / 2, color);

      if (enemy instanceof BombEnemy) {
        this.renderContext.beginPath();
        this.renderContext.fillStyle = "white";
        this.renderContext.fillText(
          ((BombEnemy.duration - elapsedMs) / 1000).toFixed(1),
          enemy.position.x + (enemy.size.x / 2),
          enemy.position.y + (enemy.size.y / 2)
        );
        this.renderContext.closePath();
      }
    }
    for (const player of this.game.players) {
      for (const trailPosition of player.trailPositions) {
        this.renderCircle(trailPosition, player.size.x / 4, "lightgreen");
      }
      this.renderCircle(player.position, player.size.x / 2, "green");
    }
  }

  private renderCircle(position: Vector2, radius: number, color: string) {
    this.renderContext.beginPath();
    this.renderContext.fillStyle = color;
    this.renderContext.arc(position.x + radius, position.y + radius, radius, 0, 2 * Math.PI);
    this.renderContext.fill();
    this.renderContext.closePath();
  }

  render() {
    return <canvas ref={c => this.canvas = c!} width={800} height={600} />;
  }
}
