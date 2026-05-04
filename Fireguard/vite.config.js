import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_PATH || "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(
              id,
            )
          ) {
            return "react-vendor";
          }
          if (id.includes("node_modules/firebase")) return "firebase";
          if (id.includes("node_modules/recharts")) return "recharts";
          if (id.includes("node_modules/xlsx")) return "xlsx";
          if (id.includes("node_modules/@emailjs")) return "emailjs";
        },
      },
    },
    chunkSizeWarningLimit: 750, // Adjusted limit to account for Firebase + html2canvas
  },
});
