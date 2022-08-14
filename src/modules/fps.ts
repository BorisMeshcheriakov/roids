class AnimationFrame {
  private ctx: CanvasRenderingContext2D;
  private requestID;
  private fps;
  private currentFPS: number = 1;
  private times: number[] = [];
  private animate;

  constructor(ctx: CanvasRenderingContext2D, fps = 60, animate: () => void) {
    this.ctx = ctx;
    this.requestID = 0;
    this.fps = fps;
    this.animate = animate;
  }

  countFPS(now: number) {
    while (this.times.length > 0 && this.times[0] <= now - 1000) {
      this.times.shift();
    }
    this.times.push(now);
    this.currentFPS = this.times.length;
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000000";
    this.ctx.font = "14px serif";
    this.ctx.fillText(`Current FPS: ${this.currentFPS.toString()}`, 10, 20);
    this.ctx.closePath();
  }

  start() {
    let then = performance.now();
    const interval = 1000 / this.fps;
    const tolerance = 0.1;

    const animateLoop = (now: number) => {
      this.requestID = window.requestAnimationFrame(animateLoop);
      const delta = now - then;

      if (delta >= interval - tolerance) {
        then = now - (delta % interval);
        this.animate();
        this.countFPS(then);
      }
    };
    this.requestID = requestAnimationFrame(animateLoop);
  }

  stop() {
    window.cancelAnimationFrame(this.requestID);
  }
}

export default AnimationFrame;
