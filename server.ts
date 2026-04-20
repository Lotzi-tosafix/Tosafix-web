import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cron from "node-cron";
import { expressApp, syncExtensionsStats } from "./server-app.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Mount existing API 
  app.use(expressApp);

  // Set up node-cron (only runs correctly here on long-running node servers like Cloud Run)
  cron.schedule('0 0 * * *', () => {
    console.log('Running daily Chrome Store sync (Local/Cloud Run node-cron)');
    syncExtensionsStats();
  });
  
  // Run once on startup asynchronously
  syncExtensionsStats();

  
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Fixed express version 4 to 5 routing '*' -> '*all' if express 5+, but typically its '*' in express 4 
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
