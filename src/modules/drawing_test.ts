import { draw_asteroid } from "./drawing";

export function roids_random(ctx: CanvasRenderingContext2D) {
  let segments = 15;
  let noise = 0;
  for (let y = 0.1; y < 1; y += 0.2) {
    for (let x = 0.1; x < 1; x += 0.2) {
      ctx.save();
      ctx.translate(ctx.canvas.width * x, ctx.canvas.height * y);
      draw_asteroid(ctx, ctx.canvas.width / 12, segments, {
        noise: noise,
        guide: true,
      });
      ctx.restore();
      noise += 0.025;
    }
  }
}
