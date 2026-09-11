# Project Context

## Overview
Shop for Pets (`shop-for-pets_frontend`) is an e-commerce web application for a pet store. It enables users to browse a product catalog with filtering and search, view product details, manage a shopping cart, and perform user registration and JWT-based authentication.

## Stack
- **Framework & Build**: React 19, Vite 8, TypeScript (~6.0) with React Compiler (`babel-plugin-react-compiler`).
- **Routing**: React Router v7 (`react-router-dom`).
- **State & Data Fetching**: TanStack React Query v5 (server state), React Context API (`AuthContext`, `CartContext`).
- **UI & Styling**: Material UI v9 (`@mui/material`), `@emotion/react`, `@emotion/styled`, custom MUI theme, SCSS Modules (`sass-embedded`).
- **Notifications & Icons**: `react-hot-toast`, `react-icons`.
- **Validation & API Types**: Zod v4 (`zod`), OpenAPI type generator (`swagger-typescript-api`).

## Structure
- `src/`:
  - `components/`: Generic UI & layout components (`Header`, `Footer`, `Layout`, `Main`, `InfoState`).
  - `features/`: Modular domain features (`auth`, `cart`, `catalog`) containing feature-specific components, APIs, and contexts.
  - `pages/`: Route-level pages (`HomePage`, `ProductDetailsPage`, `CartPage`, `NotFoundPage`).
  - `queries/`: React Query custom hooks organized by domain (`auth/`, `cart/`, `catalog/`).
  - `ui/`: Reusable baseline UI components (`Button`, `Input`, `Modal`, `ConfirmDialog`).
  - `schemas/`: Zod validation schemas (`auth.schema.ts`).
  - `types/`: TypeScript definitions, including OpenAPI generated contracts in `types/api/index.ts`.
  - `styles/`: Global style definitions (`global.scss`).
  - `data/`: Configuration (`user-config.json` with API `BASE_URL`) and static assets/mock data.
  - `theme.ts`: Custom Material UI theme configuration (palette, custom typography, border radii).

## Architecture
- **Feature-Based Architecture**: Code is grouped into domain features inside `src/features/`.
- **Authentication & API Interceptor**: Custom `authFetch` utility attaches Bearer JWT tokens from `localStorage`, handles `401 Unauthorized` errors, and queues requests during token refresh (`/accounts/refresh/`).
- **State Separation**: Server state, caching, and invalidations are managed via TanStack React Query. Global client state (auth state, cart item sync) is exposed via Context Providers (`AuthProvider`, `CartProvider`).
- **Layout & Routing**: `Layout` component provides global header/footer structure with `<Outlet />` for routed page rendering.

## Important Conventions
- **Path Aliases**: Always use `@/*` for imports mapping to `./src/*`.
- **Styling**: Mid-transition from SCSS Modules (`*.module.scss`) to Material UI `sx` prop with centralized style objects (`*.styles.ts`).
- **Component Exports**: Feature modules export via `index.ts` barrels. UI and page components use default exports.

## Running the Project
- `npm run dev`: Generates API types from `http://localhost:8000/api/schema/` and starts Vite dev server.
- `npm run build`: Type-checks (`tsc -b`) and builds for production (`vite build`).
- `npm run lint`: Runs ESLint (`eslint .`).
- `npm run preview`: Previews built production bundle (`vite preview`).
- `npm run generate:types`: Manually generates OpenAPI TypeScript types into `src/types/api/index.ts`.

## Current State
- Active migration from SCSS Modules to Material UI (`@mui/material` + `*.styles.ts`).
- Core e-commerce user flows (catalog, search/filtering, cart management, auth modals) are functional.
- Automated testing framework is not configured (no test runner or spec files present).

## Known Issues
- `npm run dev` script fails if the local backend service (`http://localhost:8000`) is offline due to the prepended `generate:types` step.
- `AuthContext.tsx`: `logoutUser` calls `window.location.href = "/"` before clearing state and `localStorage`, resulting in immediate full-page navigation before state cleanup executes.
- Leftover debug statements and dead code present (e.g. `console.log(!!accessToken)` in `AuthContext.tsx`, commented out imports in `Main.tsx` and `main.tsx`).

## AI Instructions
- Maintain feature isolation inside `src/features/`.
- Use Material UI styling (`*.styles.ts` with `sx`) for any new UI components.
- Always use the `@/` path alias for imports from `src/`.
- Note that `npm run dev` requires a running backend on `localhost:8000` unless Vite is launched directly.
- Preserve existing API contracts in `src/types/api/index.ts`.
