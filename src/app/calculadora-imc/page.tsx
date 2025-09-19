import type { Metadata } from "next";
import { CalculadoraIMCClient } from "./calculadora-imc-client";

export const metadata: Metadata = {
  title: "Calculadora de IMC — Online e Grátis | Ferramentas Hub",
  description:
    "Calcule seu Índice de Massa Corporal (IMC) e descubra sua classificação de peso. Rápido, preciso e gratuito.",
  keywords: [
    "calculadora imc",
    "indice massa corporal",
    "calcular imc",
    "peso ideal",
    "classificacao imc",
  ],
  openGraph: {
    title: "Calculadora de IMC — Online e Grátis",
    description:
      "Calcule seu Índice de Massa Corporal (IMC) e descubra sua classificação de peso. Rápido, preciso e gratuito.",
    url: "/calculadora-imc",
  },
};

export default function CalculadoraIMC() {
  return <CalculadoraIMCClient />;
}
