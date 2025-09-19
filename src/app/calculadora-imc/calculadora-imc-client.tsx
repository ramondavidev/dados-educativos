"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Calculator,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";

const breadcrumbItems = [
  { label: "Calculadoras", href: "/calculadoras" },
  { label: "Calculadora de IMC", href: "/calculadora-imc" },
];

// Função para calcular IMC e classificação
function calculateIMC(
  weight: number,
  height: number
): {
  imc: number;
  classification: string;
  description: string;
  color: string;
  risks: string[];
} {
  const imc = weight / (height * height);

  if (imc < 18.5) {
    return {
      imc,
      classification: "Abaixo do peso",
      description: "Peso inferior ao normal para sua altura",
      color: "text-blue-600 dark:text-blue-400",
      risks: [
        "Desnutrição",
        "Problemas de imunidade",
        "Perda de massa muscular",
      ],
    };
  } else if (imc >= 18.5 && imc < 25) {
    return {
      imc,
      classification: "Peso normal",
      description: "Peso adequado para sua altura",
      color: "text-green-600 dark:text-green-400",
      risks: ["Menor risco de doenças cardiovasculares", "Boa saúde geral"],
    };
  } else if (imc >= 25 && imc < 30) {
    return {
      imc,
      classification: "Sobrepeso",
      description: "Peso acima do normal para sua altura",
      color: "text-yellow-600 dark:text-yellow-400",
      risks: [
        "Risco aumentado de diabetes tipo 2",
        "Pressão alta",
        "Doenças cardíacas",
      ],
    };
  } else if (imc >= 30 && imc < 35) {
    return {
      imc,
      classification: "Obesidade grau I",
      description: "Obesidade leve",
      color: "text-orange-600 dark:text-orange-400",
      risks: [
        "Alto risco de diabetes",
        "Problemas cardiovasculares",
        "Apneia do sono",
      ],
    };
  } else if (imc >= 35 && imc < 40) {
    return {
      imc,
      classification: "Obesidade grau II",
      description: "Obesidade moderada",
      color: "text-red-600 dark:text-red-400",
      risks: [
        "Risco muito alto de complicações",
        "Necessita acompanhamento médico",
        "Possível cirurgia bariátrica",
      ],
    };
  } else {
    return {
      imc,
      classification: "Obesidade grau III",
      description: "Obesidade mórbida",
      color: "text-red-800 dark:text-red-300",
      risks: [
        "Risco extremo para a saúde",
        "Urgente acompanhamento médico",
        "Indicação cirúrgica",
      ],
    };
  }
}

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de IMC",
  description:
    "Ferramenta online gratuita para calcular o Índice de Massa Corporal e classificação de peso",
  url: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  }/calculadora-imc`,
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  permissions: "browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Cálculo de IMC",
    "Classificação de peso",
    "Análise de riscos",
    "Orientações de saúde",
  ],
};

export function CalculadoraIMCClient() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateIMC> | null>(
    null
  );
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Converter cm para metros

    if (weightNum > 0 && heightNum > 0) {
      const imc = calculateIMC(weightNum, heightNum);
      setResult(imc);
      setHasCalculated(true);
    }
  };

  const isValidInput = parseFloat(weight) > 0 && parseFloat(height) > 0;

  return (
    <>
      <JsonLd data={toolSchema} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={breadcrumbItems} />

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Activity className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Calculadora de IMC
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Calcule seu Índice de Massa Corporal (IMC) e descubra sua
              classificação de peso. Ferramenta baseada nos padrões da
              Organização Mundial da Saúde.
            </p>
          </div>

          {/* Calculator */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Ex: 70"
                    step="0.1"
                    min="1"
                    max="300"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Ex: 175"
                    step="1"
                    min="50"
                    max="250"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg"
                  />
                </div>
              </div>

              {/* Calculate Button */}
              <div className="text-center">
                <button
                  onClick={handleCalculate}
                  disabled={!isValidInput}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Calculator className="h-5 w-5" />
                  Calcular IMC
                </button>
              </div>

              {/* Result */}
              {hasCalculated && result && (
                <div className="space-y-6">
                  {/* IMC Value */}
                  <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Seu IMC é:
                    </h3>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      {result.imc.toFixed(1)}
                    </div>
                    <div className={`text-xl font-semibold ${result.color}`}>
                      {result.classification}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      {result.description}
                    </p>
                  </div>

                  {/* Classification Chart */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Tabela de Classificação IMC
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div
                        className={`flex justify-between p-2 rounded ${
                          result.classification === "Abaixo do peso"
                            ? "bg-blue-100 dark:bg-blue-900"
                            : ""
                        }`}
                      >
                        <span>Abaixo do peso</span>
                        <span>Menor que 18,5</span>
                      </div>
                      <div
                        className={`flex justify-between p-2 rounded ${
                          result.classification === "Peso normal"
                            ? "bg-green-100 dark:bg-green-900"
                            : ""
                        }`}
                      >
                        <span>Peso normal</span>
                        <span>18,5 - 24,9</span>
                      </div>
                      <div
                        className={`flex justify-between p-2 rounded ${
                          result.classification === "Sobrepeso"
                            ? "bg-yellow-100 dark:bg-yellow-900"
                            : ""
                        }`}
                      >
                        <span>Sobrepeso</span>
                        <span>25,0 - 29,9</span>
                      </div>
                      <div
                        className={`flex justify-between p-2 rounded ${
                          result.classification === "Obesidade grau I"
                            ? "bg-orange-100 dark:bg-orange-900"
                            : ""
                        }`}
                      >
                        <span>Obesidade grau I</span>
                        <span>30,0 - 34,9</span>
                      </div>
                      <div
                        className={`flex justify-between p-2 rounded ${
                          result.classification === "Obesidade grau II"
                            ? "bg-red-100 dark:bg-red-900"
                            : ""
                        }`}
                      >
                        <span>Obesidade grau II</span>
                        <span>35,0 - 39,9</span>
                      </div>
                      <div
                        className={`flex justify-between p-2 rounded ${
                          result.classification === "Obesidade grau III"
                            ? "bg-red-200 dark:bg-red-800"
                            : ""
                        }`}
                      >
                        <span>Obesidade grau III</span>
                        <span>Maior que 40,0</span>
                      </div>
                    </div>
                  </div>

                  {/* Health Information */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
                          Informações sobre sua classificação:
                        </h4>
                        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                          {result.risks.map((risk, index) => (
                            <li key={index}>• {risk}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
                  Importante - Consulte um Profissional
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  O IMC é uma ferramenta de triagem, não um diagnóstico médico.
                  Ele não considera fatores como massa muscular, densidade
                  óssea, composição corporal e histórico de saúde. Sempre
                  consulte um profissional de saúde para avaliação completa.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Cálculo Preciso
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Baseado nos padrões da OMS
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
                <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Classificação Completa
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Com análise de riscos à saúde
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Fácil de Usar
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Resultado instantâneo e claro
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
                  O que é o IMC?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  O Índice de Massa Corporal (IMC) é uma medida que relaciona
                  peso e altura para avaliar se uma pessoa está dentro do peso
                  ideal. É calculado dividindo o peso (kg) pela altura (m) ao
                  quadrado.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  O IMC é preciso para todos?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  O IMC tem limitações. Não é preciso para atletas com muita
                  massa muscular, idosos, crianças ou pessoas com certas
                  condições médicas. É uma ferramenta de triagem, não um
                  diagnóstico definitivo.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Como melhorar meu IMC?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Para manter um IMC saudável, combine alimentação equilibrada
                  com atividade física regular. Consulte sempre um nutricionista
                  ou médico para orientação personalizada sobre dieta e
                  exercícios.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
