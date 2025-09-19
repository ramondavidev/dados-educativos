"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import {
  CheckCircle,
  XCircle,
  CreditCard,
  AlertTriangle,
  Shield,
} from "lucide-react";

const breadcrumbItems = [
  { label: "Validadores", href: "/validadores" },
  {
    label: "Validador de Cartão de Crédito",
    href: "/validador-cartao-credito",
  },
];

// Função para limpar número do cartão
function cleanCardNumber(cardNumber: string): string {
  return cardNumber.replace(/\D/g, "");
}

// Função para formatar número do cartão
function formatCardNumber(cardNumber: string): string {
  const clean = cleanCardNumber(cardNumber);
  return clean.replace(/(\d{4})(?=\d)/g, "$1 ");
}

// Função para identificar a bandeira do cartão
function getCardBrand(cardNumber: string): string {
  const clean = cleanCardNumber(cardNumber);

  // Visa: 4
  if (/^4/.test(clean)) {
    return "Visa";
  }

  // Mastercard: 5[1-5] ou 2[2-7]
  if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) {
    return "Mastercard";
  }

  // American Express: 34, 37
  if (/^3[47]/.test(clean)) {
    return "American Express";
  }

  // Discover: 6011, 65, 644-649, 622126-622925
  if (
    /^6011/.test(clean) ||
    /^65/.test(clean) ||
    /^64[4-9]/.test(clean) ||
    /^622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[01]\d|92[0-5])/.test(clean)
  ) {
    return "Discover";
  }

  // JCB: 35, 2131, 1800
  if (/^35/.test(clean) || /^2131/.test(clean) || /^1800/.test(clean)) {
    return "JCB";
  }

  // Diners Club: 30[0-5], 36, 38
  if (/^30[0-5]/.test(clean) || /^36/.test(clean) || /^38/.test(clean)) {
    return "Diners Club";
  }

  // Elo (Brasil): 4011, 4312, 4389, 4514, 4573, 455906, 504175, 627780, 636297, 636368
  if (
    /^(4011|4312|4389|4514|4573|455906|504175|627780|636297|636368)/.test(clean)
  ) {
    return "Elo";
  }

  // Hipercard (Brasil): 606282, 637095, 637568, 637599, 637609, 637612
  if (/^(606282|637095|637568|637599|637609|637612)/.test(clean)) {
    return "Hipercard";
  }

  return "Desconhecida";
}

// Algoritmo de Luhn para validar cartão de crédito
function validateCardNumber(cardNumber: string): boolean {
  const clean = cleanCardNumber(cardNumber);

  if (clean.length < 13 || clean.length > 19) {
    return false;
  }

  let sum = 0;
  let alternate = false;

  // Processa da direita para a esquerda
  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean[i]);

    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit = Math.floor(digit / 10) + (digit % 10);
      }
    }

    sum += digit;
    alternate = !alternate;
  }

  return sum % 10 === 0;
}

