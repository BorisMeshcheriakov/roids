import React from "react";

import { useCanvas } from "@hooks";

const Canvas = () => {
  const { ref } = useCanvas();
  return (
    <canvas
      style={{ border: "1px solid black" }}
      ref={ref}
      width={600}
      height={600}
    ></canvas>
  );
};

export default Canvas;
