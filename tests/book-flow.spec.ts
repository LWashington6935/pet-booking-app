import { test, expect } from '@playwright/test'

test('book a walk flow', async ({ page }) => {
  await page.goto('http://localhost:3000/book')
  await page.selectOption('select', { index: 1 })
  await page.fill('input[type="date"]', '2025-12-31')
  await page.fill('input[type="time"]', '10:30')
  await page.fill('input[placeholder*="123 Main"]', '123 Main St, Columbus OH')
  await page.click('text=Submit')
  await expect(page.getByText('Preview')).toBeVisible()
})
