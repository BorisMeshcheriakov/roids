export class Mass {
  private x;
  private y;
  private mass;
  private radius;
  private angle;
  private x_speed;
  private y_speed;
  private rotation_speed;
  constructor(
    x: number,
    y: number,
    mass: number,
    radius: number,
    angle?: number,
    x_speed?: number,
    y_speed?: number,
    rotation_speed?: number
  ) {
    this.x = x;
    this.y = y;
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
