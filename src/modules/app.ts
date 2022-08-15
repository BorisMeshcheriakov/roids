import AnimationFrame from "./fps";
import { createGrid, draw_ship, draw_asteroid } from "./drawing";

class App {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  public animationFrameId: number;
  private animate;
  private x: number = 0;
  private y: number = 0;
  private yspeed: number = 0;
  private gravity: number = 0.1;

  constructor(appCanvas: HTMLCanvasElement) {
    let canvas = appCanvas;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.context = context;
    this.animationFrameId = 0;
    this.animate = new AnimationFrame(this.context, 60, this.draw);
    this.y = this.context.canvas.height / 2;
  }

  clear() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }

  private update() {
    this.x += 3;
    this.y += this.yspeed;
    this.yspeed += this.gravity;
    if (this.y >= this.context.canvas.height) {
      this.yspeed *= -0.9;
    }
    if (this.x <= 0 || this.x >= this.context.canvas.width) {
      this.x = (this.x + this.context.canvas.width) % this.context.canvas.width;
    }
  }

  private draw = (): void => {
    this.clear();
    createGrid(this.context);
    this.context.strokeStyle = "white";
    this.context.lineWidth = 1.5;

    this.context.beginPath();
    this.context.arc(this.x, this.y, 40, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
    this.update();
  };

  public render = () => {
    this.animate.start();
  };

  cancel() {
    this.animate.stop();
  }
}

export default App;
