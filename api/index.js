// Este arquivo é usado pelo Vercel para servir a API em produção
console.log('Iniciando API handler no Vercel...');

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'http';

// Obter o diretório atual para módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Função para importar dinamicamente
async function importModule(modulePath) {
  try {
    const module = await import(modulePath);
    return module.default || module;
  } catch (error) {
    console.error(`Erro ao importar ${modulePath}:`, error);
    return null;
  }
}

async function startServer() {
  try {
    console.log('Tentando carregar do diretório dist...');
    const serverModule = await importModule('../dist/index.js');
    if (serverModule) {
      console.log('Carregado com sucesso de ../dist/index.js');
      return serverModule;
    }
    
    console.log('Tentando carregar do diretório raiz...');
    const rootModule = await importModule('../index.js');
    if (rootModule) {
      console.log('Carregado com sucesso de ../index.js');
      return rootModule;
    }
    
    // Última tentativa - carregar o server.js diretamente
    console.log('Última tentativa: carregando server.js diretamente...');
    const app = await importModule('./server.js');
    if (app) {
      const port = process.env.PORT || 3000;
      const server = createServer(app);
      server.listen(port, () => {
        console.log(`Servidor rodando na porta ${port} via load direto`);
      });
      return app;
    }
    
    throw new Error('Não foi possível carregar nenhum módulo do servidor');
  } catch (error) {
    console.error('Falha em todas as tentativas de iniciar o servidor:', error.message);
    // Retornar uma função handler para o Vercel
    return (req, res) => {
      res.status(500).send('Erro ao inicializar API. Verifique os logs do Vercel.');
    };
  }
}

// Inicia o servidor e exporta o handler
const app = await startServer();
export default app;
