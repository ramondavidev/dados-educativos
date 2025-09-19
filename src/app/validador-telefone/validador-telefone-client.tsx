"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import {
  CheckCircle,
  XCircle,
  Phone,
  AlertTriangle,
  Smartphone,
} from "lucide-react";

const breadcrumbItems = [
  { label: "Validadores", href: "/validadores" },
  { label: "Validador de Telefone", href: "/validador-telefone" },
];

// Função para limpar telefone (remover formatação)
function cleanPhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

// Função para formatar telefone
function formatPhone(phone: string): string {
  const clean = cleanPhone(phone);

  if (clean.length === 10) {
    // Telefone fixo: (11) 1234-5678
    return clean.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else if (clean.length === 11) {
    // Celular: (11) 91234-5678
    return clean.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  return phone;
}

// Função para validar telefone brasileiro
function validatePhone(phone: string): {
  isValid: boolean;
  type: string;
  errors: string[];
} {
  const clean = cleanPhone(phone);
  const errors: string[] = [];

  // Verificações básicas
  if (clean.length < 10 || clean.length > 11) {
    errors.push("Telefone deve ter 10 ou 11 dígitos");
    return { isValid: false, type: "inválido", errors };
  }

  // Extrair código de área
  const areaCode = clean.substring(0, 2);
  const number = clean.substring(2);

  // Códigos de área válidos no Brasil
  const validAreaCodes = [
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19", // SP
    "21",
    "22",
    "24", // RJ
    "27",
    "28", // ES
    "31",
    "32",
    "33",
    "34",
    "35",
    "37",
    "38", // MG
    "41",
    "42",
    "43",
    "44",
    "45",
    "46", // PR
    "47",
    "48",
    "49", // SC
    "51",
    "53",
    "54",
    "55", // RS
    "61", // DF
    "62",
    "64", // GO
    "63", // TO
    "65",
    "66", // MT
    "67", // MS
    "68", // AC
    "69", // RO
    "71",
    "73",
    "74",
    "75",
    "77", // BA
    "79", // SE
    "81",
    "87", // PE
    "82", // AL
    "83", // PB
    "84", // RN
    "85",
    "88", // CE
    "86",
    "89", // PI
    "91",
    "93",
    "94", // PA
    "92",
    "97", // AM
    "95", // RR
    "96", // AP
    "98",
    "99", // MA
  ];

  if (!validAreaCodes.includes(areaCode)) {
    errors.push("Código de área inválido");
  }

  let type = "inválido";

  if (clean.length === 10) {
    // Telefone fixo
    type = "fixo";
    if (number[0] === "0" || number[0] === "1") {
      errors.push("Primeiro dígito após o código de área não pode ser 0 ou 1");
    }
  } else if (clean.length === 11) {
    // Celular
    type = "celular";
    if (number[0] !== "9") {
      errors.push("Celular deve começar com 9 após o código de área");
    }
    if (number[1] === "0" || number[1] === "1") {
      errors.push("Segundo dígito após o código de área não pode ser 0 ou 1");
    }
  }

  // Verificar se não são todos os números iguais
  if (new Set(clean).size === 1) {
    errors.push("Telefone não pode ter todos os dígitos iguais");
  }

  return {
    isValid: errors.length === 0,
    type,
    errors,
  };
}

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Validador de Telefone",
  description:
    "Ferramenta online gratuita para validar números de telefone brasileiros",
  url: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  }/validador-telefone`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  permissions: "browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Validação de telefone",
    "Detecção de tipo (fixo/celular)",
    "Formatação automática",
    "Verificação de código de área",
  ],
};

export function ValidadorTelefoneClient() {
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState<{
    isValid: boolean;
    type: string;
    errors: string[];
  } | null>(null);
  const [hasValidated, setHasValidated] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);

    if (value.trim()) {
      const result = validatePhone(value);
      setValidation(result);
      setHasValidated(true);
    } else {
      setValidation(null);
      setHasValidated(false);
    }
  };

  const handleValidate = () => {
    if (phone.trim()) {
      const result = validatePhone(phone);
      setValidation(result);
      setHasValidated(true);
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
              <Phone className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Validador de Telefone
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Valide números de telefone brasileiros instantaneamente. Verifica
              formato, estrutura e códigos de área válidos.
            </p>
          </div>

          {/* Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Input */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Número de Telefone
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(11) 91234-5678 ou 11912345678"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg"
                />
              </div>

              {/* Validate Button */}
              <div className="text-center">
                <button
                  onClick={handleValidate}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  Validar Telefone
                </button>
              </div>

              {/* Result */}
              {hasValidated && validation && (
                <div className="space-y-4">
                  <div
                    className={`rounded-lg p-4 ${
                      validation.isValid
                        ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {validation.isValid ? (
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                      )}
                      <div className="flex-1">
                        <h3
                          className={`font-medium ${
                            validation.isValid
                              ? "text-green-900 dark:text-green-200"
                              : "text-red-900 dark:text-red-200"
                          }`}
                        >
                          {validation.isValid
                            ? "Telefone Válido"
                            : "Telefone Inválido"}
                        </h3>
                        {phone && (
                          <p
                            className={`text-sm mt-1 ${
                              validation.isValid
                                ? "text-green-700 dark:text-green-300"
                                : "text-red-700 dark:text-red-300"
                            }`}
                          >
                            Número formatado: {formatPhone(phone)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {validation.isValid && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        <div>
                          <h4 className="font-medium text-blue-900 dark:text-blue-200">
                            Tipo de Telefone
                          </h4>
                          <p className="text-sm text-blue-700 dark:text-blue-300 capitalize">
                            {validation.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {validation.errors.length > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-amber-900 dark:text-amber-200">
                            Problemas Encontrados:
                          </h4>
                          <ul className="text-sm text-amber-800 dark:text-amber-300 mt-1 space-y-1">
                            {validation.errors.map((error, index) => (
                              <li key={index}>• {error}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Validação Completa
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Verifica formato e códigos de área
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
                <Smartphone className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Detecta Tipo
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Identifica fixo ou celular
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Instantâneo
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Validação em tempo real
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
                  Quais formatos de telefone são aceitos?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Aceita telefones com ou sem formatação: (11) 91234-5678,
                  11912345678, 11 91234-5678, etc. Tanto celulares (11 dígitos)
                  quanto fixos (10 dígitos).
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Como identificar se é celular ou fixo?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Celulares têm 11 dígitos e começam com 9 após o código de
                  área. Telefones fixos têm 10 dígitos e não começam com 9.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Todos os códigos de área são verificados?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Sim, verificamos todos os códigos de área oficiais do Brasil,
                  incluindo os mais recentes adicionados pela ANATEL.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
