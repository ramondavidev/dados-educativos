"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import {
  CheckCircle,
  XCircle,
  Shield,
  AlertTriangle,
  Building2,
} from "lucide-react";

const breadcrumbItems = [
  { label: "Validadores", href: "/validadores" },
  { label: "Validador de CNPJ", href: "/validador-cnpj" },
];

// Função para limpar CNPJ (remover formatação)
function cleanCNPJ(cnpj: string): string {
  return cnpj.replace(/[^\d]/g, "");
}

// Função para formatar CNPJ
function formatCNPJ(cnpj: string): string {
  const clean = cleanCNPJ(cnpj);
  if (clean.length === 14) {
    return clean.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }
  return cnpj;
}

// Função para validar CNPJ
function validateCNPJ(cnpj: string): boolean {
  const clean = cleanCNPJ(cnpj);

  // Verifica se tem 14 dígitos
  if (clean.length !== 14) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(clean)) return false;

  // Converte para array de números
  const digits = clean.split("").map(Number);

  // Calcula primeiro dígito verificador
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * weights1[i];
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;

  if (digits[12] !== firstDigit) return false;

  // Calcula segundo dígito verificador
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += digits[i] * weights2[i];
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;

  return digits[13] === secondDigit;
}

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Validador de CNPJ",
  description: "Ferramenta online gratuita para validar CNPJs brasileiros",
  url: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  }/validador-cnpj`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  permissions: "browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Validação de CNPJ",
    "Formatação automática",
    "Verificação em tempo real",
    "Sem armazenamento de dados",
  ],
};

export function ValidadorCNPJClient() {
  const [cnpj, setCnpj] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (value: string) => {
    const formatted = formatCNPJ(value);
    setCnpj(formatted);

    const clean = cleanCNPJ(value);
    if (clean.length === 14) {
      const valid = validateCNPJ(clean);
      setIsValid(valid);
      setShowResult(true);
    } else {
      setIsValid(null);
      setShowResult(false);
    }
  };

  const handleClear = () => {
    setCnpj("");
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Validador de CNPJ
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Verifique se um CNPJ é válido instantaneamente. Digite ou cole o
              CNPJ e receba o resultado imediatamente.
            </p>
          </div>

          {/* Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Input */}
              <div className="space-y-4">
                <label className="block text-base font-medium text-gray-700 dark:text-gray-300">
                  Digite o CNPJ para validar:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cnpj}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="00.000.000/0000-00"
                    maxLength={18}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-lg"
                  />
                  <button
                    onClick={handleClear}
                    className="px-4 py-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors text-base"
                  >
                    Limpar
                  </button>
                </div>
              </div>

              {/* Result */}
              {showResult && (
                <div
                  className={`rounded-lg p-6 ${
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
                        className={`font-medium text-lg ${
                          isValid
                            ? "text-green-900 dark:text-green-200"
                            : "text-red-900 dark:text-red-200"
                        }`}
                      >
                        {isValid ? "CNPJ Válido" : "CNPJ Inválido"}
                      </h3>
                      <p
                        className={`text-base ${
                          isValid
                            ? "text-green-700 dark:text-green-300"
                            : "text-red-700 dark:text-red-300"
                        }`}
                      >
                        {isValid
                          ? "Este CNPJ possui uma formatação válida e passou na verificação dos dígitos verificadores."
                          : "Este CNPJ não é válido. Verifique se foi digitado corretamente."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-medium text-amber-900 dark:text-amber-200 text-lg">
                  Importante - Validação Matemática
                </h3>
                <p className="text-base text-amber-800 dark:text-amber-300">
                  Esta ferramenta verifica apenas se o CNPJ é válido
                  matematicamente (dígitos verificadores corretos). Ela não
                  verifica se o CNPJ realmente existe ou se pertence a uma
                  empresa específica.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-lg">
                Privacidade
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Validação local, dados não são enviados
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-lg">
                Instantâneo
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Resultado imediato enquanto digita
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-lg">
                Preciso
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Algoritmo oficial da Receita Federal
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Perguntas Frequentes
            </h2>

            <div className="space-y-4">
              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-6 cursor-pointer font-medium text-gray-900 dark:text-white text-lg">
                  O que significa CNPJ válido?
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-base">
                  Um CNPJ válido significa que os dígitos verificadores estão
                  corretos segundo o algoritmo da Receita Federal, mas não
                  garante que o CNPJ pertence a uma empresa real.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-6 cursor-pointer font-medium text-gray-900 dark:text-white text-lg">
                  Esta ferramenta consulta a Receita Federal?
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-base">
                  Não, fazemos apenas a validação matemática dos dígitos
                  verificadores. Para consultar se um CNPJ realmente existe, use
                  o site oficial da Receita Federal.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-6 cursor-pointer font-medium text-gray-900 dark:text-white text-lg">
                  Meus dados ficam armazenados?
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-base">
                  Não, toda a validação é feita no seu navegador. Não enviamos
                  nem armazenamos nenhum CNPJ digitado em nossos servidores.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
