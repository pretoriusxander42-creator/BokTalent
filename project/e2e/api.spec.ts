import { test, expect } from '@playwright/test'

test('PUT /api/player/profile unauthorized without header', async ({ page }) => {
  await page.goto('http://localhost:3000')

  const result = await page.evaluate(async () => {
    const res = await fetch('/api/player/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'NoAuth' }),
    })
    const body = await res.json().catch(() => null)
    return { status: res.status, body }
  })

  expect(result.status).toBe(401)
  expect(result.body).toEqual({ error: 'Unauthorized' })
})

test('PUT /api/player/profile succeeds with x-user-id header and echoes data', async ({ page }) => {
  await page.goto('http://localhost:3000')

  const result = await page.evaluate(async () => {
    const res = await fetch('/api/player/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-user-id': 'user123' },
      body: JSON.stringify({ name: 'Test Player', position: 'Forward' }),
    })
    const body = await res.json().catch(() => null)
    return { status: res.status, body }
  })

  expect(result.status).toBe(200)
  // route echoes back { data: { id: userId, ...parsed.data } }
  expect(result.body).toHaveProperty('data')
  expect(result.body.data).toMatchObject({ id: 'user123', name: 'Test Player', position: 'Forward' })
})