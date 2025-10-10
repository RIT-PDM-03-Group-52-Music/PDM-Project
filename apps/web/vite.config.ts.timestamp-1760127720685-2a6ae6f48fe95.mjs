// vite.config.ts
import react from "file:///Users/tylerweiss/Documents/GitHub/PDM-Project/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@5.4.19_@types+node@24.3.1_lightningcss@1.30.1_/node_modules/@vitejs/plugin-react/dist/index.js";
import { defineConfig } from "file:///Users/tylerweiss/Documents/GitHub/PDM-Project/node_modules/.pnpm/vite@5.4.19_@types+node@24.3.1_lightningcss@1.30.1/node_modules/vite/dist/node/index.js";
import tailwindcss from "file:///Users/tylerweiss/Documents/GitHub/PDM-Project/node_modules/.pnpm/@tailwindcss+vite@4.1.13_vite@5.4.19_@types+node@24.3.1_lightningcss@1.30.1_/node_modules/@tailwindcss/vite/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: { "/api": { target: "http://localhost:3001", changeOrigin: true } }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdHlsZXJ3ZWlzcy9Eb2N1bWVudHMvR2l0SHViL1BETS1Qcm9qZWN0L2FwcHMvd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdHlsZXJ3ZWlzcy9Eb2N1bWVudHMvR2l0SHViL1BETS1Qcm9qZWN0L2FwcHMvd2ViL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy90eWxlcndlaXNzL0RvY3VtZW50cy9HaXRIdWIvUERNLVByb2plY3QvYXBwcy93ZWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cGx1Z2luczogW3JlYWN0KCksIHRhaWx3aW5kY3NzKCldLFxuXHRzZXJ2ZXI6IHtcblx0XHRwb3J0OiA1MTczLFxuXHRcdHByb3h5OiB7IFwiL2FwaVwiOiB7IHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDFcIiwgY2hhbmdlT3JpZ2luOiB0cnVlIH0gfSxcblx0fSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VixPQUFPLFdBQVc7QUFDelcsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxpQkFBaUI7QUFFeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUyxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7QUFBQSxFQUNoQyxRQUFRO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEseUJBQXlCLGNBQWMsS0FBSyxFQUFFO0FBQUEsRUFDMUU7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
