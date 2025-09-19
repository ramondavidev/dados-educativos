"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import {
  RefreshCw,
  Building2,
  Lightbulb,
  Copy,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const breadcrumbItems = [
  { label: "Geradores", href: "/geradores" },
  { label: "Gerador de Nomes de Empresa", href: "/gerador-nomes-empresa" },
];

// Prefixos e sufixos para gerar nomes criativos
const prefixes = [
  "Tech",
  "Smart",
  "Digital",
  "Mega",
  "Ultra",
  "Pro",
  "Super",
  "Meta",
  "Cyber",
  "Global",
  "Prime",
  "Elite",
  "Neo",
  "Alpha",
  "Beta",
  "Omega",
  "Rapid",
  "Swift",
  "Turbo",
  "Flash",
  "Quick",
  "Fast",
  "Speed",
  "Velocity",
  "Top",
  "Best",
  "Premium",
  "Gold",
  "Diamond",
  "Platinum",
  "Royal",
  "Crown",
  "Advanced",
  "Future",
  "Next",
  "Modern",
  "New",
  "Fresh",
  "Innovative",
  "Creative",
  "Master",
  "Expert",
  "Genius",
  "Bright",
  "Brilliant",
  "Clever",
];

const suffixes = [
  "Solutions",
  "Systems",
  "Tech",
  "Lab",
  "Works",
  "Studio",
  "Group",
  "Corp",
  "Innovations",
  "Dynamics",
  "Ventures",
  "Partners",
  "Associates",
  "Company",
  "Industries",
  "Services",
  "Consulting",
  "Hub",
  "Center",
  "Network",
  "Digital",
  "Online",
  "Web",
  "Cloud",
  "Data",
  "Analytics",
  "Intelligence",
  "Strategy",
  "Management",
  "Development",
  "Design",
  "Creative",
  "Media",
  "Marketing",
  "Advertising",
  "Communications",
  "Business",
  "Enterprise",
  "International",
  "Global",
  "Worldwide",
  "Universal",
  "National",
  "Regional",
];

const businessTypes = [
  "Software",
  "Hardware",
  "Consulting",
  "Marketing",
  "Design",
  "Development",
  "Finance",
  "Health",
  "Education",
  "Entertainment",
  "Travel",
  "Food",
  "Fashion",
  "Beauty",
  "Sports",
  "Automotive",
  "Real Estate",
  "Construction",
  "Energy",
  "Environment",
  "Agriculture",
  "Manufacturing",
  "Retail",
  "Logistics",
];

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gerador de Nomes de Empresa",
  description:
    "Ferramenta online gratuita para gerar nomes criativos de empresas e negócios",
  url: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  }/gerador-nomes-empresa`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  permissions: "browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Geração de nomes de empresa",
    "Sugestões personalizadas",
    "Múltiplas categorias",
    "Cópia rápida",
  ],
};

export function GeradorNomesEmpresaClient() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateNames = () => {
    const names: string[] = [];
    const usedNames = new Set<string>();

    // Função para gerar nome combinando elementos
    const createName = (base: string) => {
      const variations = [
        // Prefixo + palavra-chave
        `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${base}`,
        // Palavra-chave + sufixo
        `${base} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`,
        // Prefixo + palavra-chave + sufixo
        `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${base} ${
          suffixes[Math.floor(Math.random() * suffixes.length)]
        }`,
        // Palavra-chave + tipo de negócio
        `${base} ${
          businessTypes[Math.floor(Math.random() * businessTypes.length)]
        }`,
        // Nome direto com variações
        `${base} Co.`,
        `${base} Inc.`,
        `${base} Ltd.`,
        `${base} Group`,
      ];

      return variations[Math.floor(Math.random() * variations.length)];
    };

    const baseKeyword = keyword.trim() || "Business";

    // Gerar 10 nomes únicos
    while (names.length < 10 && names.length < 50) {
      // Limite de tentativas
      let newName;

      if (category === "all" || category === "tech") {
        newName = createName(baseKeyword);
      } else if (category === "creative") {
        const creativePrefixes = [
          "Art",
          "Creative",
          "Design",
          "Style",
          "Vision",
          "Dream",
        ];
        const creativeSuffixes = [
          "Studio",
          "Design",
          "Creative",
          "Arts",
          "Media",
          "Works",
        ];
        newName = `${
          creativePrefixes[Math.floor(Math.random() * creativePrefixes.length)]
        } ${baseKeyword} ${
          creativeSuffixes[Math.floor(Math.random() * creativeSuffixes.length)]
        }`;
      } else if (category === "professional") {
        const profPrefixes = [
          "Professional",
          "Expert",
          "Consulting",
          "Advisory",
        ];
        const profSuffixes = [
          "Consulting",
          "Services",
          "Solutions",
          "Associates",
          "Partners",
        ];
        newName = `${
          profPrefixes[Math.floor(Math.random() * profPrefixes.length)]
        } ${baseKeyword} ${
          profSuffixes[Math.floor(Math.random() * profSuffixes.length)]
        }`;
      } else {
        newName = createName(baseKeyword);
      }

      if (!usedNames.has(newName)) {
        usedNames.add(newName);
        names.push(newName);
      }
    }

    setGeneratedNames(names);
    setCopiedIndex(null);
  };

  const handleCopy = async (name: string, index: number) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  return (
    <>
      <JsonLd data={toolSchema} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={breadcrumbItems} />

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Building2 className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Gerador de Nomes de Empresa
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Gere nomes criativos e únicos para sua empresa ou negócio.
              Personalize com palavras-chave e categorias específicas.
            </p>
          </div>

          {/* Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="keyword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Palavra-chave (opcional)
                  </label>
                  <input
                    type="text"
                    id="keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Ex: Tech, Marketing, Design..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Categoria
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">Todas as categorias</option>
                    <option value="tech">Tecnologia</option>
                    <option value="creative">Criativo/Design</option>
                    <option value="professional">
                      Profissional/Consultoria
                    </option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <button
                  onClick={generateNames}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <RefreshCw className="h-5 w-5" />
                  Gerar Nomes
                </button>
              </div>

              {/* Results */}
              {generatedNames.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Sugestões de Nomes:
                  </h3>
                  <div className="grid gap-3">
                    {generatedNames.map((name, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                      >
                        <span className="text-gray-900 dark:text-white font-medium">
                          {name}
                        </span>
                        <button
                          onClick={() => handleCopy(name, index)}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors ${
                            copiedIndex === index
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-300"
                          }`}
                        >
                          {copiedIndex === index ? (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copiar
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-medium text-amber-900 dark:text-amber-200">
                  Importante - Verificação de Disponibilidade
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Antes de usar qualquer nome gerado, verifique sua
                  disponibilidade legal, registro de marca e domínio. Esta
                  ferramenta gera apenas sugestões criativas.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Criativo
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Combinações únicas e memoráveis
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
                <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Profissional
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nomes adequados para negócios
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <RefreshCw className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Ilimitado
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Gere quantos nomes precisar
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Perguntas Frequentes
            </h2>

            <div className="space-y-4">
              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Os nomes gerados estão disponíveis?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Esta ferramenta apenas gera sugestões criativas. Você deve
                  verificar a disponibilidade legal, de marca registrada e
                  domínio antes de usar.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Como funciona a geração de nomes?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Combinamos sua palavra-chave com prefixos, sufixos e termos
                  comerciais para criar nomes únicos e profissionais baseados na
                  categoria escolhida.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Posso personalizar mais as sugestões?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Sim! Use palavras-chave específicas do seu negócio e escolha a
                  categoria que melhor representa seu setor para obter sugestões
                  mais direcionadas.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
