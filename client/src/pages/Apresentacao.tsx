import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  bgColor: string;
  textColor: string;
}

export default function Apresentacao() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const slides: Slide[] = [
    {
      id: 1,
      title: 'APP MANUTENÇÃO',
      subtitle: 'Sistema Universal de Gestão de Manutenção',
      content: (
        <div className="text-center space-y-6">
          <p className="text-2xl text-gray-600">
            A plataforma completa para gerenciar manutenções de qualquer escala
          </p>
          <div className="flex justify-center gap-4 text-3xl">
            <span>🏢</span>
            <span>🏭</span>
            <span>🏪</span>
            <span>🏥</span>
            <span>🏫</span>
          </div>
        </div>
      ),
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      textColor: 'text-gray-900'
    },
    {
      id: 2,
      title: 'Bem-vindo ao Futuro da Manutenção',
      subtitle: 'Desenvolvido para todos os tipos de operação',
      content: (
        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: '🏢', text: 'Manutenções Prediais' },
            { icon: '🏭', text: 'Manutenções Industriais' },
            { icon: '🏪', text: 'Manutenções Comerciais' },
            { icon: '🏥', text: 'Manutenções Hospitalares' },
            { icon: '🏫', text: 'Manutenções Escolares' },
            { icon: '⚙️', text: 'Máquinas e Equipamentos' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md"
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="font-semibold text-gray-800">{item.text}</span>
            </motion.div>
          ))}
        </div>
      ),
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      id: 3,
      title: 'Principais Funcionalidades',
      subtitle: 'Tudo que você precisa para gerenciar manutenções',
      content: (
        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: '📋', title: 'Ordens de Serviço', desc: 'Crie e acompanhe em tempo real' },
            { icon: '🔍', title: 'Vistorias Detalhadas', desc: 'Com checklists personalizáveis' },
            { icon: '📊', title: 'Relatórios Profissionais', desc: 'Gráficos e análises avançadas' },
            { icon: '📱', title: 'App Mobile', desc: 'iOS e Android nativos' },
            { icon: '🔐', title: 'Segurança de Dados', desc: 'Criptografia e LGPD' },
            { icon: '🚀', title: 'Integração Fácil', desc: 'APIs robustas e documentadas' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      ),
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      id: 4,
      title: 'Ordens de Serviço',
      subtitle: '📋 Funcionalidade Principal',
      content: (
        <div className="space-y-6">
          <p className="text-xl text-gray-700">
            Crie, atribua e acompanhe ordens de serviço em tempo real com histórico completo.
          </p>
          <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-8 rounded-xl">
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Criação rápida e intuitiva</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Atribuição automática de tarefas</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Acompanhamento em tempo real</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Histórico completo e rastreável</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      id: 5,
      title: 'Vistorias Detalhadas',
      subtitle: '🔍 Documentação Profissional',
      content: (
        <div className="space-y-6">
          <p className="text-xl text-gray-700">
            Realize vistorias completas com checklists personalizáveis e fotos de evidência.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              { title: 'Checklists', desc: 'Personalizáveis conforme necessidade' },
              { title: 'Fotos', desc: 'Integração de câmera e galeria' },
              { title: 'Assinaturas', desc: 'Validação digital de conclusão' },
              { title: 'Relatórios', desc: 'Geração automática de documentos' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-orange-100 rounded-lg border-l-4 border-orange-500"
              >
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      id: 6,
      title: 'Relatórios Profissionais',
      subtitle: '📊 Análises e Métricas',
      content: (
        <div className="space-y-6">
          <p className="text-xl text-gray-700">
            Gere relatórios customizados com gráficos, análises e métricas de desempenho.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              '📈 Gráficos interativos',
              '📊 Análise de tendências',
              '⏱️ Métricas de desempenho',
              '💰 Análise de custos',
              '👥 Produtividade da equipe',
              '🎯 KPIs customizados'
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg"
              >
                <p className="text-lg font-semibold text-gray-900">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      id: 7,
      title: 'Plano Individual',
      subtitle: 'R$ 99/mês',
      content: (
        <div className="space-y-6">
          <p className="text-xl text-gray-700 font-semibold">Perfeito para profissionais autônomos</p>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl">
            <ul className="space-y-3 text-lg">
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>1 usuário ativo</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Ordens de serviço ilimitadas</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Suporte técnico</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>App mobile</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Relatórios básicos</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      id: 8,
      title: 'Plano Pequenas Equipes',
      subtitle: 'R$ 199/mês',
      content: (
        <div className="space-y-6">
          <p className="text-xl text-gray-700 font-semibold">Ideal para pequenas e médias empresas</p>
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-8 rounded-xl border-2 border-orange-500">
            <ul className="space-y-3 text-lg">
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Até 3 usuários</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Ordens de serviço ilimitadas</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Suporte técnico prioritário</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>App mobile</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Relatórios avançados</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Integração com APIs</span>
              </li>
            </ul>
          </div>
          <p className="text-center text-orange-600 font-bold text-lg">RECOMENDADO</p>
        </div>
      ),
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      id: 9,
      title: 'Plano Equipes Médias',
      subtitle: 'R$ 299/mês',
      content: (
        <div className="space-y-6">
          <p className="text-xl text-gray-700 font-semibold">Para operações em larga escala</p>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl">
            <ul className="space-y-3 text-lg">
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Até 5 usuários</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Ordens de serviço ilimitadas</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Suporte técnico 24/7</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>App mobile</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Relatórios customizados</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Integração completa</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Backup automático</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      id: 10,
      title: 'Termos do Contrato',
      subtitle: 'Transparência e Segurança',
      content: (
        <div className="space-y-4">
          {[
            { title: 'Período', desc: '1 ano renovável automaticamente' },
            { title: 'Reajuste', desc: 'Anual conforme IPCA ou mudança de plano' },
            { title: 'Bloqueio', desc: 'Após 5 dias corridos de atraso' },
            { title: 'Cancelamento', desc: '30 dias de aviso prévio' },
            { title: 'Penalidade', desc: '1 mês adicional se aviso não for respeitado' },
            { title: 'Suporte', desc: 'Disponível em todos os planos' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500"
            >
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ),
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      id: 11,
      title: 'Por Que Escolher APP MANUTENÇÃO?',
      subtitle: 'Diferenciais que fazem a diferença',
      content: (
        <div className="grid grid-cols-2 gap-4">
          {[
            '✓ Sem taxa de adesão',
            '✓ Sem compromisso longo',
            '✓ Suporte dedicado',
            '✓ Plataforma intuitiva',
            '✓ Segurança garantida',
            '✓ Integração fácil',
            '✓ Relatórios profissionais',
            '✓ Acesso mobile completo'
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08 }}
              className="p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg text-lg font-semibold text-gray-900"
            >
              {item}
            </motion.div>
          ))}
        </div>
      ),
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      id: 12,
      title: 'Próximos Passos',
      subtitle: 'Comece sua transformação agora',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-4 gap-4">
            {[
              { num: '1', title: 'Escolha', desc: 'Seu plano' },
              { num: '2', title: 'Teste', desc: '7 dias grátis' },
              { num: '3', title: 'Configure', desc: 'Sua conta' },
              { num: '4', title: 'Comece', desc: 'A usar' }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-white">{step.num}</span>
                </div>
                <h4 className="font-bold text-gray-900">{step.title}</h4>
                <p className="text-sm text-gray-700">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xl text-gray-700">
            <strong>Estamos prontos para transformar sua gestão de manutenção!</strong>
          </p>
        </div>
      ),
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      textColor: 'text-gray-900'
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/apresentacao_sistema.pdf';
    link.download = 'apresentacao_sistema.pdf';
    link.click();
  };

  const sharePresentation = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'APP MANUTENÇÃO - Apresentação',
        text: 'Confira nossa apresentação do sistema de gestão de manutenção',
        url: url
      });
    } else {
      alert('Link: ' + url);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/LogoManutenção2.png" alt="APP MANUTENÇÃO" className="h-12" />
          <span className="text-xl font-bold text-gray-900">Apresentação</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadPDF}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={sharePresentation}
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className={`w-full max-w-5xl ${slide.bgColor} rounded-2xl shadow-2xl p-12 min-h-96 flex flex-col justify-center ${slide.textColor}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-5xl font-bold mb-2">{slide.title}</h1>
                {slide.subtitle && (
                  <p className="text-xl text-gray-600">{slide.subtitle}</p>
                )}
              </div>
              <div className="text-lg">{slide.content}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white shadow-md p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-sm font-semibold text-gray-700">
            {currentSlide + 1} / {slides.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="flex gap-2 flex-wrap justify-center max-w-2xl">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide
                  ? 'bg-orange-500 w-8'
                  : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isAutoPlay ? 'default' : 'outline'}
            size="sm"
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={isAutoPlay ? 'bg-orange-500 hover:bg-orange-600' : ''}
          >
            {isAutoPlay ? '⏸ Pausar' : '▶ Auto'}
          </Button>
        </div>
      </div>
    </div>
  );
}
