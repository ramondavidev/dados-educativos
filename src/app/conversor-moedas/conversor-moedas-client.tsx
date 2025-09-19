"use client";

import { useState, useEffect } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import {
  RefreshCw,
  DollarSign,
  ArrowUpDown,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const breadcrumbItems = [
  { label: "Conversores", href: "/conversores" },
  { label: "Conversor de Moedas", href: "/conversor-moedas" },
];

// Moedas disponíveis com suas taxas fixas para demonstração
// Em uma aplicação real, essas taxas viriam de uma API de cotações
const currencies = {
  BRL: { name: "Real Brasileiro", symbol: "R$", rate: 1 },
  USD: { name: "Dólar Americano", symbol: "$", rate: 0.2 },
  EUR: { name: "Euro", symbol: "€", rate: 0.18 },
  GBP: { name: "Libra Esterlina", symbol: "£", rate: 0.16 },
  JPY: { name: "Iene Japonês", symbol: "¥", rate: 29.5 },
  CAD: { name: "Dólar Canadense", symbol: "C$", rate: 0.27 },
  AUD: { name: "Dólar Australiano", symbol: "A$", rate: 0.3 },
  CNY: { name: "Yuan Chinês", symbol: "¥", rate: 1.45 },
  CHF: { name: "Franco Suíço", symbol: "CHF", rate: 0.18 },
  MXN: { name: "Peso Mexicano", symbol: "$", rate: 3.6 },
};

type CurrencyCode = keyof typeof currencies;

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Conversor de Moedas",
  description:
    "Ferramenta online gratuita para conversão entre diferentes moedas mundiais",
  url: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  }/conversor-moedas`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  permissions: "browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Conversão entre moedas",
    "Múltiplas moedas suportadas",
    "Cálculo em tempo real",
    "Interface intuitiva",
  ],
};

export function ConversorMoedasClient() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("BRL");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("USD");
  const [result, setResult] = useState<number | null>(null);

  // Função para converter moedas
  const convertCurrency = (
    amount: number,
    from: CurrencyCode,
    to: CurrencyCode
  ): number => {
    // Converter para BRL primeiro (taxa base)
    const amountInBRL = amount / currencies[from].rate;
    // Depois converter de BRL para a moeda desejada
    return amountInBRL * currencies[to].rate;
  };

  // Atualizar resultado quando os valores mudarem
  useEffect(() => {
    const amountNum = parseFloat(amount);
    if (amountNum > 0) {
      const convertedAmount = convertCurrency(
        amountNum,
        fromCurrency,
        toCurrency
      );
      setResult(convertedAmount);
    } else {
      setResult(null);
    }
  }, [amount, fromCurrency, toCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (
    value: number,
    currencyCode: CurrencyCode
  ): string => {
    const currency = currencies[currencyCode];
    if (currencyCode === "JPY") {
      return `${currency.symbol} ${value.toFixed(0)}`;
    }
    return `${currency.symbol} ${value.toFixed(2)}`;
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
              <DollarSign className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Conversor de Moedas
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Converta valores entre diferentes moedas do mundo com facilidade.
              Ferramenta rápida e precisa para suas necessidades financeiras.
            </p>
          </div>

          {/* Converter */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Valor a converter
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg"
                />
              </div>

              {/* Currency Selection */}
              <div className="grid md:grid-cols-3 gap-4 items-end">
                {/* From Currency */}
                <div className="space-y-2">
                  <label
                    htmlFor="fromCurrency"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    De
                  </label>
                  <select
                    id="fromCurrency"
                    value={fromCurrency}
                    onChange={(e) =>
                      setFromCurrency(e.target.value as CurrencyCode)
                    }
                    className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {Object.entries(currencies).map(([code, currency]) => (
                      <option key={code} value={code}>
                        {code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleSwapCurrencies}
                    className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-colors"
                    title="Trocar moedas"
                  >
                    <ArrowUpDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* To Currency */}
                <div className="space-y-2">
                  <label
                    htmlFor="toCurrency"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Para
                  </label>
                  <select
                    id="toCurrency"
                    value={toCurrency}
                    onChange={(e) =>
                      setToCurrency(e.target.value as CurrencyCode)
                    }
                    className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {Object.entries(currencies).map(([code, currency]) => (
                      <option key={code} value={code}>
                        {code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Result */}
              {result !== null && parseFloat(amount) > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-medium text-blue-900 dark:text-blue-200">
                      Resultado da Conversão
                    </h3>
                    <div className="space-y-2">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(parseFloat(amount), fromCurrency)}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        equivale a
                      </div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {formatCurrency(result, toCurrency)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Taxa: 1 {fromCurrency} ={" "}
                      {formatCurrency(
                        convertCurrency(1, fromCurrency, toCurrency),
                        toCurrency
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Popular Conversions */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Conversões Populares (1 unidade)
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { from: "USD", to: "BRL" },
                { from: "EUR", to: "BRL" },
                { from: "BRL", to: "USD" },
                { from: "BRL", to: "EUR" },
                { from: "USD", to: "EUR" },
                { from: "GBP", to: "BRL" },
              ].map((conversion, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-lg p-3 text-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">
                      1 {conversion.from} =
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(
                        convertCurrency(
                          1,
                          conversion.from as CurrencyCode,
                          conversion.to as CurrencyCode
                        ),
                        conversion.to as CurrencyCode
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-medium text-amber-900 dark:text-amber-200">
                  Aviso Importante
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  As taxas de câmbio apresentadas são apenas para fins
                  demonstrativos e podem não refletir as cotações reais do
                  mercado. Para transações financeiras reais, sempre consulte
                  fontes oficiais como bancos ou corretoras.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Conversão Instantânea
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Resultado em tempo real
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Múltiplas Moedas
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Principais moedas mundiais
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Fácil de Usar
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Interface simples e intuitiva
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
                  As cotações são atualizadas em tempo real?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Esta é uma versão demonstrativa com taxas fixas para fins
                  educacionais. Para cotações reais e atualizadas, consulte
                  fontes oficiais.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Posso usar para transações financeiras?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Este conversor é apenas para referência. Para transações
                  reais, sempre verifique as taxas atuais com seu banco ou
                  corretora.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Quais moedas são suportadas?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Suportamos as principais moedas mundiais: Real, Dólar, Euro,
                  Libra Esterlina, Iene, Dólar Canadense, Australiano e outras.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
