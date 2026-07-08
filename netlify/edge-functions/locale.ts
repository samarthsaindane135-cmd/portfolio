const countryToLocale: Record<string, string> = {
  IN: "hi",
  JP: "ja",
  KR: "ko",
  CN: "zh", TW: "zh", HK: "zh", SG: "zh",
  FR: "fr", BE: "fr", CH: "fr", LU: "fr", MC: "fr",
  DE: "de", AT: "de",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es",
  PE: "es", EC: "es", GT: "es", CU: "es", DO: "es",
  VE: "es", BO: "es", HN: "es", PY: "es", SV: "es",
  NI: "es", CR: "es", PA: "es", UY: "es",
  PT: "pt", BR: "pt", AO: "pt", MZ: "pt",
  RU: "ru", BY: "ru", KZ: "ru", KG: "ru",
  SA: "ar", AE: "ar", EG: "ar", IQ: "ar", JO: "ar",
  KW: "ar", LB: "ar", LY: "ar", MR: "ar", OM: "ar",
  QA: "ar", SD: "ar", SY: "ar", TN: "ar", YE: "ar",
  BH: "ar", PS: "ar",
  IT: "it", SM: "it",
  NL: "nl",
  TR: "tr",
  VN: "vi",
  TH: "th",
  PL: "pl",
  SE: "sv",
  DK: "da",
  FI: "fi",
  NO: "no",
  CZ: "cs",
  RO: "ro",
  HU: "hu",
  GR: "el", CY: "el",
  IL: "he",
  ID: "id",
  MY: "ms",
  PH: "tl",
};

const SUPPORTED = new Set(Object.values(countryToLocale));
const DEFAULT = "en";
const COOKIE_OVERRIDE = "locale-override";
const COOKIE_DETECTED = "NEXT_LOCALE";

function detectFromAcceptLanguage(header: string | null): string {
  if (!header) return "";
  const preferred = header
    .split(",")
    .map((s) => s.split(";")[0].trim().split("-")[0])
    .find((l) => SUPPORTED.has(l));
  return preferred ?? "";
}

export default async (request: Request, context: any) => {
  const override = context.cookies.get(COOKIE_OVERRIDE);
  if (override) {
    request.headers.set("x-detected-locale", override);
    return context.next();
  }

  const url = new URL(request.url);
  const debugCountry = url.searchParams.get("debug_country");
  const countryCode = debugCountry || context.geo?.country?.code || "";
  let locale = countryCode && countryCode in countryToLocale
    ? countryToLocale[countryCode]
    : "";

  if (!locale) {
    locale = detectFromAcceptLanguage(request.headers.get("accept-language"));
  }

  if (!locale) {
    locale = DEFAULT;
  }

  context.cookies.set({
    name: COOKIE_DETECTED,
    value: locale,
    path: "/",
    maxAge: 31536000,
    sameSite: "Lax",
  });

  request.headers.set("x-detected-locale", locale);

  const response = await context.next();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
};
