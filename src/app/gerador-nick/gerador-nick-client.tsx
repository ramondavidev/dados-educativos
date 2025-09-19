"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import {
  RefreshCw,
  Gamepad2,
  User,
  Copy,
  CheckCircle,
  Dice6,
} from "lucide-react";

const breadcrumbItems = [
  { label: "Geradores", href: "/geradores" },
  { label: "Gerador de Nick", href: "/gerador-nick" },
];

// Elementos para gerar nicknames criativos
const adjectives = [
  "Dark",
  "Shadow",
  "Fire",
  "Ice",
  "Storm",
  "Lightning",
  "Thunder",
  "Night",
  "Blood",
  "Steel",
  "Iron",
  "Gold",
  "Silver",
  "Diamond",
  "Crystal",
  "Mystic",
  "Phantom",
  "Ghost",
  "Spirit",
  "Soul",
  "Wild",
  "Savage",
  "Fierce",
  "Silent",
  "Swift",
  "Quick",
  "Fast",
  "Rapid",
  "Ultra",
  "Super",
  "Mega",
  "Hyper",
  "Alpha",
  "Beta",
  "Omega",
  "Prime",
  "Elite",
  "Master",
  "Pro",
  "Epic",
  "Legendary",
  "Immortal",
  "Eternal",
  "Ancient",
  "Noble",
  "Royal",
  "Divine",
];

const nouns = [
  "Wolf",
  "Dragon",
  "Phoenix",
  "Tiger",
  "Lion",
  "Eagle",
  "Hawk",
  "Raven",
  "Viper",
  "Cobra",
  "Shark",
  "Panther",
  "Hunter",
  "Warrior",
  "Knight",
  "Ninja",
  "Samurai",
  "Assassin",
  "Sniper",
  "Mage",
  "Wizard",
  "Sorcerer",
  "Demon",
  "Angel",
  "King",
  "Queen",
  "Prince",
  "Princess",
  "Lord",
  "Master",
  "Champion",
  "Hero",
  "Legend",
  "Myth",
  "Storm",
  "Thunder",
  "Lightning",
  "Blade",
  "Sword",
  "Arrow",
  "Fire",
  "Ice",
  "Shadow",
  "Light",
  "Star",
  "Moon",
  "Sun",
  "Comet",
  "Nova",
];

const gamingWords = [
  "Gamer",
  "Player",
  "Slayer",
  "Killer",
  "Destroyer",
  "Crusher",
  "Striker",
  "Shooter",
  "Fighter",
  "Raider",
  "Guardian",
  "Defender",
  "Protector",
  "Survivor",
  "Winner",
  "Victor",
  "Champion",
  "Beast",
  "Monster",
  "Machine",
  "Force",
  "Power",
  "Energy",
  "Rage",
  "Fury",
  "Wrath",
  "Vengeance",
  "Justice",
  "Honor",
];

