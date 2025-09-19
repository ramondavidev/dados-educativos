import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { Zap, ArrowRight, Star, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Geradores Online Gratuitos - CPF, CNPJ, Senhas e Mais",
  description:
    "Geradores online gratuitos para CPF, CNPJ, senhas seguras, QR codes, nomes de empresa e nicknames. Rápido, seguro e sem cadastro necessário.",
  keywords: [
    "gerador cpf",
    "gerador cnpj",
    "gerador senha",
    "gerador qr code",
    "gerador nome empresa",
  ],
  openGraph: {
    title: "Geradores Online Gratuitos - CPF, CNPJ, Senhas e Mais",
    description:
      "Geradores online gratuitos para CPF, CNPJ, senhas seguras, QR codes, nomes de empresa e nicknames. Rápido, seguro e sem cadastro necessário.",
    url: "/geradores",
  },
};

const breadcrumbItems = [{ label: "Geradores", href: "/geradores" }];

const generators = [
  {
    title: "Gerador de CPF",
    description: "Gere CPFs válidos para testes e desenvolvimento de sistemas",
    href: "/gerador-cpf",
    popularity: 5,
    featured: true,
    uses: "50k+ usos/mês",
  },
  {
    title: "Gerador de CNPJ",
    description: "Crie CNPJs válidos conforme regras da Receita Federal",
    href: "/gerador-cnpj",
    popularity: 5,
    featured: true,
    uses: "35k+ usos/mês",
  },
  {
    title: "Gerador de Senhas",
    description: "Crie senhas seguras com diferentes níveis de complexidade",
    href: "/gerador-senhas",
    popularity: 5,
    featured: true,
    uses: "40k+ usos/mês",
  },
  {
    title: "Gerador de QR Code",
    description: "Transforme textos e URLs em QR codes de alta qualidade",
    href: "/gerador-qrcode",
    popularity: 4,
    featured: false,
    uses: "25k+ usos/mês",
  },
  {
    title: "Gerador de Nomes de Empresa",
    description: "Obtenha sugestões criativas para nomear seu negócio",
    href: "/gerador-nomes-empresa",
    popularity: 4,
    featured: false,
    uses: "15k+ usos/mês",
  },
  {
    title: "Gerador de Nick",
    description: "Crie nicknames únicos para games e redes sociais",
    href: "/gerador-nick",
    popularity: 4,
    featured: false,
    uses: "20k+ usos/mês",
  },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Geradores Online Gratuitos",
  description:
    "Coleção de ferramentas geradoras online gratuitas para CPF, CNPJ, senhas, QR codes e muito mais.",
  url: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  }/geradores`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: generators.length,
    itemListElement: generators.map((generator, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebApplication",
        name: generator.title,
        description: generator.description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"}${
          generator.href
        }`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "All",
      },
    })),
  },
};

export default function GeradoresPage() {
  const featuredGenerators = generators.filter((gen) => gen.featured);
  const otherGenerators = generators.filter((gen) => !gen.featured);

  return (
    <>
      <JsonLd data={collectionSchema} />
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-6xl mx-auto space-y-12 py-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Zap className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Geradores Online
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Crie dados válidos para testes, desenvolvimento e uso pessoal.
              Todos os geradores são gratuitos, rápidos e funcionam offline.
            </p>
          </div>

          {/* Featured Tools */}
          {featuredGenerators.length > 0 && (
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <Star className="h-5 w-5 text-yellow-500" />
                <h2 className="text-2xl font-bold">Mais Populares</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredGenerators.map((generator) => (
                  <Link
                    key={generator.href}
                    href={generator.href}
                    className="group block"
                  >
                    <div className="bg-card rounded-lg border p-6 hover:shadow-lg transition-all duration-200 h-full">
                      <div className="flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                Popular
                              </span>
                              <div className="flex items-center">
                                {[...Array(generator.popularity)].map(
                                  (_, i) => (
                                    <Star
                                      key={i}
                                      className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                    />
                                  )
                                )}
                              </div>
                            </div>
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {generator.title}
                            </h3>
                          </div>
                          <Zap className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>

                        <p className="text-muted-foreground text-sm mb-4 flex-1">
                          {generator.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{generator.uses}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-primary">
                            <span>Usar agora</span>
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* All Tools */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Todos os Geradores</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generators.map((generator) => (
                <Link
                  key={generator.href}
                  href={generator.href}
                  className="group block p-4 bg-card rounded-lg border hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {generator.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                        {generator.description}
                      </p>
                      <div className="text-xs text-muted-foreground mt-2">
                        {generator.uses}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all ml-2 flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Por Que Usar Nossos Geradores?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Rápido e Eficiente</h3>
                <p className="text-muted-foreground text-sm">
                  Gere dados válidos em segundos, sem necessidade de cadastro ou
                  download
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Dados Válidos</h3>
                <p className="text-muted-foreground text-sm">
                  Todos os dados gerados seguem as regras oficiais e passam por
                  validação
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Sempre Atualizado</h3>
                <p className="text-muted-foreground text-sm">
                  Mantemos nossos algoritmos atualizados com as últimas
                  especificações
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
