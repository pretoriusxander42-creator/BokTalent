# BokTalent - Copilot Instructions

## Project Overview

BokTalent is a talent management platform built with Next.js, designed for connecting rugby players with scouts and school administrators. The application features role-based access control with authentication powered by Supabase.

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4 + PostCSS
- **Authentication & Database**: Supabase (with SSR support)
- **Testing**: 
  - Unit tests: Vitest + Testing Library
  - E2E tests: Playwright
- **Code Quality**: ESLint + Prettier
- **Schema Validation**: Zod

## Project Structure

```
src/
├── app/              # Next.js App Router pages and API routes
│   ├── api/         # API endpoints (auth, etc.)
│   ├── admin/       # Admin dashboard
│   ├── player/      # Player dashboard
│   ├── scout/       # Scout dashboard
│   └── school/      # School admin dashboard
├── components/      # React components
├── lib/            # Utility functions and Supabase client setup
├── middleware.ts   # Next.js middleware (auth, role checks)
└── styles/         # Global styles

e2e/                # Playwright E2E tests
db/                 # Database migrations (optional)
supabase/           # Supabase migrations and seed data
```

## Setup and Installation

### Prerequisites
- Node.js v18 or higher
- npm (comes with Node.js)
- Supabase account (for auth and database)

### Installation Steps

1. **Install dependencies**:
   ```bash
   npm ci
   ```

2. **Configure environment variables**:
   Create `.env.local` with:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
   ```

3. **Set up Supabase**:
   - Create a Supabase project
   - Run migrations from `supabase/migrations/00-init-auth.sql`
   - (Optional) Seed test data from `supabase/seed.sql`

4. **Install Playwright browsers** (for E2E testing):
   ```bash
   npx playwright install
   ```

See `RUN_LOCALLY.md` for detailed setup instructions.

## Available Commands

### Development
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build for production
- `npm start` - Run production build

### Code Quality
- `npm run lint` - Run ESLint with auto-fix
- `npm run typecheck` - TypeScript type checking (must pass before committing)

### Testing
- `npm run test` or `npm run test:unit` - Run unit tests with Vitest
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run coverage` - Generate test coverage report

## Development Guidelines

### Code Quality Requirements
1. **Always run typecheck** before committing changes: `npm run typecheck`
2. **Run linting** to ensure code style consistency: `npm run lint`
3. **Write tests** for new features:
   - Unit tests for utilities and components
   - E2E tests for critical user flows
4. **Follow existing patterns** in the codebase for consistency

### Authentication & Authorization
- Authentication is handled via Supabase Auth
- The application has 4 role types: `player`, `scout`, `school_admin`, `admin`
- User roles are stored in the `profiles` table
- Row-level security (RLS) policies protect data access
- `middleware.ts` handles route protection based on user roles

### Component Guidelines
- Use TypeScript for all new code
- Prefer server components by default (Next.js App Router)
- Use client components only when needed (interactivity, hooks)
- Follow existing naming conventions

### Testing Guidelines
- Unit tests go alongside source files (e.g., `route.test.ts` next to `route.ts`)
- E2E tests are in the `e2e/` directory
- Mock Supabase calls in unit tests
- E2E tests can use the `DISABLE_SUPABASE='1'` environment variable for CI

### Database Changes
- Database migrations should be added to `supabase/migrations/`
- Always update seed data in `supabase/seed.sql` if schema changes affect test data
- Document any RLS policy changes

## CI/CD

The repository uses GitHub Actions for continuous integration:
- **ci.yml**: Runs lint, typecheck, unit tests, and E2E tests sequentially
- **playwright.yml**: Dedicated E2E test workflow

All PRs must pass CI checks before merging.

## Common Tasks

### Adding a New Route
1. Create page in `src/app/[route]/page.tsx`
2. Add route protection in `src/middleware.ts` if needed
3. Add E2E test in `e2e/` directory
4. Run `npm run typecheck` and `npm run lint`

### Adding a New API Endpoint
1. Create route handler in `src/app/api/[endpoint]/route.ts`
2. Add unit tests alongside (e.g., `route.test.ts`)
3. Validate with Zod schemas if accepting input
4. Test with `npm run test:unit`

### Updating Supabase Schema
1. Create migration file in `supabase/migrations/`
2. Update seed data if needed in `supabase/seed.sql`
3. Update TypeScript types in `src/lib/` if needed
4. Document schema changes in commit message

## Important Notes

- **ESLint Configuration**: There's a known issue with `@typescript-eslint/no-unused-vars` rule definition. This is pre-existing and doesn't affect functionality.
- **Environment Variables**: Never commit `.env.local` or real credentials. Use `.env.example` as a template.
- **Supabase Connection**: The app requires valid Supabase credentials to run. Use test/seed data for development.
- **Node Version**: Requires Node.js v18 or higher for optimal compatibility.

## Getting Help

- Check `README.md` for quick start guide
- Check `RUN_LOCALLY.md` for detailed setup instructions
- Review existing code patterns in similar files
- Refer to Next.js, Supabase, and TailwindCSS documentation for framework-specific questions
