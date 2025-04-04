# Changelog

## [0.1.0] - 2023-04-03

### Adicionado

- Configuração inicial do projeto com NestJS
- Configuração do Prisma como ORM
- Criação dos modelos do Prisma para User, ShortUrl e UrlClick
- Estrutura base do projeto seguindo princípios de Clean Architecture
- Setup da aplicação com módulos de domínio separados (user e url)

## [0.2.0] - 2023-04-03

### Adicionado

- Implementação das entidades de domínio
- Implementação do contrato base de Repository
- Implementação dos contratos de repositórios (interfaces)
  - UserRepository com método para buscar usuário por email
  - ShortUrlRepository com métodos para:
    - Buscar URL por shortCode
    - Listar URLs por usuário
    - Incrementar contador de cliques
    - Contar URLs por usuário
  - UrlClickRepository com métodos para:
    - Buscar cliques por ID de URL encurtada
    - Listar cliques de uma URL encurtada
    - Contar cliques em uma URL encurtada
  - Implementação dos mappers para conversão entre entidades de domínio e modelos Prisma
    - PrismaUserMapper
    - PrismaShortUrlMapper
    - PrismaUrlClickMapper

### Implementado

- Repositórios Prisma que implementam os contratos definidos:
  - PrismaUserRepository
  - PrismaShortUrlRepository
  - PrismaUrlClickRepository

### Configurado

- Módulo DatabaseModule para injeção de dependências
  - Registro dos repositórios Prisma como implementações dos contratos

## [0.3.0] - 2023-04-03

### Adicionado

- Implementação dos casos de uso para usuários
  - RegisterUserUseCase para cadastro de novos usuários
  - AuthenticateUserUseCase para autenticação com geração de JWT
- Implementação de testes unitários para os casos de uso
- Implementação dos controllers REST para usuários
  - CreateAccountController: Endpoint para criação de usuários
  - AuthenticateController: Endpoint para autenticação (login)
- Validação de dados com Zod
- ZodValidationPipe para transformação e validação de dados de entrada

### Configurado

- Estrutura de testes com Vitest
- Repositórios in-memory para testes unitários
- Documentação da API com Swagger/OpenAPI
  - Descrição dos endpoints
  - Exemplos de requisição e resposta
  - Configuração de autenticação JWT
  - Configuração de tags e categorias

## [0.4.0] - 2023-04-03

### Adicionado

- Implementação dos casos de uso/controllers para o domínio de url
- Criação dos testes unitários
- Melhoria na tipagem das requisições autenticadas

  - Criação da interface centralizada `AuthenticatedRequest` em `src/infra/http/types/authenticated-request.ts`

  ## [1.0.0] - 2023-04-03

### Adicionado

- Descrição do projeto no README
- Husky
- Docker