const stylishChars = ["x", "z", "v", "k", "X", "Z", "V", "K"];
const numbers = ["1", "2", "3", "7", "8", "9", "0"];

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gerador de Nick",
  description:
    "Ferramenta online gratuita para gerar nicknames únicos para games e redes sociais",
  url: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  }/gerador-nick`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  permissions: "browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Geração de nicknames",
    "Múltiplos estilos",
    "Personalização",
    "Cópia rápida",
  ],
};

export function GeradorNickClient() {
  const [baseName, setBaseName] = useState("");
  const [style, setStyle] = useState("all");
  const [generatedNicks, setGeneratedNicks] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateNicks = () => {
    const nicks: string[] = [];
    const usedNicks = new Set<string>();

    // Função para adicionar elementos estilísticos
    const stylizeNick = (nick: string, styleType: string) => {
      let styled = nick;

      if (styleType === "numbers" || styleType === "all") {
        // Adicionar números
        const num = numbers[Math.floor(Math.random() * numbers.length)];
        styled = Math.random() > 0.5 ? `${styled}${num}` : `${num}${styled}`;
      }

      if (styleType === "chars" || styleType === "all") {
        // Adicionar caracteres estilísticos
        const char =
          stylishChars[Math.floor(Math.random() * stylishChars.length)];
        styled = Math.random() > 0.5 ? `${styled}${char}` : `${char}${styled}`;
      }

      return styled;
    };

    // Função para gerar nick baseado em elementos
    const createNick = () => {
      const base = baseName.trim();

      if (base) {
        // Se há nome base, usar ele
        const variations = [
          base,
          `${adjectives[Math.floor(Math.random() * adjectives.length)]}${base}`,
          `${base}${nouns[Math.floor(Math.random() * nouns.length)]}`,
          `${base}${
            gamingWords[Math.floor(Math.random() * gamingWords.length)]
          }`,
        ];
        return variations[Math.floor(Math.random() * variations.length)];
      } else {
        // Gerar nick aleatório
        const templates = [
          `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
            nouns[Math.floor(Math.random() * nouns.length)]
          }`,
          `${nouns[Math.floor(Math.random() * nouns.length)]}${
            gamingWords[Math.floor(Math.random() * gamingWords.length)]
          }`,
          `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
            gamingWords[Math.floor(Math.random() * gamingWords.length)]
          }`,
        ];
        return templates[Math.floor(Math.random() * templates.length)];
      }
    };

    // Gerar 10 nicks únicos
    while (nicks.length < 10 && nicks.length < 50) {
      let newNick = createNick();

      // Aplicar estilização baseada na seleção
      if (style !== "clean") {
        newNick = stylizeNick(newNick, style);
      }

      if (!usedNicks.has(newNick.toLowerCase())) {
        usedNicks.add(newNick.toLowerCase());
        nicks.push(newNick);
      }
    }

    setGeneratedNicks(nicks);
    setCopiedIndex(null);
  };

  const handleCopy = async (nick: string, index: number) => {
    try {
      await navigator.clipboard.writeText(nick);
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
              <Gamepad2 className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Gerador de Nick
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Crie nicknames únicos e criativos para games, redes sociais e
              plataformas online. Personalize com seu nome ou deixe a
              criatividade fluir!
            </p>
          </div>

          {/* Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="baseName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Nome base (opcional)
                  </label>
                  <input
                    type="text"
                    id="baseName"
                    value={baseName}
                    onChange={(e) => setBaseName(e.target.value)}
                    placeholder="Ex: João, Maria, Gamer..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="style"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Estilo
                  </label>
                  <select
                    id="style"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">Todos os estilos</option>
                    <option value="clean">Limpo (sem números/símbolos)</option>
                    <option value="numbers">Com números</option>
                    <option value="chars">Com caracteres especiais</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <button
                  onClick={generateNicks}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Dice6 className="h-5 w-5" />
                  Gerar Nicks
                </button>
              </div>

              {/* Results */}
              {generatedNicks.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Nicknames Gerados:
                  </h3>
                  <div className="grid gap-3">
                    {generatedNicks.map((nick, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                      >
                        <span className="text-gray-900 dark:text-white font-medium font-mono">
                          {nick}
                        </span>
                        <button
                          onClick={() => handleCopy(nick, index)}
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

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Gamepad2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Para Games
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nicks perfeitos para jogos online
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
                <User className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Personalizável
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use seu nome ou crie do zero
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <RefreshCw className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Infinito
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Gere quantos nicks quiser
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
                  Os nicks gerados estão disponíveis?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Esta ferramenta gera sugestões criativas, mas você deve
                  verificar a disponibilidade em cada plataforma específica
                  antes de usar.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Posso usar meu nome real?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Sim! Digite seu nome no campo &quot;Nome base&quot; e o
                  gerador criará variações criativas combinando com outros
                  elementos.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Como escolher o melhor nick?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Escolha um nick que seja fácil de lembrar, represente sua
                  personalidade e seja apropriado para a plataforma onde será
                  usado.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
