import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FeaturedTools } from "@/components/home/featured-tools";
import { Categories } from "@/components/home/categories";
import { FAQ } from "@/components/home/faq";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title:
    "Ferramentas Online Gratuitas - Hub de Geradores, Validadores e Calculadoras",
  description:
    "Mais de 20 ferramentas online gratuitas: geradores de CPF, CNPJ, senhas, QR codes, validadores, calculadoras e conversores. Rápido, seguro e sem cadastro.",
  openGraph: {
    title:
      "Ferramentas Online Gratuitas - Hub de Geradores, Validadores e Calculadoras",
    description:
      "Mais de 20 ferramentas online gratuitas: geradores de CPF, CNPJ, senhas, QR codes, validadores, calculadoras e conversores. Rápido, seguro e sem cadastro.",
    url: "/",
    type: "website",
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Ferramentas Online Gratuitas",
  description:
    "Hub completo de ferramentas online: geradores, validadores, calculadoras e conversores. Tudo gratuito e sem necessidade de cadastro.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Gerador de CPF e CNPJ",
    "Validadores de documentos",
    "Calculadoras financeiras",
    "Conversores de unidades",
    "Gerador de senhas seguras",
    "Gerador de QR Code",
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={webApplicationSchema} />
      <div className="space-y-16 py-8">
        <Hero />
        <Categories />
        <FeaturedTools />
        <FAQ />
      </div>
    </>
  );
}
