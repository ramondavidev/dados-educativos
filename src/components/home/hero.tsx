import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  Calculator as CalcIcon,
  RefreshCw,
} from "lucide-react";

export function Hero() {
  return (
    <section className="container">
      <div className="flex flex-col items-center text-center space-y-8 py-16 md:py-24">
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Ferramentas Online <span className="text-primary">Gratuitas</span>
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            Mais de 20 ferramentas essenciais: geradores, validadores,
            calculadoras e conversores. Tudo online, gratuito e sem necessidade
            de cadastro.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/geradores"
            className="btn-primary inline-flex items-center space-x-2 px-6 py-3 text-lg"
          >
            <span>Explorar Ferramentas</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/blog"
            className="btn-secondary inline-flex items-center space-x-2 px-6 py-3 text-lg"
          >
            <span>Ler Blog</span>
          </Link>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-12">
          <Link
            href="/geradores"
            className="group p-6 bg-card rounded-lg border hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-sm">Geradores</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  CPF, CNPJ, Senhas
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/validadores"
            className="group p-6 bg-card rounded-lg border hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-sm">Validadores</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Email, Telefone
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/calculadoras"
            className="group p-6 bg-card rounded-lg border hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:scale-110 transition-transform">
                <CalcIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-sm">Calculadoras</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Juros, IMC, Férias
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/conversores"
            className="group p-6 bg-card rounded-lg border hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg group-hover:scale-110 transition-transform">
                <RefreshCw className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-sm">Conversores</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Moedas, Medidas
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
