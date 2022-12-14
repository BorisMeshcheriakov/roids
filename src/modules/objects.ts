import { draw_asteroid, draw_ship } from "./drawing";

export class Mass {
  public x;
  public y;
  private mass;
  public radius;
  public angle;
  public x_speed;
  public y_speed;
  private rotation_speed;
  constructor(
    mass: number,
    radius: number,
    x: number,
    y: number,
    angle?: number,
    x_speed?: number,
    y_speed?: number,
    rotation_speed?: number
  ) {
    this.x = x || 0;
    this.y = y || 0;
    this.mass = mass || 1;
    this.radius = radius || 50;
    this.angle = angle || 0;
    this.x_speed = x_speed || 0;
    this.y_speed = y_speed || 0;
    this.rotation_speed = rotation_speed || 0;
  }

  update(elapsed: number, ctx: CanvasRenderingContext2D) {
    this.x += this.x_speed * elapsed;
    this.y += this.y_speed * elapsed;

    this.angle += this.rotation_speed * elapsed;
    this.angle %= 2 * Math.PI;
    if (this.x - this.radius > ctx.canvas.width) {
      this.x = -this.radius;
    }
    if (this.x + this.radius < 0) {
      this.x = ctx.canvas.width + this.radius;
    }
    if (this.y - this.radius > ctx.canvas.height) {
      this.y = -this.radius;
    }
    if (this.y + this.radius < 0) {
      this.y = ctx.canvas.height + this.radius;
    }
  }

  push(angle: number, force: number, elapsed: number) {
    this.x_speed += (elapsed * (Math.cos(angle) * force)) / this.mass;
    this.y_speed += (elapsed * (Math.sin(angle) * force)) / this.mass;
  }

  twist(force: number, elapsed: number) {
    this.rotation_speed += (elapsed * force) / this.mass;
  }

  speed() {
    return Math.sqrt(Math.pow(this.x_speed, 2) + Math.pow(this.y_speed, 2));
  }

  movement_angle() {
    return Math.atan2(this.y_speed, this.x_speed);
  }

  draw(c: CanvasRenderingContext2D) {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle);
    c.beginPath();
    c.arc(0, 0, this.radius, 0, 2 * Math.PI);
    c.lineTo(0, 0);
    c.strokeStyle = "#FFFFFF";
    c.stroke();
    c.restore();
  }
}

export class Asteroid extends Mass {
  private circumference;
  private segments;
  private noise;
  private shape;
  constructor(
    mass: number,
    x: number,
    y: number,
    x_speed?: number,
    y_speed?: number,
    rotation_speed?: number
  ) {
    let density = 1;
    let radius = Math.sqrt(mass / density / Math.PI);
    super(mass, radius, x, y, 0, x_speed, y_speed, rotation_speed);
    this.circumference = 2 * Math.PI * radius;
    this.segments = Math.ceil(this.circumference / 15);
    this.segments = Math.min(25, Math.max(5, this.segments));
    this.noise = 0.2;
    this.shape = [];
    for (let i = 0; i < this.segments; i++) {
      this.shape.push(2 * (Math.random() - 0.5));
    }
  }

  draw(ctx: CanvasRenderingContext2D, guide?: boolean) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    draw_asteroid(ctx, this.radius, this.shape, {
      noise: this.noise,
      guide: guide,
    });
    ctx.restore();
  }
}

export class Ship extends Mass {
  constructor(x: number, y: number) {
    super(10, 20, x, y, 1.5 * Math.PI);
  }

  draw(ctx: CanvasRenderingContext2D, guide?: boolean) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.fillStyle = "black";
    draw_ship(ctx, this.radius, {
      guide: guide,
    });
    ctx.restore();
  }
}
