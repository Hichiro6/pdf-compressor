/**
 * PDF Compressor - i18n System
 * Languages: EN (default), FR, DE, ES, PT, NL, IT
 *
 * API:
 *   initI18n()              - Initialize language on startup
 *   setLanguage(lang, cb)   - Change language
 *   getCurrentLanguage()    - Get current language code
 *   t(key, params)          - Get translated string with param substitution
 */

export const LANGUAGES = {
  en: { name: 'English', flag: '🇬🇧' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  es: { name: 'Español', flag: '🇪🇸' },
  pt: { name: 'Português', flag: '🇵🇹' },
  nl: { name: 'Nederlands', flag: '🇳🇱' },
  it: { name: 'Italiano', flag: '🇮🇹' },
};

const STORAGE_KEY = 'pdfcompressor_lang';
let currentLang = 'en';

export const TRANSLATIONS = {
  en: {
    'app.title': 'PDF Compressor — Compress your PDF files',
    'header.tagline': 'Compress PDF files in your browser',
    'header.badge': '🔒 100% local — your files never leave your browser',
    'privacy.link': 'View on GitHub',
    'footer.bmc': 'Buy me a coffee',
    'dropzone.title': 'Drop your PDF here',
    'dropzone.subtitle': 'or click to select a file',
    'controls.compressionLevel': 'Compression level',
    'quality.low': 'Low — Best compression',
    'quality.medium': 'Medium — Balanced',
    'quality.high': 'High — Best quality',
    'btn.compress': 'Compress PDF',
    'btn.reset': 'Reset',
    'btn.download': 'Download compressed PDF',
    'btn.selectFile': 'Select PDF file',
    'alerts.noFile': 'Please select a PDF file.',
    'alerts.invalidType': 'Only PDF files are supported.',
    'alerts.error': 'Compression error: {msg}',
    'alerts.success': 'PDF compressed successfully!',
    'progress.compressing': 'Compressing PDF...',
    'result.originalSize': 'Original size:',
    'result.compressedSize': 'Compressed size:',
    'result.savings': 'Saved:',
    'lang.label': 'Language',
    'compress.resultName': 'compressed_{timestamp}',
    'workspace.files': 'Uploaded files',
    'controls.hint': 'Low: Maximum compression, some quality loss. Medium: Good balance. High: Minimal compression, best quality.',
    'controls.files': 'Files:',
    'btn.addMore': 'Add more files',
    'btn.resetAll': 'Reset',
    'progress.done': 'Compression complete. Saved {ratio}%',
  },

  fr: {
    'app.title': 'PDF Compressor — Compressez vos fichiers PDF',
    'header.tagline': 'Compressez vos fichiers PDF dans votre navigateur',
    'header.badge': '🔒 100% local — vos fichiers ne quittent jamais votre navigateur',
    'privacy.link': 'Voir sur GitHub',
    'footer.bmc': 'Offrir un café',
    'dropzone.title': 'Déposez votre PDF ici',
    'dropzone.subtitle': 'ou cliquez pour sélectionner un fichier',
    'controls.compressionLevel': 'Niveau de compression',
    'quality.low': 'Faible — Meilleure compression',
    'quality.medium': 'Moyenne — Équilibré',
    'quality.high': 'Élevée — Meilleure qualité',
    'btn.compress': 'Compresser le PDF',
    'btn.reset': 'Réinitialiser',
    'btn.download': 'Télécharger le PDF compressé',
    'btn.selectFile': 'Sélectionner un PDF',
    'alerts.noFile': 'Veuillez sélectionner un fichier PDF.',
    'alerts.invalidType': 'Seuls les fichiers PDF sont pris en charge.',
    'alerts.error': 'Erreur de compression : {msg}',
    'alerts.success': 'PDF compressé avec succès !',
    'progress.compressing': 'Compression du PDF...',
    'result.originalSize': 'Taille originale :',
    'result.compressedSize': 'Taille compressée :',
    'result.savings': 'Économie :',
    'lang.label': 'Langue',
    'compress.resultName': 'compresse_{timestamp}',
    'workspace.files': 'Fichiers importés',
    'controls.hint': 'Faible : Compression maximale, perte de qualité. Moyenne : Bon équilibre. Élevée : Compression minimale, meilleure qualité.',
    'controls.files': 'Fichiers :',
    'btn.addMore': 'Ajouter des fichiers',
    'btn.resetAll': 'Réinitialiser',
    'progress.done': 'Compression terminée. Économie de {ratio}%',
  },

  de: {
    'app.title': 'PDF Compressor — PDF-Dateien komprimieren',
    'header.tagline': 'Komprimieren Sie Ihre PDF-Dateien im Browser',
    'header.badge': '🔒 100% lokal — Ihre Dateien verlassen nie den Browser',
    'privacy.link': 'Auf GitHub ansehen',
    'footer.bmc': 'Kaffee ausgeben',
    'dropzone.title': 'Legen Sie Ihr PDF hier ab',
    'dropzone.subtitle': 'oder klicken Sie, um eine Datei auszuwählen',
    'controls.compressionLevel': 'Komprimierungsstufe',
    'quality.low': 'Niedrig — Beste Komprimierung',
    'quality.medium': 'Mittel — Ausgewogen',
    'quality.high': 'Hoch — Beste Qualität',
    'btn.compress': 'PDF komprimieren',
    'btn.reset': 'Zurücksetzen',
    'btn.download': 'Komprimiertes PDF herunterladen',
    'btn.selectFile': 'PDF auswählen',
    'alerts.noFile': 'Bitte wählen Sie eine PDF-Datei aus.',
    'alerts.invalidType': 'Nur PDF-Dateien werden unterstützt.',
    'alerts.error': 'Komprimierungsfehler: {msg}',
    'alerts.success': 'PDF erfolgreich komprimiert!',
    'progress.compressing': 'PDF wird komprimiert...',
    'result.originalSize': 'Originalgröße:',
    'result.compressedSize': 'Komprimierte Größe:',
    'result.savings': 'Eingespart:',
    'lang.label': 'Sprache',
    'compress.resultName': 'komprimiert_{timestamp}',
    'workspace.files': 'Hochgeladene Dateien',
    'controls.hint': 'Niedrig: Maximale Komprimierung, etwas Qualitätsverlust. Mittel: Gute Balance. Hoch: Minimale Komprimierung, beste Qualität.',
    'controls.files': 'Dateien:',
    'btn.addMore': 'Weitere Dateien hinzufügen',
    'btn.resetAll': 'Zurücksetzen',
    'progress.done': 'Komprimierung abgeschlossen. {ratio} eingespart',
  },

  es: {
    'app.title': 'PDF Compressor — Comprime tus archivos PDF',
    'header.tagline': 'Comprime tus archivos PDF en el navegador',
    'header.badge': '🔒 100% local — tus archivos nunca salen del navegador',
    'privacy.link': 'Ver en GitHub',
    'footer.bmc': 'Invítame un café',
    'dropzone.title': 'Deja tu PDF aquí',
    'dropzone.subtitle': 'o haz clic para seleccionar un archivo',
    'controls.compressionLevel': 'Nivel de compresión',
    'quality.low': 'Baja — Mejor compresión',
    'quality.medium': 'Media — Equilibrado',
    'quality.high': 'Alta — Mejor calidad',
    'btn.compress': 'Comprimir PDF',
    'btn.reset': 'Reiniciar',
    'btn.download': 'Descargar PDF comprimido',
    'btn.selectFile': 'Seleccionar PDF',
    'alerts.noFile': 'Por favor, selecciona un archivo PDF.',
    'alerts.invalidType': 'Solo se admiten archivos PDF.',
    'alerts.error': 'Error de compresión: {msg}',
    'alerts.success': '¡PDF comprimido con éxito!',
    'progress.compressing': 'Comprimiendo PDF...',
    'result.originalSize': 'Tamaño original:',
    'result.compressedSize': 'Tamaño comprimido:',
    'result.savings': 'Ahorro:',
    'lang.label': 'Idioma',
    'compress.resultName': 'comprimido_{timestamp}',
    'workspace.files': 'Archivos subidos',
    'controls.hint': 'Baja: Compresión máxima, algo de pérdida de calidad. Media: Buen equilibrio. Alta: Compresión mínima, mejor calidad.',
    'controls.files': 'Archivos:',
    'btn.addMore': 'Añadir más archivos',
    'btn.resetAll': 'Reiniciar',
    'progress.done': 'Compresión completa. Ahorro de {ratio}%',
  },

  pt: {
    'app.title': 'PDF Compressor — Comprima seus arquivos PDF',
    'header.tagline': 'Comprima seus arquivos PDF no navegador',
    'header.badge': '🔒 100% local — seus arquivos nunca saem do navegador',
    'privacy.link': 'Ver no GitHub',
    'footer.bmc': 'Pague um café',
    'dropzone.title': 'Solte seu PDF aqui',
    'dropzone.subtitle': 'ou clique para selecionar um arquivo',
    'controls.compressionLevel': 'Nível de compressão',
    'quality.low': 'Baixa — Melhor compressão',
    'quality.medium': 'Média — Equilibrado',
    'quality.high': 'Alta — Melhor qualidade',
    'btn.compress': 'Comprimir PDF',
    'btn.reset': 'Redefinir',
    'btn.download': 'Baixar PDF comprimido',
    'btn.selectFile': 'Selecionar PDF',
    'alerts.noFile': 'Por favor, selecione um arquivo PDF.',
    'alerts.invalidType': 'Apenas arquivos PDF são suportados.',
    'alerts.error': 'Erro de compressão: {msg}',
    'alerts.success': 'PDF comprimido com sucesso!',
    'progress.compressing': 'Comprimindo PDF...',
    'result.originalSize': 'Tamanho original:',
    'result.compressedSize': 'Tamanho comprimido:',
    'result.savings': 'Economia:',
    'lang.label': 'Idioma',
    'compress.resultName': 'comprimido_{timestamp}',
    'workspace.files': 'Arquivos carregados',
    'controls.hint': 'Baixa: Compressão máxima, alguma perda de qualidade. Média: Bom equilíbrio. Alta: Compressão mínima, melhor qualidade.',
    'controls.files': 'Arquivos:',
    'btn.addMore': 'Adicionar mais arquivos',
    'btn.resetAll': 'Redefinir',
    'progress.done': 'Compressão concluída. Economia de {ratio}%',
  },

  nl: {
    'app.title': 'PDF Compressor — Comprimeer uw PDF-bestanden',
    'header.tagline': 'Comprimeer uw PDF-bestanden in uw browser',
    'header.badge': '🔒 100% lokaal — uw bestanden verlaten nooit uw browser',
    'privacy.link': 'Bekijk op GitHub',
    'footer.bmc': 'Koffie aanbieden',
    'dropzone.title': 'Sleep uw PDF hierheen',
    'dropzone.subtitle': 'of klik om een bestand te selecteren',
    'controls.compressionLevel': 'Compressieniveau',
    'quality.low': 'Laag — Beste compressie',
    'quality.medium': 'Gemiddeld — Gebalanceerd',
    'quality.high': 'Hoog — Beste kwaliteit',
    'btn.compress': 'PDF comprimeren',
    'btn.reset': 'Opnieuw',
    'btn.download': 'Gecomprimeerde PDF downloaden',
    'btn.selectFile': 'PDF selecteren',
    'alerts.noFile': 'Selecteer een PDF-bestand.',
    'alerts.invalidType': 'Alleen PDF-bestanden worden ondersteund.',
    'alerts.error': 'Compressiefout: {msg}',
    'alerts.success': 'PDF succesvol gecomprimeerd!',
    'progress.compressing': 'PDF comprimeren...',
    'result.originalSize': 'Originele grootte:',
    'result.compressedSize': 'Gecomprimeerde grootte:',
    'result.savings': 'Bespaard:',
    'lang.label': 'Taal',
    'compress.resultName': 'gecomprimeerd_{timestamp}',
    'workspace.files': 'Geüploade bestanden',
    'controls.hint': 'Laag: Maximale compressie, wat kwaliteitsverlies. Gemiddeld: Goede balans. Hoog: Minimale compressie, beste kwaliteit.',
    'controls.files': 'Bestanden:',
    'btn.addMore': 'Meer bestanden toevoegen',
    'btn.resetAll': 'Opnieuw',
    'progress.done': 'Comprimeren voltooid. {ratio} bespaard',
  },

  it: {
    'app.title': 'PDF Compressor — Comprimi i tuoi file PDF',
    'header.tagline': 'Comprimi i tuoi file PDF nel browser',
    'header.badge': '🔒 100% locale — i tuoi file non lasciano mai il browser',
    'privacy.link': 'Vedi su GitHub',
    'footer.bmc': 'Offri un caffè',
    'dropzone.title': 'Trascina qui il tuo PDF',
    'dropzone.subtitle': 'o clicca per selezionare un file',
    'controls.compressionLevel': 'Livello di compressione',
    'quality.low': 'Bassa — Migliore compressione',
    'quality.medium': 'Media — Equilibrato',
    'quality.high': 'Alta — Migliore qualità',
    'btn.compress': 'Comprimi PDF',
    'btn.reset': 'Ripristina',
    'btn.download': 'Scarica PDF compresso',
    'btn.selectFile': 'Seleziona PDF',
    'alerts.noFile': 'Seleziona un file PDF.',
    'alerts.invalidType': 'Solo i file PDF sono supportati.',
    'alerts.error': 'Errore di compressione: {msg}',
    'alerts.success': 'PDF compresso con successo!',
    'progress.compressing': 'Compressione del PDF...',
    'result.originalSize': 'Dimensione originale:',
    'result.compressedSize': 'Dimensione compressa:',
    'result.savings': 'Risparmiato:',
    'lang.label': 'Lingua',
    'compress.resultName': 'compresso_{timestamp}',
    'workspace.files': 'File caricati',
    'controls.hint': 'Bassa: Compressione massima, qualche perdita di qualità. Media: Buon equilibrio. Alta: Compressione minima, migliore qualità.',
    'controls.files': 'File:',
    'btn.addMore': 'Aggiungi altri file',
    'btn.resetAll': 'Ripristina',
    'progress.done': 'Compressione completata. Risparmio del {ratio}%',
  },
};

/**
 * Translate a key with optional parameter substitution.
 * @param {string} key - Translation key (e.g. 'alerts.error')
 * @param {Object} params - Parameters to substitute (e.g. { msg: 'error' })
 * @returns {string} Translated string
 */
export function t(key, params = {}) {
  const lang = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  let str = lang[key] || TRANSLATIONS.en[key] || key;

  for (const [k, v] of Object.entries(params)) {
    str = str.replace(`{${k}}`, String(v));
  }

  return str;
}

/**
 * Get the current language code.
 * @returns {string} Current language code (e.g. 'en', 'fr')
 */
export function getCurrentLanguage() {
  return currentLang;
}

/**
 * Apply translations to all data-i18n elements in the DOM.
 */
function applyTranslations() {
  // data-i18n: textContent
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  // data-i18n-title: title attribute
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.setAttribute('title', t(key));
    }
  });

  // data-i18n-aria-label: aria-label attribute
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (key) {
      el.setAttribute('aria-label', t(key));
    }
  });

  // Update document title and lang attribute
  document.title = t('app.title');
  document.documentElement.lang = currentLang;
}

