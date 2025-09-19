'use client';

import { useState } from 'react';
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { Copy, RefreshCw, Shield, CheckCircle, AlertCircle, Building2 } from "lucide-react";

const metadata: Metadata = {
  title: "Gerador de CNPJ - Gere CNPJs Válidos para Testes | Ferramentas Online",
  description: "Gerador de CNPJ online gratuito. Gere CNPJs válidos para testes e desenvolvimento de sistemas. Ferramenta rápida e segura, sem armazenamento de dados.",
  keywords: ["gerador cnpj", "cnpj válido", "gerar cnpj", "cnpj para teste", "validar cnpj"],
  openGraph: {
    title: "Gerador de CNPJ - Gere CNPJs Válidos para Testes",
    description: "Gerador de CNPJ online gratuito. Gere CNPJs válidos para testes e desenvolvimento de sistemas.",
    url: "/gerador-cnpj",
  },
};

const breadcrumbItems = [
  { label: "Geradores", href: "/geradores" },
  { label: "Gerador de CNPJ", href: "/gerador-cnpj" }
];

// Função para gerar CNPJ válido
function generateCNPJ(): string {
  // Gera os 8 primeiros dígitos aleatoriamente
  const digits: number[] = [];
  for (let i = 0; i < 8; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }
  
  // Adiciona 0001 (filial padrão)
  digits.push(0, 0, 0, 1);

  // Calcula o primeiro dígito verificador
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * weights1[i];
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;
  digits.push(firstDigit);

  // Calcula o segundo dígito verificador
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += digits[i] * weights2[i];
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;
  digits.push(secondDigit);

  return digits.join('');
}

// Função para formatar CNPJ
function formatCNPJ(cnpj: string): string {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gerador de CNPJ",
  description: "Ferramenta online gratuita para gerar CNPJs válidos para testes e desenvolvimento",
  url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"}/gerador-cnpj`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  permissions: "browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL"
  },
  featureList: [
    "Geração de CNPJ válido",
    "Formatação automática",
    "Cópia rápida",
    "Sem armazenamento de dados"
  ]
};

export default function GeradorCNPJ() {
  const [cnpj, setCnpj] = useState('');
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    const newCNPJ = generateCNPJ();
    setCnpj(newCNPJ);
    setGenerated(true);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (cnpj) {
      try {
        await navigator.clipboard.writeText(formatCNPJ(cnpj));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar:', err);
      }
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Gerador de CNPJ
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Gere CNPJs válidos para testes e desenvolvimento de sistemas. 
              Ferramenta gratuita, rápida e segura.
            </p>
          </div>

          {/* Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Generate Button */}
              <div className="text-center">
                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <RefreshCw className="h-5 w-5" />
                  Gerar CNPJ
                </button>
              </div>

              {/* Result */}
              {generated && (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">CNPJ Gerado:</p>
                        <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                          {formatCNPJ(cnpj)}
                        </p>
                      </div>
                      <button
                        onClick={handleCopy}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          copied 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-300'
                        }`}
                      >
                        {copied ? (
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
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-medium text-amber-900 dark:text-amber-200">
                  Importante - Uso Responsável
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Este CNPJ é válido matematicamente, mas não pertence a nenhuma empresa real. 
                  Use apenas para testes, desenvolvimento de sistemas ou demonstrações. 
                  Não utilize para fins fraudulentos ou ilegais.
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
              <h3 className="font-medium text-gray-900 dark:text-white">Seguro</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Não armazenamos nenhum dado gerado
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Válido</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                CNPJs matematicamente corretos
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Padrão</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Segue regras da Receita Federal
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
                  O CNPJ gerado é real?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Não, o CNPJ é válido matematicamente (passa na validação do algoritmo), 
                  mas não pertence a nenhuma empresa real. É gerado aleatoriamente apenas para testes.
                </div>
              </details>
              
              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Por que sempre termina com 0001?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Os dígitos 0001 representam a matriz da empresa (primeira filial). 
                  É o padrão mais comum para empresas que possuem apenas uma unidade.
                </div>
              </details>
              
              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Para que posso usar o CNPJ gerado?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Apenas para testes de sistemas, desenvolvimento de software, preenchimento 
                  de formulários de teste, demonstrações e fins educacionais.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}