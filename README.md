# Encurtador de URLs com NestJS

Sistema de encurtamento de URLs desenvolvido com NestJS, PostgreSQL e Prisma ORM.

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construir aplicações server-side eficientes e escaláveis
- **PostgreSQL**: Banco de dados relacional robusto e de alta performance
- **Prisma ORM**: ORM moderno para Node.js e TypeScript
- **JWT**: Autenticação e autorização usando JSON Web Tokens
- **Docker**: Containerização da aplicação e dependências
- **TypeScript**: Linguagem de programação tipada que compila para JavaScript
- **Vitest**: Framework de testes moderno e rápido
- **Swagger**: Documentação de API automática

## Funcionalidades

- Criar URLs encurtadas com ou sem autenticação
- Cadastro e autenticação de usuários
- Estatísticas de cliques nas URLs encurtadas
- Redirecionamento de URLs curtas para URLs originais
- Gerenciamento de URLs criadas pelo usuário

## Pré-requisitos

- Docker e Docker Compose instalados
- Node.js (opcional para desenvolvimento local sem Docker)

## Executando com Docker

1. Clone o repositório:

   ```bash
   git clone https://github.com/ViniGSouza/encurtador-nest.git
   cd encurtador-nest
   ```

2. Configure as variáveis de ambiente (opcional):

   ```bash
   cp .env.example .env
   ```

   Você pode editar o arquivo `.env` para personalizar as configurações. Por padrão, o Docker Compose já define as variáveis necessárias.

3. Inicie os containers:

   ```bash
   docker-compose up -d
   ```

4. Acesse a aplicação:
   - API: http://localhost:3333
   - Documentação Swagger: http://localhost:3333/docs

## Executando Localmente (sem Docker)

1. Clone o repositório:

   ```bash
   git clone https://github.com/ViniGSouza/encurtador-nest.git
   cd encurtador-nest
   ```

2. Configure as variáveis de ambiente:

   ```bash
   cp .env.example .env
   ```

   Edite o arquivo `.env` para apontar para sua instância do PostgreSQL.

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Execute as migrações do Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. Inicie a aplicação:

   ```bash
   npm run start:dev
   ```

6. Acesse a aplicação:
   - API: http://localhost:3333
   - Documentação Swagger: http://localhost:3333/docs

## Comandos Úteis

- **Iniciar em modo de desenvolvimento**: `npm run start:dev`
- **Build da aplicação**: `npm run build`
- **Executar testes**: `npm run test`
- **Lint do código**: `npm run lint`
- **Executar migrações do Prisma**: `npx prisma migrate dev`
- **Ver o banco de dados no Prisma Studio**: `npx prisma`
