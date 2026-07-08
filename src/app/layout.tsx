import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { headers, cookies } from "next/headers";
import { detectLocale } from "@/lib/i18n";
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
  const c = cookies();
  const acceptLanguage = h.get("accept-language");
  const cookieLocale = c.get("NEXT_LOCALE")?.value ?? null;
  const locale: Locale = detectLocale(acceptLanguage, cookieLocale);

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
