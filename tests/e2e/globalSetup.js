/**
 * Global Setup for Playwright - Inject French locale
 */
import fs from 'fs';
import path from 'path';

export default async function globalSetup(config) {
  const localeScript = `
    (function() {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('pdf-compressor-lang', 'fr');
        console.log('[i18n] Locale forced to French');
      }
    })();
  `;

  const setupDir = path.join(config.projectDir || process.cwd(), 'tests/e2e/setup');
  fs.mkdirSync(setupDir, { recursive: true });
  fs.writeFileSync(path.join(setupDir, 'inject-locale.js'), localeScript);

  // Generate test fixtures
  const { createTestPdf, createTextOnlyPdf, createLargePdf } = await import('./helpers/test-fixtures-gen.js');
  await createTestPdf('test-document.pdf', 3);
  await createTestPdf('two-pages.pdf', 2);
  await createTextOnlyPdf('text-only.pdf', 2);
  await createLargePdf('large-document.pdf', 30);

  console.log('✅ Global setup: French locale + fixtures generated');
}