// Função para obter comprimento esperado baseado na bandeira
function getExpectedLength(brand: string): number[] {
  switch (brand) {
    case "Visa":
      return [13, 16, 19];
    case "Mastercard":
      return [16];
    case "American Express":
      return [15];
    case "Discover":
      return [16];
    case "JCB":
      return [16];
    case "Diners Club":
      return [14];
    case "Elo":
    case "Hipercard":
      return [16];
    default:
      return [13, 14, 15, 16, 17, 18, 19];
  }
}

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Validador de Cartão de Crédito",
  description:
    "Ferramenta online gratuita para validar números de cartão de crédito usando o algoritmo de Luhn",
  url: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  }/validador-cartao-credito`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  permissions: "browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Validação por algoritmo de Luhn",
    "Identificação de bandeiras",
    "Formatação automática",
    "Verificação de comprimento",
  ],
};

export function ValidadorCartaoCreditoClient() {
  const [cardNumber, setCardNumber] = useState("");
  const [hasValidated, setHasValidated] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCardNumber(value);
    setHasValidated(!!value.trim());
  };

  const brand = getCardBrand(cardNumber);
  const isValid = validateCardNumber(cardNumber);
  const clean = cleanCardNumber(cardNumber);
  const expectedLengths = getExpectedLength(brand);
  const hasCorrectLength = expectedLengths.includes(clean.length);

  const handleValidate = () => {
    setHasValidated(true);
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
              <CreditCard className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Validador de Cartão de Crédito
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Valide números de cartão de crédito usando o algoritmo de Luhn.
              Identifica bandeiras e verifica a estrutura do número.
            </p>
          </div>

          {/* Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Input */}
              <div className="space-y-2">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Número do Cartão de Crédito
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="4111 1111 1111 1111"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg font-mono"
                />
              </div>

              {/* Validate Button */}
              <div className="text-center">
                <button
                  onClick={handleValidate}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <CreditCard className="h-5 w-5" />
                  Validar Cartão
                </button>
              </div>

              {/* Result */}
              {hasValidated && cardNumber.trim() && (
                <div className="space-y-4">
                  {/* Main validation result */}
                  <div
                    className={`rounded-lg p-4 ${
                      isValid && hasCorrectLength
                        ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isValid && hasCorrectLength ? (
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                      )}
                      <div className="flex-1">
                        <h3
                          className={`font-medium ${
                            isValid && hasCorrectLength
                              ? "text-green-900 dark:text-green-200"
                              : "text-red-900 dark:text-red-200"
                          }`}
                        >
                          {isValid && hasCorrectLength
                            ? "Cartão Válido"
                            : "Cartão Inválido"}
                        </h3>
                        <p
                          className={`text-sm mt-1 ${
                            isValid && hasCorrectLength
                              ? "text-green-700 dark:text-green-300"
                              : "text-red-700 dark:text-red-300"
                          }`}
                        >
                          Número formatado: {formatCardNumber(cardNumber)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card brand info */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <div>
                        <h4 className="font-medium text-blue-900 dark:text-blue-200">
                          Bandeira Identificada
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {brand}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Validation details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div
                      className={`rounded-lg p-4 border ${
                        isValid
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                          : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isValid ? (
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            isValid
                              ? "text-green-900 dark:text-green-200"
                              : "text-red-900 dark:text-red-200"
                          }`}
                        >
                          Algoritmo de Luhn: {isValid ? "Válido" : "Inválido"}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`rounded-lg p-4 border ${
                        hasCorrectLength
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                          : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {hasCorrectLength ? (
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            hasCorrectLength
                              ? "text-green-900 dark:text-green-200"
                              : "text-red-900 dark:text-red-200"
                          }`}
                        >
                          Comprimento: {clean.length} dígitos
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Warnings */}
                  {(!isValid || !hasCorrectLength) && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-amber-900 dark:text-amber-200">
                            Problemas Encontrados:
                          </h4>
                          <ul className="text-sm text-amber-800 dark:text-amber-300 mt-1 space-y-1">
                            {!isValid && (
                              <li>• O número não passa no algoritmo de Luhn</li>
                            )}
                            {!hasCorrectLength && (
                              <li>
                                • Comprimento incorreto para a bandeira {brand}{" "}
                                (esperado: {expectedLengths.join(" ou ")}{" "}
                                dígitos)
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-medium text-amber-900 dark:text-amber-200">
                  Importante - Segurança e Privacidade
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Esta ferramenta apenas valida a estrutura matemática do número
                  do cartão. Nunca digite informações reais de cartões que você
                  possui. Os dados são processados localmente em seu navegador e
                  não são enviados para nossos servidores.
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
                Seguro
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Processamento local no navegador
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
                <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Múltiplas Bandeiras
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visa, Mastercard, Amex e mais
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Algoritmo de Luhn
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Validação matemática precisa
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
                  O que é o algoritmo de Luhn?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  É uma fórmula matemática usada para validar números de cartão
                  de crédito. Detecta erros de digitação, mas não verifica se o
                  cartão existe ou está ativo.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  É seguro usar esta ferramenta?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Sim, o processamento é feito inteiramente no seu navegador.
                  Nunca envie dados de cartões reais. Use apenas para validar
                  formatos e aprender sobre o algoritmo.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Quais bandeiras são suportadas?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Visa, Mastercard, American Express, Discover, JCB, Diners
                  Club, Elo e Hipercard (bandeiras brasileiras).
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
