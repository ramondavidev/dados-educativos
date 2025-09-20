import Link from "next/link";
import { Zap, Shield, Calculator, RefreshCw, ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Geradores",
    description: "Crie dados válidos para testes e desenvolvimento",
    icon: Zap,
    href: "/geradores",
    color: "blue",
    tools: [
      "Gerador de CPF",
      "Gerador de CNPJ",
      "Gerador de Senhas",
      "Gerador de QR Code",
    ],
  },
  {
    title: "Validadores",
    description: "Verifique a validade de documentos e dados",
    icon: Shield,
    href: "/validadores",
    color: "green",
    tools: [
      "Validador de CPF",
      "Validador de CNPJ",
      "Validador de Email",
      "Validador de Telefone",
    ],
  },
  {
    title: "Calculadoras",
    description: "Calcule valores financeiros e pessoais",
    icon: Calculator,
    href: "/calculadoras",
    color: "purple",
    tools: [
      "Juros Compostos",
      "Rescisão CLT",
      "Calculadora de IMC",
      "Férias e 13º",
    ],
  },
  {
    title: "Conversores",
    description: "Converta unidades, moedas e temperaturas",
    icon: RefreshCw,
    href: "/conversores",
    color: "orange",
    tools: [
      "Conversor de Moedas",
      "Conversor de Medidas",
      "Conversor de Temperatura",
    ],
  },
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      icon: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-950/30",
      icon: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/30",
      icon: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-950/30",
      icon: "text-orange-600 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-800",
    },
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export function Categories() {
  return (
    <section className="container">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Todas as Categorias
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore nossa coleção completa de ferramentas organizadas por
          categoria
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const colors = getColorClasses(category.color);
          const Icon = category.icon;

          return (
            <div
              key={category.title}
              className={`group relative p-6 rounded-xl border ${colors.border} ${colors.bg} hover:shadow-lg transition-all duration-200`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`p-2 rounded-lg bg-white dark:bg-gray-900 border`}
                  >
                    <Icon className={`h-6 w-6 ${colors.icon}`} />
                  </div>
                  <h3 className="font-semibold text-xl">{category.title}</h3>
                </div>

                <p className="text-muted-foreground text-lg mb-4 flex-1">
                  {category.description}
                </p>

                <div className="space-y-2 mb-4">
                  {category.tools.map((tool) => (
                    <div
                      key={tool}
                      className="text-base text-muted-foreground flex items-center"
                    >
                      <div className="w-1 h-1 bg-muted-foreground/40 rounded-full mr-2" />
                      {tool}
                    </div>
                  ))}
                </div>

                <Link
                  href={category.href}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-auto"
                >
                  Ver todas
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
