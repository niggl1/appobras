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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Users, 
  Plus, 
  Clock, 
  Calendar as CalendarIcon,
  UserPlus,
  Timer,
  DollarSign,
  TrendingUp,
  HardHat,
  Wrench,
  Hammer,
  Building2,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Edit,
  Trash2,
  FileText,
  Download
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Tipos
interface Trabalhador {
  id: number;
  nome: string;
  funcao: string;
  valorHora: number;
  valorDiaria: number;
  tipo: "clt" | "autonomo" | "terceirizado";
  status: "ativo" | "inativo" | "ferias";
  telefone?: string;
  documento?: string;
  foto?: string;
}

interface RegistroPonto {
  id: number;
  trabalhadorId: number;
  data: string;
  horaEntrada: string;
  horaSaida?: string;
  horaAlmocoInicio?: string;
  horaAlmocoFim?: string;
  horasExtras: number;
  observacao?: string;
  obraId: number;
}

interface ResumoTrabalhador {
  trabalhador: Trabalhador;
  horasTrabalhadas: number;
  diasTrabalhados: number;
  horasExtras: number;
  valorTotal: number;
}

// Dados de exemplo
const funcoes = [
  { id: "pedreiro", nome: "Pedreiro", icon: Building2 },
  { id: "servente", nome: "Servente", icon: HardHat },
  { id: "eletricista", nome: "Eletricista", icon: Wrench },
  { id: "encanador", nome: "Encanador", icon: Wrench },
  { id: "carpinteiro", nome: "Carpinteiro", icon: Hammer },
  { id: "pintor", nome: "Pintor", icon: HardHat },
  { id: "mestre_obras", nome: "Mestre de Obras", icon: Users },
  { id: "engenheiro", nome: "Engenheiro", icon: FileText },
];

