import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MapPin, 
  Plus, 
  Building2,
  Navigation,
  Layers,
  Filter,
  Search,
  Phone,
  Mail,
  Calendar,
  Users,
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Maximize2,
  List,
  Map as MapIcon
} from "lucide-react";
import { toast } from "sonner";

// Tipos
interface Obra {
  id: number;
  nome: string;
  tipo: "residencial" | "comercial" | "industrial" | "reforma" | "infraestrutura";
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  latitude: number;
  longitude: number;
  status: "em_andamento" | "pausada" | "finalizada" | "planejada";
  percentualConcluido: number;
  valorContratado: number;
  dataInicio: string;
  previsaoTermino: string;
  responsavel: string;
  telefone: string;
  trabalhadores: number;
}

// Dados de exemplo com coordenadas de São Paulo
const obrasExemplo: Obra[] = [
  { 
    id: 1, 
    nome: "Residencial Jardins", 
    tipo: "residencial", 
    endereco: "Rua Oscar Freire, 123", 
    cidade: "São Paulo", 
    estado: "SP", 
    cep: "01426-001",
    latitude: -23.5629, 
    longitude: -46.6690,
    status: "em_andamento",
    percentualConcluido: 65,
    valorContratado: 850000,
    dataInicio: "2025-10-01",
    previsaoTermino: "2026-06-30",
    responsavel: "Eng. Fernando Silva",
    telefone: "(11) 99999-1111",
    trabalhadores: 12
  },
  { 
    id: 2, 
    nome: "Comercial Centro", 
    tipo: "comercial", 
    endereco: "Av. Paulista, 1000", 
    cidade: "São Paulo", 
    estado: "SP", 
    cep: "01310-100",
    latitude: -23.5632, 
    longitude: -46.6541,
    status: "em_andamento",
    percentualConcluido: 40,
    valorContratado: 1200000,
    dataInicio: "2025-11-15",
    previsaoTermino: "2026-09-15",
    responsavel: "Eng. Maria Santos",
    telefone: "(11) 99999-2222",
    trabalhadores: 18
  },
  { 
    id: 3, 
    nome: "Reforma Escritório ABC", 
    tipo: "reforma", 
    endereco: "Rua Augusta, 500", 
    cidade: "São Paulo", 
    estado: "SP", 
    cep: "01304-001",
    latitude: -23.5545, 
    longitude: -46.6589,
    status: "em_andamento",
    percentualConcluido: 85,
    valorContratado: 150000,
    dataInicio: "2025-12-01",
    previsaoTermino: "2026-02-28",
    responsavel: "Eng. Carlos Oliveira",
    telefone: "(11) 99999-3333",
    trabalhadores: 6
  },
  { 
    id: 4, 
    nome: "Galpão Industrial", 
    tipo: "industrial", 
    endereco: "Rod. Anhanguera, Km 30", 
    cidade: "Cajamar", 
    estado: "SP", 
    cep: "07750-000",
    latitude: -23.3558, 
    longitude: -46.8769,
    status: "em_andamento",
    percentualConcluido: 25,
    valorContratado: 500000,
    dataInicio: "2026-01-05",
    previsaoTermino: "2026-12-31",
    responsavel: "Eng. Pedro Lima",
    telefone: "(11) 99999-4444",
    trabalhadores: 15
  },
  { 
    id: 5, 
    nome: "Casa Praia", 
    tipo: "residencial", 
    endereco: "Av. Beira Mar, 200", 
    cidade: "Guarujá", 
    estado: "SP", 
    cep: "11410-000",
    latitude: -23.9930, 
    longitude: -46.2564,
    status: "pausada",
    percentualConcluido: 30,
    valorContratado: 350000,
    dataInicio: "2025-09-01",
    previsaoTermino: "2026-08-01",
    responsavel: "Eng. Ana Costa",
    telefone: "(11) 99999-5555",
    trabalhadores: 0
  },
];

