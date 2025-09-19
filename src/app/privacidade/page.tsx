import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Shield,
  Database,
  Cookie,
  Eye,
  Lock,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade - Ferramentas Online",
  description:
    "Nossa política de privacidade explica como protegemos seus dados e garantimos que suas informações permaneçam seguras ao usar nossas ferramentas.",
  openGraph: {
    title: "Política de Privacidade - Ferramentas Online",
    description:
      "Nossa política de privacidade explica como protegemos seus dados e garantimos que suas informações permaneçam seguras ao usar nossas ferramentas.",
    url: "/privacidade",
  },
};

const breadcrumbItems = [
  { label: "Política de Privacidade", href: "/privacidade" },
];

const privacyPoints = [
  {
    icon: Database,
    title: "Não Coletamos Dados Pessoais",
    description:
      "Todas as ferramentas funcionam localmente no seu navegador. Não armazenamos, registramos ou transmitimos os dados que você insere em nossas ferramentas.",
  },
  {
    icon: Lock,
    title: "Processamento Local",
    description:
      "CPFs, CNPJs, senhas e outros dados são processados inteiramente no seu dispositivo. Nenhuma informação é enviada para nossos servidores.",
  },
  {
    icon: Cookie,
    title: "Cookies Mínimos",
    description:
      "Usamos apenas cookies essenciais para funcionamento do site, como preferência de tema (modo escuro/claro) e analytics anônimos.",
  },
  {
    icon: Eye,
    title: "Analytics Anônimos",
    description:
      "Utilizamos Google Analytics apenas para entender como as ferramentas são usadas, sem identificar usuários individualmente.",
  },
];

export default function PrivacidadePage() {
  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-4xl mx-auto space-y-12 py-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">
              Política de Privacidade
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sua privacidade é nossa prioridade. Esta política explica como
            protegemos suas informações ao usar nossas ferramentas.
          </p>
          <p className="text-sm text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {privacyPoints.map((point, index) => (
            <div key={index} className="p-6 bg-card rounded-lg border">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <point.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Policy */}
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2>1. Informações que Não Coletamos</h2>
            <p>
              <strong>Dados das Ferramentas:</strong> Não coletamos, armazenamos
              ou processamos nenhum dado que você inserir em nossas ferramentas
              (CPFs, CNPJs, senhas, etc.). Todo processamento acontece
              localmente no seu navegador.
            </p>
            <p>
              <strong>Informações Pessoais:</strong> Não solicitamos nome,
              email, telefone ou qualquer outra informação pessoal para usar
              nossas ferramentas.
            </p>
          </section>

          <section>
            <h2>2. Informações que Coletamos Automaticamente</h2>
            <p>
              <strong>Analytics:</strong> Utilizamos Google Analytics para
              entender como o site é usado (páginas visitadas, tempo de
              permanência, país de origem). Esses dados são anônimos e não
              identificam usuários individuais.
            </p>
            <p>
              <strong>Logs do Servidor:</strong> Como qualquer site, nossos
              servidores registram informações básicas como endereço IP,
              navegador e horário de acesso para fins de segurança e manutenção.
            </p>
          </section>

          <section>
            <h2>3. Cookies e Armazenamento Local</h2>
            <p>
              <strong>Cookies Essenciais:</strong> Usamos cookies apenas para
              funcionalidades essenciais como preferência de tema (modo
              escuro/claro).
            </p>
            <p>
              <strong>Local Storage:</strong> Algumas preferências podem ser
              salvas localmente no seu navegador para melhorar sua experiência.
            </p>
          </section>

          <section>
            <h2>4. Compartilhamento de Dados</h2>
            <p>
              <strong>Não Compartilhamos:</strong> Não vendemos, alugamos ou
              compartilhamos seus dados com terceiros para fins comerciais.
            </p>
            <p>
              <strong>Serviços de Terceiros:</strong> Utilizamos apenas Google
              Analytics (configurado para respeitar privacidade) e provedores de
              hospedagem confiáveis.
            </p>
          </section>

          <section>
            <h2>5. Segurança</h2>
            <p>
              <strong>HTTPS:</strong> Toda comunicação com nosso site é
              criptografada via HTTPS.
            </p>
            <p>
              <strong>Processamento Local:</strong> Como os dados são
              processados no seu dispositivo, eles nunca trafegam pela internet,
              garantindo máxima segurança.
            </p>
          </section>

          <section>
            <h2>6. Seus Direitos</h2>
            <p>
              <strong>Controle Total:</strong> Você tem controle total sobre
              seus dados, já que eles permanecem no seu dispositivo.
            </p>
            <p>
              <strong>Analytics:</strong> Você pode desabilitar o Google
              Analytics usando extensões de navegador ou configurações de
              privacidade.
            </p>
          </section>

          <section>
            <h2>7. Alterações na Política</h2>
            <p>
              Podemos atualizar esta política ocasionalmente. Mudanças
              significativas serão comunicadas através desta página com nova
              data de atualização.
            </p>
          </section>

          <section>
            <h2>8. Contato</h2>
            <p>
              Se você tiver dúvidas sobre esta política de privacidade, entre em
              contato através da nossa{" "}
              <a href="/contato" className="text-primary hover:text-primary/80">
                página de contato
              </a>
              .
            </p>
          </section>
        </div>

        {/* Trust Badge */}
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                Garantia de Privacidade
              </h3>
              <p className="text-green-800 dark:text-green-200 text-sm">
                Comprometemo-nos a manter esta política transparente e a não
                coletar mais dados do que o absolutamente necessário para
                fornecer nossas ferramentas gratuitas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
