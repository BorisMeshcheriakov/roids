import React from "react";
import { createRoot } from "react-dom/client";

import { Main } from "./pages";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<Main />);
