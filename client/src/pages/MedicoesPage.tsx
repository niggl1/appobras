import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Ruler, 
  Plus, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  PieChart,
  FileText,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Target
} from "lucide-react";
import { toast } from "sonner";

// Tipos
interface EtapaObra {
  id: number;
  nome: string;
  pesoPercentual: number;
  valorPrevisto: number;
  medicoes: Medicao[];
}

interface Medicao {
  id: number;
  etapaId: number;
  data: string;
  percentualExecutado: number;
  valorMedido: number;
  observacao?: string;
  aprovada: boolean;
}

interface ResumoMedicao {
  etapa: EtapaObra;
  percentualAcumulado: number;
  valorAcumulado: number;
  status: "nao_iniciado" | "em_andamento" | "concluido" | "atrasado";
}

// Dados de exemplo
export default function MedicoesPage() {
  const [etapas, setEtapas] = useState<EtapaObra[]>([
    {
      id: 1,
      nome: "Serviços Preliminares",
      pesoPercentual: 5,
      valorPrevisto: 15000,
      medicoes: [
        { id: 1, etapaId: 1, data: "2026-01-05", percentualExecutado: 100, valorMedido: 15000, aprovada: true },
      ]
    },
    {
      id: 2,
      nome: "Fundações",
      pesoPercentual: 15,
      valorPrevisto: 45000,
      medicoes: [
        { id: 2, etapaId: 2, data: "2026-01-10", percentualExecutado: 100, valorMedido: 45000, aprovada: true },
      ]
    },
    {
      id: 3,
      nome: "Estrutura",
      pesoPercentual: 25,
      valorPrevisto: 75000,
      medicoes: [
        { id: 3, etapaId: 3, data: "2026-01-12", percentualExecutado: 40, valorMedido: 30000, aprovada: true },
        { id: 4, etapaId: 3, data: "2026-01-17", percentualExecutado: 25, valorMedido: 18750, aprovada: false },
      ]
    },
    {
      id: 4,
      nome: "Alvenaria",
      pesoPercentual: 15,
      valorPrevisto: 45000,
      medicoes: [
        { id: 5, etapaId: 4, data: "2026-01-15", percentualExecutado: 30, valorMedido: 13500, aprovada: true },
      ]
    },
    {
      id: 5,
      nome: "Instalações Elétricas",
      pesoPercentual: 10,
      valorPrevisto: 30000,
      medicoes: [
        { id: 6, etapaId: 5, data: "2026-01-16", percentualExecutado: 15, valorMedido: 4500, aprovada: true },
      ]
    },
    {
      id: 6,
      nome: "Instalações Hidráulicas",
      pesoPercentual: 8,
      valorPrevisto: 24000,
      medicoes: []
    },
    {
      id: 7,
      nome: "Revestimentos",
      pesoPercentual: 12,
      valorPrevisto: 36000,
      medicoes: []
    },
    {
      id: 8,
      nome: "Pintura e Acabamentos",
      pesoPercentual: 10,
      valorPrevisto: 30000,
      medicoes: []
    },
  ]);

  const [dialogNovaMedicao, setDialogNovaMedicao] = useState(false);
  const [novaMedicao, setNovaMedicao] = useState<Partial<Medicao & { etapaId: number }>>({});
  const [etapaSelecionada, setEtapaSelecionada] = useState<number | null>(null);

  // Cálculos
  const valorTotalPrevisto = etapas.reduce((acc, e) => acc + e.valorPrevisto, 0);
  
  const resumoEtapas: ResumoMedicao[] = etapas.map(etapa => {
    const percentualAcumulado = etapa.medicoes.reduce((acc, m) => acc + m.percentualExecutado, 0);
    const valorAcumulado = etapa.medicoes.reduce((acc, m) => acc + m.valorMedido, 0);
    
    let status: ResumoMedicao["status"] = "nao_iniciado";
    if (percentualAcumulado >= 100) status = "concluido";
    else if (percentualAcumulado > 0) status = "em_andamento";
    
    return { etapa, percentualAcumulado: Math.min(percentualAcumulado, 100), valorAcumulado, status };
  });

  const percentualFisicoTotal = resumoEtapas.reduce((acc, r) => {
    return acc + (r.percentualAcumulado * r.etapa.pesoPercentual / 100);
  }, 0);

  const valorTotalMedido = resumoEtapas.reduce((acc, r) => acc + r.valorAcumulado, 0);
  const percentualFinanceiroTotal = (valorTotalMedido / valorTotalPrevisto) * 100;

  const etapasConcluidas = resumoEtapas.filter(r => r.status === "concluido").length;
  const etapasEmAndamento = resumoEtapas.filter(r => r.status === "em_andamento").length;

  // Medições pendentes de aprovação
  const medicoesPendentes = etapas.flatMap(e => 
    e.medicoes.filter(m => !m.aprovada).map(m => ({ ...m, etapaNome: e.nome }))
  );

  const handleAdicionarMedicao = () => {
    if (!novaMedicao.etapaId || !novaMedicao.percentualExecutado) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    const etapa = etapas.find(e => e.id === novaMedicao.etapaId);
    if (!etapa) return;

    const percentualAtual = etapa.medicoes.reduce((acc, m) => acc + m.percentualExecutado, 0);
    const percentualRestante = 100 - percentualAtual;

    if (novaMedicao.percentualExecutado > percentualRestante) {
      toast.error(`Percentual máximo disponível: ${percentualRestante}%`);
      return;
    }

    const valorMedido = (novaMedicao.percentualExecutado / 100) * etapa.valorPrevisto;

    const medicao: Medicao = {
      id: Math.max(...etapas.flatMap(e => e.medicoes.map(m => m.id)), 0) + 1,
      etapaId: novaMedicao.etapaId,
      data: novaMedicao.data || new Date().toISOString().split('T')[0],
      percentualExecutado: novaMedicao.percentualExecutado,
      valorMedido,
      observacao: novaMedicao.observacao,
      aprovada: false
    };

    setEtapas(etapas.map(e => {
      if (e.id === novaMedicao.etapaId) {
        return { ...e, medicoes: [...e.medicoes, medicao] };
      }
      return e;
    }));

    setNovaMedicao({});
    setDialogNovaMedicao(false);
    toast.success("Medição registrada com sucesso! Aguardando aprovação.");
  };

  const handleAprovarMedicao = (etapaId: number, medicaoId: number) => {
    setEtapas(etapas.map(e => {
      if (e.id === etapaId) {
        return {
          ...e,
          medicoes: e.medicoes.map(m => m.id === medicaoId ? { ...m, aprovada: true } : m)
        };
      }
      return e;
    }));
    toast.success("Medição aprovada!");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getStatusBadge = (status: ResumoMedicao["status"]) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-green-100 text-green-700 gap-1"><CheckCircle className="h-3 w-3" />Concluído</Badge>;
      case "em_andamento":
        return <Badge className="bg-blue-100 text-blue-700 gap-1"><Clock className="h-3 w-3" />Em Andamento</Badge>;
      case "atrasado":
        return <Badge className="bg-red-100 text-red-700 gap-1"><AlertTriangle className="h-3 w-3" />Atrasado</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-500">Não Iniciado</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Ruler className="h-7 w-7 text-amber-500" />
            Medições e Avanço
          </h1>
          <p className="text-muted-foreground">Acompanhe o avanço físico e financeiro da obra</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
          <Dialog open={dialogNovaMedicao} onOpenChange={setDialogNovaMedicao}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-black">
                <Plus className="h-4 w-4" />
                Nova Medição
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Registrar Medição</DialogTitle>
                <DialogDescription>Registre o avanço de uma etapa da obra</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Etapa</Label>
                  <Select 
                    value={novaMedicao.etapaId?.toString()} 
                    onValueChange={(v) => setNovaMedicao({...novaMedicao, etapaId: parseInt(v)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a etapa" />
                    </SelectTrigger>
                    <SelectContent>
                      {etapas.map(etapa => {
                        const percentualAtual = etapa.medicoes.reduce((acc, m) => acc + m.percentualExecutado, 0);
                        const disponivel = 100 - percentualAtual;
                        return (
                          <SelectItem 
                            key={etapa.id} 
                            value={etapa.id.toString()}
                            disabled={disponivel <= 0}
                          >
                            {etapa.nome} ({disponivel}% disponível)
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                
                {novaMedicao.etapaId && (
                  <>
                    <div className="p-3 bg-amber-50 rounded-lg">
                      {(() => {
                        const etapa = etapas.find(e => e.id === novaMedicao.etapaId);
                        if (!etapa) return null;
                        const percentualAtual = etapa.medicoes.reduce((acc, m) => acc + m.percentualExecutado, 0);
                        return (
                          <div className="space-y-1 text-sm">
                            <p><strong>Valor previsto:</strong> {formatCurrency(etapa.valorPrevisto)}</p>
                            <p><strong>Já medido:</strong> {percentualAtual}%</p>
                            <p><strong>Disponível:</strong> {100 - percentualAtual}%</p>
                          </div>
                        );
                      })()}
                    </div>

                    <div className="space-y-2">
                      <Label>Data da Medição</Label>
                      <Input 
                        type="date"
                        value={novaMedicao.data || new Date().toISOString().split('T')[0]}
                        onChange={(e) => setNovaMedicao({...novaMedicao, data: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Percentual Executado (%)</Label>
                      <Input 
                        type="number"
                        min="0"
                        max="100"
                        step="0.5"
                        placeholder="0"
                        value={novaMedicao.percentualExecutado || ''}
                        onChange={(e) => setNovaMedicao({...novaMedicao, percentualExecutado: parseFloat(e.target.value)})}
                      />
                    </div>

                    {novaMedicao.percentualExecutado && novaMedicao.etapaId && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Valor desta medição</p>
                        <p className="text-xl font-bold text-green-600">
                          {formatCurrency((novaMedicao.percentualExecutado / 100) * (etapas.find(e => e.id === novaMedicao.etapaId)?.valorPrevisto || 0))}
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Observação (opcional)</Label>
                      <Input 
                        placeholder="Observações sobre a medição"
                        value={novaMedicao.observacao || ''}
                        onChange={(e) => setNovaMedicao({...novaMedicao, observacao: e.target.value})}
                      />
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogNovaMedicao(false)}>Cancelar</Button>
                <Button onClick={handleAdicionarMedicao} className="bg-amber-500 hover:bg-amber-600 text-black">
                  Registrar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avanço Físico</p>
                <p className="text-2xl font-bold text-gray-900">{percentualFisicoTotal.toFixed(1)}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <Progress value={percentualFisicoTotal} className="h-2 mt-3" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avanço Financeiro</p>
                <p className="text-2xl font-bold text-gray-900">{percentualFinanceiroTotal.toFixed(1)}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-muted-foreground">Medido: </span>
              <span className="font-medium">{formatCurrency(valorTotalMedido)}</span>
              <span className="text-muted-foreground"> / {formatCurrency(valorTotalPrevisto)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Etapas</p>
                <p className="text-2xl font-bold text-gray-900">{etapasConcluidas}/{etapas.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {etapasEmAndamento} em andamento
            </p>
          </CardContent>
        </Card>

        <Card className={`border-l-4 ${medicoesPendentes.length > 0 ? 'border-l-orange-500' : 'border-l-gray-300'}`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes Aprovação</p>
                <p className="text-2xl font-bold text-gray-900">{medicoesPendentes.length}</p>
              </div>
              <div className={`h-12 w-12 rounded-full ${medicoesPendentes.length > 0 ? 'bg-orange-100' : 'bg-gray-100'} flex items-center justify-center`}>
                <Clock className={`h-6 w-6 ${medicoesPendentes.length > 0 ? 'text-orange-600' : 'text-gray-400'}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Conteúdo */}
      <Tabs defaultValue="etapas" className="space-y-4">
        <TabsList className="bg-amber-50">
          <TabsTrigger value="etapas" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            Etapas da Obra
          </TabsTrigger>
          <TabsTrigger value="historico" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            Histórico de Medições
          </TabsTrigger>
          <TabsTrigger value="pendentes" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            Pendentes de Aprovação
            {medicoesPendentes.length > 0 && (
              <Badge className="ml-2 bg-orange-500">{medicoesPendentes.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Tab: Etapas */}
        <TabsContent value="etapas">
          <Card>
            <CardHeader>
              <CardTitle>Avanço por Etapa</CardTitle>
              <CardDescription>Visualize o progresso de cada etapa da obra</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resumoEtapas.map((resumo) => (
                  <div key={resumo.etapa.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{resumo.etapa.nome}</h3>
                        {getStatusBadge(resumo.status)}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(resumo.valorAcumulado)}</p>
                        <p className="text-xs text-muted-foreground">de {formatCurrency(resumo.etapa.valorPrevisto)}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Avanço físico</span>
                        <span className="font-medium">{resumo.percentualAcumulado.toFixed(1)}%</span>
                      </div>
                      <Progress value={resumo.percentualAcumulado} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">
                          Peso: <strong>{resumo.etapa.pesoPercentual}%</strong>
                        </span>
                        <span className="text-muted-foreground">
                          Medições: <strong>{resumo.etapa.medicoes.length}</strong>
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setNovaMedicao({ etapaId: resumo.etapa.id });
                          setDialogNovaMedicao(true);
                        }}
                        disabled={resumo.percentualAcumulado >= 100}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Medir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Histórico */}
        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Medições</CardTitle>
              <CardDescription>Todas as medições registradas</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Etapa</TableHead>
                      <TableHead className="text-center">Percentual</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Observação</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {etapas.flatMap(etapa => 
                      etapa.medicoes.map(medicao => (
                        <TableRow key={medicao.id}>
                          <TableCell>{new Date(medicao.data).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell className="font-medium">{etapa.nome}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{medicao.percentualExecutado}%</Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold">{formatCurrency(medicao.valorMedido)}</TableCell>
                          <TableCell className="max-w-xs truncate">{medicao.observacao || '-'}</TableCell>
                          <TableCell className="text-center">
                            {medicao.aprovada ? (
                              <Badge className="bg-green-100 text-green-700 gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Aprovada
                              </Badge>
                            ) : (
                              <Badge className="bg-orange-100 text-orange-700 gap-1">
                                <Clock className="h-3 w-3" />
                                Pendente
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ).sort((a, b) => new Date(b.props.children[0].props.children).getTime() - new Date(a.props.children[0].props.children).getTime())}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Pendentes */}
        <TabsContent value="pendentes">
          <Card>
            <CardHeader>
              <CardTitle>Medições Pendentes de Aprovação</CardTitle>
              <CardDescription>Aprove ou rejeite as medições registradas</CardDescription>
            </CardHeader>
            <CardContent>
              {medicoesPendentes.length > 0 ? (
                <div className="space-y-4">
                  {medicoesPendentes.map((medicao) => (
                    <div key={medicao.id} className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{medicao.etapaNome}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(medicao.data).toLocaleDateString('pt-BR')} • {medicao.percentualExecutado}% executado
                          </p>
                          {medicao.observacao && (
                            <p className="text-sm mt-1">{medicao.observacao}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">{formatCurrency(medicao.valorMedido)}</p>
                          <div className="flex gap-2 mt-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-600 hover:bg-red-50"
                            >
                              Rejeitar
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleAprovarMedicao(medicao.etapaId, medicao.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Aprovar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Tudo em dia!</h3>
                  <p className="text-muted-foreground">Não há medições pendentes de aprovação</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resumo Visual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Curva de Avanço
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Avanço Físico vs Financeiro</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Físico</span>
                    <span className="font-medium">{percentualFisicoTotal.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentualFisicoTotal} className="h-3 [&>div]:bg-amber-500" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Financeiro</span>
                    <span className="font-medium">{percentualFinanceiroTotal.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentualFinanceiroTotal} className="h-3 [&>div]:bg-green-500" />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {percentualFisicoTotal >= percentualFinanceiroTotal ? (
                    <>
                      <ArrowUpRight className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-green-600">Obra adiantada</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-5 w-5 text-red-500" />
                      <span className="font-medium text-red-600">Obra atrasada</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Diferença de {Math.abs(percentualFisicoTotal - percentualFinanceiroTotal).toFixed(1)}% entre avanço físico e financeiro
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Distribuição por Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Concluídas</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">{etapasConcluidas}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span>Em Andamento</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">{etapasEmAndamento}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-gray-400" />
                    <span>Não Iniciadas</span>
                  </div>
                  <Badge variant="outline">{etapas.length - etapasConcluidas - etapasEmAndamento}</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
