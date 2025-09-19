import type { Metadata } from "next";
import { GeradorQRCodeClient } from "./gerador-qrcode-client";

export const metadata: Metadata = {
  title: "Gerador de QR Code — Online e Grátis | Ferramentas Hub",
  description:
    "Use nosso Gerador de QR Code para transformar textos e URLs em QR codes. Rápido, grátis e sem cadastros.",
  keywords: [
    "gerador qr code",
    "qr code online",
    "gerar qr code",
    "qr code gratuito",
    "criar qr code",
  ],
  openGraph: {
    title: "Gerador de QR Code — Online e Grátis",
    description:
      "Use nosso Gerador de QR Code para transformar textos e URLs em QR codes. Rápido, grátis e sem cadastros.",
    url: "/gerador-qrcode",
  },
};

export default function GeradorQRCode() {
  return <GeradorQRCodeClient />;
}
