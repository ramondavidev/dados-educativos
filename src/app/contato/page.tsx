import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Mail,
  Github,
  Twitter,
  MessageSquare,
  Lightbulb,
  Bug,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contato - Ferramentas Online",
  description:
    "Entre em contato conosco para sugestões, reportar problemas ou tirar dúvidas sobre nossas ferramentas online gratuitas.",
  openGraph: {
    title: "Contato - Ferramentas Online",
    description:
      "Entre em contato conosco para sugestões, reportar problemas ou tirar dúvidas sobre nossas ferramentas online gratuitas.",
    url: "/contato",
  },
};

const contactPointSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    name: "Ferramentas Hub - Suporte",
    url: "/contato",
    availableLanguage: "Portuguese",
  },
};

const breadcrumbItems = [{ label: "Contato", href: "/contato" }];

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "Para sugestões, parcerias ou dúvidas gerais",
    contact: "contato@ferramentashub.com",
    action: "Enviar Email",
    href: "mailto:contato@ferramentashub.com",
  },
  {
    icon: Github,
    title: "GitHub",
    description: "Para reportar bugs ou contribuir com código",
    contact: "@ferramentashub",
    action: "Ver no GitHub",
    href: "https://github.com/ferramentashub",
  },
  {
    icon: Twitter,
    title: "Twitter",
    description: "Para atualizações e suporte rápido",
    contact: "@ferramentashub",
    action: "Seguir no Twitter",
    href: "https://twitter.com/ferramentashub",
  },
];

const faqItems = [
  {
    icon: Lightbulb,
    title: "Tenho uma ideia de ferramenta",
    description:
      "Adoraríamos saber! Envie sua sugestão por email ou Twitter explicando a ferramenta e como ela seria útil.",
  },
  {
    icon: Bug,
    title: "Encontrei um bug",
    description:
      "Reporte através do GitHub com detalhes do problema: navegador, sistema operacional e passos para reproduzir.",
  },
  {
    icon: MessageSquare,
    title: "Dúvida sobre uma ferramenta",
    description:
      "Consulte a seção de FAQ na página da ferramenta ou entre em contato por email para suporte detalhado.",
  },
  {
    icon: Heart,
    title: "Quero apoiar o projeto",
    description:
      "Compartilhe com seus colegas, dê uma estrela no GitHub ou contribua com código. Todo apoio é bem-vindo!",
  },
];

export default function ContatoPage() {
  return (
    <>
      <JsonLd data={contactPointSchema} />
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto space-y-12 py-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Vamos Conversar?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tem sugestões, dúvidas ou encontrou um problema? Adoraríamos ouvir
              de você! Escolha a melhor forma de entrar em contato.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-lg border text-center space-y-4"
              >
                <div className="flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <method.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {method.description}
                  </p>
                  <p className="font-mono text-sm mb-4">{method.contact}</p>
                  <a
                    href={method.href}
                    className="btn-primary inline-block"
                    target={
                      method.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      method.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {method.action}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Common Questions */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Como Posso Ajudar?</h2>
              <p className="text-muted-foreground">
                Aqui estão as formas mais comuns de contato e como podemos te
                ajudar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-muted/50 rounded-lg"
                >
                  <div className="p-2 bg-background rounded-lg flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-primary/5 rounded-lg p-8 text-center space-y-4">
            <h3 className="text-xl font-semibold">Tempo de Resposta</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold text-primary">Email</div>
                <div className="text-muted-foreground">24-48 horas</div>
              </div>
              <div>
                <div className="font-semibold text-primary">Twitter</div>
                <div className="text-muted-foreground">Algumas horas</div>
              </div>
              <div>
                <div className="font-semibold text-primary">GitHub Issues</div>
                <div className="text-muted-foreground">1-3 dias</div>
              </div>
            </div>
            <p className="text-muted-foreground text-xs">
              * Tempos aproximados. Questões urgentes de segurança são
              priorizadas.
            </p>
          </div>

          {/* FAQ Link */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Antes de entrar em contato, que tal dar uma olhada nas perguntas
              frequentes?
            </p>
            <a href="/#faq" className="btn-secondary">
              Ver Perguntas Frequentes
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
