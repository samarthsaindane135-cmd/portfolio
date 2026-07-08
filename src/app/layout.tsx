import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { headers } from "next/headers";
import { locales, defaultLocale } from "@/lib/i18n";
import { LocaleProvider } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n";
import "./globals.css";

const ibmSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-sans",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Samarth Saindane — Portfolio",
  description:
    "Computer Engineering student and full-stack / AI developer. Building products from MERN apps to RAG systems.",
  openGraph: {
    title: "Samarth Saindane — Portfolio",
    description:
      "Computer Engineering student and full-stack / AI developer. Building products from MERN apps to RAG systems.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = headers();

  // 1. x-detected-locale header set by Netlify Edge Function (geo-IP + cookie override)
  const edgeLocale = h.get("x-detected-locale");

  // 2. Fall back to Accept-Language if edge function is bypassed (local dev etc.)
  const acceptLanguage = h.get("accept-language");

  let locale: Locale = defaultLocale;
  if (edgeLocale && (locales as readonly string[]).includes(edgeLocale)) {
    locale = edgeLocale as Locale;
  } else if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")
      .map((s) => s.split(";")[0].trim().split("-")[0])
      .find((l) => (locales as readonly string[]).includes(l));
    if (preferred) locale = preferred as Locale;
  }

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${ibmSans.variable} ${ibmMono.variable} font-sans antialiased`}
      >
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
