import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import plugin from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";

// const baseFolder =
//   env.APPDATA !== undefined && env.APPDATA !== ""
//     ? `${env.APPDATA}/ASP.NET/https`
//     : `${env.HOME}/.aspnet/https`;

// const certificateName = "pichub.client";
// const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
// const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

// if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
//   if (
//     0 !==
//     child_process.spawnSync(
//       "dotnet",
//       [
//         "dev-certs",
//         "https",
//         "--export-path",
//         certFilePath,
//         "--format",
//         "Pem",
//         "--no-password",
//       ],
//       { stdio: "inherit" }
//     ).status
//   ) {
//     throw new Error("Could not create certificate.");
//   }
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin(), mkcert()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "^/api": {
        target: "https://localhost:4000",
        secure: false,
      },
    },
    port: 3000,
    // https: {
    //   key: fs.readFileSync(keyFilePath),
    //   cert: fs.readFileSync(certFilePath),
    // },
  },
});
