# Casino Bots Website

Um site profissional para venda de bots de cassino direcionados aos mercados de Angola e Portugal.

## Tecnologias Utilizadas

- Frontend: React, Tailwind CSS, Shadcn UI
- Backend: Express.js
- Banco de Dados: PostgreSQL (Neon)
- Hospedagem: Vercel

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL=sua_string_de_conexao_postgresql
SESSION_SECRET=string_aleatoria_para_seguranca
```

### Instalação

```bash
npm install
npm run db:push  # Cria as tabelas no banco de dados
npm run dev      # Inicia o servidor de desenvolvimento
```

## Estrutura do Projeto

- `/client`: Frontend React
- `/server`: Backend Express
- `/shared`: Schemas compartilhados (Drizzle ORM)
- `/db`: Configurações do banco de dados

## Recursos

- Página inicial com destaque para os bots
- Página de produtos com detalhes
- Botão "Comprar" que redireciona para WhatsApp
- Área administrativa para gerenciar produtos
- Design responsivo para desktop e mobile

## Banco de Dados

O projeto utiliza PostgreSQL com Drizzle ORM. As principais tabelas são:

- `products`: Armazena informações sobre os bots disponíveis
- `users`: Gerencia usuários administrativos

## Deployment

O projeto está configurado para deploy automático no Vercel, conectado ao GitHub.