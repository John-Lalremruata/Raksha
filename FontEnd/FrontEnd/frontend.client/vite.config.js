import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        https: false, // dev server runs http; we proxy to https API
        proxy: {
            "/api": {
                target: "https://localhost:5001",
                changeOrigin: true,
                secure: false // allow self-signed dev cert
            }
        }
    }
});
