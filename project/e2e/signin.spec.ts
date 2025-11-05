import { test, expect } from '@playwright/test'

test('demo sign-in updates UI and localStorage, sign-out clears it', async ({ page }) => {
  await page.goto('http://localhost:3000')

  const header = page.locator('header')
  const signInButton = header.locator('button', { hasText: 'Sign in (demo)' })
  await expect(signInButton).toBeVisible()

  // Click demo sign-in
  await signInButton.click()

  // Header should show role and sign out button
  const roleSpan = header.locator('span', { hasText: 'player' })
  const signOutButton = header.locator('button', { hasText: 'Sign out' })
  await expect(roleSpan).toBeVisible()
  await expect(signOutButton).toBeVisible()

  // localStorage should have bt_session set
  const stored = await page.evaluate(() => localStorage.getItem('bt_session'))
  expect(stored).not.toBeNull()
  const parsed = JSON.parse(stored as string)
  expect(parsed).toEqual({ userId: 'demo', role: 'player' })

  // Click sign out
  await signOutButton.click()

  // Sign in button should be visible again and localStorage cleared
  await expect(header.locator('button', { hasText: 'Sign in (demo)' })).toBeVisible()
  const storedAfter = await page.evaluate(() => localStorage.getItem('bt_session'))
  expect(storedAfter).toBeNull()
})