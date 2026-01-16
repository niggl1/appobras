import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerCronRoutes } from "./cron";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // Configure CORS for hybrid deployment (Vercel frontend + Manus backend)
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://www.appmanutencao.com.br",
    "https://appmanutencao.com.br",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    // Allow all Vercel preview deployments
  ].filter(Boolean);
  
  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      // Allow Vercel preview deployments
      if (origin.includes(".vercel.app") || origin.includes("appmanutencao")) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(null, true); // Allow all for now during development
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  }));
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Cron job routes for automated tasks
  registerCronRoutes(app);
  // Rota para gerar PDF de Ordem de Serviço
  app.get("/api/ordens-servico/:id/pdf", async (req, res) => {
    try {
      const osId = parseInt(req.params.id);
      if (isNaN(osId)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      // Usar a mutation de PDF via tRPC
      const context = await createContext({ req, res, info: { remoteAddress: req.ip || "" } } as any);
      const caller = appRouter.createCaller(context);
      
      const result = await caller.ordensServico.generatePDF({ osId });
      
      if (!result.success) {
        return res.status(500).json({ error: "Erro ao gerar PDF" });
      }

      // Converter base64 para buffer
      const pdfBuffer = Buffer.from(result.pdfBase64, "base64");
      
      // Enviar como download
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${result.filename}"`);
      res.send(pdfBuffer);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      res.status(500).json({ error: "Erro ao gerar PDF" });
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
