# Unleashed

Unleashed is a profile search web application. It lets signed-in users search for and browse profiles, with AI-assisted search and image uploads.

## Features

- User authentication (sign up / sign in)
- Profile search, with GPT-assisted query handling
- Image uploads via Cloudinary
- Web front end and a separate API server

## Project structure

This is a Turborepo monorepo containing:

- `apps/web` — the Next.js front end
- `apps/server` (or similar) — an Express/TypeScript API handling authentication, profile search, and file uploads
- `packages/` — shared UI components, ESLint config, and TypeScript config used across the apps

## Getting started

Install dependencies from the repository root:

```bash
pnpm install
```

Run everything in development mode:

```bash
pnpm dev
```

Build all apps and packages:

```bash
pnpm build
```

## Tech stack

- Next.js (front end)
- Express + TypeScript (API)
- Cloudinary (image storage)
- Turborepo (monorepo tooling)
