import type { Metadata } from "next";
import { ValidadorCNPJClient } from "./validador-cnpj-client";

export const metadata: Metadata = {
  title: "Validador de CNPJ — Online e Grátis | Ferramentas Hub",
  description:
    "Use nosso Validador de CNPJ para verificar CNPJs brasileiros instantaneamente. Rápido, grátis e sem cadastros.",
  keywords: [
    "validador cnpj",
    "verificar cnpj",
    "cnpj válido",
    "validar cnpj",
    "checkar cnpj",
  ],
  openGraph: {
    title: "Validador de CNPJ — Online e Grátis",
    description:
      "Use nosso Validador de CNPJ para verificar CNPJs brasileiros instantaneamente. Rápido, grátis e sem cadastros.",
    url: "/validador-cnpj",
  },
};

export default function ValidadorCNPJ() {
  return <ValidadorCNPJClient />;
}
