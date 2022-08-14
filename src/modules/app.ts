import AnimationFrame from "./fps";
import { createGrid, draw_ship, draw_asteroid } from "./drawing";

class App {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  public animationFrameId: number;
  private animate;

  constructor(appCanvas: HTMLCanvasElement) {
    let canvas = appCanvas;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.context = context;
    this.animationFrameId = 0;
    this.animate = new AnimationFrame(this.context, 60, this.draw);
  }

  clear() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }

  private draw = (): void => {
    this.clear();

    createGrid(this.context);

    let segments = 15;
    let noise = 0.4;
    for (let x = 0.1; x < 1; x += 0.2) {
      for (let y = 0.1; y < 1; y += 0.2) {
        this.context.save();
        this.context.translate(
          this.context.canvas.width * x,
          this.context.canvas.height * y
        );
        draw_asteroid(this.context, this.context.canvas.width / 12, segments, {
          noise: noise,
          guide: true,
        });
        this.context.restore();
      }
    }
  };

  public render = () => {
    this.animate.start();
  };

  cancel() {
    this.animate.stop();
  }
}

export default App;
