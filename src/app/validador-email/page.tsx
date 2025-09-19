'use client';

import { useState } from 'react';
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { CheckCircle, XCircle, Shield, AlertTriangle, Mail } from "lucide-react";

const metadata: Metadata = {
  title: "Validador de Email - Verifique Emails Online | Ferramentas Gratuitas",
  description: "Validador de email online gratuito. Verifique se um endereço de email é válido instantaneamente. Ferramenta rápida e segura.",
  keywords: ["validador email", "verificar email", "email válido", "validar email", "checkar email"],
  openGraph: {
    title: "Validador de Email - Verifique Emails Online",
    description: "Validador de email online gratuito. Verifique se um endereço de email é válido instantaneamente.",
    url: "/validador-email",
  },
};

const breadcrumbItems = [
  { label: "Validadores", href: "/validadores" },
  { label: "Validador de Email", href: "/validador-email" }
];

// Função para validar email
function validateEmail(email: string): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  // Verifica se não está vazio
  if (!email.trim()) {
    return { isValid: false, issues: ['Email não pode estar vazio'] };
  }
  
  // Regex básico para validação de email
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    issues.push('Formato de email inválido');
  }
  
  // Verifica se tem apenas um @
  const atCount = (email.match(/@/g) || []).length;
  if (atCount !== 1) {
    issues.push('Email deve conter exatamente um símbolo @');
  }
  
  // Verifica se tem partes local e domínio
  const parts = email.split('@');
  if (parts.length === 2) {
    const [localPart, domain] = parts;
    
    // Verifica parte local
    if (localPart.length === 0) {
      issues.push('Parte local (antes do @) não pode estar vazia');
    } else if (localPart.length > 64) {
      issues.push('Parte local (antes do @) muito longa (máximo 64 caracteres)');
    }
    
    // Verifica se começa ou termina com ponto
    if (localPart.startsWith('.') || localPart.endsWith('.')) {
      issues.push('Parte local não pode começar ou terminar com ponto');
    }
    
    // Verifica pontos consecutivos
    if (localPart.includes('..')) {
      issues.push('Parte local não pode ter pontos consecutivos');
    }
    
    // Verifica domínio
    if (domain.length === 0) {
      issues.push('Domínio (após o @) não pode estar vazio');
    } else if (domain.length > 253) {
      issues.push('Domínio muito longo (máximo 253 caracteres)');
    }
    
    // Verifica se domínio tem pelo menos um ponto
    if (!domain.includes('.')) {
      issues.push('Domínio deve conter pelo menos um ponto');
    }
    
    // Verifica se domínio não começa ou termina com hífen ou ponto
    if (domain.startsWith('-') || domain.endsWith('-') || domain.startsWith('.') || domain.endsWith('.')) {
      issues.push('Domínio não pode começar ou terminar com hífen ou ponto');
    }
    
    // Verifica TLD (última parte do domínio)
    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2) {
      issues.push('TLD (extensão) deve ter pelo menos 2 caracteres');
    }
  }
  
  // Verifica comprimento total
  if (email.length > 320) {
    issues.push('Email muito longo (máximo 320 caracteres)');
  }
  
  return { isValid: issues.length === 0, issues };
}

// Função para obter informações sobre o email
function getEmailInfo(email: string): { domain: string; tld: string; isCommonProvider: boolean } | null {
  const parts = email.split('@');
  if (parts.length !== 2) return null;
  
  const domain = parts[1].toLowerCase();
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  
  const commonProviders = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
    'terra.com.br', 'uol.com.br', 'bol.com.br', 'ig.com.br', 'globo.com'
  ];
  
  return {
    domain,
    tld,
    isCommonProvider: commonProviders.includes(domain)
  };
}

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Validador de Email",
  description: "Ferramenta online gratuita para validar endereços de email",
  url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"}/validador-email`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  permissions: "browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL"
  },
  featureList: [
    "Validação de email",
    "Verificação de formato",
    "Análise detalhada",
    "Sem armazenamento de dados"
  ]
};

export default function ValidadorEmail() {
  const [email, setEmail] = useState('');
  const [validation, setValidation] = useState<{ isValid: boolean; issues: string[] } | null>(null);
  const [emailInfo, setEmailInfo] = useState<{ domain: string; tld: string; isCommonProvider: boolean } | null>(null);

  const handleInputChange = (value: string) => {
    setEmail(value);
    
    if (value.trim()) {
      const result = validateEmail(value);
      setValidation(result);
      
      if (result.isValid) {
        setEmailInfo(getEmailInfo(value));
      } else {
        setEmailInfo(null);
      }
    } else {
      setValidation(null);
      setEmailInfo(null);
    }
  };

  const handleClear = () => {
    setEmail('');
    setValidation(null);
    setEmailInfo(null);
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
              Validador de Email
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Verifique se um endereço de email é válido instantaneamente. 
              Digite ou cole o email e receba uma análise detalhada.
            </p>
          </div>

          {/* Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Input */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Digite o email para validar:
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg"
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
              {validation && (
                <div className={`rounded-lg p-4 ${
                  validation.isValid 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-start gap-3">
                    {validation.isValid ? (
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        validation.isValid 
                          ? 'text-green-900 dark:text-green-200' 
                          : 'text-red-900 dark:text-red-200'
                      }`}>
                        {validation.isValid ? 'Email Válido' : 'Email Inválido'}
                      </h3>
                      
                      {validation.isValid ? (
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                          Este email possui um formato válido e passou em todas as verificações.
                        </p>
                      ) : (
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-red-700 dark:text-red-300">
                            Problemas encontrados:
                          </p>
                          <ul className="text-sm text-red-600 dark:text-red-400 list-disc list-inside space-y-1">
                            {validation.issues.map((issue, index) => (
                              <li key={index}>{issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Email Info */}
              {emailInfo && validation?.isValid && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-3">
                    Informações do Email
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700 dark:text-blue-300 font-medium">Domínio:</span>
                      <p className="text-blue-800 dark:text-blue-200">{emailInfo.domain}</p>
                    </div>
                    <div>
                      <span className="text-blue-700 dark:text-blue-300 font-medium">TLD:</span>
                      <p className="text-blue-800 dark:text-blue-200">.{emailInfo.tld}</p>
                    </div>
                    <div>
                      <span className="text-blue-700 dark:text-blue-300 font-medium">Provedor:</span>
                      <p className="text-blue-800 dark:text-blue-200">
                        {emailInfo.isCommonProvider ? 'Popular' : 'Customizado'}
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
                  Importante - Validação de Formato
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Esta ferramenta verifica apenas se o formato do email está correto. 
                  Ela não verifica se o email realmente existe ou se a caixa de entrada está ativa.
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
              <h3 className="font-medium text-gray-900 dark:text-white">Privacidade</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Validação local, dados não são enviados
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Instantâneo</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Resultado imediato enquanto digita
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Detalhado</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Análise completa do formato
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
                  O que significa email válido?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Um email válido significa que possui formato correto segundo os padrões RFC, 
                  mas não garante que a conta existe ou está ativa.
                </div>
              </details>
              
              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Esta ferramenta verifica se o email existe?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Não, fazemos apenas a validação do formato e estrutura. Para verificar se um email 
                  realmente existe, seria necessário enviar um email de teste.
                </div>
              </details>
              
              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                  Meus dados ficam armazenados?
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  Não, toda a validação é feita no seu navegador. Não enviamos nem 
                  armazenamos nenhum email digitado em nossos servidores.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}