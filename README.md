# Alternative Payments take-home assignment

A Next.js application with GraphQL (Apollo Client) and CSS Modules.

## Tech Stack

- **Next.js 16.0.1** - React framework for production
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **CSS Modules** - Component-scoped CSS styling
- **Biome** - Fast formatter and linter

## Prerequisites

- Node.js >= 20.9.0 (recommended: v24.11.0 LTS)
- npm 11.6.1 or later

## Getting Started

### 1. Use the correct Node.js version

This project requires Node.js v24.11.0. If you have nvm installed:

```bash
nvm use
```

Or install the specific version:

```bash
nvm install 24.11.0
nvm use 24.11.0
```

### 2. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

## Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.module.css    # CSS Module for home page
│   └── page.tsx           # Home page
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
