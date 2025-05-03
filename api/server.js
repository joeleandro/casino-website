// This file is used by Vercel for serverless function deployment
// Ensure environment variables are loaded
import 'dotenv/config';

import express from 'express';
import session from 'express-session';

// Create Express application
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Load routes and auth from bundled CJS files
let setupAuth, registerRoutes;

import { createServer } from 'http';
import { pathToFileURL } from 'url';

// Função para importar dinamicamente
async function importModule(modulePath) {
  try {
    // Convert path to file URL format for dynamic import
    const moduleUrl = pathToFileURL(modulePath).href;
    return await import(moduleUrl);
  } catch (error) {
    console.error(`Error importing ${modulePath}:`, error);
    return null;
  }
}

// Tenta carregar os módulos
async function loadModules() {
  try {
    // Tenta importar do diretório dist (produção)
    const authModule = await importModule('../dist/auth.js');
    const routesModule = await importModule('../dist/routes.js');
    
    if (authModule && routesModule) {
      setupAuth = authModule.setupAuth;
      registerRoutes = routesModule.registerRoutes;
      console.log('Importado módulos da pasta dist');
      return true;
    }
    
    // Alternativa: tenta importar da raiz
    const rootAuthModule = await importModule('../auth.js');
    const rootRoutesModule = await importModule('../routes.js');
    
    if (rootAuthModule && rootRoutesModule) {
      setupAuth = rootAuthModule.setupAuth;
      registerRoutes = rootRoutesModule.registerRoutes;
      console.log('Importado módulos da pasta raiz');
      return true;
    }
    
    throw new Error('Não foi possível importar os módulos necessários');
  } catch (error) {
    console.error('Erro ao carregar módulos:', error.message);
    
    // Definir funções vazias para evitar erros
    setupAuth = (app) => console.error('Auth module not found');
    registerRoutes = (app) => {
      console.error('Routes module not found');
      return createServer(app);
    };
    
    return false;
  }
}

// Carrega os módulos
await loadModules();

// Enable CORS for all origins in development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Setup authentication with session support
try {
  setupAuth(app);
  console.log('Authentication setup complete');
} catch (error) {
  console.error('Error setting up authentication:', error);
}

// Register API routes
try {
  registerRoutes(app);
  console.log('Routes registered successfully');
} catch (error) {
  console.error('Error registering routes:', error);
}

// Export the Express API
export default app;
