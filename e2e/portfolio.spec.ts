import { test, expect } from '@playwright/test'

test('responsive bilingual portfolio and project navigation', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Thoughtful code.')
  await page.locator('.hero-art img').evaluate((image: HTMLImageElement) => image.decode())
  await expect(page.locator('body')).toHaveJSProperty('scrollWidth', await page.locator('body').evaluate(el => el.clientWidth))
  await page.screenshot({ path: testInfo.outputPath('home.png'), fullPage: true })
  await page.getByRole('button', { name: 'FR', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Du code réfléchi.')
  await page.reload()
  await expect(page.getByRole('button', { name: 'FR', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'Web3', exact: true }).click()
  await expect(page.locator('#work article')).toHaveCount(1)
  await expect(page.getByRole('link', { name: 'BabDigi', exact: true })).toHaveAttribute('href', 'https://github.com/ElmtarkatiMustapha/babdigi')
  await page.getByRole('button', { name: 'Tous les projets' }).click()
  await expect(page.locator('#work article')).toHaveCount(4)
  await page.getByRole('button', { name: 'EN', exact: true }).click()
  const toggle = page.getByRole('button', { name: 'Toggle navigation' })
  if (await toggle.isVisible()) {
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await page.getByRole('link', { name: 'Experience', exact: true }).click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  }
  await page.locator('summary').click()
  await expect(page.getByText('USMBA · FP Taza')).toBeVisible()
  for (const href of await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')))) {
    if (href && href !== '#') await expect(page.locator(href)).toHaveCount(1)
  }
  expect(errors).toEqual([])
})
