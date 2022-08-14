export const createGrid = (
  ctx: CanvasRenderingContext2D,
  minor?: number,
  major?: number,
  stroke?: string,
  fill?: string
) => {
  minor = minor || 10;
  major = major || minor * 5;
  stroke = stroke || "#00FF00";
  fill = fill || "#009900";
  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  for (var x = 0; x < ctx.canvas.width; x += minor) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);
    ctx.lineWidth = x % major == 0 ? 0.5 : 0.25;
    ctx.stroke();
    if (x % major == 0) {
      ctx.fillText(x.toString(), x, 10);
    }
  }
  for (var y = 0; y < ctx.canvas.height; y += minor) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(ctx.canvas.width, y);
    ctx.lineWidth = y % major == 0 ? 0.5 : 0.25;
    ctx.stroke();
    if (y % major == 0) {
      ctx.fillText(y.toString(), 0, y + 10);
    }
  }
  ctx.restore();
};

export function draw_ship(
  ctx: CanvasRenderingContext2D,
  radius: number,
  options: any
) {
  options = options || {};
  let angle = (options.angle || 0.5 * Math.PI) / 2;
  let curve = options.curve || 0.5;
  ctx.save();
  if (options.guide) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
  ctx.lineWidth = options.lineWidth || 2;
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "black";
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(
    Math.cos(Math.PI - angle) * radius,
    Math.sin(Math.PI - angle) * radius
  );
  ctx.quadraticCurveTo(
    radius * curve - radius,
    0,
    Math.cos(Math.PI + angle) * radius,
    Math.sin(Math.PI + angle) * radius
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  if (options.guide) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(-radius, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(radius * curve - radius, 0, radius / 50, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}

export function draw_asteroid(
  ctx: CanvasRenderingContext2D,
  radius: number,
  segments: number,
  options: any
) {
  options = options || {};
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "black";
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < segments; i++) {
    ctx.rotate((2 * Math.PI) / segments);
    ctx.lineTo(radius + radius * options.noise * (Math.random() - 0.5), 0);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (options.guide) {
    (ctx.lineWidth = 0), 5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}
