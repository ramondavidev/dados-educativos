import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { Users, Target, Heart, Shield, Code, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nós - Ferramentas Online",
  description:
    "Conheça nossa missão de disponibilizar ferramentas online gratuitas e de qualidade para facilitar o dia a dia de desenvolvedores e usuários em geral.",
  openGraph: {
    title: "Sobre Nós - Ferramentas Online",
    description:
      "Conheça nossa missão de disponibilizar ferramentas online gratuitas e de qualidade para facilitar o dia a dia de desenvolvedores e usuários em geral.",
    url: "/sobre",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ferramentas Hub",
  description:
    "Plataforma de ferramentas online gratuitas incluindo geradores, validadores, calculadoras e conversores.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000",
  foundingDate: "2024",
  sameAs: [
    "https://github.com/ferramentashub",
    "https://twitter.com/ferramentashub",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    url: "/contato",
  },
};

const breadcrumbItems = [{ label: "Sobre", href: "/sobre" }];

const values = [
  {
    icon: Heart,
    title: "Gratuito Sempre",
    description:
      "Acreditamos que ferramentas essenciais devem ser acessíveis a todos, por isso mantemos tudo gratuito.",
  },
  {
    icon: Shield,
    title: "Privacidade em Primeiro",
    description:
      "Não armazenamos dados pessoais. Todas as operações são realizadas localmente no seu navegador.",
  },
  {
    icon: Code,
    title: "Código Aberto",
    description:
      "Transparência é fundamental. Nosso código é aberto e pode ser auditado por qualquer pessoa.",
  },
  {
    icon: Zap,
    title: "Rápido e Eficiente",
    description:
      "Otimizamos nossas ferramentas para serem rápidas, leves e funcionarem offline sempre que possível.",
  },
];

const stats = [
  { number: "20+", label: "Ferramentas" },
  { number: "100k+", label: "Usuários" },
  { number: "1M+", label: "Usos Mensais" },
  { number: "100%", label: "Gratuito" },
];

export default function SobrePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto space-y-16 py-8">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Sobre o Ferramentas Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nossa missão é democratizar o acesso a ferramentas online
              essenciais, oferecendo soluções gratuitas, rápidas e seguras para
              todos.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Nossa Missão</h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                O Ferramentas Hub nasceu da necessidade de ter acesso rápido e
                gratuito a ferramentas essenciais do dia a dia. Seja você um
                desenvolvedor precisando gerar dados para testes, um
                profissional validando informações, ou alguém fazendo cálculos
                importantes, estamos aqui para ajudar.
              </p>
              <p>
                Acreditamos que ferramentas úteis não devem ser pagas ou exigir
                cadastros complexos. Por isso, desenvolvemos uma plataforma
                completamente gratuita, rápida e que funciona diretamente no seu
                navegador, garantindo sua privacidade.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Nossos Valores</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-card rounded-lg border"
                >
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Tecnologia</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Utilizamos as mais modernas tecnologias web para garantir
                performance, segurança e uma excelente experiência do usuário:
              </p>
              <ul>
                <li>
                  <strong>Next.js 14</strong> - Framework React para aplicações
                  rápidas
                </li>
                <li>
                  <strong>TypeScript</strong> - Código mais seguro e confiável
                </li>
                <li>
                  <strong>Tailwind CSS</strong> - Design responsivo e moderno
                </li>
                <li>
                  <strong>Processamento Local</strong> - Seus dados não saem do
                  navegador
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <div className="bg-primary/5 rounded-lg p-8 space-y-4">
              <h3 className="text-2xl font-semibold">Quer Contribuir?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Somos uma plataforma em constante evolução. Se você tem ideias
                para novas ferramentas ou melhorias, adoraríamos ouvir de você!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contato" className="btn-primary">
                  Entre em Contato
                </a>
                <a
                  href="https://github.com/ferramentashub"
                  className="btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
