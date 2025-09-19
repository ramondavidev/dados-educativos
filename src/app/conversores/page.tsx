import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { RefreshCw, ArrowRight, Star, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Conversores Online Gratuitos - Moedas, Medidas e Temperatura",
  description:
    "Conversores online gratuitos para moedas, unidades de medida, temperatura e muito mais. Rápido, preciso e sem cadastros.",
  keywords: [
    "conversor online",
    "conversor moedas",
    "conversor medidas",
    "conversor temperatura",
    "conversao unidades",
  ],
  openGraph: {
    title: "Conversores Online Gratuitos - Moedas, Medidas e Temperatura",
    description:
      "Conversores online gratuitos para moedas, unidades de medida, temperatura e muito mais. Rápido, preciso e sem cadastros.",
    url: "/conversores",
  },
};

const breadcrumbItems = [{ label: "Conversores", href: "/conversores" }];

const converters = [
  {
    title: "Conversor de Moedas",
    description:
      "Converta valores entre diferentes moedas com cotação atualizada",
    href: "/conversor-moedas",
    popularity: 5,
    featured: true,
    uses: "52k+ usos/mês",
    category: "Financeiro",
  },
  {
    title: "Conversor de Medidas",
    description: "Converta entre diferentes unidades de medida e peso",
    href: "/conversor-medidas",
    popularity: 4,
    featured: true,
    uses: "28k+ usos/mês",
    category: "Unidades",
  },
  {
    title: "Conversor de Temperatura",
    description: "Converta entre Celsius, Fahrenheit e Kelvin",
    href: "/conversor-temperatura",
    popularity: 4,
    featured: true,
    uses: "22k+ usos/mês",
    category: "Unidades",
  },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Conversores Online Gratuitos",
  description:
    "Coleção de conversores online para moedas, medidas, temperatura e outras unidades",
  url: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  }/conversores`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: converters.length,
    itemListElement: converters.map((conv, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebApplication",
        name: conv.title,
        description: conv.description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"}${
          conv.href
        }`,
        applicationCategory: "UtilityApplication",
      },
    })),
  },
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Financeiro":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Unidades":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

export default function ConversoresPage() {
  const featuredConverters = converters.filter((conv) => conv.featured);
  const allConverters = converters.sort((a, b) => b.popularity - a.popularity);

  return (
    <>
      <JsonLd data={collectionSchema} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb items={breadcrumbItems} />

        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <RefreshCw className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Conversores Online
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Conversores gratuitos e precisos para moedas, unidades de medida,
              temperatura e muito mais. Resultados instantâneos e confiáveis.
            </p>
          </div>

          {/* Featured Converters */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Conversores em Destaque
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredConverters.map((conv, index) => (
                <Link
                  key={index}
                  href={conv.href}
                  className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            conv.category
                          )}`}
                        >
                          {conv.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {conv.title}
                        </h3>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {conv.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {conv.uses}
                      </span>
                      <div className="flex">
                        {Array.from({ length: conv.popularity }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* All Converters */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Todos os Conversores
            </h2>

            <div className="grid gap-4">
              {allConverters.map((conv, index) => (
                <Link
                  key={index}
                  href={conv.href}
                  className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            conv.category
                          )}`}
                        >
                          {conv.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {conv.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {conv.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {conv.uses}
                        </span>
                        <div className="flex">
                          {Array.from({ length: conv.popularity }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="h-3 w-3 fill-yellow-400 text-yellow-400"
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Por que usar nossos conversores?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Instantâneo
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Conversões em tempo real conforme você digita
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Preciso
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cálculos precisos com múltiplas casas decimais
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <ArrowRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Fácil de Usar
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Interface simples e intuitiva para todos
                </p>
              </div>
            </div>
          </section>

          {/* Categories Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Categorias de Conversores
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Financeiro
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Conversão de moedas com cotações atualizadas e precisas
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Unidades
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Medidas de comprimento, peso, volume, temperatura e área
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
