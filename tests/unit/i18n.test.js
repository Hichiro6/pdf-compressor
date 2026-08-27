import { describe, expect, it } from 'vitest';
import { getCurrentLanguage, LANGUAGES, setLanguage, t } from '../../src/i18n.js';

describe('i18n - Core functions', () => {
  it('returns the correct current language', () => {
    setLanguage('fr');
    expect(getCurrentLanguage()).toBe('fr');
  });

  it('translates basic keys in English', () => {
    setLanguage('en');
    expect(t('app.title')).toBeDefined();
    expect(t('btn.compress')).toBeDefined();
  });

  it('translates basic keys in French', () => {
    setLanguage('fr');
    expect(t('btn.compress')).toBeDefined();
    expect(t('btn.compress')).not.toBe('btn.compress');
  });

  it('returns key if translation not found', () => {
    expect(t('nonexistent.key')).toBe('nonexistent.key');
  });
});

describe('i18n - Languages map', () => {
  it('contains all expected languages', () => {
    expect(Object.keys(LANGUAGES)).toEqual(['en', 'fr', 'de', 'es', 'pt', 'nl', 'it']);
  });

  it('has names for each language', () => {
    expect(LANGUAGES.en.name).toBe('English');
    expect(LANGUAGES.fr.name).toBe('Français');
    expect(LANGUAGES.de.name).toBe('Deutsch');
  });
});

describe('i18n - Fallback', () => {
  it('falls back to English for invalid language', () => {
    setLanguage('invalid');
    expect(getCurrentLanguage()).toBe('en');
  });

  it('returns translated text for common keys in FR', () => {
    setLanguage('fr');
    expect(t('header.tagline')).toBeDefined();
    expect(typeof t('header.tagline')).toBe('string');
  });
});
