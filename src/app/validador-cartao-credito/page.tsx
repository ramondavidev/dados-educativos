import type { Metadata } from "next";
import { ValidadorCartaoCreditoClient } from "./validador-cartao-credito-client";

export const metadata: Metadata = {
  title: "Validador de Cartão de Crédito — Online e Grátis | Ferramentas Hub",
  description:
    "Valide números de cartão de crédito usando o algoritmo de Luhn. Identifica bandeiras e verifica validade. Seguro e gratuito.",
  keywords: [
    "validador cartao credito",
    "verificar cartao",
    "algoritmo luhn",
    "bandeira cartao",
    "validar cartao",
  ],
  openGraph: {
    title: "Validador de Cartão de Crédito — Online e Grátis",
    description:
      "Valide números de cartão de crédito usando o algoritmo de Luhn. Identifica bandeiras e verifica validade.",
    url: "/validador-cartao-credito",
  },
};

export default function ValidadorCartaoCredito() {
  return <ValidadorCartaoCreditoClient />;
}
