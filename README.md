# Prova Técnica Fullstack

Este é um projeto fullstack desenvolvido como parte de uma **prova técnica para vaga de Desenvolvedor(a) Júnior Fullstack**, utilizando as seguintes tecnologias:

- **Frontend:** React + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Banco de Dados:** PostgreSQL com Prisma ORM
- **Autenticação:** JWT
- **Estilização:** CSS Modular e componentes personalizados

## 📁 Estrutura de Pastas

```
epta-teste/
├── packages/
│   ├── Back/      → API (Node + Express + Prisma)
│   └── Front/     → Interface (React + Vite + TS)
├── package.json   → Script principal com concurrently
└── README.md
```

---

## 🚀 Funcionalidades Implementadas

### ✅ Backend (Node + Express + Prisma)
- Login com autenticação JWT
- CRUD completo de veículos:
  - Criar veículo
  - Listar veículos
  - Editar veículo
  - Arquivar e desarquivar veículo
  - Excluir veículo
- Middleware de autenticação

### ✅ Frontend (React + Vite)
- Tela de login
- Dashboard com cards informativos
- Tabela com veículos e ações (editar, arquivar, excluir)
- Modal de criação de veículos

---

## 📦 Dependências Instaladas

### 📌 Na raiz do projeto
- `concurrently`

```bash
npm install --save-dev concurrently
```

### 📌 Backend (`packages/Back/`)
- `express`
- `cors`
- `jsonwebtoken`
- `bcrypt`
- `dotenv`
- `prisma`
- `@prisma/client`
- `zod`
- `ts-node-dev` (dev)
- `typescript` (dev)
- `@types/*` (dev)

```bash
npm install express cors jsonwebtoken bcrypt dotenv prisma @prisma/client zod
npm install -D ts-node-dev typescript @types/express @types/bcrypt @types/jsonwebtoken @types/node
npx prisma init
```

### 📌 Frontend (`packages/Front/`)
- `react`
- `react-dom`
- `axios`
- `vite`
- `typescript`
- `@types/react`
- `@types/react-dom`

```bash
npm create vite@latest
npm install axios
npm install -D typescript @types/react @types/react-dom
```

---

## 🔧 Como Rodar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/epta-teste.git
cd epta-teste
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados PostgreSQL e o arquivo `.env` dentro de `packages/Back`:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta"
```

4. Rode as migrações e gere o client do Prisma:

```bash
cd packages/Back
npx prisma migrate dev
npx prisma generate
```

5. Volte para a raiz e rode o projeto:

```bash
cd ../..
npm run dev
```

O frontend estará disponível em `http://localhost:5173` e o backend em `http://localhost:3000`.

---

## 🧪 Teste Rápido

- Crie um novo usuário diretamente no banco com senha criptografada (ou adicione manualmente).
- Faça login com email/senha na interface.
- Cadastre veículos, arquive, edite ou exclua conforme desejado.

---

## 📌 Observações Finais

- #### Projeto não finalizado!
- Projeto modular com separação clara de responsabilidades.
- Tipagens completas com TypeScript.
- Pronto para evoluções: testes, deploy, responsividade e segurança.

---

Feito para a prova técnica da EPTA.