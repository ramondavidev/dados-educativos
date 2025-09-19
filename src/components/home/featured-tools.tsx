import Link from "next/link";
import { Star, TrendingUp, Users, Zap } from "lucide-react";

const featuredTools = [
  {
    title: "Gerador de CPF",
    description: "Gere CPFs válidos para testes e desenvolvimento de sistemas",
    href: "/gerador-cpf",
    category: "Gerador",
    popularity: 5,
    stats: "50k+ usos mensais",
  },
  {
    title: "Validador de Email",
    description: "Verifique se um endereço de email possui formato válido",
    href: "/validador-email",
    category: "Validador",
    popularity: 4,
    stats: "30k+ usos mensais",
  },
  {
    title: "Calculadora de Juros Compostos",
    description: "Calcule rendimentos com juros compostos de forma precisa",
    href: "/calculadora-juros-compostos",
    category: "Calculadora",
    popularity: 5,
    stats: "25k+ usos mensais",
  },
  {
    title: "Conversor de Moedas",
    description:
      "Converta valores entre diferentes moedas com cotação atualizada",
    href: "/conversor-moedas",
    category: "Conversor",
    popularity: 4,
    stats: "20k+ usos mensais",
  },
  {
    title: "Gerador de Senhas",
    description: "Crie senhas seguras com diferentes níveis de complexidade",
    href: "/gerador-senhas",
    category: "Gerador",
    popularity: 5,
    stats: "40k+ usos mensais",
  },
  {
    title: "Validador de CNPJ",
    description:
      "Verifique se um CNPJ é válido conforme regras da Receita Federal",
    href: "/validador-cnpj",
    category: "Validador",
    popularity: 4,
    stats: "35k+ usos mensais",
  },
];

const getCategoryColor = (category: string) => {
  const colors = {
    Gerador: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Validador:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Calculadora:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Conversor:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  };
  return colors[category as keyof typeof colors] || colors.Gerador;
};

export function FeaturedTools() {
  return (
    <section className="container">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ferramentas Mais Populares
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          As ferramentas mais utilizadas pela nossa comunidade
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredTools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group block">
            <div className="bg-card rounded-lg border p-6 hover:shadow-lg transition-all duration-200 h-full">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-md ${getCategoryColor(
                          tool.category
                        )}`}
                      >
                        {tool.category}
                      </span>
                      <div className="flex items-center">
                        {[...Array(tool.popularity)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                  </div>
                  <Zap className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 flex-1">
                  {tool.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{tool.stats}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Popular</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/geradores"
          className="btn-primary inline-flex items-center space-x-2"
        >
          <span>Ver Todas as Ferramentas</span>
          <Zap className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
