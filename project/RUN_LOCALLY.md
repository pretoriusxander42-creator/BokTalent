# Running BokTalent Locally

This guide provides step-by-step instructions for setting up and running the BokTalent application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18 or higher recommended)
2. **npm** (comes with Node.js)
3. **Git** (to clone/manage the repository)
4. **Supabase account** (for authentication and database) - Sign up at https://supabase.com

## Dependencies

### Runtime Dependencies
- `next` (v14.0.0) - Next.js framework
- `react` (v18.2.0) & `react-dom` (v18.2.0) - React library
- `@supabase/supabase-js` (v2.78.0) - Supabase client
- `@supabase/ssr` (v0.7.0) - Supabase SSR utilities
- `zod` (v3.0.0) - Schema validation

### Development Dependencies
- TypeScript (v5.0.0)
- TailwindCSS (v4.0.0) + PostCSS + Autoprefixer
- ESLint & Prettier (code quality)
- Vitest (v1.0.0) - Unit testing
- Playwright (v1.40.0) - End-to-end testing
- Testing Library - React testing utilities

## Setup Instructions

### 1. Install Dependencies

Navigate to the project directory and install all required packages:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root with the following variables:

#### Required Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
```

#### Optional Variables (for future features)

```bash
OPENAI_API_KEY=
PAYFAST_MERCHANT_ID=
PAYFAST_MERCHANT_KEY=
PAYFAST_PASSPHRASE=
NEXTAUTH_SECRET=
EMAIL_FROM=
```

You can use `.env.example` as a template:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual values.

### 3. Set Up Supabase

1. **Create a Supabase project:**
   - Go to https://supabase.com
   - Create a new project
   - Wait for the project to finish setting up

2. **Run database migrations:**
   - Open your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the migration from `supabase/migrations/00-init-auth.sql`
   - This creates the profiles table, RLS policies, and user signup trigger

3. **Get your credentials:**
   - Go to Project Settings → API
   - Copy the following values to your `.env.local`:
     - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
     - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

4. **(Optional) Seed test data:**
   - Run the SQL from `supabase/seed.sql` in your SQL Editor
   - This creates test users: `player@test.com`, `scout@test.com`, `school@test.com`
   - All test users have password: `password123`

### 4. Install Playwright Browsers (for E2E testing)

If you plan to run end-to-end tests:

```bash
npx playwright install
```

## Running the Application

### Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

### Production Build

Build and run the production version:

```bash
npm run build
npm start
```

## Available Commands

### Development
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Run production build

### Code Quality
- `npm run lint` - Run ESLint with auto-fix
- `npm run typecheck` - TypeScript type checking

### Testing
- `npm run test` or `npm run test:unit` - Run unit tests with Vitest
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run coverage` - Generate test coverage report

## Application Structure

The application includes:

- **Authentication system** with role-based access (player, scout, school_admin, admin)
- **Role-specific routes:**
  - `/player` - Player dashboard
  - `/scout` - Scout dashboard
  - `/school` - School administrator dashboard
  - `/admin` - System administrator dashboard
- **Supabase integration** for authentication and database
- **Row-level security** policies for data protection
- **Automatic profile creation** on user signup

## Database Schema

The application uses the following database structure:

- **profiles table** - User profiles with roles
- **Row-level security (RLS)** enabled for secure data access
- **Automatic trigger** to create profiles on user signup

Optional migrations in `db/migrations/` can be run as needed for additional features.

## Troubleshooting

### Build Errors
- Ensure all environment variables are set correctly in `.env.local`
- Run `npm run typecheck` to identify TypeScript errors
- Check that Node.js version is 18 or higher: `node --version`

### Supabase Connection Issues
- Verify your Supabase project URL and keys are correct
- Check that database migrations have been run
- Ensure your Supabase project is active and not paused

### Test Failures
- Make sure Playwright browsers are installed: `npx playwright install`
- For unit tests, check that test setup files are loading correctly

## Quick Start Summary

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Install Playwright browsers (optional, for e2e tests)
npx playwright install

# 4. Start development server
npm run dev
```

Visit **http://localhost:3000** to see your application running!

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Playwright Documentation](https://playwright.dev)
