import { test, expect } from '@playwright/test'

test('player page shows heading and placeholder content', async ({ page }) => {
  // Set demo session cookie so middleware allows /player
  await page.context().addCookies([{ name: 'bt_session', value: encodeURIComponent(JSON.stringify({ userId: 'demo', role: 'player' })), domain: 'localhost', path: '/' }])

  await page.goto('http://localhost:3000/player')
  await expect(page.locator('h2')).toHaveText(/Player area/)
  await expect(page.locator('p')).toHaveText(/Player dashboard/)
})