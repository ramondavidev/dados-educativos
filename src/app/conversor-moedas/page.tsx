import type { Metadata } from "next";
import { ConversorMoedasClient } from "./conversor-moedas-client";

export const metadata: Metadata = {
  title: "Conversor de Moedas — Online e Grátis | Ferramentas Hub",
  description:
    "Converta valores entre diferentes moedas do mundo. Cotações atualizadas de Real, Dólar, Euro e mais. Gratuito e preciso.",
  keywords: [
    "conversor moedas",
    "cotacao dolar",
    "real para dolar",
    "euro para real",
    "conversao moeda",
  ],
  openGraph: {
    title: "Conversor de Moedas — Online e Grátis",
    description:
      "Converta valores entre diferentes moedas do mundo. Cotações atualizadas de Real, Dólar, Euro e mais.",
    url: "/conversor-moedas",
  },
};

export default function ConversorMoedas() {
  return <ConversorMoedasClient />;
}
