export const locales = ["en", "hi", "mr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const labels: Record<Locale, { subtitle: string }> = {
  en: { subtitle: "> Computer Engineering Student" },
  hi: { subtitle: "> कंप्यूटर इंजीनियरिंग के छात्र" },
  mr: { subtitle: "> संगणक अभियांत्रिकी विद्यार्थी" },
};

export function getTranslations(locale: Locale) {
  return labels[locale] ?? labels.en;
}

const countryToLocale: Record<string, Locale> = {
  IN: "hi",
};

export function detectLocale(
  acceptLanguage: string | null,
  cookieLocale: string | null
): Locale {
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale;
  }
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")
      .map((s) => s.split(";")[0].trim().split("-")[0])
      .find((l) => (locales as readonly string[]).includes(l));
    if (preferred) return preferred as Locale;
  }
  return defaultLocale;
}

export function detectLocaleFromCountry(countryCode: string | null): Locale | null {
  if (countryCode && countryCode in countryToLocale) {
    return countryToLocale[countryCode];
  }
  return null;
}
