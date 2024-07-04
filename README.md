# GoREST Blog

> A simple blog posts app using [gorest.co.in](https://gorest.co.in/) API.

> Live preview: [a8k-gorest.vercel.app](https://a8k-gorest.vercel.app)

![image](https://github.com/up2dul/gorest-blog/assets/36098718/274cf5be-4525-4bf1-9aa7-923e32df6298)


## About

### Tech stack
- ⚛️ React 18
- ⬛ Next.js 14
- 🎨 Tailwind CSS with shadcn/ui
- 🔷 TypeScript

### Development tools
- 📝 [Biome](https://biomejs.dev) — Code formatter and linter
- 🔤 [Commitlint](https://commitlint.js.org) — Make sure the commit messages are well formatted
- 🐶 [Husky](https://typicode.github.io/husky) — A git hooks
- 📋 [Lint Staged](https://github.com/lint-staged/lint-staged) — Running some scripts before committing

## Getting started

### Pre-requisites
> Requires [Node.js](https://nodejs.org) `>=18.x`. And [pnpm](https://pnpm.io) `>=8.x` is recommended as the package manager.

### Clone the repository
```bash
git clone https://github.com/up2dul/gorest-blog.git

# or if using SSH
git clone git@github.com:up2dul/gorest-blog.git

```

### Move into the project directory
```bash
cd gorest-blog
```

### Install dependencies
```bash
pnpm install
```

### Setup the environment variables
Copy the `.env.example` file to `.env.local` and fill in the values.
```
API_TOKEN=your-gorest-api-token
```

### Start the development server
```bash
pnpm dev
```
The application will be available at `http://localhost:3000`.
