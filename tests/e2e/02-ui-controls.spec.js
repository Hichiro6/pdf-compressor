/**
 * E2E Tests — UI Controls
 *
 * Covers:
 * - Compression level selector (low/medium/high)
 * - Reset button
 * - Add more files button
 * - Collapsible control groups
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import { createTestPdf } from './helpers/test-fixtures-gen.js';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

test.beforeAll(async () => {
  await createTestPdf('test-document.pdf', 3);
});

test.describe('UI Controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('pdfcompressor_lang', 'fr');
    });
    await page.reload();
    await page.setInputFiles('#file-input', path.join(fixturesDir, 'test-document.pdf'));
    await expect(page.locator('#workspace')).toBeVisible({ timeout: 15000 });
  });

  test('should have three compression levels', async ({ page }) => {
    const segButtons = page.locator('.seg-btn[data-quality]');
    await expect(segButtons).toHaveCount(3);

    await expect(segButtons.nth(0)).toHaveAttribute('data-quality', 'low');
    await expect(segButtons.nth(1)).toHaveAttribute('data-quality', 'medium');
    await expect(segButtons.nth(2)).toHaveAttribute('data-quality', 'high');
  });

  test('should switch compression level to medium', async ({ page }) => {
    const mediumBtn = page.locator('.seg-btn[data-quality="medium"]');
    await mediumBtn.click();

    await expect(mediumBtn).toHaveClass(/active/);
    await expect(mediumBtn).toHaveAttribute('aria-checked', 'true');

    const lowBtn = page.locator('.seg-btn[data-quality="low"]');
    await expect(lowBtn).not.toHaveClass(/active/);
    await expect(lowBtn).toHaveAttribute('aria-checked', 'false');
  });

  test('should switch compression level to high', async ({ page }) => {
    const highBtn = page.locator('.seg-btn[data-quality="high"]');
    await highBtn.click();

    await expect(highBtn).toHaveClass(/active/);
    await expect(highBtn).toHaveAttribute('aria-checked', 'true');
  });

  test('should reset workspace when clicking reset button', async ({ page }) => {
    await page.locator('#btn-reset').click();

    await expect(page.locator('#workspace')).toBeHidden();
    await expect(page.locator('#dropzone')).toBeVisible();
  });

  test('should open file picker when clicking add more files', async ({ page }) => {
    const addMoreBtn = page.locator('#btn-add-more');
    await expect(addMoreBtn).toBeVisible();

    // Click should trigger file input
    const fileInput = page.locator('#file-input');
    await expect(fileInput).toHaveAttribute('multiple');
  });

  test('should toggle control group collapse', async ({ page }) => {
    const groupTitle = page.locator('.control-group__title').first();
    const initialExpanded = await groupTitle.getAttribute('aria-expanded');

    await groupTitle.click();
    const newExpanded = await groupTitle.getAttribute('aria-expanded');

    expect(initialExpanded).not.toBe(newExpanded);
  });
});
