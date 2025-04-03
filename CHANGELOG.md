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
