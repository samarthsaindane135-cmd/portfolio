export const locales = [
  "en", "hi", "mr", "ja", "ko", "zh", "fr", "de", "es", "pt",
  "ru", "ar", "it", "nl", "tr", "vi", "th", "pl", "sv", "da",
  "fi", "no", "cs", "ro", "hu", "el", "he", "id", "ms", "tl",
] as const;

export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const labels: Record<Locale, { subtitle: string }> = {
  en: { subtitle: "> Computer Engineering Student" },
  hi: { subtitle: "> कंप्यूटर इंजीनियरिंग के छात्र" },
  mr: { subtitle: "> संगणक अभियांत्रिकी विद्यार्थी" },
  ja: { subtitle: "> コンピュータ工学部学生" },
  ko: { subtitle: "> 컴퓨터공학과 학생" },
  zh: { subtitle: "> 计算机工程专业学生" },
  fr: { subtitle: "> Étudiant en génie informatique" },
  de: { subtitle: "> Student der Computertechnik" },
  es: { subtitle: "> Estudiante de Ingeniería Informática" },
  pt: { subtitle: "> Estudante de Engenharia da Computação" },
  ru: { subtitle: "> Студент компьютерной инженерии" },
  ar: { subtitle: "> طالب هندسة الحاسوب" },
  it: { subtitle: "> Studente di Ingegneria Informatica" },
  nl: { subtitle: "> Student Computertechniek" },
  tr: { subtitle: "> Bilgisayar Mühendisliği Öğrencisi" },
  vi: { subtitle: "> Sinh viên Kỹ thuật Máy tính" },
  th: { subtitle: "> นักศึกษาวิศวกรรมคอมพิวเตอร์" },
  pl: { subtitle: "> Student inżynierii komputerowej" },
  sv: { subtitle: "> Datateknikstudent" },
  da: { subtitle: "> Studerende inden for datateknik" },
  fi: { subtitle: "> Tietotekniikan opiskelija" },
  no: { subtitle: "> Student i datateknikk" },
  cs: { subtitle: "> Student počítačového inženýrství" },
  ro: { subtitle: "> Student la Inginerie Calculatoare" },
  hu: { subtitle: "> Számítógép-mérnöki hallgató" },
  el: { subtitle: "> Φοιτητής Μηχανικής Υπολογιστών" },
  he: { subtitle: "> סטודנט להנדסת מחשבים" },
  id: { subtitle: "> Mahasiswa Teknik Komputer" },
  ms: { subtitle: "> Pelajar Kejuruteraan Komputer" },
  tl: { subtitle: "> Mag-aaral ng Computer Engineering" },
};

export function getTranslations(locale: Locale) {
  return labels[locale] ?? labels.en;
}

const countryToLocale: Record<string, Locale> = {
  // India
  IN: "hi",
  // Japan
  JP: "ja",
  // Korea
  KR: "ko",
  // China
  CN: "zh",
  TW: "zh",
  HK: "zh",
  SG: "zh",
  // French
  FR: "fr",
  BE: "fr",
  CH: "fr",
  LU: "fr",
  MC: "fr",
  CF: "fr",
  CG: "fr",
  CD: "fr",
  CI: "fr",
  CM: "fr",
  BJ: "fr",
  BF: "fr",
  BI: "fr",
  DJ: "fr",
  GQ: "fr",
  GA: "fr",
  GN: "fr",
  HT: "fr",
  KM: "fr",
  LA: "fr",
  MG: "fr",
  ML: "fr",
  MA: "fr",
  MU: "fr",
  NE: "fr",
  RW: "fr",
  SC: "fr",
  SN: "fr",
  TD: "fr",
  TG: "fr",
  VU: "fr",
  // German
  DE: "de",
  AT: "de",
  // Spanish
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  EC: "es",
  GT: "es",
  CU: "es",
  DO: "es",
  VE: "es",
  BO: "es",
  HN: "es",
  PY: "es",
  SV: "es",
  NI: "es",
  CR: "es",
  PA: "es",
  UY: "es",
  // Portuguese
  PT: "pt",
  BR: "pt",
  AO: "pt",
  MZ: "pt",
  // Russian
  RU: "ru",
  BY: "ru",
  KZ: "ru",
  KG: "ru",
  // Arabic
  SA: "ar",
  AE: "ar",
  EG: "ar",
  IQ: "ar",
  JO: "ar",
  KW: "ar",
  LB: "ar",
  LY: "ar",
  MR: "ar",
  OM: "ar",
  QA: "ar",
  SD: "ar",
  SY: "ar",
  TN: "ar",
  YE: "ar",
  BH: "ar",
  PS: "ar",
  // Italian
  IT: "it",
  SM: "it",
  // Dutch
  NL: "nl",
  // Turkish
  TR: "tr",
  // Vietnamese
  VN: "vi",
  // Thai
  TH: "th",
  // Polish
  PL: "pl",
  // Swedish
  SE: "sv",
  // Danish
  DK: "da",
  // Finnish
  FI: "fi",
  // Norwegian
  NO: "no",
  // Czech
  CZ: "cs",
  // Romanian
  RO: "ro",
  // Hungarian
  HU: "hu",
  // Greek
  GR: "el",
  CY: "el",
  // Hebrew
  IL: "he",
  // Indonesian
  ID: "id",
  // Malay
  MY: "ms",
  // Filipino
  PH: "tl",
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
