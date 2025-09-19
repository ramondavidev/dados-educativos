# Ferramentas Hub - Ferramentas Online Gratuitas

Um hub completo de mais de 20 ferramentas online gratuitas, incluindo geradores, validadores, calculadoras e conversores. Desenvolvido com Next.js 14, TypeScript e Tailwind CSS, otimizado para SEO e Core Web Vitals.

## 🚀 Características

- **Next.js 14** com App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilização
- **Dark Mode** com next-themes
- **SEO Otimizado** com metadata dinâmica
- **Core Web Vitals** otimizado para Lighthouse > 90
- **Google Analytics 4** integrado
- **Responsive Design** para todos os dispositivos

## 🛠️ Ferramentas Incluídas

### Geradores

- Gerador de CPF
- Gerador de CNPJ
- Gerador de Nomes de Empresa
- Gerador de Nick
- Gerador de Senhas
- Gerador de QR Code

### Validadores

- Validador de CPF
- Validador de CNPJ
- Validador de Email
- Validador de Telefone
- Validador de Cartão de Crédito

### Calculadoras

- Calculadora de Juros Compostos
- Calculadora de Rescisão CLT
- Calculadora de Férias
- Calculadora de 13º Salário
- Calculadora de IMC
- Calculadora de Combustível
- Calculadora de Consumo de Energia

### Conversores

- Conversor de Moedas
- Conversor de Medidas
- Conversor de Temperatura

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router pages
├── components/             # React components
│   ├── analytics/         # Google Analytics
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   ├── seo/              # SEO components
│   └── theme/            # Theme provider
└── lib/                  # Utility functions
```

## 🚀 Como Executar

### Desenvolvimento

```bash
npm run dev
```

### Build de Produção

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 📱 URLs Disponíveis

### Páginas Institucionais

- `/` - Homepage
- `/sobre` - Sobre nós
- `/privacidade` - Política de Privacidade
- `/contato` - Contato
- `/blog` - Blog

### Categorias

- `/geradores` - Lista de geradores
- `/validadores` - Lista de validadores
- `/calculadoras` - Lista de calculadoras
- `/conversores` - Lista de conversores

### Ferramentas (URLs amigáveis)

- `/gerador-cpf`
- `/gerador-cnpj`
- `/validador-email`
- `/calculadora-juros-compostos`
- `/conversor-moedas`
- E muitas outras...

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://seudominio.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_verification_code
```

### Google Analytics

Configure o Google Analytics 4 definindo a variável `NEXT_PUBLIC_GA_ID`.

## 📊 SEO e Performance

- **JSON-LD Schema.org** para structured data
- **Meta tags dinâmicas** para cada página
- **Open Graph** e Twitter Cards
- **Sitemap.xml** automático
- **Robots.txt** configurado
- **Core Web Vitals** otimizados
- **Lazy loading** de componentes

## 🎨 Design System

O projeto usa um design system baseado no Tailwind CSS com:

- Cores customizadas para light/dark mode
- Componentes reutilizáveis
- Sistema de grid responsivo
- Tipografia otimizada

## 📈 Analytics e Tracking

Eventos GA4 configurados:

- `tool_view` - Visualização de ferramenta
- `tool_submit` - Uso da ferramenta
- `copy_result` - Cópia do resultado
- `faq_toggle` - Toggle de FAQ
- `related_click` - Click em ferramenta relacionada

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🛠️ Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Lucide React](https://lucide.dev/)
- [QRCode](https://github.com/soldair/node-qrcode)

## 🔮 Roadmap

- [ ] Sistema de blog completo
- [ ] Mais ferramentas (Gerador de Lorem Ipsum, Hash Generator)
- [ ] API pública para as ferramentas
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados
- [ ] Internacionalização (i18n)

---

Desenvolvido com ❤️ para a comunidade
