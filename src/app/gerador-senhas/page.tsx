'use client';

import { useState } from 'react';
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { Copy, RefreshCw, Shield, CheckCircle, AlertCircle, Key, Eye, EyeOff } from "lucide-react";

const metadata: Metadata = {
  title: "Gerador de Senhas Seguras - Crie Senhas Fortes | Ferramentas Online",
  description: "Gerador de senhas seguras online gratuito. Crie senhas fortes com diferentes níveis de complexidade, caracteres especiais e comprimentos personalizáveis.",
  keywords: ["gerador senha", "senha segura", "gerar senha", "senha forte", "password generator"],
  openGraph: {
    title: "Gerador de Senhas Seguras - Crie Senhas Fortes",
    description: "Gerador de senhas seguras online gratuito. Crie senhas fortes com diferentes níveis de complexidade.",
    url: "/gerador-senhas",
  },
};

const breadcrumbItems = [
  { label: "Geradores", href: "/geradores" },
  { label: "Gerador de Senhas", href: "/gerador-senhas" }
];

// Conjuntos de caracteres
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

interface PasswordOptions {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
}

// Função para gerar senha
function generatePassword(options: PasswordOptions): string {
  let charset = '';
  let password = '';

  // Constrói o conjunto de caracteres baseado nas opções
  if (options.includeLowercase) charset += LOWERCASE;
  if (options.includeUppercase) charset += UPPERCASE;
  if (options.includeNumbers) charset += NUMBERS;
  if (options.includeSymbols) charset += SYMBOLS;

  // Remove caracteres similares se solicitado
  if (options.excludeSimilar) {
    charset = charset.replace(/[il1Lo0O]/g, '');
  }

  if (charset === '') return '';

  // Garante pelo menos um caractere de cada tipo selecionado
  if (options.includeLowercase) {
    const chars = options.excludeSimilar ? LOWERCASE.replace(/[il]/g, '') : LOWERCASE;
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  if (options.includeUppercase) {
    const chars = options.excludeSimilar ? UPPERCASE.replace(/[LO]/g, '') : UPPERCASE;
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  if (options.includeNumbers) {
    const chars = options.excludeSimilar ? NUMBERS.replace(/[10]/g, '') : NUMBERS;
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  if (options.includeSymbols) {
    password += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  }

  // Preenche o resto da senha
  for (let i = password.length; i < options.length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // Embaralha a senha
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Função para calcular força da senha
function calculateStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  if (score <= 2) return { score, label: 'Fraca', color: 'text-red-600' };
  if (score <= 4) return { score, label: 'Média', color: 'text-yellow-600' };
  return { score, label: 'Forte', color: 'text-green-600' };
}

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gerador de Senhas Seguras",
  description: "Ferramenta online gratuita para gerar senhas seguras e personalizáveis",
  url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"}/gerador-senhas`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  permissions: "browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL"
  },
  featureList: [
    "Geração de senhas seguras",
    "Opções personalizáveis",
    "Análise de força",
    "Sem armazenamento de dados"
  ]
};

export default function GeradorSenhas() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
  });

  const handleGenerate = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar:', err);
      }
    }
  };

  const handleOptionChange = (key: keyof PasswordOptions, value: boolean | number) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const strength = password ? calculateStrength(password) : null;

  return (
    <>
      <JsonLd data={toolSchema} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Gerador de Senhas Seguras
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Crie senhas fortes e seguras com opções personalizáveis. 
              Ferramenta gratuita que não armazena suas senhas.
            </p>
          </div>

          {/* Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              
              {/* Password Display */}
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Senha Gerada:
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={handleCopy}
                        disabled={!password}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                          copied 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-300 disabled:opacity-50'
                        }`}
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copiar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="font-mono text-lg break-all bg-white dark:bg-gray-800 rounded p-3 border">
                    {password ? (showPassword ? password : '•'.repeat(password.length)) : 'Clique em "Gerar Senha" para começar'}
                  </div>
                  {strength && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Força:</span>
                      <span className={`text-sm font-medium ${strength.color}`}>{strength.label}</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 max-w-32">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            strength.score <= 2 ? 'bg-red-500' : 
                            strength.score <= 4 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(strength.score / 6) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Opções da Senha</h3>
                
                {/* Length */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Comprimento: {options.length} caracteres
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="50"
                    value={options.length}
                    onChange={(e) => handleOptionChange('length', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>

                {/* Character Types */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={options.includeLowercase}
                      onChange={(e) => handleOptionChange('includeLowercase', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Minúsculas (a-z)</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={options.includeUppercase}
                      onChange={(e) => handleOptionChange('includeUppercase', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Maiúsculas (A-Z)</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={options.includeNumbers}
                      onChange={(e) => handleOptionChange('includeNumbers', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Números (0-9)</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={options.includeSymbols}
                      onChange={(e) => handleOptionChange('includeSymbols', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Símbolos (!@#$)</span>
                  </label>
                </div>

                {/* Advanced Options */}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={options.excludeSimilar}
                      onChange={(e) => handleOptionChange('excludeSimilar', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Excluir caracteres similares (i, l, 1, L, o, 0, O)
                    </span>
                  </label>
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <button
                  onClick={handleGenerate}
                  disabled={!options.includeLowercase && !options.includeUppercase && !options.includeNumbers && !options.includeSymbols}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <RefreshCw className="h-5 w-5" />
                  Gerar Senha
                </button>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-medium text-green-900 dark:text-green-200">
                  Segurança e Privacidade
                </h3>
                <p className="text-sm text-green-800 dark:text-green-300">
                  Suas senhas são geradas localmente no seu navegador e nunca são enviadas para nossos servidores. 
                  Recomendamos usar um gerenciador de senhas para armazenar suas senhas com segurança.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dicas de Segurança
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Senhas Fortes</h3>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Pelo menos 12 caracteres</li>
                  <li>• Combine letras, números e símbolos</li>
                  <li>• Evite palavras do dicionário</li>
                  <li>• Não reutilize senhas importantes</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Boas Práticas</h3>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Use um gerenciador de senhas</li>
                  <li>• Ative autenticação de dois fatores</li>
                  <li>• Atualize senhas regularmente</li>
                  <li>• Nunca compartilhe suas senhas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}