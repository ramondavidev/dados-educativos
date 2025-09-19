import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Dicas e Tutoriais | Ferramentas Hub",
  description:
    "Dicas, tutoriais e guias sobre ferramentas online, validação de dados, segurança digital e muito mais.",
  keywords: [
    "blog ferramentas",
    "tutoriais online",
    "dicas tecnologia",
    "validação dados",
    "segurança digital",
  ],
  openGraph: {
    title: "Blog — Dicas e Tutoriais | Ferramentas Hub",
    description:
      "Dicas, tutoriais e guias sobre ferramentas online, validação de dados, segurança digital e muito mais.",
    url: "/blog",
  },
};

const breadcrumbItems = [{ label: "Blog", href: "/blog" }];

// Mock blog posts - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    title: "Como Gerar CPF e CNPJ Válidos para Testes",
    excerpt:
      "Aprenda a gerar documentos válidos matematicamente para seus testes de desenvolvimento sem usar dados reais.",
    author: "Equipe Ferramentas Hub",
    date: "2024-09-15",
    readTime: "5 min",
    category: "Tutorial",
    href: "/blog/como-gerar-cpf-cnpj-validos-testes",
    featured: true,
  },
  {
    id: 2,
    title: "Melhores Práticas para Senhas Seguras em 2024",
    excerpt:
      "Descubra como criar senhas realmente seguras e proteger suas contas online contra ataques cibernéticos.",
    author: "Equipe Ferramentas Hub",
    date: "2024-09-10",
    readTime: "7 min",
    category: "Segurança",
    href: "/blog/senhas-seguras-2024",
    featured: true,
  },
  {
    id: 3,
    title: "QR Codes: História, Usos e Como Criar",
    excerpt:
      "Tudo sobre QR Codes: de sua criação no Japão até os usos modernos em marketing e pagamentos digitais.",
    author: "Equipe Ferramentas Hub",
    date: "2024-09-05",
    readTime: "6 min",
    category: "Tecnologia",
    href: "/blog/qr-codes-historia-usos",
    featured: false,
  },
  {
    id: 4,
    title: "Validação de Email: Regex vs APIs",
    excerpt:
      "Compare diferentes métodos de validação de email e entenda quando usar cada abordagem em seus projetos.",
    author: "Equipe Ferramentas Hub",
    date: "2024-08-30",
    readTime: "8 min",
    category: "Desenvolvimento",
    href: "/blog/validacao-email-regex-apis",
    featured: false,
  },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog Ferramentas Hub",
  description:
    "Dicas, tutoriais e guias sobre ferramentas online, validação de dados e segurança digital",
  url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"}/blog`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: blogPosts.length,
    itemListElement: blogPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
          "@type": "Organization",
          name: post.author,
        },
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"}${
          post.href
        }`,
      },
    })),
  },
};

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <>
      <JsonLd data={collectionSchema} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb items={breadcrumbItems} />

        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <BookOpen className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Blog
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Dicas, tutoriais e guias sobre ferramentas online, validação de
              dados, segurança digital e desenvolvimento web.
            </p>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Posts em Destaque
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="group">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                            {post.category}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium rounded-md bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                            Destaque
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                          <Link href={post.href}>{post.title}</Link>
                        </h3>

                        <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(post.date).toLocaleDateString(
                                  "pt-BR"
                                )}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          <Link
                            href={post.href}
                            className="inline-flex items-center space-x-1 text-primary hover:text-primary/80 font-medium"
                          >
                            <span>Ler mais</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* All Posts */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Todos os Posts
            </h2>

            <div className="space-y-6">
              {blogPosts.map((post) => (
                <article key={post.id} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                            {post.category}
                          </span>
                          {post.featured && (
                            <span className="px-2 py-1 text-xs font-medium rounded-md bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                              Destaque
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                          <Link href={post.href}>{post.title}</Link>
                        </h3>

                        <p className="text-base text-gray-600 dark:text-gray-300 mb-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(post.date).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>

                      <Link
                        href={post.href}
                        className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium whitespace-nowrap"
                      >
                        <span>Ler post</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Categorias
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Tutorial", "Segurança", "Tecnologia", "Desenvolvimento"].map(
                (category) => (
                  <div key={category} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {category}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      {
                        blogPosts.filter((post) => post.category === category)
                          .length
                      }{" "}
                      posts
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
