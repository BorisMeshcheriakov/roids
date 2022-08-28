import AnimationFrame from "./fps";
import { draw_grid, draw_ship, draw_asteroid, draw_pacman } from "./drawing";
import { Mass, Asteroid, Ship } from "./objects";

class App {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  public animationFrameId: number;
  private previous;
  private elapsed;
  private mass;
  private asteroids;
  private ship;

  constructor(appCanvas: HTMLCanvasElement) {
    let canvas = appCanvas;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.context = context;
    this.animationFrameId = 0;
    this.previous = 0;
    this.elapsed = 0;
    this.mass = new Mass(
      this.context.canvas.width / 2,
      this.context.canvas.height / 2,
      10,
      20
    );
    this.asteroids = [];
    for (let i = 0; i < 10; i++) {
      let asteroid = new Asteroid(
        10000,
        Math.random() * context.canvas.width,
        Math.random() * context.canvas.height
      );
      asteroid.push(Math.random() * 2 * Math.PI, 1000, 60);
      asteroid.twist(Math.random() * 100, 60);
      this.asteroids.push(asteroid);
    }
    this.ship = new Ship(context.canvas.width / 2, context.canvas.height / 2);
  }

  private draw = (ctx: CanvasRenderingContext2D): void => {
    draw_grid(ctx);

    this.asteroids.forEach((asteroid) => asteroid.draw(ctx, true));
    this.ship.draw(ctx, true);
  };

  private update(elapsed: number, ctx: CanvasRenderingContext2D) {
    if (Math.abs(this.ship.speed()) < 15) {
      this.ship.angle += Math.PI * 2 * 0.01;
    }

    if (Math.abs(this.ship.speed()) > 100) {
      this.ship.angle = this.ship.movement_angle() + Math.PI;
    }

    this.ship.push(this.ship.angle, 1000, elapsed);

    this.asteroids.forEach((asteroid) => asteroid.update(elapsed, ctx));
    this.ship.update(elapsed, ctx);
  }

  private frame = (timestamp: number) => {
    if (!this.previous) this.previous = timestamp;
    this.elapsed = timestamp - this.previous;
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
    this.update(this.elapsed / 1000, this.context);
    this.draw(this.context);
    this.previous = timestamp;
    window.requestAnimationFrame(this.frame);
  };

  public render = () => {
    window.requestAnimationFrame(this.frame);
  };

  cancel() {
    window.cancelAnimationFrame(this.previous);
  }
}

export default App;
