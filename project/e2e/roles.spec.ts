import { test, expect } from '@playwright/test'

const routes = [
  { path: '/player', role: 'player', heading: /Player area/ },
  { path: '/scout', role: 'scout', heading: /Scout area/ },
  { path: '/school', role: 'school_admin', heading: /School area/ },
  { path: '/admin', role: 'admin', heading: /Admin/ },
]

for (const r of routes) {
  test.describe(`${r.path} access control`, () => {
    test(`${r.path} redirects to home when unauthenticated`, async ({ page }) => {
      await page.goto(`http://localhost:3000${r.path}`)
      // middleware redirects to / with redirect query param
      await expect(page).toHaveURL(/\/?redirect=/)
      // ensure the redirect param contains the original path
      const url = new URL(page.url())
      expect(url.searchParams.get('redirect')).toContain(r.path)
    })

    test(`${r.path} is accessible with correct role cookie`, async ({ page }) => {
      // Set cookie so middleware sees the role
      await page.context().addCookies([{ name: 'bt_session', value: encodeURIComponent(JSON.stringify({ userId: 'demo', role: r.role })), domain: 'localhost', path: '/' }])
      await page.goto(`http://localhost:3000${r.path}`)
      await expect(page.locator('h2')).toHaveText(r.heading)
    })
  })
}
