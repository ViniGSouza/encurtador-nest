# Encurtador de URLs com NestJS

Sistema de encurtamento de URLs desenvolvido com NestJS, PostgreSQL e Prisma ORM.

## Aplicação Deployada

- https://encurtador-nest.onrender.com/
- Documentação Swagger: https://encurtador-nest.onrender.com/docs

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

## Considerações para Escalabilidade Horizontal

### Pontos de Melhoria para Escalabilidade

1. **Implementação de Cache Distribuído**: Utilizar Redis para armazenar URLs frequentemente acessadas, reduzindo a carga no banco de dados.

2. **Balanceamento de Carga**: Implementar um load balancer para distribuir o tráfego entre múltiplas instâncias da aplicação.

3. **Banco de Dados Escalável**: Considerar a implementação de sharding e replicação no PostgreSQL ou migração para um banco de dados distribuído.

4. **Serviço de Filas**: Implementar um sistema de filas (como RabbitMQ ou Apache Kafka) para processar operações assíncronas, como geração de estatísticas.

5. **Armazenamento de Sessão Distribuído**: Extrair o gerenciamento de sessão/tokens para um serviço dedicado.

### Desafios da Escalabilidade Horizontal

1. **Consistência de Dados**: Garantir que todas as instâncias da aplicação tenham acesso consistente aos mesmos dados.

2. **Gerenciamento de Estado**: Lidar com o estado da aplicação entre várias instâncias.

3. **Monitoramento e Observabilidade**: Implementar ferramentas eficientes de monitoramento para identificar gargalos de performance.

4. **Estratégia de Migração de Banco de Dados**: Migrar de uma arquitetura monolítica para distribuída sem interrupções de serviço.

5. **Latência de Redirecionamento**: Manter baixa a latência no serviço de redirecionamento, que é crítico para a experiência do usuário.

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
