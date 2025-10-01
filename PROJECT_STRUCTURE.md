# Project Structure Documentation

This document describes every file and directory in the PDM-Project repository.

---

## Root Configuration Files

- **`.editorconfig`** - Defines consistent coding styles across editors
- **`.gitignore`** - Specifies files/folders to exclude from Git version control
- **`biome.json`** - Configuration for Biome linter/formatter
- **`CONTRIBUTING.md`** - Development setup guide including prerequisites (Node 22, pnpm) and workflow instructions
- **`package.json`** - Root monorepo package defining scripts for dev, build, start, typecheck, lint, and format using pnpm workspaces
- **`pnpm-lock.yaml`** - Lockfile for pnpm dependencies
- **`pnpm-workspace.yaml`** - Defines pnpm workspace packages in apps/* and packages/*
- **`PROJECT_STRUCTURE.md`** - This file, documenting the entire project structure
- **`README.md`** - Project overview for RIT CSCI 320 Group 52's music database project with phase descriptions
- **`tsconfig.base.json`** - Base TypeScript configuration with strict mode

---

## `.github/` - GitHub Configuration

### `.github/workflows/`
- **`ci.yml`** - GitHub Actions CI workflow that runs typecheck and lint on every push or PR to main branch

---

## `.vscode/` - VS Code Configuration

- **`extensions.json`** - Recommends the Biome extension for VS Code users
- **`settings.json`** - Enables auto-fixes imports/formatting on save using Biome

---

## `apps/` - Application Workspaces

### `apps/server/` - Express Backend Server
- **`package.json`** - Server package with Express, JWT, bcrypt, PostgreSQL (pg), cors, and Zod dependencies
- **`tsconfig.json`** - TypeScript config for server extending base config
- **`.env.example`** - Template for environment variables (database connection string, JWT secrets, etc.)

#### `apps/server/src/` - Server Source Code
- **`index.ts`** - Main server entry point that initializes Express app, sets up middleware, and registers routes
- **`db.ts`** - Database connection pooling and query utilities for PostgreSQL interactions
- **`jwt.ts`** - JWT token generation and verification utilities for user authentication
- **`middleware/`** - Contains functions that process requests before they reach route handlers (authentication checks, request validation)
- **`routes/`** - Defines API endpoints and their handlers (e.g., login, register, user management)
- **`types/`** - TypeScript type definitions and interfaces for type safety throughout the server code
- **`utils/`** - Reusable helper functions for common tasks (HTTP responses, error handling, formatting)

---

### `apps/web/` - React Frontend Application
- **`index.html`** - HTML entry point for Vite React app
- **`package.json`** - Frontend package with React 18, Zustand state management, and Tailwind CSS
- **`pnpm-lock.yaml`** - Web app-specific lockfile
- **`tsconfig.json`** - TypeScript config for web app with JSX support
- **`vite.config.ts`** - Vite configuration with React plugin and Tailwind

#### `apps/web/src/` - Frontend Source Code
- **`main.tsx`** - React application entry point mounting App to the DOM
- **`App.tsx`** - Root React component with routing and layout
- **`index.css`** - Global styles and Tailwind CSS imports

---

## `packages/` - Shared Libraries

### `packages/contracts/` - Shared Types & Schemas
- **`package.json`** - Contracts package configuration for shared Zod schemas and TypeScript types used by both frontend and backend
- **`tsconfig.json`** - TypeScript config for contracts package with declaration output
- **`tsconfig.tsbuildinfo`** - TypeScript incremental build cache file

#### `packages/contracts/src/`
- **`index.ts`** - Main export file re-exporting schemas and types
- **`schemas.ts`** - Zod validation schemas for API requests/responses
- **`types.ts`** - Shared TypeScript types and interfaces
