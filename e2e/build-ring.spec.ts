import { test, expect } from '@playwright/test';

/**
 * E2E tests for the Ring Builder flow
 * Tests the complete 5-step builder experience
 */

test.describe('Ring Builder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/build');
    // Wait for client-side hydration (builder is dynamic)
    await page.waitForLoadState('networkidle');
  });

  test('page loads and shows step 1', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('Choose Your Diamond Cut');
    // Step 1 indicator should be active (gold background)
    await expect(page.locator('[class*="bg-gold"]').first()).toBeVisible();
  });

  test('complete ring builder flow', async ({ page }) => {
    // ── Step 1: Select diamond cut ─────────────────────────────
    await page.click('[data-cut="round"]');
    // Sidebar should show round in selection
    await expect(page.locator('text=Round Brilliant')).toBeVisible();

    // Click Next
    await page.click('button:has-text("Next")');

    // ── Step 2: Select setting ─────────────────────────────────
    await expect(page.locator('h2')).toContainText('Select Your Setting');
    await page.click('[data-setting="solitaire"]');

    await page.click('button:has-text("Next")');

    // ── Step 3: Select metal ───────────────────────────────────
    await expect(page.locator('h2')).toContainText('Choose Your Metal');
    await page.click('[data-metal="14k-yellow"]');

    await page.click('button:has-text("Next")');

    // ── Step 4: Add-ons / Details ──────────────────────────────
    await expect(page.locator('h2')).toContainText('Personalize Your Ring');
    await page.fill('[name="engraving"]', 'Forever');
    await page.selectOption('[name="ringSize"]', '7');

    await page.click('button:has-text("Next")');

    // ── Step 5: Preview & Quote ────────────────────────────────
    await expect(page.locator('h2')).toContainText('Your Design');

    // Design summary should show selections
    const summary = page.locator('.design-summary');
    await expect(summary).toContainText('Round Brilliant');
    await expect(summary).toContainText('Solitaire');

    // Fill quote form
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="phone"]', '555-1234');

    // Submit quote
    await page.click('button:has-text("Get My Custom Quote")');

    // Should show confirmation
    await expect(page.locator('text=Quote Request Sent!')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Test User')).toBeVisible();
  });

  test('cannot advance without selecting required fields', async ({ page }) => {
    // Next button should be disabled on step 1 without selection
    const nextBtn = page.locator('button:has-text("Next")');
    await expect(nextBtn).toBeDisabled();

    // Select a cut
    await page.click('[data-cut="oval"]');

    // Now Next should be enabled
    await expect(nextBtn).toBeEnabled();
  });

  test('can navigate back through steps', async ({ page }) => {
    // Go to step 2
    await page.click('[data-cut="round"]');
    await page.click('button:has-text("Next")');
    await expect(page.locator('h2')).toContainText('Setting');

    // Go back to step 1
    await page.click('button:has-text("Back")');
    await expect(page.locator('h2')).toContainText('Diamond Cut');
  });

  test('step progress indicator shows correctly', async ({ page }) => {
    // Step labels should be visible
    await expect(page.locator('text=Diamond')).toBeVisible();
    await expect(page.locator('text=Setting')).toBeVisible();
    await expect(page.locator('text=Metal')).toBeVisible();
  });

  test('AR preview is visible', async ({ page }) => {
    await expect(page.locator('text=◈ AR Preview')).toBeVisible();
    await expect(page.locator('text=Ring Preview')).toBeVisible();
  });

  test('engraving is limited to 20 characters', async ({ page }) => {
    // Navigate to step 4
    await page.click('[data-cut="round"]');
    await page.click('button:has-text("Next")');
    await page.click('[data-setting="solitaire"]');
    await page.click('button:has-text("Next")');
    await page.click('[data-metal="14k-yellow"]');
    await page.click('button:has-text("Next")');

    const engravingInput = page.locator('[name="engraving"]');
    await engravingInput.fill('This text is way too long for engraving');

    // Should be truncated to 20 chars
    const value = await engravingInput.inputValue();
    expect(value.length).toBeLessThanOrEqual(20);
  });
});
