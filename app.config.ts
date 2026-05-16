import { createApp } from "vinxi";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default createApp({
  vite: {
    plugins: [
      tanstackRouter(),
      tanstackStart(),
      react(),
      tsconfigPaths(),
      tailwindcss(),
    ],
  },
});