// Componente de Mapa Interativo (usando OpenStreetMap via iframe ou placeholder)
function MapaInterativo({ obras, obraSelecionada, onSelectObra }: { 
  obras: Obra[]; 
  obraSelecionada: Obra | null;
  onSelectObra: (obra: Obra) => void;
}) {
  // Centro do mapa (média das coordenadas ou São Paulo)
  const centerLat = obras.length > 0 
    ? obras.reduce((acc, o) => acc + o.latitude, 0) / obras.length 
    : -23.5505;
  const centerLng = obras.length > 0 
    ? obras.reduce((acc, o) => acc + o.longitude, 0) / obras.length 
    : -46.6333;

  // Gerar URL do OpenStreetMap com marcadores
  const markers = obras.map(o => `${o.latitude},${o.longitude}`).join('|');
  
  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Mapa estático como fallback - em produção usaria Leaflet ou Google Maps */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
        {/* Grid de referência */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Marcadores das obras */}
        {obras.map((obra, index) => {
          // Posição relativa no mapa (simplificado)
          const x = 20 + (index % 3) * 30;
          const y = 20 + Math.floor(index / 3) * 35;
          const isSelected = obraSelecionada?.id === obra.id;
          
          return (
            <div
              key={obra.id}
              className={`absolute cursor-pointer transition-all duration-200 ${isSelected ? 'z-20 scale-125' : 'z-10 hover:scale-110'}`}
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -100%)' }}
              onClick={() => onSelectObra(obra)}
            >
              <div className={`relative ${isSelected ? 'animate-bounce' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                  obra.status === 'em_andamento' ? 'bg-green-500' :
                  obra.status === 'pausada' ? 'bg-amber-500' :
                  obra.status === 'finalizada' ? 'bg-blue-500' : 'bg-gray-500'
                }`}>
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent ${
                  obra.status === 'em_andamento' ? 'border-t-green-500' :
                  obra.status === 'pausada' ? 'border-t-amber-500' :
                  obra.status === 'finalizada' ? 'border-t-blue-500' : 'border-t-gray-500'
                }`} />
                
                {/* Tooltip */}
                {isSelected && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg shadow-xl p-3 min-w-[200px]">
                    <h4 className="font-semibold text-sm">{obra.nome}</h4>
                    <p className="text-xs text-muted-foreground">{obra.endereco}</p>
                    <div className="mt-2">
                      <Progress value={obra.percentualConcluido} className="h-1.5" />
                      <p className="text-xs text-right mt-1">{obra.percentualConcluido}%</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Legenda */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
          <p className="text-xs font-semibold mb-2">Legenda</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Em andamento</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span>Pausada</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Finalizada</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span>Planejada</span>
            </div>
          </div>
        </div>
        
        {/* Controles */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button size="icon" variant="secondary" className="bg-white shadow">
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-white shadow">
            <span className="text-lg font-bold">−</span>
          </Button>
          <Button size="icon" variant="secondary" className="bg-white shadow">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Texto informativo */}
        <div className="absolute top-4 left-4 bg-white/90 rounded-lg px-3 py-2 shadow">
          <p className="text-xs text-muted-foreground">
            Clique em um marcador para ver detalhes
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MapaObrasPage() {
  const [obras] = useState<Obra[]>(obrasExemplo);
  const [obraSelecionada, setObraSelecionada] = useState<Obra | null>(null);
  const [visualizacao, setVisualizacao] = useState<"mapa" | "lista">("mapa");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [busca, setBusca] = useState("");

  // Filtrar obras
  const obrasFiltradas = obras.filter(obra => {
    const matchStatus = filtroStatus === "todos" || obra.status === filtroStatus;
    const matchTipo = filtroTipo === "todos" || obra.tipo === filtroTipo;
    const matchBusca = obra.nome.toLowerCase().includes(busca.toLowerCase()) ||
                       obra.endereco.toLowerCase().includes(busca.toLowerCase()) ||
                       obra.cidade.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchTipo && matchBusca;
  });

  // Estatísticas
  const totalObras = obras.length;
  const obrasEmAndamento = obras.filter(o => o.status === "em_andamento").length;
  const obrasPausadas = obras.filter(o => o.status === "pausada").length;
  const totalTrabalhadores = obras.reduce((acc, o) => acc + o.trabalhadores, 0);

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
      case "planejada":
        return <Badge variant="outline" className="text-gray-500 gap-1"><Calendar className="h-3 w-3" />Planejada</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTipoBadge = (tipo: string) => {
    const tipos: Record<string, { label: string; color: string }> = {
      residencial: { label: "Residencial", color: "bg-blue-100 text-blue-700" },
      comercial: { label: "Comercial", color: "bg-purple-100 text-purple-700" },
      industrial: { label: "Industrial", color: "bg-gray-100 text-gray-700" },
      reforma: { label: "Reforma", color: "bg-amber-100 text-amber-700" },
      infraestrutura: { label: "Infraestrutura", color: "bg-green-100 text-green-700" },
    };
    const t = tipos[tipo] || { label: tipo, color: "bg-gray-100 text-gray-700" };
    return <Badge className={t.color}>{t.label}</Badge>;
  };

  const abrirNoGoogleMaps = (obra: Obra) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${obra.latitude},${obra.longitude}`;
    window.open(url, '_blank');
  };

  const abrirRotaGoogleMaps = (obra: Obra) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${obra.latitude},${obra.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="h-7 w-7 text-amber-500" />
            Mapa de Obras
          </h1>
          <p className="text-muted-foreground">Localização e status de todas as obras</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <Button 
              variant={visualizacao === "mapa" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setVisualizacao("mapa")}
              className={visualizacao === "mapa" ? "bg-amber-500 hover:bg-amber-600 text-black" : ""}
            >
              <MapIcon className="h-4 w-4 mr-1" />
              Mapa
            </Button>
            <Button 
              variant={visualizacao === "lista" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setVisualizacao("lista")}
              className={visualizacao === "lista" ? "bg-amber-500 hover:bg-amber-600 text-black" : ""}
            >
              <List className="h-4 w-4 mr-1" />
              Lista
            </Button>
          </div>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total de Obras</p>
                <p className="text-2xl font-bold">{totalObras}</p>
              </div>
              <Building2 className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Em Andamento</p>
                <p className="text-2xl font-bold">{obrasEmAndamento}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Pausadas</p>
                <p className="text-2xl font-bold">{obrasPausadas}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Trabalhadores</p>
                <p className="text-2xl font-bold">{totalTrabalhadores}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtros:</span>
            </div>
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar obra..."
                className="pl-9"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="em_andamento">Em andamento</SelectItem>
                <SelectItem value="pausada">Pausada</SelectItem>
                <SelectItem value="finalizada">Finalizada</SelectItem>
                <SelectItem value="planejada">Planejada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                <SelectItem value="residencial">Residencial</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="reforma">Reforma</SelectItem>
                <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa ou Lista */}
        <div className="lg:col-span-2">
          {visualizacao === "mapa" ? (
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <MapaInterativo 
                  obras={obrasFiltradas}
                  obraSelecionada={obraSelecionada}
                  onSelectObra={setObraSelecionada}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Lista de Obras</CardTitle>
                <CardDescription>{obrasFiltradas.length} obra(s) encontrada(s)</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {obrasFiltradas.map((obra) => (
                      <div 
                        key={obra.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          obraSelecionada?.id === obra.id 
                            ? 'border-amber-500 bg-amber-50' 
                            : 'hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setObraSelecionada(obra)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{obra.nome}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {obra.endereco}, {obra.cidade}/{obra.estado}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {getStatusBadge(obra.status)}
                            {getTipoBadge(obra.tipo)}
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progresso</span>
                            <span className="font-medium">{obra.percentualConcluido}%</span>
                          </div>
                          <Progress value={obra.percentualConcluido} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t text-sm">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              {obra.trabalhadores}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <DollarSign className="h-4 w-4" />
                              {formatCurrency(obra.valorContratado)}
                            </span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              abrirNoGoogleMaps(obra);
                            }}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Ver no mapa
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Detalhes da Obra Selecionada */}
        <div>
          {obraSelecionada ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{obraSelecionada.nome}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {obraSelecionada.endereco}
                    </CardDescription>
                  </div>
                  {getStatusBadge(obraSelecionada.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progresso */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Progresso da Obra</span>
                    <span className="font-bold text-amber-600">{obraSelecionada.percentualConcluido}%</span>
                  </div>
                  <Progress value={obraSelecionada.percentualConcluido} className="h-3" />
                </div>

                {/* Informações */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Tipo</span>
                    {getTipoBadge(obraSelecionada.tipo)}
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Valor Contratado</span>
                    <span className="font-semibold">{formatCurrency(obraSelecionada.valorContratado)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Data de Início</span>
                    <span>{new Date(obraSelecionada.dataInicio).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Previsão de Término</span>
                    <span>{new Date(obraSelecionada.previsaoTermino).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Trabalhadores</span>
                    <Badge variant="outline">{obraSelecionada.trabalhadores}</Badge>
                  </div>
                </div>

                {/* Responsável */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Responsável</p>
                  <p className="font-semibold">{obraSelecionada.responsavel}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {obraSelecionada.telefone}
                  </div>
                </div>

                {/* Endereço Completo */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Endereço</p>
                  <p className="text-sm">{obraSelecionada.endereco}</p>
                  <p className="text-sm">{obraSelecionada.cidade} - {obraSelecionada.estado}</p>
                  <p className="text-sm text-muted-foreground">CEP: {obraSelecionada.cep}</p>
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black"
                    onClick={() => abrirNoGoogleMaps(obraSelecionada)}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Ver no Mapa
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => abrirRotaGoogleMaps(obraSelecionada)}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Traçar Rota
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Selecione uma obra</h3>
                <p className="text-muted-foreground">
                  Clique em um marcador no mapa ou em uma obra na lista para ver os detalhes
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