/**
 * Set the current language, persist to localStorage, and apply translations.
 * @param {string} lang - Language code (e.g. 'fr', 'de')
 * @param {Function} [callback] - Optional callback after language change
 */
export function setLanguage(lang, callback) {
  if (!LANGUAGES[lang]) {
    console.warn(`Unknown language: ${lang}, falling back to 'en'`);
    lang = 'en';
  }

  currentLang = lang;

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // localStorage might be unavailable (private browsing)
  }

  applyTranslations();

  if (typeof callback === 'function') {
    callback(lang);
  }
}

/**
 * Create the language selector buttons and append to header.
 */
function createLanguageSelector() {
  const header = document.querySelector('.header');
  if (!header) return;

  // Remove existing selector if any
  const existing = header.querySelector('.lang-selector');
  if (existing) existing.remove();

  const selector = document.createElement('div');
  selector.className = 'lang-selector';
  selector.setAttribute('role', 'group');
  selector.setAttribute('aria-label', t('lang.label'));

  for (const [code, info] of Object.entries(LANGUAGES)) {
    const btn = document.createElement('button');
    btn.className = 'lang-btn';
    btn.textContent = info.flag;
    btn.title = info.name;
    btn.setAttribute('aria-label', info.name);
    btn.setAttribute('data-lang', code);
    if (code === currentLang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.setAttribute('aria-pressed', 'false');
    }

    btn.addEventListener('click', () => {
      // Update active states
      selector.querySelectorAll('.lang-btn').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      setLanguage(code);
    });

    selector.appendChild(btn);
  }

  header.appendChild(selector);
}

/**
 * Initialize i18n on app startup.
 * Loads saved language from localStorage, defaults to 'en'.
 */
export function initI18n() {
  let savedLang = 'en';

  try {
    savedLang = localStorage.getItem(STORAGE_KEY) || 'en';
  } catch (e) {
    // localStorage unavailable
  }

  if (!LANGUAGES[savedLang]) {
    savedLang = 'en';
  }

  currentLang = savedLang;
  applyTranslations();
  createLanguageSelector();
}
