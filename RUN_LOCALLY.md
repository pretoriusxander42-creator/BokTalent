# Running BokTalent Locally

This guide will help you set up and run the BokTalent application on your local computer.

## Prerequisites

Before you begin, make sure you have:
- **Node.js** (version 18 or higher) and **npm** installed
- A **Supabase account** (free at https://supabase.com)
- A **text editor** (VS Code, Notepad, nano, etc.)
- **Terminal/Command Prompt** access

## Step-by-Step Setup

### Step 1: Clone and Navigate to the Project

```bash
git clone https://github.com/pretoriusxander42-creator/BokTalent.git
cd BokTalent
git checkout copilot/boktalentinit
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (~500MB of dependencies).

### Step 3: Set Up Environment Variables

The app requires environment variables to connect to Supabase. You need to create a `.env.local` file:

#### Option 1: Create from Command Line (Easiest)

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
EOF
```

Then edit the file and replace the placeholder values with your actual credentials.

#### Option 2: Copy from Example File

```bash
cp .env.example .env.local
```

Then open `.env.local` in your text editor and fill in the values.

#### Getting Your Supabase Credentials

1. Go to https://supabase.com
2. Sign in or create a free account
3. Click **"New Project"**
4. Once created, go to **Settings** (gear icon) → **API**
5. Copy the following values:
   - **Project URL** → paste after `NEXT_PUBLIC_SUPABASE_URL=`
   - **anon public** key → paste after `NEXT_PUBLIC_SUPABASE_ANON_KEY=`
   - **service_role** key → paste after `SUPABASE_SERVICE_ROLE_KEY=`

**Important:** The `.env.local` file must be in the root directory (same folder as `package.json`)!

#### What Your .env.local Should Look Like

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Verify the File Was Created

```bash
ls -la .env.local
cat .env.local
```

You should see the file listed and its contents displayed.

### Step 5: Clear Build Cache (If Needed)

If you've tried running the app before, clear the build cache:

```bash
rm -rf .next
```

### Step 6: Start the Development Server

```bash
npm run dev
```

You should see output like:
```
  ▲ Next.js 14.2.33
  - Local:        http://localhost:3000

 ✓ Ready in 1282ms
```

### Step 7: Open the App

Open your browser and go to:
```
http://localhost:3000
```

You should see the BokTalent welcome page with three role cards (Players, Scouts, Schools).

## Troubleshooting

### Error: "SUPABASE_SERVICE_ROLE_KEY is Required"

This means your `.env.local` file is missing or doesn't have the correct values.

**Fix:**
1. Check that `.env.local` exists in the root folder: `ls -la .env.local`
2. Verify all three environment variables are filled in: `cat .env.local`
3. Make sure there are NO empty lines and NO spaces around the `=` sign
4. Restart the dev server: Stop it (Ctrl+C) and run `npm run dev` again

### Error: "ls: .env.local: No such file or directory"

The file doesn't exist. Follow Step 3 above to create it.

### Error: Port 3000 Already in Use

Another application is using port 3000.

**Fix:**
```bash
PORT=3001 npm run dev
```

Then open `http://localhost:3001`

### Changes to .env.local Not Taking Effect

The build is cached.

**Fix:**
```bash
rm -rf .next
npm run dev
```

## Additional Commands

### Run Tests

```bash
npm run test          # Unit tests (watch mode)
npm run test:e2e      # End-to-end tests (requires Playwright)
```

### Code Quality

```bash
npm run lint          # Run ESLint
npm run typecheck     # TypeScript type checking
```

### Build for Production

```bash
npm run build         # Create production build
npm start             # Start production server
```

## What's Running

- **Development Server**: Next.js dev server on port 3000
- **Hot Reload**: Changes to code automatically refresh the browser
- **API Routes**: Available at `/api/*`

## Environment Variables Reference

### Required

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public/anonymous key for client-side
- `SUPABASE_SERVICE_ROLE_KEY` - Admin key for server-side operations

### Optional

- `OPENAI_API_KEY` - For AI features (if implemented)
- `PAYFAST_MERCHANT_ID` - For payment processing (if implemented)
- `PAYFAST_MERCHANT_KEY` - For payment processing (if implemented)
- `PAYFAST_PASSPHRASE` - For payment processing (if implemented)
- `NEXTAUTH_SECRET` - For authentication sessions (if implemented)
- `EMAIL_FROM` - For sending emails (if implemented)

## Need Help?

If you're still having trouble:
1. Make sure Node.js 18+ is installed: `node --version`
2. Make sure you're in the correct directory (where `package.json` is)
3. Make sure the `.env.local` file is in the root directory, not a subdirectory
4. Try deleting `node_modules` and reinstalling: `rm -rf node_modules && npm install`

## Quick Checklist

Before running `npm run dev`, verify:

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`node_modules` folder exists)
- [ ] `.env.local` file exists in root directory
- [ ] `.env.local` has all three Supabase credentials filled in
- [ ] No other app is running on port 3000
- [ ] You're in the BokTalent root directory

If all items are checked, you're ready to run the app! 🚀
