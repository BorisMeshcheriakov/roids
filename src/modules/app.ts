import AnimationFrame from "./fps";
import Asteroid from "./asteroid";
import { draw_grid, draw_ship, draw_asteroid, draw_pacman } from "./drawing";

class App {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  public animationFrameId: number;
  // private animate;
  private previous;
  private elapsed;

  constructor(appCanvas: HTMLCanvasElement) {
    let canvas = appCanvas;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.context = context;
    this.animationFrameId = 0;
    // this.animate = new AnimationFrame(this.context, 60, this.draw);
    this.previous = 0;
    this.elapsed = 0;
  }

  private draw = (ctx: CanvasRenderingContext2D): void => {
    draw_grid(ctx);
  };

  private update(elapsed: number) {}

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
