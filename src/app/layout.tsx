import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@/components/analytics/analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  ),
  title: {
    default:
      "Ferramentas Online Gratuitas - Hub de Geradores, Validadores e Calculadoras",
    template: "%s | Ferramentas Online",
  },
  description:
    "Mais de 20 ferramentas online gratuitas: geradores de CPF, CNPJ, senhas, QR codes, validadores, calculadoras e conversores. Rápido, seguro e sem cadastro.",
  keywords: [
    "ferramentas online",
    "gerador CPF",
    "gerador CNPJ",
    "validador email",
    "calculadora juros",
    "conversor moedas",
    "ferramentas gratuitas",
    "utilities online",
  ],
  authors: [{ name: "Ferramentas Hub" }],
  creator: "Ferramentas Hub",
  publisher: "Ferramentas Hub",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Ferramentas Online",
    title:
      "Ferramentas Online Gratuitas - Hub de Geradores, Validadores e Calculadoras",
    description:
      "Mais de 20 ferramentas online gratuitas: geradores de CPF, CNPJ, senhas, QR codes, validadores, calculadoras e conversores. Rápido, seguro e sem cadastro.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ferramentashub",
    creator: "@ferramentashub",
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <Analytics />
      </head>
      <body className="min-h-screen bg-background font-inter antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
