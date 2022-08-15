import AnimationFrame from "./fps";
import Asteroid from "./asteroid";
import { createGrid, draw_ship, draw_asteroid, draw_pacman } from "./drawing";

class App {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  public animationFrameId: number;
  // private animate;
  private previous;
  private asteroids;

  constructor(appCanvas: HTMLCanvasElement) {
    let canvas = appCanvas;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.context = context;
    this.animationFrameId = 0;
    // this.animate = new AnimationFrame(this.context, 60, this.draw);
    this.previous = 0;
    this.asteroids = [
      new Asteroid(this.context, 24, 50, 0.2),
      // new Asteroid(this.context, 24, 50, 0.5),
      // new Asteroid(this.context, 5, 50, 0.2),
    ];
  }

  clear() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }

  private draw = (ctx: CanvasRenderingContext2D, guide: boolean): void => {
    if (guide) {
      createGrid(ctx);
    }
    this.asteroids.forEach((roid) => roid.draw(ctx, guide));
  };

  private update(elapsed: number, ctx: CanvasRenderingContext2D) {
    this.asteroids.forEach((roid) => roid.update(elapsed, ctx));
  }

  private frame = (timestamp: number) => {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
    if (!this.previous) this.previous = timestamp;
    this.update(timestamp / 1000, this.context);
    this.draw(this.context, true);
    this.previous = timestamp;
    window.requestAnimationFrame(this.frame);
  };

  public render = () => {
    // this.animate.start();

    window.requestAnimationFrame(this.frame);
  };

  cancel() {
    // this.animate.stop();
    // window.cancelAnimationFrame();
  }
}

export default App;
