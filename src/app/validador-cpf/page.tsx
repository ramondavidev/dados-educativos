"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { CheckCircle, XCircle, Shield, AlertTriangle } from "lucide-react";

const metadata: Metadata = {
  title: "Validador de CPF - Verifique CPFs Online | Ferramentas Gratuitas",
  description:
    "Validador de CPF online gratuito. Verifique se um CPF é válido instantaneamente. Ferramenta rápida, segura e sem armazenamento de dados.",
  keywords: [
    "validador cpf",
    "verificar cpf",
    "cpf válido",
    "validar cpf",
    "checkar cpf",
  ],
  openGraph: {
    title: "Validador de CPF - Verifique CPFs Online",
    description:
      "Validador de CPF online gratuito. Verifique se um CPF é válido instantaneamente.",
    url: "/validador-cpf",
  },
};

const breadcrumbItems = [
  { label: "Validadores", href: "/validadores" },
  { label: "Validador de CPF", href: "/validador-cpf" },
];

// Função para limpar CPF (remover formatação)
function cleanCPF(cpf: string): string {
  return cpf.replace(/[^\d]/g, "");
}

// Função para formatar CPF
function formatCPF(cpf: string): string {
  const clean = cleanCPF(cpf);
  if (clean.length === 11) {
    return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  return cpf;
}

// Função para validar CPF
function validateCPF(cpf: string): boolean {
  const clean = cleanCPF(cpf);

  // Verifica se tem 11 dígitos
  if (clean.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(clean)) return false;

  // Converte para array de números
  const digits = clean.split("").map(Number);

  // Calcula primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;

  if (digits[9] !== firstDigit) return false;

  // Calcula segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * (11 - i);
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;

  return digits[10] === secondDigit;
}

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Validador de CPF",
  description: "Ferramenta online gratuita para validar CPFs brasileiros",
  url: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  }/validador-cpf`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  permissions: "browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Validação de CPF",
    "Formatação automática",
    "Verificação em tempo real",
    "Sem armazenamento de dados",
  ],
};

export default function ValidadorCPF() {
  const [cpf, setCpf] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (value: string) => {
    const formatted = formatCPF(value);
    setCpf(formatted);

    const clean = cleanCPF(value);
    if (clean.length === 11) {
      const valid = validateCPF(clean);
      setIsValid(valid);
      setShowResult(true);
    } else {
      setIsValid(null);
      setShowResult(false);
    }
  };

  const handleClear = () => {
    setCpf("");
    setIsValid(null);
    setShowResult(false);
  };

  return (
    <>
      <JsonLd data={toolSchema} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={breadcrumbItems} />

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Validador de CPF
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Verifique se um CPF é válido instantaneamente. Digite ou cole o
              CPF e receba o resultado imediatamente.
            </p>
          </div>

          {/* Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Input */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Digite o CPF para validar:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-lg"
                  />
                  <button
                    onClick={handleClear}
                    className="px-4 py-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    Limpar
                  </button>
                </div>
              </div>

              {/* Result */}
              {showResult && (
                <div
                  className={`rounded-lg p-4 ${
                    isValid
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isValid ? (
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                    )}
                    <div>
                      <h3
                        className={`font-medium ${
                          isValid
                            ? "text-green-900 dark:text-green-200"
                            : "text-red-900 dark:text-red-200"
                        }`}
                      >
                        {isValid ? "CPF Válido" : "CPF Inválido"}
                      </h3>
                      <p
                        className={`text-sm ${
                          isValid
                            ? "text-green-700 dark:text-green-300"
                            : "text-red-700 dark:text-red-300"
                        }`}
                      >
                        {isValid
                          ? "Este CPF possui uma formatação válida e passou na verificação dos dígitos verificadores."
                          : "Este CPF não é válido. Verifique se foi digitado corretamente."}
                      </p>
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
                  Importante - Validação Matemática
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Esta ferramenta verifica apenas se o CPF é válido
                  matematicamente (dígitos verificadores corretos). Ela não
                  verifica se o CPF realmente existe ou se pertence a uma pessoa
                  específica.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Privacidade
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Validação local, dados não são enviados
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Instantâneo
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Resultado imediato enquanto digita
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Preciso
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Algoritmo oficial da Receita Federal
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
                  O que significa CPF válido?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Um CPF válido significa que os dígitos verificadores estão
                  corretos segundo o algoritmo da Receita Federal, mas não
                  garante que o CPF pertence a uma pessoa real.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Esta ferramenta consulta a Receita Federal?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Não, fazemos apenas a validação matemática dos dígitos
                  verificadores. Para consultar se um CPF realmente existe, use
                  o site oficial da Receita Federal.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Meus dados ficam armazenados?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Não, toda a validação é feita no seu navegador. Não enviamos
                  nem armazenamos nenhum CPF digitado em nossos servidores.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
