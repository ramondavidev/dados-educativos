import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";

  // Static pages
  const routes = [
    "",
    "/sobre",
    "/privacidade",
    "/contato",
    "/blog",
    "/geradores",
    "/validadores",
    "/calculadoras",
    "/conversores",
  ];

  // Tool pages
  const tools = [
    // Generators
    "/gerador-cpf",
    "/gerador-cnpj",
    "/gerador-nomes-empresa",
    "/gerador-nick",
    "/gerador-senhas",
    "/gerador-qrcode",

    // Validators
    "/validador-cpf",
    "/validador-cnpj",
    "/validador-email",
    "/validador-telefone",
    "/validador-cartao-credito",

    // Calculators
    "/calculadora-juros-compostos",
    "/calculadora-rescisao-clt",
    "/calculadora-ferias",
    "/calculadora-13-salario",
    "/calculadora-imc",
    "/calculadora-combustivel",
    "/calculadora-consumo-energia",

    // Converters
    "/conversor-moedas",
    "/conversor-medidas",
    "/conversor-temperatura",
  ];

  const allRoutes = [...routes, ...tools];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority:
      route === ""
        ? 1
        : route.startsWith("/gerador-") ||
          route.startsWith("/validador-") ||
          route.startsWith("/calculadora-") ||
          route.startsWith("/conversor-")
        ? 0.8
        : 0.6,
  }));
}
