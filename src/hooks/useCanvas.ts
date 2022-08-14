import React from "react";
import { App } from "@modules";

const useCanvas = () => {
  const canvasRef = React.useRef<null | HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const app = new App(canvas);

    app.render();

    return () => {
      app.cancel();
    };
  }, []);

  return { ref: canvasRef };
};

export default useCanvas;
