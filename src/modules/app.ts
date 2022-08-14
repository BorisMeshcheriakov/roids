import AnimationFrame from "./fps";

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
    // draw function here
  };

  public render = () => {
    this.animate.start();
  };

  cancel() {
    this.animate.stop();
  }
}

export default App;
