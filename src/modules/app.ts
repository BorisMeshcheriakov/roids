import AnimationFrame from "./fps";
import { createGrid, draw_ship } from "./drawing";

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
    this.context.lineWidth = 0.5;
    this.context.strokeStyle = "white";
    let x = this.context.canvas.width * 0.9;
    let y = 0;
    let radius = this.context.canvas.width * 0.1;
    createGrid(this.context);
    for (let r = 0; r <= 0.5 * Math.PI; r += 0.05 * Math.PI) {
      this.context.save();
      this.context.rotate(r);
      draw_ship(this.context, x, y, radius, { guide: true });
      this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.lineTo(x, 0);
      this.context.stroke();
      this.context.restore();
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
