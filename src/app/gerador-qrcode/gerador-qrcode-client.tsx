"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Copy,
  Download,
  RefreshCw,
  Shield,
  CheckCircle,
  AlertTriangle,
  QrCode,
} from "lucide-react";
import QRCode from "qrcode";

const breadcrumbItems = [
  { label: "Geradores", href: "/geradores" },
  { label: "Gerador de QR Code", href: "/gerador-qrcode" },
];

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gerador de QR Code",
  description:
    "Ferramenta online gratuita para gerar QR codes a partir de textos e URLs",
  url: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  }/gerador-qrcode`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  permissions: "browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Geração de QR Code",
    "Download em PNG",
    "Qualidade personalizada",
    "Sem armazenamento de dados",
  ],
};

export function GeradorQRCodeClient() {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [size, setSize] = useState(256);

  const generateQRCode = async () => {
    if (!text.trim()) return;

    try {
      const qrCodeDataURL = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrCode(qrCodeDataURL);
      setCopied(false);
    } catch (error) {
      console.error("Erro ao gerar QR Code:", error);
    }
  };

  const handleDownload = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCode;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyText = async () => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Erro ao copiar:", err);
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Gerador de QR Code
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transforme textos, URLs e informações em QR codes de alta
              qualidade. Ferramenta gratuita, rápida e segura.
            </p>
          </div>

          {/* Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Input */}
              <div className="space-y-4">
                <label className="block text-base font-medium text-gray-700 dark:text-gray-300">
                  Digite o texto ou URL para gerar o QR Code:
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="https://exemplo.com ou qualquer texto..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-base resize-none"
                />

                {/* Size Control */}
                <div className="flex items-center gap-4">
                  <label className="text-base text-gray-700 dark:text-gray-300 font-medium">
                    Tamanho:
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base"
                  >
                    <option value={128}>128x128</option>
                    <option value={256}>256x256</option>
                    <option value={512}>512x512</option>
                    <option value={1024}>1024x1024</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <button
                  onClick={generateQRCode}
                  disabled={!text.trim()}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-medium transition-colors text-lg"
                >
                  <QrCode className="h-6 w-6" />
                  Gerar QR Code
                </button>
              </div>

              {/* Result */}
              {qrCode && (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                    <div className="inline-block bg-white p-4 rounded-lg shadow-sm mb-4">
                      <img
                        src={qrCode}
                        alt="QR Code gerado"
                        className="mx-auto"
                        style={{
                          width: Math.min(size, 300),
                          height: Math.min(size, 300),
                        }}
                      />
                    </div>

                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handleDownload}
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-base"
                      >
                        <Download className="h-5 w-5" />
                        Download PNG
                      </button>

                      <button
                        onClick={handleCopyText}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors text-base ${
                          copied
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-300"
                        }`}
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="h-5 w-5" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="h-5 w-5" />
                            Copiar Texto
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Texto original:{" "}
                      <span className="font-mono text-gray-900 dark:text-white">
                        {text}
                      </span>
                    </p>
                  </div>
                </div>
              )}
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
                Processamento local, dados não são enviados
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg">
                <Download className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-lg">
                Download
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Baixe em alta qualidade formato PNG
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <QrCode className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-lg">
                Versátil
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400">
                URLs, textos, contatos e muito mais
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
                  O QR Code gerado funciona em qualquer app leitor?
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-base">
                  Sim, geramos QR codes no formato padrão que funciona com
                  qualquer aplicativo leitor de QR Code, incluindo câmeras de
                  celulares e apps dedicados.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-6 cursor-pointer font-medium text-gray-900 dark:text-white text-lg">
                  Posso usar para informações comerciais?
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-base">
                  Absolutamente! Use para URLs, informações de contato, texto
                  promocional, cardápios digitais, links para redes sociais e
                  qualquer texto que desejar.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="p-6 cursor-pointer font-medium text-gray-900 dark:text-white text-lg">
                  Meus dados ficam armazenados?
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-base">
                  Não, toda a geração é feita no seu navegador. Não enviamos nem
                  armazenamos nenhum texto ou QR Code gerado em nossos
                  servidores.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
