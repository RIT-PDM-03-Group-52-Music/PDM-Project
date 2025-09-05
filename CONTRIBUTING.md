# Contributing to PDM Project

## 1. Prerequisites

- **Node.js** v22 or later ([download](https://nodejs.org/en))
- **pnpm** with `npm install -g pnpm` or Corepack

## 2. Setup

- Clone this project from Git or GitHub Desktop
- Open the repository in VSCode and run `pnpm install` at project root
- Setup the required .env file set up in /apps/server/.env
- Optional: install the Biome extension in VSCode

## 3. Workflow

- Run `pnpm dev` to start the server at http://localhost:3001 and the website at http://localhost:5173
- Check types occasionally with `pnpm typecheck`
- Before committing, run `pnpm lint` and `pnpm format` to ensure we all use consistent styles

## 4. Building

- Run `pnpm build` to create a frontend artifact
- Run `pnpm start` to start a full build