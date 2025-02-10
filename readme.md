# API de Gerenciamento um E-commerce

## Introdução

Uma API para gerenciamento de um e-commerce de forma completa desenvolvida com Node.js, Express, PrismaORM e Mongodb.

## Tecnologias

- Linguagem: [Node.js](https://nodejs.org)
- Framework: [Express.js](https://expressjs.com/)
- ORM: [PrismaORM](https://www.prisma.io)
- Banco de Dados: [MongoDB](https://www.mongodb.com/)
- Autenticação: [JWT](https://jwt.io)
- Gerenciamento de Dependências: [pnpm](https://pnpm.io)

## Endpoints

| Método     | Endpoint               | Descrição                                   |
| ---------- | ---------------------- | ------------------------------------------- |
| **POST**   | `/auth/sign-up`        | Registrar um novo usuário                   |
| **POST**   | `/auth/sign-in`        | Fazer login e obter o token de autenticação |

## Instalação

Clone o repositório:

```bash
git clone https://github.com/izaiasmorais/spike-api
cd spike-api
```

Instale as dependências:

```bash
pnpm install
```

Configure o arquivo .env com suas credenciais:

```env
DATABASE_URL=""
JWT_SECRET=""
PORT=3333
```

Gere o prisma client:

```bash
pnpm dlx prisma generate
```

## Executando o Projeto

Inicie o servidor:

```bash
pnpm dev
```
