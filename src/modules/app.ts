import AnimationFrame from "./fps";
import { draw_grid, draw_ship, draw_asteroid, draw_pacman } from "./drawing";
import { Mass, Asteroid } from "./objects";

class App {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  public animationFrameId: number;
  // private animate;
  private previous;
  private elapsed;
  private mass;
  private asteroids;

  constructor(appCanvas: HTMLCanvasElement) {
    let canvas = appCanvas;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.context = context;
    this.animationFrameId = 0;
    // this.animate = new AnimationFrame(this.context, 60, this.draw);
    this.previous = 0;
    this.elapsed = 0;
    this.mass = new Mass(
      this.context.canvas.width / 2,
      this.context.canvas.height / 2,
      10,
      20
    );
    this.asteroids = [
      new Asteroid(
        10000,
        Math.random() * this.context.canvas.width,
        Math.random() * this.context.canvas.height
      ),
      new Asteroid(
        1000,
        Math.random() * this.context.canvas.width,
        Math.random() * this.context.canvas.height
      ),
      new Asteroid(
        100,
        Math.random() * this.context.canvas.width,
        Math.random() * this.context.canvas.height
      ),
    ];
  }

  private draw = (ctx: CanvasRenderingContext2D): void => {
    draw_grid(ctx);
    this.asteroids.forEach((asteroid) => asteroid.draw(ctx, true));
  };

  private update(elapsed: number) {
    this.mass.update(elapsed, this.context);
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
    this.update(timestamp / 1000);
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
