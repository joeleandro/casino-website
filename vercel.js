// Vercel build script
import { execSync } from 'child_process';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual para módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construir o frontend com Vite
console.log('Building frontend with Vite...');
try {
  execSync('vite build', { stdio: 'inherit' });
} catch (error) {
  console.error('Error building frontend:', error);
  process.exit(1);
}

// Construir o backend com esbuild ignorando erros de tipagem
console.log('Building backend with esbuild...');
try {
  // Configurar variáveis de ambiente para ignorar erros de TypeScript
  process.env.TS_NODE_PROJECT = 'tsconfig.vercel.json';
  process.env.TS_NODE_TRANSPILE_ONLY = 'true';
  
  // Compila para dist
  execSync('esbuild server/index.ts server/routes.ts server/auth.ts server/storage.ts server/stripe.ts --platform=node --packages=external --bundle --format=cjs --outdir=dist --log-level=warning', { 
    stdio: 'inherit',
    env: { ...process.env, TS_NODE_COMPILER_OPTIONS: '{"module":"commonjs"}' }
  });
  
  // Copia também para a raiz (alternativa de caminho para o Vercel)
  console.log('Copying files to root directory for Vercel compatibility...');
  fs.copyFileSync('dist/routes.js', 'routes.js');
  fs.copyFileSync('dist/auth.js', 'auth.js');
  fs.copyFileSync('dist/storage.js', 'storage.js');
  
  if (fs.existsSync('dist/stripe.js')) {
    fs.copyFileSync('dist/stripe.js', 'stripe.js');
  }
} catch (error) {
  console.error('Error building backend:', error);
  process.exit(1);
}

console.log('Build completed successfully!');
