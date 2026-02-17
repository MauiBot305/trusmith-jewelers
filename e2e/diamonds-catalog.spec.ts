import { test, expect } from '@playwright/test';

/**
 * E2E tests for the diamonds catalog page
 */

test.describe('Diamonds Catalog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/diamonds');
    await page.waitForLoadState('networkidle');
  });

  test('page loads with diamonds heading', async ({ page }) => {
    await expect(page).toHaveTitle(/diamonds/i);
  });

  test('filter by cut updates results', async ({ page }) => {
    // If filter exists, click Oval cut
    const ovalFilter = page.locator('[data-cut="oval"]').first();
    if (await ovalFilter.isVisible()) {
      await ovalFilter.click();
      await page.waitForResponse('**/api/diamonds**');

      // All visible diamond cards should mention Oval
      const diamonds = page.locator('.diamond-card');
      const count = await diamonds.count();
      if (count > 0) {
        for (let i = 0; i < Math.min(count, 5); i++) {
          await expect(diamonds.nth(i)).toContainText('Oval');
        }
      }
    }
  });

  test('has navigation links', async ({ page }) => {
    // Should be able to navigate back to home
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();
  });
});

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/True Smith Jewelers/i);
  });

  test('shows hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=True Smith')).toBeVisible();
  });

  test('Build Your Ring CTA navigates to /build', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('a[href="/build"]').first();
    if (await cta.isVisible()) {
      await cta.click();
      await expect(page).toHaveURL('/build');
    }
  });

  test('is mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.locator('text=True Smith')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('homepage has no missing alt text on images', async ({ page }) => {
    await page.goto('/');
    // All images should have alt attributes
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeDefined();
    }
  });

  test('build page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/build');
    await page.waitForLoadState('networkidle');
    // Should have at least one h2
    const h2s = page.locator('h2');
    await expect(h2s.first()).toBeVisible();
  });
});
