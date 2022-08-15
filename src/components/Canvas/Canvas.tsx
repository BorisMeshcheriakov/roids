import React from "react";

import { useCanvas } from "@hooks";

const Canvas = () => {
  const { ref } = useCanvas();
  return (
    <canvas
      style={{ border: "1px solid black" }}
      ref={ref}
      width={800}
      height={800}
    ></canvas>
  );
};

export default Canvas;
