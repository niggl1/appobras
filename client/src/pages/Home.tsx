import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { AppLoginModal } from "@/components/AppLoginModal";
import { Card, CardContent } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { motion } from "framer-motion";
import {
  Building2,
  BookOpen,
  CheckSquare,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Heart,
  Package,
  Play,
  Search,
  ShoppingBag,
  Wrench,
  LayoutGrid,
  Shield,
  Clock,
  BarChart3,
  Users,
  Smartphone,
  Check,
  ArrowRight,
  Star,
  Zap,
  Target,
  Award,
  MessageCircle,
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [showAppLogin, setShowAppLogin] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <img src="/logo-manutencao-completa.png" alt="App Manutenção" className="h-14 object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
              Funcionalidades
            </a>
            <a href="#setores" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
              Setores
            </a>
            <a href="#beneficios" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
              Benefícios
            </a>
            <a href="#preco" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
              Preço
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="border-orange-500 text-orange-500 hover:bg-orange-50"
              onClick={() => setShowAppLogin(true)}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Aceder ao Meu App
            </Button>
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : isAuthenticated ? (
              <Link href="/dashboard">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Meu Painel
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Entrar
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold mb-6 shadow-lg shadow-orange-500/25">
                <Wrench className="w-4 h-4" />
                Sistema Universal de Manutenção
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Gestão de
                <span className="block text-orange-500">Manutenção</span>
                <span className="block text-gray-900">Inteligente</span>
              </h1>

              <p className="text-lg text-gray-600 mb-6 max-w-lg leading-relaxed">
                Plataforma completa para <strong className="text-gray-900">manutenções prediais, industriais, comerciais, hospitalares, escolares</strong> e de <strong className="text-gray-900">máquinas e equipamentos</strong>.
              </p>

              {/* Preço em destaque */}
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white mb-8 shadow-xl">
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-400">A partir de</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-orange-400">R$99</span>
                    <span className="text-gray-400">/mês</span>
                  </div>
                </div>
                <div className="w-px h-12 bg-gray-700" />
                <div className="text-left">
                  <span className="text-sm text-gray-300">Acesso completo</span>
                  <p className="text-xs text-gray-500">Sem taxa de adesão</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="text-base bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/30">
                    <LayoutGrid className="w-5 h-5 mr-2" />
                    Acessar Plataforma
                  </Button>
                </Link>
                <Link href="/demo-layouts">
                  <Button size="lg" variant="outline" className="text-base border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all">
                    <Play className="w-5 h-5 mr-2" />
                    Ver Demonstração
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Card Premium de Setores */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-lg">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-full" />
                  
                  <div className="text-center mb-8 relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4 shadow-lg shadow-orange-500/30">
                      <Wrench className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Setores Atendidos
                    </h3>
                    <p className="text-gray-500">Soluções para todos os tipos de organização</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="group flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-200/50 transition-all cursor-pointer border border-orange-200/50 hover:border-orange-300 hover:shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Building2 className="w-6 h-6 text-orange-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 text-center">Predial</span>
                    </div>
                    <div className="group flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-200/50 transition-all cursor-pointer border border-gray-200/50 hover:border-gray-300 hover:shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Wrench className="w-6 h-6 text-gray-700" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 text-center">Industrial</span>
                    </div>
                    <div className="group flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-200/50 transition-all cursor-pointer border border-orange-200/50 hover:border-orange-300 hover:shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <ShoppingBag className="w-6 h-6 text-orange-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 text-center">Comercial</span>
                    </div>
                    <div className="group flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-200/50 transition-all cursor-pointer border border-gray-200/50 hover:border-gray-300 hover:shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Heart className="w-6 h-6 text-gray-700" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 text-center">Hospitalar</span>
                    </div>
                    <div className="group flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-200/50 transition-all cursor-pointer border border-orange-200/50 hover:border-orange-300 hover:shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6 text-orange-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 text-center">Escolar</span>
                    </div>
                    <div className="group flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-200/50 transition-all cursor-pointer border border-gray-200/50 hover:border-gray-300 hover:shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Package className="w-6 h-6 text-gray-700" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 text-center">Máquinas</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center mb-4 uppercase tracking-wider font-medium">Funcionalidades Principais</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <ClipboardCheck className="w-4 h-4 text-orange-500" />
                        <span>Ordens de Serviço</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Search className="w-4 h-4 text-orange-500" />
                        <span>Vistorias</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckSquare className="w-4 h-4 text-orange-500" />
                        <span>Checklists</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <FileText className="w-4 h-4 text-orange-500" />
                        <span>Relatórios</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Funcionalidades Section */}
      <section id="funcionalidades" className="py-24 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-4">
              Funcionalidades
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sistema completo para gestão de manutenções preventivas e corretivas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ClipboardCheck, title: "Ordens de Serviço", desc: "Crie, acompanhe e finalize OS com facilidade", color: "orange" },
              { icon: Search, title: "Vistorias", desc: "Realize inspeções detalhadas com fotos e relatórios", color: "gray" },
              { icon: CheckSquare, title: "Checklists", desc: "Listas de verificação personalizáveis", color: "orange" },
              { icon: Wrench, title: "Manutenções", desc: "Preventivas e corretivas organizadas", color: "gray" },
              { icon: Clock, title: "Agenda", desc: "Controle de vencimentos e prazos", color: "orange" },
              { icon: BarChart3, title: "Relatórios", desc: "Análises e métricas completas", color: "gray" },
              { icon: Users, title: "Equipes", desc: "Gestão de técnicos e colaboradores", color: "orange" },
              { icon: Smartphone, title: "App Mobile", desc: "Acesso em qualquer dispositivo", color: "gray" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl ${item.color === 'orange' ? 'bg-orange-100' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
                      <item.icon className={`w-6 h-6 ${item.color === 'orange' ? 'text-orange-600' : 'text-gray-700'}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section id="beneficios" className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-4">
                Benefícios
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Por que escolher o App Manutenção?
              </h2>
              <p className="text-gray-600 mb-8">
                Simplifique a gestão de manutenções da sua organização com uma plataforma moderna e intuitiva.
              </p>

              <div className="space-y-4">
                {[
                  "Reduza custos com manutenções preventivas",
                  "Aumente a produtividade da sua equipe",
                  "Tenha controle total em tempo real",
                  "Gere relatórios profissionais automaticamente",
                  "Acesse de qualquer lugar pelo celular",
                  "Suporte técnico especializado",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Zap, title: "Rápido", desc: "Implantação em minutos", color: "orange" },
                { icon: Shield, title: "Seguro", desc: "Dados protegidos", color: "gray" },
                { icon: Target, title: "Preciso", desc: "Métricas confiáveis", color: "gray" },
                { icon: Award, title: "Qualidade", desc: "Sistema premiado", color: "orange" },
              ].map((item, index) => (
                <Card key={index} className={`border-0 shadow-lg ${index % 2 === 0 ? 'mt-8' : ''}`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-14 h-14 rounded-2xl ${item.color === 'orange' ? 'bg-orange-100' : 'bg-gray-100'} flex items-center justify-center mx-auto mb-4`}>
                      <item.icon className={`w-7 h-7 ${item.color === 'orange' ? 'text-orange-600' : 'text-gray-700'}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Preço Section */}
      <section id="preco" className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-sm font-semibold mb-4">
              Preço
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Planos flexíveis para sua organização
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Escolha o plano que melhor se adapta às suas necessidades
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {/* Plano 1 Usuário - R$99 */}
            <Card className="border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">1 Usuário</h3>
                <p className="text-gray-100">Para começar</p>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-lg text-gray-500">R$</span>
                    <span className="text-6xl font-bold text-gray-900">99</span>
                    <span className="text-gray-500">/mês</span>
                  </div>
                  <p className="text-gray-500 mt-2">Sem taxa de adesão</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    "Ordens de Serviço ilimitadas",
                    "Vistorias e Checklists",
                    "Relatórios profissionais",
                    "App mobile incluso",
                    "Suporte técnico",
                    "Atualizações gratuitas",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/dashboard" className="block">
                  <Button className="w-full bg-gray-500 hover:bg-gray-600 text-white text-lg py-6">
                    Começar Agora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Plano 3 Usuários - R$199 */}
            <Card className="border-2 border-orange-500 shadow-2xl bg-white overflow-hidden scale-105">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-center">
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold text-white mb-2">Recomendado</div>
                <h3 className="text-2xl font-bold text-white mb-2">3 Usuários</h3>
                <p className="text-orange-100">Mais recursos e prioridade</p>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-lg text-gray-500">R$</span>
                    <span className="text-6xl font-bold text-gray-900">199</span>
                    <span className="text-gray-500">/mês</span>
                  </div>
                  <p className="text-gray-500 mt-2">Sem taxa de adesão</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    "Ordens de Serviço ilimitadas",
                    "Vistorias e Checklists",
                    "Relatórios profissionais",
                    "App mobile incluso",
                    "Suporte técnico prioritário",
                    "Atualizações gratuitas",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-orange-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/dashboard" className="block">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6">
                    Começar Agora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Plano 5 Usuários - R$299 */}
            <Card className="border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">5 Usuários</h3>
                <p className="text-gray-100">Solução completa</p>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-lg text-gray-500">R$</span>
                    <span className="text-6xl font-bold text-gray-900">299</span>
                    <span className="text-gray-500">/mês</span>
                  </div>
                  <p className="text-gray-500 mt-2">Sem taxa de adesão</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    "Ordens de Serviço ilimitadas",
                    "Vistorias e Checklists",
                    "Relatórios profissionais",
                    "App mobile incluso",
                    "Suporte técnico 24/7",
                    "Atualizações gratuitas",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-gray-700" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/dashboard" className="block">
                  <Button className="w-full bg-gray-700 hover:bg-gray-800 text-white text-lg py-6">
                    Começar Agora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pronto para transformar sua gestão de manutenção?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Junte-se a centenas de organizações que já utilizam o App Manutenção
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8">
                  Começar Gratuitamente
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-lg px-8">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar com Consultor
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <img src="/logo-manutencao.png" alt="App Manutenção" className="w-10 h-10 object-contain" />
              <span className="font-bold text-xl text-orange-400">App Manutenção</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 App Manutenção. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Modal de Login para Apps */}
      <AppLoginModal 
        open={showAppLogin} 
        onOpenChange={setShowAppLogin} 
      />
    </div>
  );
}
