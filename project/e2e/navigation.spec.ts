import { test, expect } from '@playwright/test'

test('header navigation links work', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // Check header links exist (scope to header to avoid duplicates on page)
  const header = page.locator('header')
  const playerLink = header.locator('a', { hasText: 'Player' }).first()
  const scoutLink = header.locator('a', { hasText: 'Scout' }).first()
  const schoolLink = header.locator('a', { hasText: 'School' }).first()

  await expect(playerLink).toBeVisible()
  await expect(scoutLink).toBeVisible()
  await expect(schoolLink).toBeVisible()

  // Set demo session cookie so middleware allows /player
  await page.context().addCookies([{ name: 'bt_session', value: encodeURIComponent(JSON.stringify({ userId: 'demo', role: 'player' })), domain: 'localhost', path: '/' }])

  // Navigate to player page
  await playerLink.click()
  await expect(page).toHaveURL(/\/player$/)
  await expect(page.locator('h2')).toHaveText(/Player area/)
})