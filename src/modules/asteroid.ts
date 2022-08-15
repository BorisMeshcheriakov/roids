import { draw_asteroid } from "./drawing";

class Asteroid {
  private context;
  private segments: number;
  public radius: number;
  public shape: number[];
  public noise: number;
  public x: number;
  public y: number;
  public angle: number;
  public x_speed: number;
  public y_speed: number;
  public rotation_speed: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    segments: number,
    radius: number,
    noise: number
  ) {
    this.context = ctx;
    this.segments = segments;
    this.radius = radius;
    this.shape = [];
    this.noise = noise;
    this.x = ctx.canvas.width * Math.random();
    this.y = ctx.canvas.height * Math.random();
    this.angle = 0;
    this.x_speed = ctx.canvas.width * (Math.random() - 0.5);
    this.y_speed = ctx.canvas.height * (Math.random() - 0.5);
    this.rotation_speed = 2 * Math.PI * (Math.random() - 0.5);
    for (let i = 0; i < segments; i++) {
      this.shape.push(Math.random() - 0.5);
    }
  }

  update(elapsed: number, context: CanvasRenderingContext2D) {
    if (this.x - this.radius + elapsed * this.x_speed > context.canvas.width) {
      this.x = -this.radius;
    }
    if (this.x + this.radius + elapsed * this.x_speed < 0) {
      this.x = context.canvas.width + this.radius;
    }
    if (this.y - this.radius + elapsed * this.y_speed > context.canvas.height) {
      this.y = -this.radius;
    }
    if (this.y + this.radius + elapsed * this.y_speed < 0) {
      this.y = context.canvas.height + this.radius;
    }
    this.x += this.x_speed;
    this.y += this.y_speed;
    this.angle = (this.angle + this.rotation_speed) % (2 * Math.PI);
  }

  draw(ctx: CanvasRenderingContext2D, guide: boolean) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    draw_asteroid(ctx, this.radius, this.shape, {
      guide: guide,
      noise: this.noise,
    });
    ctx.restore();
  }
}

export default Asteroid;
