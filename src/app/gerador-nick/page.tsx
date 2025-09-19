import type { Metadata } from "next";
import { GeradorNickClient } from "./gerador-nick-client";

export const metadata: Metadata = {
  title: "Gerador de Nick — Online e Grátis | Ferramentas Hub",
  description:
    "Gere nicknames únicos para games, redes sociais e plataformas online. Criativo, personalizado e gratuito.",
  keywords: [
    "gerador nick",
    "gerador nickname",
    "nick gamer",
    "apelido online",
    "username generator",
  ],
  openGraph: {
    title: "Gerador de Nick — Online e Grátis",
    description:
      "Gere nicknames únicos para games, redes sociais e plataformas online. Criativo, personalizado e gratuito.",
    url: "/gerador-nick",
  },
};

export default function GeradorNick() {
  return <GeradorNickClient />;
}
