import type { Metadata } from "next";
import { GeradorNomesEmpresaClient } from "./gerador-nomes-empresa-client";

export const metadata: Metadata = {
  title: "Gerador de Nomes de Empresa — Online e Grátis | Ferramentas Hub",
  description:
    "Gere nomes criativos para sua empresa ou negócio. Sugestões únicas baseadas em palavras-chave. Rápido, grátis e sem cadastros.",
  keywords: [
    "gerador nome empresa",
    "nome empresa",
    "criar nome empresa",
    "sugestoes nome negocio",
    "nome comercial",
  ],
  openGraph: {
    title: "Gerador de Nomes de Empresa — Online e Grátis",
    description:
      "Gere nomes criativos para sua empresa ou negócio. Sugestões únicas baseadas em palavras-chave.",
    url: "/gerador-nomes-empresa",
  },
};

export default function GeradorNomesEmpresa() {
  return <GeradorNomesEmpresaClient />;
}
