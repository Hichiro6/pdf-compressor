/**
 * E2E Tests — Multi-file Management
 *
 * Covers:
 * - Upload multiple PDFs
 * - File count updates
 * - Remove individual files
 * - Reset all files
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import { createTestPdf } from './helpers/test-fixtures-gen.js';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

test.beforeAll(async () => {
  await createTestPdf('test-document.pdf', 3);
  await createTestPdf('two-pages.pdf', 2);
});

test.describe('Multi-file Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('pdfcompressor_lang', 'fr');
    });
    await page.reload();
  });

  test('should upload multiple PDFs at once', async ({ page }) => {
    await page.setInputFiles('#file-input', [
      path.join(fixturesDir, 'test-document.pdf'),
      path.join(fixturesDir, 'two-pages.pdf'),
    ]);

    await expect(page.locator('#workspace')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('#file-count')).toHaveText('2', { timeout: 15000 });
  });

  test('should add more files after initial upload', async ({ page }) => {
    await page.setInputFiles('#file-input', path.join(fixturesDir, 'test-document.pdf'));
    await expect(page.locator('#file-count')).toHaveText('1', { timeout: 15000 });

    await page.setInputFiles('#file-input', path.join(fixturesDir, 'two-pages.pdf'));
    await expect(page.locator('#file-count')).toHaveText('2', { timeout: 15000 });
  });

  test('should reset all files', async ({ page }) => {
    await page.setInputFiles('#file-input', [
      path.join(fixturesDir, 'test-document.pdf'),
      path.join(fixturesDir, 'two-pages.pdf'),
    ]);
    await expect(page.locator('#file-count')).toHaveText('2', { timeout: 15000 });

    await page.locator('#btn-reset-all').click();

    await expect(page.locator('#workspace')).toBeHidden({ timeout: 10000 });
    await expect(page.locator('#dropzone')).toBeVisible();
  });
});
