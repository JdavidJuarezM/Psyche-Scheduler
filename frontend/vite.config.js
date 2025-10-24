import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // <-- 1. Importa la librería 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // vvv 2. Añade esta sección 'resolve' vvv
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ^^^ Fin de la sección añadida ^^^
});
