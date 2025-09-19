"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { trackFAQToggle } from "@/components/analytics/analytics";

const faqs = [
  {
    question: "As ferramentas são realmente gratuitas?",
    answer:
      "Sim! Todas as nossas ferramentas são 100% gratuitas e sempre serão. Não cobramos nenhuma taxa e você não precisa se cadastrar para usar nenhuma funcionalidade.",
  },
  {
    question: "Os dados gerados são válidos para uso oficial?",
    answer:
      "Os geradores criam dados com formato válido (como CPF e CNPJ), mas são destinados apenas para testes e desenvolvimento. Não devem ser usados para fins oficiais ou fraudulentos.",
  },
  {
    question: "Vocês armazenam os dados que insiro nas ferramentas?",
    answer:
      "Não armazenamos nenhum dado inserido pelos usuários. Todas as operações são realizadas localmente no seu navegador, garantindo total privacidade e segurança.",
  },
  {
    question: "As ferramentas funcionam offline?",
    answer:
      "A maioria das ferramentas funciona offline após o primeiro carregamento, exceto aquelas que dependem de APIs externas como o conversor de moedas.",
  },
  {
    question: "Posso sugerir novas ferramentas?",
    answer:
      "Claro! Estamos sempre expandindo nossa coleção. Entre em contato através da página de contato ou redes sociais para sugerir novas ferramentas.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number, question: string) => {
    const newIndex = openIndex === index ? null : index;
    setOpenIndex(newIndex);

    // Track FAQ toggle
    trackFAQToggle(question, "homepage");
  };

  return (
    <section className="container">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Tire suas principais dúvidas sobre nossas ferramentas
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card rounded-lg border">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/50 transition-colors rounded-lg"
                onClick={() => toggleFAQ(index, faq.question)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Não encontrou sua resposta?{" "}
            <a
              href="/contato"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
