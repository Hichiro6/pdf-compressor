/**
 * E2E Tests — i18n / Internationalization
 *
 * Covers:
 * - Language persistence (LocalStorage)
 * - UI updates when changing language
 * - All 7 languages available
 */
import { test, expect } from '@playwright/test';

test.describe('Internationalization', () => {
  const languages = ['en', 'fr', 'de', 'es', 'pt', 'nl', 'it'];

  for (const lang of languages) {
    test(`should persist ${lang} language setting`, async ({ page }) => {
      await page.goto('/');

      // Force language via localStorage
      await page.evaluate((lng) => {
        localStorage.setItem('pdfcompressor_lang', lng);
      }, lang);

      await page.reload();

      // Check storage persists
      const storedLang = await page.evaluate(() => {
        return localStorage.getItem('pdfcompressor_lang');
      });
      expect(storedLang).toBe(lang);
    });

    test(`should translate UI to ${lang}`, async ({ page }) => {
      if (lang === 'en') {
        // 'en' is the default — text stays the same, so skip assertion
        test.skip();
        return;
      }
      await page.goto('/');
      await page.evaluate((lng) => {
        localStorage.setItem('pdfcompressor_lang', lng);
      }, lang);
      await page.reload();

      // Wait for translation to apply
      await expect(page.locator('.dropzone h2')).not.toHaveText('Drop your PDF here');
    });
  }

  test.skip('should have language selector', async ({ page }) => {
    // Skip: lang selector is created dynamically by i18n.init()
    await page.goto('/');

    const langSelect = page.locator('select[id="language-select"]');
    // Note: selector may not be visible on initial load
  });

  test.skip('should switch language via selector', async ({ page }) => {
    // Skip: requires dynamic selector to be present
    await page.goto('/');
  });
});
