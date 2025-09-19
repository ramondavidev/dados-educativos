import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { Calculator, ArrowRight, Star, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Calculadoras Online Gratuitas - Juros, Salário, IMC e Mais",
  description:
    "Calculadoras online gratuitas para finanças, saúde e trabalho. Juros compostos, rescisão CLT, férias, 13º salário, IMC e muito mais.",
  keywords: [
    "calculadora online",
    "calculadora juros compostos",
    "calculadora rescisão",
    "calculadora imc",
    "calculadora ferias",
  ],
  openGraph: {
    title: "Calculadoras Online Gratuitas - Juros, Salário, IMC e Mais",
    description:
      "Calculadoras online gratuitas para finanças, saúde e trabalho. Juros compostos, rescisão CLT, férias, 13º salário, IMC e muito mais.",
    url: "/calculadoras",
  },
};

const breadcrumbItems = [{ label: "Calculadoras", href: "/calculadoras" }];

const calculators = [
  {
    title: "Calculadora de Juros Compostos",
    description: "Calcule rendimentos com juros compostos ao longo do tempo",
    href: "/calculadora-juros-compostos",
    popularity: 5,
    featured: true,
    uses: "45k+ usos/mês",
    category: "Financeiro",
  },
  {
    title: "Calculadora de Rescisão CLT",
    description: "Calcule valores de rescisão trabalhista conforme CLT",
    href: "/calculadora-rescisao-clt",
    popularity: 5,
    featured: true,
    uses: "38k+ usos/mês",
    category: "Trabalhista",
  },
  {
    title: "Calculadora de Férias",
    description: "Calcule valores de férias e adicional de 1/3",
    href: "/calculadora-ferias",
    popularity: 4,
    featured: true,
    uses: "32k+ usos/mês",
    category: "Trabalhista",
  },
  {
    title: "Calculadora de 13º Salário",
    description: "Calcule o valor do décimo terceiro salário proporcional",
    href: "/calculadora-13-salario",
    popularity: 4,
    featured: false,
    uses: "28k+ usos/mês",
    category: "Trabalhista",
  },
  {
    title: "Calculadora de IMC",
    description: "Calcule seu Índice de Massa Corporal e classificação",
    href: "/calculadora-imc",
    popularity: 5,
    featured: true,
    uses: "42k+ usos/mês",
    category: "Saúde",
  },
  {
    title: "Calculadora de Combustível",
    description: "Compare álcool e gasolina para decidir o melhor combustível",
    href: "/calculadora-combustivel",
    popularity: 4,
    featured: false,
    uses: "25k+ usos/mês",
    category: "Utilidades",
  },
  {
    title: "Calculadora de Consumo de Energia",
    description: "Calcule o consumo elétrico e custo de aparelhos",
    href: "/calculadora-consumo-energia",
    popularity: 3,
    featured: false,
    uses: "18k+ usos/mês",
    category: "Utilidades",
  },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Calculadoras Online Gratuitas",
  description:
    "Coleção de calculadoras online para finanças, trabalho, saúde e utilidades",
  url: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  }/calculadoras`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: calculators.length,
    itemListElement: calculators.map((calc, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebApplication",
        name: calc.title,
        description: calc.description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"}${
          calc.href
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
    case "Trabalhista":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Saúde":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "Utilidades":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

export default function CalculadorasPage() {
  const featuredCalculators = calculators.filter((calc) => calc.featured);
  const allCalculators = calculators.sort(
    (a, b) => b.popularity - a.popularity
  );

  return (
    <>
      <JsonLd data={collectionSchema} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb items={breadcrumbItems} />

        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Calculator className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Calculadoras Online
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Calculadoras gratuitas e precisas para finanças, trabalho, saúde e
              muito mais. Simples de usar, sem cadastros necessários.
            </p>
          </div>

          {/* Featured Calculators */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Calculadoras em Destaque
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCalculators.map((calc, index) => (
                <Link
                  key={index}
                  href={calc.href}
                  className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            calc.category
                          )}`}
                        >
                          {calc.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {calc.title}
                        </h3>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {calc.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {calc.uses}
                      </span>
                      <div className="flex">
                        {Array.from({ length: calc.popularity }).map((_, i) => (
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

          {/* All Calculators */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Todas as Calculadoras
            </h2>

            <div className="grid gap-4">
              {allCalculators.map((calc, index) => (
                <Link
                  key={index}
                  href={calc.href}
                  className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            calc.category
                          )}`}
                        >
                          {calc.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {calc.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {calc.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {calc.uses}
                        </span>
                        <div className="flex">
                          {Array.from({ length: calc.popularity }).map(
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

          {/* Categories Info */}
          <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Categorias de Calculadoras
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Financeiro
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Juros, investimentos e planejamento financeiro
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Trabalhista
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Rescisão, férias, 13º salário e direitos CLT
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Saúde
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  IMC, calorias e indicadores de saúde
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Utilidades
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Combustível, energia e cálculos do dia a dia
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
