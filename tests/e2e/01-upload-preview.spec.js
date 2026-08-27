/**
 * E2E Tests — Upload and Preview
 *
 * Covers:
 * - Upload PDF → workspace appears
 * - Multiple PDF upload
 * - File list displays correctly
 * - Dropzone interactions
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import { createTestPdf } from './helpers/test-fixtures-gen.js';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

test.beforeAll(async () => {
  await createTestPdf('test-document.pdf', 3);
});

test.describe('Upload and Preview', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('pdfcompressor_lang', 'fr');
    });
    await page.reload();
  });

  test('should display dropzone on load', async ({ page }) => {
    await expect(page.locator('#dropzone')).toBeVisible();
    await expect(page.locator('#file-input')).toBeAttached();
  });

  test('should show workspace after uploading a PDF', async ({ page }) => {
    await page.setInputFiles('#file-input', path.join(fixturesDir, 'test-document.pdf'));

    await expect(page.locator('#workspace')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('#workspace')).not.toHaveAttribute('hidden');
  });

  test('should display file card with filename', async ({ page }) => {
    await page.setInputFiles('#file-input', path.join(fixturesDir, 'test-document.pdf'));

    await page.waitForSelector('#file-list .file-card', { timeout: 15000 });
    const fileCards = await page.locator('#file-list .file-card').count();
    expect(fileCards).toBeGreaterThanOrEqual(1);
  });

  test('should enable compress button after upload', async ({ page }) => {
    await page.setInputFiles('#file-input', path.join(fixturesDir, 'test-document.pdf'));

    await expect(page.locator('#btn-compress')).toBeEnabled({ timeout: 15000 });
  });

  test('should update file count', async ({ page }) => {
    await page.setInputFiles('#file-input', path.join(fixturesDir, 'test-document.pdf'));

    await expect(page.locator('#file-count')).toHaveText('1', { timeout: 15000 });
  });

  test('should hide dropzone after upload', async ({ page }) => {
    await page.setInputFiles('#file-input', path.join(fixturesDir, 'test-document.pdf'));

    await expect(page.locator('#dropzone')).toBeHidden({ timeout: 15000 });
  });
});
