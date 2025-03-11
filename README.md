<div align="center">
  <h1>GoRest Blog Posts</h1>
</div>

![App screenshot](/public/gorest-blog-ss.png)

> ℹ️ A simple blog web app with [GoRest](https://gorest.co.in) API

> 🌐 Shipped on [▲ Vercel](https://vercel.com). Live Preview: [https://a8k-gorest.vercel.app](https://a8k-gorest.vercel.app)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Clone the Repository](#2-clone-the-repository)
  - [3. Instalation](#3-instalation)
- [Usage](#usage)
  - [Start the development server](#start-the-development-server)
- [Project Structure](#project-structure)

## Technologies
Some of the technologies used in this project:
- ⚛️ [React](https://react.dev) — The main frontend library
- ▲ [Next.js (pages router)](https://nextjs.org) — React framework
- 💨 [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework
- 💎 [Ant Design](https://ant.design) — UI component library
- 🔷 [TypeScript](https://typescriptlang.org) — A typed superset of JavaScript
- 🧩 [TanStack Query](https://tanstack.com/query) — Asynchronous state management

Some additional development tools:
- 📝 [Biome](https://biomejs.dev) — Code formatter and linter
- 🔤 [Commitlint](https://commitlint.js.org) — Make sure the commit messages are well formatted
- 🐶 [Husky](https://typicode.github.io/husky) — A git hooks
- 📋 [Lint Staged](https://github.com/lint-staged/lint-staged) — Running some scripts before committing

Testing tools:
- 🎭 [Playwright](https://playwright.dev) — End-to-end testing

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org) `>=18.x`
- [pnpm](https://pnpm.io) `>=9.x` (recommended as the package manager)

### 2. Clone the Repository

```bash
git clone https://github.com/up2dul/gorest-blog.git

# or if using ssh
git clone git@github.com:up2dul/gorest-blog.git
```

### 3. Instalation

Go to the project directory and install dependencies
```bash
# Go to the project directory
cd gorest-blog

# Install dependencies
pnpm install
```

## Usage

### Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
```
.
└── src/
    ├── components/
    │   ├── layout/
    │   │   └── ...
    │   └── ui/
    │       └── ...
    ├── context/
    │   ├── antd-config-context.tsx
    │   └── auth-context.tsx
    ├── hooks/
    │   ├── use-debounce.ts
    │   ├── use-posts.ts
    │   └── use-users.ts
    ├── lib/
    │   ├── contants.ts
    │   ├── types.ts
    │   └── utils.ts
    ├── pages/
    │   └── ...
    ├── services/
    │   ├── api-client.ts
    │   └── auth-storage.ts
    └── styles/
        └── globals.css
```
