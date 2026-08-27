/**
 * E2E Tests — Compression Flow
 *
 * Covers:
 * - Compress PDF → progress bar → results
 * - Original/compressed sizes displayed
 * - Savings calculation
 * - Download compressed file
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import { createTestPdf, createLargePdf } from './helpers/test-fixtures-gen.js';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

test.beforeAll(async () => {
  await createTestPdf('test-document.pdf', 3);
  await createLargePdf('large-document.pdf', 10);
});

test.describe('Compression Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('pdfcompressor_lang', 'fr');
    });
    await page.reload();
    await page.setInputFiles('#file-input', path.join(fixturesDir, 'test-document.pdf'));
    await expect(page.locator('#workspace')).toBeVisible({ timeout: 15000 });
  });

  test('should start compression when clicking compress button', async ({ page }) => {
    await page.locator('#btn-compress').click();

    await expect(page.locator('#progress-container')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#progress-bar')).toBeVisible();
  });

  test('should show results after compression completes', async ({ page }) => {
    await page.locator('#btn-compress').click();

    await expect(page.locator('#results-container')).toBeVisible({ timeout: 30000 });
    await expect(page.locator('#original-size')).not.toHaveText('-');
    await expect(page.locator('#compressed-size')).not.toHaveText('-');
  });

  test('should display savings percentage', async ({ page }) => {
    await page.locator('#btn-compress').click();

    await expect(page.locator('#results-container')).toBeVisible({ timeout: 30000 });
    const savingsText = await page.locator('#savings-value').textContent();
    expect(savingsText).toBeTruthy();
    expect(savingsText).toMatch(/[\d.,]+/);
  });

  test('should show download button after compression', async ({ page }) => {
    await page.locator('#btn-compress').click();

    await expect(page.locator('#results-container')).toBeVisible({ timeout: 30000 });
    await expect(page.locator('#btn-download')).toBeVisible();
    await expect(page.locator('#btn-download')).not.toHaveAttribute('hidden');
  });

  test('should download compressed PDF', async ({ page }) => {
    await page.locator('#btn-compress').click();
    await expect(page.locator('#results-container')).toBeVisible({ timeout: 30000 });

    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await page.locator('#btn-download').click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });

  test('should compress large PDF', async ({ page }) => {
    await page.locator('#btn-reset').click();
    await page.setInputFiles('#file-input', path.join(fixturesDir, 'large-document.pdf'));
    await expect(page.locator('#workspace')).toBeVisible({ timeout: 15000 });

    await page.locator('#btn-compress').click();
    await expect(page.locator('#results-container')).toBeVisible({ timeout: 60000 });
  });
});
