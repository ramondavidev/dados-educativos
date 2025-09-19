import Link from "next/link";
import { Calculator, Github, Twitter, Mail } from "lucide-react";

const footerLinks = {
  ferramentas: [
    { name: "Gerador de CPF", href: "/gerador-cpf" },
    { name: "Gerador de CNPJ", href: "/gerador-cnpj" },
    { name: "Validador de Email", href: "/validador-email" },
    { name: "Calculadora de Juros", href: "/calculadora-juros-compostos" },
    { name: "Conversor de Moedas", href: "/conversor-moedas" },
  ],
  categorias: [
    { name: "Geradores", href: "/geradores" },
    { name: "Validadores", href: "/validadores" },
    { name: "Calculadoras", href: "/calculadoras" },
    { name: "Conversores", href: "/conversores" },
  ],
  institucional: [
    { name: "Sobre", href: "/sobre" },
    { name: "Privacidade", href: "/privacidade" },
    { name: "Contato", href: "/contato" },
    { name: "Blog", href: "/blog" },
  ],
};

const relatedTools = [
  { name: "Gerador de Nick", href: "/gerador-nick" },
  { name: "Validador de CPF", href: "/validador-cpf" },
  { name: "Calculadora de Juros", href: "/calculadora-juros-compostos" },
];

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-primary" />
              <span className="font-bold text-lg">Ferramentas Hub</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Mais de 20 ferramentas online gratuitas para facilitar seu dia a
              dia. Geradores, validadores, calculadoras e conversores.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://github.com/ferramentashub"
                className="text-muted-foreground hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/ferramentashub"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="/contato"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Contato"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Ferramentas Populares */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Ferramentas Populares
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.ferramentas.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Categorias
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.categorias.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Empresa</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.institucional.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Talvez você também curta:
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {relatedTools.map((tool, index) => (
                <span key={tool.name} className="inline-flex items-center">
                  <Link
                    href={tool.href}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    {tool.name}
                  </Link>
                  {index < relatedTools.length - 1 && (
                    <span className="mx-2 text-muted-foreground">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ferramentas Hub. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
