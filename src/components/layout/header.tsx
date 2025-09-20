"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Calculator, Shield, Zap, RefreshCw } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const navigation = [
  {
    name: "Geradores",
    href: "/geradores",
    icon: Zap,
    items: [
      { name: "Gerador de CPF", href: "/gerador-cpf" },
      { name: "Gerador de CNPJ", href: "/gerador-cnpj" },
      { name: "Gerador de Senhas", href: "/gerador-senhas" },
      { name: "Gerador de Nomes de Empresa", href: "/gerador-nomes-empresa" },
      { name: "Gerador de Nick", href: "/gerador-nick" },
      { name: "Gerador de QR Code", href: "/gerador-qrcode" },
    ],
  },
  {
    name: "Validadores",
    href: "/validadores",
    icon: Shield,
    items: [
      { name: "Validador de CPF", href: "/validador-cpf" },
      { name: "Validador de CNPJ", href: "/validador-cnpj" },
      { name: "Validador de Email", href: "/validador-email" },
      { name: "Validador de Telefone", href: "/validador-telefone" },
      {
        name: "Validador de Cartão de Crédito",
        href: "/validador-cartao-credito",
      },
    ],
  },
  {
    name: "Calculadoras",
    href: "/calculadoras",
    icon: Calculator,
    items: [
      {
        name: "Calculadora de Juros Compostos",
        href: "/calculadora-juros-compostos",
      },
      {
        name: "Calculadora de Rescisão CLT",
        href: "/calculadora-rescisao-clt",
      },
      { name: "Calculadora de Férias", href: "/calculadora-ferias" },
      { name: "Calculadora de 13º Salário", href: "/calculadora-13-salario" },
      { name: "Calculadora de IMC", href: "/calculadora-imc" },
      { name: "Calculadora de Combustível", href: "/calculadora-combustivel" },
      {
        name: "Calculadora de Consumo de Energia",
        href: "/calculadora-consumo-energia",
      },
    ],
  },
  {
    name: "Conversores",
    href: "/conversores",
    icon: RefreshCw,
    items: [
      { name: "Conversor de Moedas", href: "/conversor-moedas" },
      { name: "Conversor de Medidas", href: "/conversor-medidas" },
      { name: "Conversor de Temperatura", href: "/conversor-temperatura" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              Ferramentas Hub
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-lg font-medium">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className="flex items-center space-x-1 text-foreground/60 transition-colors hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>

              {/* Dropdown Menu */}
              <div className="absolute left-0 top-full mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 rounded-md border shadow-lg">
                  <div className="p-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-3 py-2 text-base text-foreground/80 hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link
            href="/blog"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground/60 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menu principal</span>
            {mobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <div key={item.name} className="space-y-1">
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
                <div className="ml-6 space-y-1">
                  {item.items.slice(0, 3).map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="block rounded-md px-3 py-2 text-sm text-foreground/60 hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href="/blog"
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
