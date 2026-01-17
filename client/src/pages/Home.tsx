import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { AppLoginModal } from "@/components/AppLoginModal";
import { Card, CardContent } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { motion } from "framer-motion";
import {
  Building2,
  HardHat,
  CheckSquare,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Hammer,
  Package,
  Play,
  Search,
  Ruler,
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
  Truck,
  Cog,
  PaintBucket,
  Shovel,
  Layers,
  CalendarDays,
  MapPin,
  Camera,
  FileCheck,
  AlertTriangle,
  TrendingUp,
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
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-appobras.png" alt="AppObras" className="h-12 w-12 object-contain" />
            <span className="text-xl font-bold text-gray-900">App<span className="text-amber-500">Obras</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm font-medium text-gray-600 hover:text-amber-500 transition-colors">
              Funcionalidades
            </a>
            <a href="#setores" className="text-sm font-medium text-gray-600 hover:text-amber-500 transition-colors">
              Setores
            </a>
            <a href="#beneficios" className="text-sm font-medium text-gray-600 hover:text-amber-500 transition-colors">
              Benefícios
            </a>
            <a href="#preco" className="text-sm font-medium text-gray-600 hover:text-amber-500 transition-colors">
              Preço
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="border-amber-500 text-amber-500 hover:bg-amber-50"
              onClick={() => setShowAppLogin(true)}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Aceder ao Meu App
            </Button>
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : isAuthenticated ? (
              <Link href="/dashboard">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  Meu Painel
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  Entrar
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-white via-amber-50/30 to-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-semibold mb-6 shadow-lg shadow-amber-500/25">
                <HardHat className="w-4 h-4" />
                Sistema Completo de Gestão de Obras
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Gestão de
                <span className="block text-amber-500">Obras e</span>
                <span className="block text-gray-900">Construções</span>
              </h1>

              <p className="text-lg text-gray-600 mb-6 max-w-lg leading-relaxed">
                Plataforma completa para <strong className="text-gray-900">obras residenciais, comerciais, industriais, reformas</strong> e <strong className="text-gray-900">construções de todos os portes</strong>.
              </p>

              {/* Preço em destaque */}
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white mb-8 shadow-xl">
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-400">A partir de</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-amber-400">R$99</span>
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
                  <Button size="lg" className="text-base bg-amber-500 hover:bg-amber-600 text-black font-semibold shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30">
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
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full" />
                  
                  <div className="text-center mb-8 relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 mb-4 shadow-lg shadow-amber-500/30">
                      <HardHat className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Tipos de Obras
                    </h3>
                    <p className="text-gray-500">Soluções para todos os tipos de construção</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="group flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 hover:from-amber-100 hover:to-amber-200/50 transition-all cursor-pointer border border-amber-200/50 hover:border-amber-300 hover:shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Building2 className="w-6 h-6 text-amber-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 text-center">Residencial</span>
                    </div>
                    <div className="group flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-200/50 transition-all cursor-pointer border border-gray-200/50 hover:border-gray-300 hover:shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Hammer className="w-6 h-6 text-gray-700" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 text-center">Comercial</span>
                    </div>
                    <div className="group flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 hover:from-amber-100 hover:to-amber-200/50 transition-all cursor-pointer border border-amber-200/50 hover:border-amber-300 hover:shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Cog className="w-6 h-6 text-amber-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 text-center">Industrial</span>
                    </div>
                    <div className="group flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-200/50 transition-all cursor-pointer border border-gray-200/50 hover:border-gray-300 hover:shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <PaintBucket className="w-6 h-6 text-gray-700" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 text-center">Reformas</span>
                    </div>
                    <div className="group flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 hover:from-amber-100 hover:to-amber-200/50 transition-all cursor-pointer border border-amber-200/50 hover:border-amber-300 hover:shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Layers className="w-6 h-6 text-amber-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 text-center">Infraestrutura</span>
                    </div>
                    <div className="group flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-200/50 transition-all cursor-pointer border border-gray-200/50 hover:border-gray-300 hover:shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Ruler className="w-6 h-6 text-gray-700" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 text-center">Projetos</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Funcionalidades Section */}
      <section id="funcionalidades" className="py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
                <Zap className="w-4 h-4" />
                Funcionalidades Completas
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tudo que você precisa para
                <span className="text-amber-500"> gerenciar suas obras</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Sistema completo com todas as ferramentas necessárias para o controle total das suas obras e construções.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ClipboardCheck,
                title: "Ordens de Serviço",
                description: "Crie e gerencie ordens de serviço para cada etapa da obra com acompanhamento em tempo real.",
                color: "amber"
              },
              {
                icon: FileCheck,
                title: "Vistorias de Obra",
                description: "Realize vistorias detalhadas com fotos, checklists e relatórios automáticos.",
                color: "gray"
              },
              {
                icon: Users,
                title: "Gestão de Equipes",
                description: "Controle equipes, atribua tarefas e acompanhe a produtividade de cada colaborador.",
                color: "amber"
              },
              {
                icon: CalendarDays,
                title: "Cronograma de Obras",
                description: "Planeje e acompanhe o cronograma de cada obra com alertas de prazos.",
                color: "gray"
              },
              {
                icon: Package,
                title: "Controle de Materiais",
                description: "Gerencie estoque, pedidos e entregas de materiais de construção.",
                color: "amber"
              },
              {
                icon: BarChart3,
                title: "Relatórios Detalhados",
                description: "Gere relatórios completos de progresso, custos e desempenho das obras.",
                color: "gray"
              },
              {
                icon: Camera,
                title: "Registro Fotográfico",
                description: "Documente cada etapa da obra com fotos organizadas por data e local.",
                color: "amber"
              },
              {
                icon: MapPin,
                title: "Localização GPS",
                description: "Registre a localização exata de cada serviço e vistoria realizada.",
                color: "gray"
              },
              {
                icon: AlertTriangle,
                title: "Gestão de Ocorrências",
                description: "Registre e acompanhe problemas, não conformidades e pendências.",
                color: "amber"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                      feature.color === 'amber' 
                        ? 'bg-gradient-to-br from-amber-500 to-amber-600' 
                        : 'bg-gradient-to-br from-gray-800 to-gray-900'
                    }`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Setores Section */}
      <section id="setores" className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold mb-4">
                <Target className="w-4 h-4" />
                Setores Atendidos
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Solução para
                <span className="text-amber-500"> todos os tipos de obra</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: "Construção Residencial", desc: "Casas, apartamentos e obras" },
              { icon: Hammer, title: "Construção Comercial", desc: "Lojas, escritórios e galpões" },
              { icon: Cog, title: "Construção Industrial", desc: "Fábricas e instalações industriais" },
              { icon: PaintBucket, title: "Reformas", desc: "Reformas residenciais e comerciais" },
              { icon: Layers, title: "Infraestrutura", desc: "Estradas, pontes e saneamento" },
              { icon: Ruler, title: "Projetos Especiais", desc: "Obras sob medida e personalizadas" },
              { icon: Truck, title: "Logística de Obra", desc: "Transporte e entrega de materiais" },
              { icon: Shield, title: "Segurança do Trabalho", desc: "Controle de EPIs e normas" },
            ].map((setor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 group-hover:bg-amber-500 flex items-center justify-center mb-4 transition-colors">
                  <setor.icon className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{setor.title}</h3>
                <p className="text-sm text-gray-500">{setor.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section id="beneficios" className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold mb-4">
                <Award className="w-4 h-4" />
                Benefícios
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Por que escolher o
                <span className="text-amber-400"> AppObras?</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Economia de Tempo",
                description: "Reduza em até 70% o tempo gasto com papelada e processos manuais.",
                stat: "70%"
              },
              {
                icon: TrendingUp,
                title: "Aumento de Produtividade",
                description: "Equipes mais organizadas e focadas nas tarefas certas.",
                stat: "45%"
              },
              {
                icon: Shield,
                title: "Redução de Erros",
                description: "Menos retrabalho e desperdício de materiais.",
                stat: "60%"
              },
              {
                icon: BarChart3,
                title: "Controle Total",
                description: "Visão completa de todas as obras em um só lugar.",
                stat: "100%"
              },
              {
                icon: Smartphone,
                title: "Acesso Mobile",
                description: "Gerencie suas obras de qualquer lugar, a qualquer hora.",
                stat: "24/7"
              },
              {
                icon: Users,
                title: "Colaboração",
                description: "Toda a equipe conectada e alinhada em tempo real.",
                stat: "∞"
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all group"
              >
                <div className="absolute top-4 right-4 text-4xl font-bold text-amber-500/20 group-hover:text-amber-500/40 transition-colors">
                  {benefit.stat}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Preço Section */}
      <section id="preco" className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
                <Star className="w-4 h-4" />
                Planos e Preços
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Escolha o plano ideal para
                <span className="text-amber-500"> sua empresa</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Básico",
                price: "99",
                description: "Para pequenas construtoras",
                features: [
                  "Até 5 obras simultâneas",
                  "3 usuários",
                  "Ordens de serviço",
                  "Relatórios básicos",
                  "Suporte por email"
                ],
                popular: false
              },
              {
                name: "Profissional",
                price: "199",
                description: "Para construtoras em crescimento",
                features: [
                  "Até 20 obras simultâneas",
                  "10 usuários",
                  "Todas as funcionalidades",
                  "Relatórios avançados",
                  "Suporte prioritário",
                  "App mobile"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "399",
                description: "Para grandes construtoras",
                features: [
                  "Obras ilimitadas",
                  "Usuários ilimitados",
                  "API de integração",
                  "Dashboard personalizado",
                  "Suporte 24/7",
                  "Treinamento incluso"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-3xl border-2 ${
                  plan.popular 
                    ? 'border-amber-500 bg-amber-50 shadow-xl shadow-amber-500/10' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-black text-sm font-bold">
                    Mais Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-sm text-gray-500">R$</span>
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500">/mês</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-amber-500 hover:bg-amber-600 text-black' 
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  Começar Agora
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Pronto para transformar a gestão das suas obras?
            </h2>
            <p className="text-lg text-black/70 mb-8 max-w-2xl mx-auto">
              Comece agora mesmo e veja a diferença que o AppObras pode fazer na sua construtora.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/registar">
                <Button size="lg" className="bg-black hover:bg-gray-900 text-white">
                  Criar Conta Grátis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/demo-layouts">
                <Button size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white">
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demonstração
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo-appobras.png" alt="AppObras" className="h-10 w-10 object-contain" />
                <span className="text-xl font-bold">App<span className="text-amber-400">Obras</span></span>
              </div>
              <p className="text-gray-400 text-sm">
                Sistema completo de gestão de obras, reformas e construções.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#funcionalidades" className="hover:text-amber-400 transition-colors">Funcionalidades</a></li>
                <li><a href="#preco" className="hover:text-amber-400 transition-colors">Preços</a></li>
                <li><Link href="/demo-layouts" className="hover:text-amber-400 transition-colors">Demonstração</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Status do Sistema</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} AppObras. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* App Login Modal */}
      <AppLoginModal open={showAppLogin} onOpenChange={setShowAppLogin} />
    </div>
  );
}
