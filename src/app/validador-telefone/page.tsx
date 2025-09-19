import type { Metadata } from "next";
import { ValidadorTelefoneClient } from "./validador-telefone-client";

export const metadata: Metadata = {
  title: "Validador de Telefone — Online e Grátis | Ferramentas Hub",
  description:
    "Valide números de telefone brasileiros instantaneamente. Verifica formato e estrutura de celulares e fixos. Grátis e sem cadastros.",
  keywords: [
    "validador telefone",
    "verificar telefone",
    "telefone válido",
    "validar celular",
    "numero telefone",
  ],
  openGraph: {
    title: "Validador de Telefone — Online e Grátis",
    description:
      "Valide números de telefone brasileiros instantaneamente. Verifica formato e estrutura de celulares e fixos.",
    url: "/validador-telefone",
  },
};

export default function ValidadorTelefone() {
  return <ValidadorTelefoneClient />;
}
