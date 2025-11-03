import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10_000,
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: process.env.CI ? false : true,
    env: {
      // Minimal envs to satisfy runtime validation during E2E (use safe dummy values)
      SUPABASE_SERVICE_ROLE_KEY: 'test-service-role',
      NEXT_PUBLIC_SUPABASE_URL: 'http://localhost:54321',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
  DISABLE_SUPABASE: '1',
      NODE_ENV: 'development',
    },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
})
