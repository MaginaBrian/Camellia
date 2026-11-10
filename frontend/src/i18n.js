import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'
import pt from './locales/pt.json'
import fr from './locales/fr.json'
import de from './locales/de.json'

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
]

const STORAGE_KEY = 'camellia-lang'
const codes = new Set(languages.map((language) => language.code))

function storedLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (codes.has(saved)) return saved
  } catch {
    /* private browsing can block storage */
  }
  return 'en'
}

function applyDocument(lng) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = lng
  const meta = document.querySelector('meta[name="description"]')
  if (meta) meta.setAttribute('content', i18n.t('meta.description'))
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    pt: { translation: pt },
    fr: { translation: fr },
    de: { translation: de },
  },
  lng: storedLang(),
  fallbackLng: 'en',
  initImmediate: false,
  interpolation: { escapeValue: false },
  returnObjects: true,
  react: { useSuspense: false },
})

applyDocument(i18n.language)
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    /* ignore */
  }
  applyDocument(lng)
})

export default i18n
