import React from "react";

import { Canvas } from "@components";

const Main = () => {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <Canvas />
    </div>
  );
};

export default Main;
