import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Building2, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Users,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Hammer,
  FileText,
  Bell,
  MapPin,
  Wrench,
  HardHat,
  Ruler
} from "lucide-react";

// Componente de gráfico de barras simples
function BarChart({ data, maxValue, color = "amber" }: { data: { label: string; value: number }[]; maxValue?: number; color?: string }) {
  const max = maxValue || Math.max(...data.map(d => d.value));
  const colorClasses = {
    amber: "bg-amber-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    purple: "bg-purple-500"
  };
  
  return (
    <div className="space-y-3">
      {data.map((item, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium">{item.value.toLocaleString('pt-BR')}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${colorClasses[color as keyof typeof colorClasses]} rounded-full transition-all duration-500`}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente de gráfico de pizza simples
function PieChartSimple({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  let currentAngle = 0;
  
  const segments = data.map(item => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return { ...item, startAngle, angle, percentage: (item.value / total) * 100 };
  });

  // Criar gradiente conic para simular pizza
  const gradient = segments.map(seg => 
    `${seg.color} ${seg.startAngle}deg ${seg.startAngle + seg.angle}deg`
  ).join(', ');

  return (
    <div className="flex items-center gap-6">
      <div 
        className="w-32 h-32 rounded-full"
        style={{ background: `conic-gradient(${gradient})` }}
      />
      <div className="space-y-2">
        {segments.map((seg, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-muted-foreground">{seg.label}</span>
            <span className="font-medium">{seg.percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente de mini gráfico de linha
function SparkLine({ data, color = "#F59E0B" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 50" className="w-full h-12">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
}

export default function DashboardObras() {
  const [obraSelecionada, setObraSelecionada] = useState("todas");
  const [periodoSelecionado, setPeriodoSelecionado] = useState("mes");

  // Dados simulados
  const resumoGeral = {
    obrasAtivas: 5,
    obrasFinalizadas: 12,
    obrasPausadas: 1,
    valorTotalContratado: 2850000,
    valorTotalExecutado: 1425000,
    percentualGeralExecucao: 50,
    trabalhadores: 45,
    fornecedoresAtivos: 18
  };

  const obras = [
    { id: 1, nome: "Residencial Jardins", tipo: "Residencial", status: "em_andamento", percentual: 65, valorContratado: 850000, valorExecutado: 552500, prazo: "2026-06-30", diasRestantes: 165 },
    { id: 2, nome: "Comercial Centro", tipo: "Comercial", status: "em_andamento", percentual: 40, valorContratado: 1200000, valorExecutado: 480000, prazo: "2026-09-15", diasRestantes: 242 },
    { id: 3, nome: "Reforma Escritório ABC", tipo: "Reforma", status: "em_andamento", percentual: 85, valorContratado: 150000, valorExecutado: 127500, prazo: "2026-02-28", diasRestantes: 42 },
    { id: 4, nome: "Galpão Industrial", tipo: "Industrial", status: "em_andamento", percentual: 25, valorContratado: 500000, valorExecutado: 125000, prazo: "2026-12-31", diasRestantes: 349 },
    { id: 5, nome: "Casa Praia", tipo: "Residencial", status: "pausada", percentual: 30, valorContratado: 350000, valorExecutado: 105000, prazo: "2026-08-01", diasRestantes: 197 },
  ];

  const atividadesRecentes = [
    { id: 1, tipo: "medicao", descricao: "Medição aprovada - Estrutura 25%", obra: "Residencial Jardins", data: "Hoje, 14:30", valor: 45000 },
    { id: 2, tipo: "diario", descricao: "Diário de obra registrado", obra: "Comercial Centro", data: "Hoje, 17:45" },
    { id: 3, tipo: "material", descricao: "Entrega de cimento - 500 sacos", obra: "Galpão Industrial", data: "Ontem, 09:15" },
    { id: 4, tipo: "pagamento", descricao: "Pagamento fornecedor - Elétrica Total", obra: "Reforma Escritório ABC", data: "Ontem, 16:00", valor: 8500 },
    { id: 5, tipo: "alerta", descricao: "Prazo de entrega próximo", obra: "Reforma Escritório ABC", data: "2 dias atrás" },
  ];

  const alertas = [
    { id: 1, tipo: "prazo", mensagem: "Reforma Escritório ABC - Prazo em 42 dias", prioridade: "alta" },
    { id: 2, tipo: "orcamento", mensagem: "Comercial Centro - Custos 5% acima do previsto", prioridade: "media" },
    { id: 3, tipo: "material", mensagem: "Estoque baixo de cimento - Residencial Jardins", prioridade: "baixa" },
  ];

  const custosPorCategoria = [
    { label: "Materiais", value: 580000, color: "#F59E0B" },
    { label: "Mão de Obra", value: 420000, color: "#3B82F6" },
    { label: "Equipamentos", value: 180000, color: "#8B5CF6" },
    { label: "Serviços", value: 245000, color: "#10B981" },
  ];

  const evolucaoMensal = [
    { label: "Set", value: 85000 },
    { label: "Out", value: 120000 },
    { label: "Nov", value: 95000 },
    { label: "Dez", value: 180000 },
    { label: "Jan", value: 145000 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "em_andamento":
        return <Badge className="bg-green-100 text-green-700 gap-1"><Activity className="h-3 w-3" />Em Andamento</Badge>;
      case "pausada":
        return <Badge className="bg-amber-100 text-amber-700 gap-1"><Clock className="h-3 w-3" />Pausada</Badge>;
      case "finalizada":
        return <Badge className="bg-blue-100 text-blue-700 gap-1"><CheckCircle className="h-3 w-3" />Finalizada</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getAtividadeIcon = (tipo: string) => {
    switch (tipo) {
      case "medicao": return <Ruler className="h-4 w-4 text-amber-500" />;
      case "diario": return <FileText className="h-4 w-4 text-blue-500" />;
      case "material": return <Package className="h-4 w-4 text-green-500" />;
      case "pagamento": return <DollarSign className="h-4 w-4 text-purple-500" />;
      case "alerta": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-amber-500" />
            Dashboard
          </h1>
          <p className="text-muted-foreground">Visão geral de todas as suas obras</p>
        </div>
        <div className="flex gap-2">
          <Select value={obraSelecionada} onValueChange={setObraSelecionada}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Selecionar obra" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as obras</SelectItem>
              {obras.map(obra => (
                <SelectItem key={obra.id} value={obra.id.toString()}>{obra.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">Esta semana</SelectItem>
              <SelectItem value="mes">Este mês</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="ano">Este ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards de Resumo Principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Obras Ativas</p>
                <p className="text-3xl font-bold text-gray-900">{resumoGeral.obrasAtivas}</p>
              </div>
              <div className="h-14 w-14 rounded-full bg-amber-100 flex items-center justify-center">
                <Building2 className="h-7 w-7 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 text-sm">
              <Badge variant="outline" className="text-green-600">{resumoGeral.obrasFinalizadas} finalizadas</Badge>
              <Badge variant="outline" className="text-amber-600">{resumoGeral.obrasPausadas} pausada</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor Executado</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(resumoGeral.valorTotalExecutado)}</p>
              </div>
              <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-7 w-7 text-green-600" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">de {formatCurrency(resumoGeral.valorTotalContratado)}</span>
                <span className="font-medium">{resumoGeral.percentualGeralExecucao}%</span>
              </div>
              <Progress value={resumoGeral.percentualGeralExecucao} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trabalhadores</p>
                <p className="text-3xl font-bold text-gray-900">{resumoGeral.trabalhadores}</p>
              </div>
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                <HardHat className="h-7 w-7 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>+5 esta semana</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fornecedores</p>
                <p className="text-3xl font-bold text-gray-900">{resumoGeral.fornecedoresAtivos}</p>
              </div>
              <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center">
                <Wrench className="h-7 w-7 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
              <span>12 contratos ativos</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Esquerda - Obras */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lista de Obras */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Obras em Andamento</CardTitle>
                  <CardDescription>Status e progresso das obras ativas</CardDescription>
                </div>
                <Button variant="outline" size="sm">Ver todas</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {obras.filter(o => o.status !== "finalizada").map((obra) => (
                  <div key={obra.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{obra.nome}</h3>
                          {getStatusBadge(obra.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{obra.tipo}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(obra.valorExecutado)}</p>
                        <p className="text-xs text-muted-foreground">de {formatCurrency(obra.valorContratado)}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-medium">{obra.percentual}%</span>
                      </div>
                      <Progress value={obra.percentual} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Prazo: {new Date(obra.prazo).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <Badge variant={obra.diasRestantes < 60 ? "destructive" : "outline"} className="gap-1">
                        <Clock className="h-3 w-3" />
                        {obra.diasRestantes} dias
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Custos por Categoria */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Custos por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChartSimple data={custosPorCategoria} />
              </CardContent>
            </Card>

            {/* Evolução Mensal */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Evolução de Custos</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart data={evolucaoMensal} color="amber" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Coluna Direita - Atividades e Alertas */}
        <div className="space-y-6">
          {/* Alertas */}
          {alertas.length > 0 && (
            <Card className="border-red-200 bg-red-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-red-700">
                  <Bell className="h-5 w-5" />
                  Alertas ({alertas.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alertas.map((alerta) => (
                    <div key={alerta.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                      <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${
                        alerta.prioridade === 'alta' ? 'text-red-500' : 
                        alerta.prioridade === 'media' ? 'text-amber-500' : 'text-blue-500'
                      }`} />
                      <div>
                        <p className="text-sm">{alerta.mensagem}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {alerta.tipo === 'prazo' ? 'Prazo' : alerta.tipo === 'orcamento' ? 'Orçamento' : 'Material'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Atividades Recentes */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Atividades Recentes</CardTitle>
                <Button variant="ghost" size="sm">Ver todas</Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {atividadesRecentes.map((atividade) => (
                    <div key={atividade.id} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        {getAtividadeIcon(atividade.tipo)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{atividade.descricao}</p>
                        <p className="text-xs text-muted-foreground">{atividade.obra}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">{atividade.data}</span>
                          {atividade.valor && (
                            <span className="text-xs font-medium text-green-600">
                              {formatCurrency(atividade.valor)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Resumo Rápido */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Resumo do Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-amber-100 flex items-center justify-center">
                      <Ruler className="h-4 w-4 text-amber-600" />
                    </div>
                    <span className="text-sm">Medições</span>
                  </div>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Diários</span>
                  </div>
                  <span className="font-semibold">22</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm">Pagamentos</span>
                  </div>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-purple-100 flex items-center justify-center">
                      <Package className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-sm">Entregas</span>
                  </div>
                  <span className="font-semibold">15</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Indicadores de Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Indicadores de Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-sm text-muted-foreground">Obras no Prazo</span>
              </div>
              <p className="text-3xl font-bold text-green-600">80%</p>
              <p className="text-xs text-muted-foreground mt-1">4 de 5 obras</p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-muted-foreground">Dentro do Orçamento</span>
              </div>
              <p className="text-3xl font-bold text-blue-600">75%</p>
              <p className="text-xs text-muted-foreground mt-1">3 de 4 obras ativas</p>
            </div>

            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-amber-600" />
                <span className="text-sm text-muted-foreground">Produtividade</span>
              </div>
              <p className="text-3xl font-bold text-amber-600">92%</p>
              <p className="text-xs text-muted-foreground mt-1">Meta: 90%</p>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-muted-foreground">Qualidade</span>
              </div>
              <p className="text-3xl font-bold text-purple-600">98%</p>
              <p className="text-xs text-muted-foreground mt-1">Aprovação em vistorias</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
