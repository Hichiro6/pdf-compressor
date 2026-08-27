/**
 * Helper utilities for PDF Compressor E2E tests
 */
import path from 'path';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

/**
 * Upload a test PDF and wait for processing to complete.
 * @param {import('@playwright/test').Page} page
 * @param {string} filename - fixture filename
 * @returns {Promise<{filename: string, pageCount: number}>}
 */
export async function uploadTestFile(page, filename = 'test-document.pdf') {
  await page.goto('/');

  // Wait for dropzone to be visible
  await page.waitForSelector('[data-testid="dropzone"], .dropzone, #dropzone', { timeout: 10000 });

  const filePath = path.join(fixturesDir, filename);
  await page.setInputFiles('input[type="file"]', filePath);

  // Wait for processing indicator and then results
  await page.waitForSelector('[data-testid="processing"]', { state: 'visible', timeout: 10000 });
  await page.waitForSelector('[data-testid="processing"]', { state: 'detached', timeout: 15000 });

  // Wait for page thumbnails to appear
  await page.waitForSelector('[data-testid="page-thumb"], .page-thumb, canvas', { timeout: 15000 });

  return {
    filename: path.basename(filename),
  };
}

/**
 * Wait for compression preview to stabilize
 * @param {import('@playwright/test').Page} page
 */
export async function waitForCompressionPreview(page) {
  // Wait for original size + compressed size to appear
  await page.waitForSelector('[data-testid="original-size"], .original-size', { timeout: 10000 });
  await page.waitForSelector('[data-testid="compressed-size"], .compressed-size', { timeout: 10000 });
  
  // Wait for download button to become enabled
  await page.waitForSelector('[data-testid="download-btn"], .btn-download:not(:disabled)', { timeout: 10000 });
}

/**
 * Select a page from the dropdown (if exists)
 */
export async function selectPage(page, pageIndex) {
  const selector = '[data-testid="page-selector"], .page-selector';
  await page.waitForSelector(selector, { timeout: 5000 });
  await page.selectOption(selector, String(pageIndex));
}

/**
 * Click on a page thumbnail
 */
export async function clickPageThumb(page, pageIndex) {
  const thumbs = await page.$$('[data-testid="page-thumb"], .page-thumb');
  if (pageIndex < thumbs.length) {
    await thumbs[pageIndex].click();
  }
}