export default function MaoDeObraPage() {
  const [trabalhadores, setTrabalhadores] = useState<Trabalhador[]>([
    { id: 1, nome: "José Silva", funcao: "pedreiro", valorHora: 25, valorDiaria: 180, tipo: "autonomo", status: "ativo", telefone: "(11) 99999-1111" },
    { id: 2, nome: "Carlos Santos", funcao: "pedreiro", valorHora: 25, valorDiaria: 180, tipo: "autonomo", status: "ativo", telefone: "(11) 99999-2222" },
    { id: 3, nome: "Pedro Oliveira", funcao: "servente", valorHora: 15, valorDiaria: 100, tipo: "autonomo", status: "ativo", telefone: "(11) 99999-3333" },
    { id: 4, nome: "Marcos Lima", funcao: "servente", valorHora: 15, valorDiaria: 100, tipo: "autonomo", status: "ativo", telefone: "(11) 99999-4444" },
    { id: 5, nome: "Roberto Costa", funcao: "eletricista", valorHora: 35, valorDiaria: 280, tipo: "terceirizado", status: "ativo", telefone: "(11) 99999-5555" },
    { id: 6, nome: "Fernando Souza", funcao: "mestre_obras", valorHora: 40, valorDiaria: 320, tipo: "clt", status: "ativo", telefone: "(11) 99999-6666" },
  ]);

  const [registrosPonto, setRegistrosPonto] = useState<RegistroPonto[]>([
    { id: 1, trabalhadorId: 1, data: "2026-01-17", horaEntrada: "07:00", horaSaida: "17:00", horaAlmocoInicio: "12:00", horaAlmocoFim: "13:00", horasExtras: 1, obraId: 1 },
    { id: 2, trabalhadorId: 2, data: "2026-01-17", horaEntrada: "07:00", horaSaida: "17:00", horaAlmocoInicio: "12:00", horaAlmocoFim: "13:00", horasExtras: 1, obraId: 1 },
    { id: 3, trabalhadorId: 3, data: "2026-01-17", horaEntrada: "07:00", horaSaida: "17:00", horaAlmocoInicio: "12:00", horaAlmocoFim: "13:00", horasExtras: 0, obraId: 1 },
    { id: 4, trabalhadorId: 4, data: "2026-01-17", horaEntrada: "07:00", horaSaida: "17:00", horaAlmocoInicio: "12:00", horaAlmocoFim: "13:00", horasExtras: 0, obraId: 1 },
    { id: 5, trabalhadorId: 5, data: "2026-01-17", horaEntrada: "08:00", horaSaida: "18:00", horaAlmocoInicio: "12:00", horaAlmocoFim: "13:00", horasExtras: 0, obraId: 1 },
    { id: 6, trabalhadorId: 6, data: "2026-01-17", horaEntrada: "07:00", horaSaida: "18:00", horaAlmocoInicio: "12:00", horaAlmocoFim: "13:00", horasExtras: 2, obraId: 1 },
    // Dias anteriores
    { id: 7, trabalhadorId: 1, data: "2026-01-16", horaEntrada: "07:00", horaSaida: "17:00", horaAlmocoInicio: "12:00", horaAlmocoFim: "13:00", horasExtras: 0, obraId: 1 },
    { id: 8, trabalhadorId: 2, data: "2026-01-16", horaEntrada: "07:00", horaSaida: "17:00", horaAlmocoInicio: "12:00", horaAlmocoFim: "13:00", horasExtras: 0, obraId: 1 },
    { id: 9, trabalhadorId: 3, data: "2026-01-16", horaEntrada: "07:00", horaSaida: "17:00", horaAlmocoInicio: "12:00", horaAlmocoFim: "13:00", horasExtras: 0, obraId: 1 },
  ]);

  const [dialogNovoTrabalhador, setDialogNovoTrabalhador] = useState(false);
  const [dialogRegistroPonto, setDialogRegistroPonto] = useState(false);
  const [novoTrabalhador, setNovoTrabalhador] = useState<Partial<Trabalhador>>({});
  const [novoRegistro, setNovoRegistro] = useState<Partial<RegistroPonto>>({ data: new Date().toISOString().split('T')[0] });
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());

  // Cálculos
  const calcularHorasTrabalhadas = (registro: RegistroPonto): number => {
    if (!registro.horaSaida) return 0;
    const entrada = parseInt(registro.horaEntrada.split(':')[0]) + parseInt(registro.horaEntrada.split(':')[1]) / 60;
    const saida = parseInt(registro.horaSaida.split(':')[0]) + parseInt(registro.horaSaida.split(':')[1]) / 60;
    let horas = saida - entrada;
    
    if (registro.horaAlmocoInicio && registro.horaAlmocoFim) {
      const almocoInicio = parseInt(registro.horaAlmocoInicio.split(':')[0]) + parseInt(registro.horaAlmocoInicio.split(':')[1]) / 60;
      const almocoFim = parseInt(registro.horaAlmocoFim.split(':')[0]) + parseInt(registro.horaAlmocoFim.split(':')[1]) / 60;
      horas -= (almocoFim - almocoInicio);
    }
    
    return horas;
  };

  const resumoTrabalhadores: ResumoTrabalhador[] = trabalhadores.map(trab => {
    const registros = registrosPonto.filter(r => r.trabalhadorId === trab.id);
    const horasTrabalhadas = registros.reduce((acc, r) => acc + calcularHorasTrabalhadas(r), 0);
    const horasExtras = registros.reduce((acc, r) => acc + r.horasExtras, 0);
    const diasTrabalhados = registros.length;
    const valorTotal = (horasTrabalhadas * trab.valorHora) + (horasExtras * trab.valorHora * 1.5);
    
    return {
      trabalhador: trab,
      horasTrabalhadas,
      diasTrabalhados,
      horasExtras,
      valorTotal
    };
  });

  const totalHorasMes = resumoTrabalhadores.reduce((acc, r) => acc + r.horasTrabalhadas, 0);
  const totalHorasExtrasMes = resumoTrabalhadores.reduce((acc, r) => acc + r.horasExtras, 0);
  const totalCustoMes = resumoTrabalhadores.reduce((acc, r) => acc + r.valorTotal, 0);
  const mediaHorasDia = totalHorasMes / (new Set(registrosPonto.map(r => r.data)).size || 1);

  const registrosHoje = registrosPonto.filter(r => r.data === new Date().toISOString().split('T')[0]);
  const trabalhadoresPresentes = registrosHoje.length;

  const handleAdicionarTrabalhador = () => {
    if (!novoTrabalhador.nome || !novoTrabalhador.funcao) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    const trabalhador: Trabalhador = {
      id: Math.max(...trabalhadores.map(t => t.id), 0) + 1,
      nome: novoTrabalhador.nome!,
      funcao: novoTrabalhador.funcao!,
      valorHora: novoTrabalhador.valorHora || 20,
      valorDiaria: novoTrabalhador.valorDiaria || 150,
      tipo: novoTrabalhador.tipo || "autonomo",
      status: "ativo",
      telefone: novoTrabalhador.telefone
    };

    setTrabalhadores([...trabalhadores, trabalhador]);
    setNovoTrabalhador({});
    setDialogNovoTrabalhador(false);
    toast.success("Trabalhador cadastrado com sucesso!");
  };

  const handleRegistrarPonto = () => {
    if (!novoRegistro.trabalhadorId || !novoRegistro.horaEntrada) {
      toast.error("Selecione o trabalhador e a hora de entrada");
      return;
    }

    const registro: RegistroPonto = {
      id: Math.max(...registrosPonto.map(r => r.id), 0) + 1,
      trabalhadorId: novoRegistro.trabalhadorId!,
      data: novoRegistro.data || new Date().toISOString().split('T')[0],
      horaEntrada: novoRegistro.horaEntrada!,
      horaSaida: novoRegistro.horaSaida,
      horaAlmocoInicio: novoRegistro.horaAlmocoInicio,
      horaAlmocoFim: novoRegistro.horaAlmocoFim,
      horasExtras: novoRegistro.horasExtras || 0,
      obraId: 1
    };

    setRegistrosPonto([...registrosPonto, registro]);
    setNovoRegistro({ data: new Date().toISOString().split('T')[0] });
    setDialogRegistroPonto(false);
    toast.success("Ponto registrado com sucesso!");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-100 text-green-700">Ativo</Badge>;
      case "inativo":
        return <Badge className="bg-gray-100 text-gray-700">Inativo</Badge>;
      case "ferias":
        return <Badge className="bg-blue-100 text-blue-700">Férias</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "clt":
        return <Badge variant="outline" className="border-blue-500 text-blue-600">CLT</Badge>;
      case "autonomo":
        return <Badge variant="outline" className="border-amber-500 text-amber-600">Autônomo</Badge>;
      case "terceirizado":
        return <Badge variant="outline" className="border-purple-500 text-purple-600">Terceirizado</Badge>;
      default:
        return <Badge variant="outline">{tipo}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-7 w-7 text-amber-500" />
            Mão de Obra
          </h1>
          <p className="text-muted-foreground">Controle de trabalhadores e horas trabalhadas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Folha
          </Button>
          <Dialog open={dialogRegistroPonto} onOpenChange={setDialogRegistroPonto}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Clock className="h-4 w-4" />
                Registrar Ponto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Registrar Ponto</DialogTitle>
                <DialogDescription>Registre a entrada/saída de um trabalhador</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Trabalhador</Label>
                  <Select value={novoRegistro.trabalhadorId?.toString()} onValueChange={(v) => setNovoRegistro({...novoRegistro, trabalhadorId: parseInt(v)})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o trabalhador" />
                    </SelectTrigger>
                    <SelectContent>
                      {trabalhadores.filter(t => t.status === "ativo").map(trab => (
                        <SelectItem key={trab.id} value={trab.id.toString()}>{trab.nome} - {funcoes.find(f => f.id === trab.funcao)?.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input 
                    type="date"
                    value={novoRegistro.data}
                    onChange={(e) => setNovoRegistro({...novoRegistro, data: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Hora Entrada</Label>
                    <Input 
                      type="time"
                      value={novoRegistro.horaEntrada || ''}
                      onChange={(e) => setNovoRegistro({...novoRegistro, horaEntrada: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hora Saída</Label>
                    <Input 
                      type="time"
                      value={novoRegistro.horaSaida || ''}
                      onChange={(e) => setNovoRegistro({...novoRegistro, horaSaida: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Início Almoço</Label>
                    <Input 
                      type="time"
                      value={novoRegistro.horaAlmocoInicio || ''}
                      onChange={(e) => setNovoRegistro({...novoRegistro, horaAlmocoInicio: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fim Almoço</Label>
                    <Input 
                      type="time"
                      value={novoRegistro.horaAlmocoFim || ''}
                      onChange={(e) => setNovoRegistro({...novoRegistro, horaAlmocoFim: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Horas Extras</Label>
                  <Input 
                    type="number"
                    min="0"
                    step="0.5"
                    value={novoRegistro.horasExtras || 0}
                    onChange={(e) => setNovoRegistro({...novoRegistro, horasExtras: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogRegistroPonto(false)}>Cancelar</Button>
                <Button onClick={handleRegistrarPonto} className="bg-amber-500 hover:bg-amber-600 text-black">
                  Registrar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={dialogNovoTrabalhador} onOpenChange={setDialogNovoTrabalhador}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-black">
                <UserPlus className="h-4 w-4" />
                Novo Trabalhador
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Cadastrar Trabalhador</DialogTitle>
                <DialogDescription>Adicione um novo trabalhador à equipe</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input 
                    placeholder="Nome do trabalhador"
                    value={novoTrabalhador.nome || ''}
                    onChange={(e) => setNovoTrabalhador({...novoTrabalhador, nome: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Função</Label>
                  <Select value={novoTrabalhador.funcao} onValueChange={(v) => setNovoTrabalhador({...novoTrabalhador, funcao: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a função" />
                    </SelectTrigger>
                    <SelectContent>
                      {funcoes.map(func => (
                        <SelectItem key={func.id} value={func.id}>{func.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Contrato</Label>
                  <Select value={novoTrabalhador.tipo} onValueChange={(v) => setNovoTrabalhador({...novoTrabalhador, tipo: v as any})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clt">CLT</SelectItem>
                      <SelectItem value="autonomo">Autônomo</SelectItem>
                      <SelectItem value="terceirizado">Terceirizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Valor/Hora (R$)</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      value={novoTrabalhador.valorHora || ''}
                      onChange={(e) => setNovoTrabalhador({...novoTrabalhador, valorHora: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Diária (R$)</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      value={novoTrabalhador.valorDiaria || ''}
                      onChange={(e) => setNovoTrabalhador({...novoTrabalhador, valorDiaria: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input 
                    placeholder="(00) 00000-0000"
                    value={novoTrabalhador.telefone || ''}
                    onChange={(e) => setNovoTrabalhador({...novoTrabalhador, telefone: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogNovoTrabalhador(false)}>Cancelar</Button>
                <Button onClick={handleAdicionarTrabalhador} className="bg-amber-500 hover:bg-amber-600 text-black">
                  Cadastrar
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
                <p className="text-sm text-muted-foreground">Presentes Hoje</p>
                <p className="text-2xl font-bold text-gray-900">{trabalhadoresPresentes}/{trabalhadores.filter(t => t.status === "ativo").length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Horas no Mês</p>
                <p className="text-2xl font-bold text-gray-900">{totalHorasMes.toFixed(1)}h</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Média: {mediaHorasDia.toFixed(1)}h/dia</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Horas Extras</p>
                <p className="text-2xl font-bold text-gray-900">{totalHorasExtrasMes.toFixed(1)}h</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Timer className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Custo Total Mês</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCustoMes)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Conteúdo */}
      <Tabs defaultValue="equipe" className="space-y-4">
        <TabsList className="bg-amber-50">
          <TabsTrigger value="equipe" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            Equipe
          </TabsTrigger>
          <TabsTrigger value="ponto" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            Registro de Ponto
          </TabsTrigger>
          <TabsTrigger value="resumo" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            Resumo Mensal
          </TabsTrigger>
        </TabsList>

        {/* Tab: Equipe */}
        <TabsContent value="equipe">
          <Card>
            <CardHeader>
              <CardTitle>Equipe de Trabalho</CardTitle>
              <CardDescription>Lista de todos os trabalhadores cadastrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trabalhadores.map((trab) => {
                  const funcao = funcoes.find(f => f.id === trab.funcao);
                  const Icon = funcao?.icon || HardHat;
                  return (
                    <Card key={trab.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-amber-100 text-amber-700">
                              {trab.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold truncate">{trab.nome}</h3>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Icon className="h-4 w-4 text-amber-500" />
                              <span className="text-sm text-muted-foreground">{funcao?.nome}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              {getStatusBadge(trab.status)}
                              {getTipoBadge(trab.tipo)}
                            </div>
                            <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Hora:</span>
                                <span className="ml-1 font-medium">{formatCurrency(trab.valorHora)}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Diária:</span>
                                <span className="ml-1 font-medium">{formatCurrency(trab.valorDiaria)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Registro de Ponto */}
        <TabsContent value="ponto">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Ponto - Hoje</CardTitle>
              <CardDescription>{format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trabalhador</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead className="text-center">Entrada</TableHead>
                      <TableHead className="text-center">Almoço</TableHead>
                      <TableHead className="text-center">Saída</TableHead>
                      <TableHead className="text-center">Horas</TableHead>
                      <TableHead className="text-center">Extras</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trabalhadores.filter(t => t.status === "ativo").map((trab) => {
                      const registro = registrosHoje.find(r => r.trabalhadorId === trab.id);
                      const funcao = funcoes.find(f => f.id === trab.funcao);
                      const horasTrab = registro ? calcularHorasTrabalhadas(registro) : 0;
                      
                      return (
                        <TableRow key={trab.id}>
                          <TableCell className="font-medium">{trab.nome}</TableCell>
                          <TableCell>{funcao?.nome}</TableCell>
                          <TableCell className="text-center">
                            {registro?.horaEntrada || (
                              <Badge variant="outline" className="text-gray-400">--:--</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {registro?.horaAlmocoInicio && registro?.horaAlmocoFim 
                              ? `${registro.horaAlmocoInicio} - ${registro.horaAlmocoFim}`
                              : <Badge variant="outline" className="text-gray-400">--:--</Badge>
                            }
                          </TableCell>
                          <TableCell className="text-center">
                            {registro?.horaSaida || (
                              <Badge variant="outline" className="text-gray-400">--:--</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {horasTrab > 0 ? `${horasTrab.toFixed(1)}h` : '-'}
                          </TableCell>
                          <TableCell className="text-center">
                            {registro?.horasExtras ? (
                              <Badge className="bg-purple-100 text-purple-700">+{registro.horasExtras}h</Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell className="text-center">
                            {registro ? (
                              registro.horaSaida ? (
                                <Badge className="bg-green-100 text-green-700 gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  Completo
                                </Badge>
                              ) : (
                                <Badge className="bg-amber-100 text-amber-700 gap-1">
                                  <Clock className="h-3 w-3" />
                                  Trabalhando
                                </Badge>
                              )
                            ) : (
                              <Badge variant="outline" className="text-gray-400 gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Ausente
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Resumo Mensal */}
        <TabsContent value="resumo">
          <Card>
            <CardHeader>
              <CardTitle>Resumo Mensal por Trabalhador</CardTitle>
              <CardDescription>Janeiro de 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trabalhador</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead className="text-center">Dias</TableHead>
                      <TableHead className="text-center">Horas</TableHead>
                      <TableHead className="text-center">Extras</TableHead>
                      <TableHead className="text-right">Valor/Hora</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resumoTrabalhadores.map((resumo) => {
                      const funcao = funcoes.find(f => f.id === resumo.trabalhador.funcao);
                      return (
                        <TableRow key={resumo.trabalhador.id}>
                          <TableCell className="font-medium">{resumo.trabalhador.nome}</TableCell>
                          <TableCell>{funcao?.nome}</TableCell>
                          <TableCell className="text-center">{resumo.diasTrabalhados}</TableCell>
                          <TableCell className="text-center">{resumo.horasTrabalhadas.toFixed(1)}h</TableCell>
                          <TableCell className="text-center">
                            {resumo.horasExtras > 0 ? (
                              <Badge className="bg-purple-100 text-purple-700">+{resumo.horasExtras}h</Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell className="text-right">{formatCurrency(resumo.trabalhador.valorHora)}</TableCell>
                          <TableCell className="text-right font-semibold text-green-600">{formatCurrency(resumo.valorTotal)}</TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow className="bg-amber-50 font-bold">
                      <TableCell colSpan={2}>TOTAL</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">{totalHorasMes.toFixed(1)}h</TableCell>
                      <TableCell className="text-center">{totalHorasExtrasMes.toFixed(1)}h</TableCell>
                      <TableCell className="text-right">-</TableCell>
                      <TableCell className="text-right text-green-600">{formatCurrency(totalCustoMes)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
