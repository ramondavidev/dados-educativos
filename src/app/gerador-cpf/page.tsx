import type { Metadata } from "next";
import { GeradorCPFClient } from "./gerador-cpf-client";

export const metadata: Metadata = {
  title: "Gerador de CPF — Online e Grátis | Ferramentas Hub",
  description:
    "Use nosso Gerador de CPF para criar CPFs válidos para testes. Rápido, grátis e sem cadastros.",
  keywords: [
    "gerador cpf",
    "cpf válido",
    "gerar cpf",
    "cpf para teste",
    "validar cpf",
  ],
  openGraph: {
    title: "Gerador de CPF — Online e Grátis",
    description:
      "Use nosso Gerador de CPF para criar CPFs válidos para testes. Rápido, grátis e sem cadastros.",
    url: "/gerador-cpf",
  },
};

export default function GeradorCPF() {
  return <GeradorCPFClient />;
}
