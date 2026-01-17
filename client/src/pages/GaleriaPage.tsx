import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { 
  Camera, 
  Plus, 
  Calendar,
  Image as ImageIcon,
  Upload,
  Download,
  Trash2,
  Eye,
  Grid3X3,
  LayoutList,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Clock,
  MapPin,
  Tag,
  Filter,
  ArrowRight,
  Building2,
  CheckCircle,
  Play
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Tipos
interface Foto {
  id: number;
  url: string;
  thumbnail: string;
  titulo: string;
  descricao?: string;
  data: string;
  etapa: string;
  tipo: "antes" | "durante" | "depois";
  tags: string[];
  obraId: number;
  localizacao?: string;
}

interface Etapa {
  id: number;
  nome: string;
  dataInicio: string;
  dataFim?: string;
  status: "pendente" | "em_andamento" | "concluida";
  fotos: number[];
}

// Dados de exemplo - usando placeholders
const fotosExemplo: Foto[] = [
  { id: 1, url: "https://placehold.co/800x600/F59E0B/white?text=Terreno+Inicial", thumbnail: "https://placehold.co/300x200/F59E0B/white?text=Terreno", titulo: "Terreno antes da obra", descricao: "Vista geral do terreno antes do início da construção", data: "2025-10-15", etapa: "Serviços Preliminares", tipo: "antes", tags: ["terreno", "início"], obraId: 1, localizacao: "Entrada principal" },
  { id: 2, url: "https://placehold.co/800x600/3B82F6/white?text=Limpeza+Terreno", thumbnail: "https://placehold.co/300x200/3B82F6/white?text=Limpeza", titulo: "Limpeza do terreno", descricao: "Terreno após limpeza e preparação", data: "2025-10-20", etapa: "Serviços Preliminares", tipo: "durante", tags: ["limpeza", "preparação"], obraId: 1 },
  { id: 3, url: "https://placehold.co/800x600/10B981/white?text=Fundacao+Inicio", thumbnail: "https://placehold.co/300x200/10B981/white?text=Fundação", titulo: "Início das fundações", descricao: "Escavação para fundações", data: "2025-11-01", etapa: "Fundações", tipo: "durante", tags: ["fundação", "escavação"], obraId: 1 },
  { id: 4, url: "https://placehold.co/800x600/8B5CF6/white?text=Fundacao+Concreta", thumbnail: "https://placehold.co/300x200/8B5CF6/white?text=Concreto", titulo: "Concretagem das fundações", descricao: "Fundações concretadas", data: "2025-11-15", etapa: "Fundações", tipo: "durante", tags: ["fundação", "concreto"], obraId: 1 },
  { id: 5, url: "https://placehold.co/800x600/EF4444/white?text=Estrutura+Pilares", thumbnail: "https://placehold.co/300x200/EF4444/white?text=Pilares", titulo: "Pilares do térreo", descricao: "Estrutura de pilares do pavimento térreo", data: "2025-12-01", etapa: "Estrutura", tipo: "durante", tags: ["estrutura", "pilares"], obraId: 1 },
  { id: 6, url: "https://placehold.co/800x600/F59E0B/white?text=Estrutura+Vigas", thumbnail: "https://placehold.co/300x200/F59E0B/white?text=Vigas", titulo: "Vigas e laje", descricao: "Estrutura de vigas e preparação para laje", data: "2025-12-15", etapa: "Estrutura", tipo: "durante", tags: ["estrutura", "vigas", "laje"], obraId: 1 },
  { id: 7, url: "https://placehold.co/800x600/3B82F6/white?text=Alvenaria+Inicio", thumbnail: "https://placehold.co/300x200/3B82F6/white?text=Alvenaria", titulo: "Início da alvenaria", descricao: "Primeiras paredes de alvenaria", data: "2026-01-05", etapa: "Alvenaria", tipo: "durante", tags: ["alvenaria", "paredes"], obraId: 1 },
  { id: 8, url: "https://placehold.co/800x600/10B981/white?text=Alvenaria+Progresso", thumbnail: "https://placehold.co/300x200/10B981/white?text=Progresso", titulo: "Progresso da alvenaria", descricao: "Alvenaria em andamento - 60% concluída", data: "2026-01-15", etapa: "Alvenaria", tipo: "durante", tags: ["alvenaria", "progresso"], obraId: 1 },
];

const etapasExemplo: Etapa[] = [
  { id: 1, nome: "Serviços Preliminares", dataInicio: "2025-10-15", dataFim: "2025-10-25", status: "concluida", fotos: [1, 2] },
  { id: 2, nome: "Fundações", dataInicio: "2025-11-01", dataFim: "2025-11-20", status: "concluida", fotos: [3, 4] },
  { id: 3, nome: "Estrutura", dataInicio: "2025-12-01", dataFim: "2026-01-10", status: "concluida", fotos: [5, 6] },
  { id: 4, nome: "Alvenaria", dataInicio: "2026-01-05", status: "em_andamento", fotos: [7, 8] },
  { id: 5, nome: "Instalações Elétricas", dataInicio: "2026-01-20", status: "pendente", fotos: [] },
  { id: 6, nome: "Instalações Hidráulicas", dataInicio: "2026-02-01", status: "pendente", fotos: [] },
  { id: 7, nome: "Revestimentos", dataInicio: "2026-03-01", status: "pendente", fotos: [] },
  { id: 8, nome: "Pintura e Acabamentos", dataInicio: "2026-04-01", status: "pendente", fotos: [] },
];

export default function GaleriaPage() {
  const [fotos, setFotos] = useState<Foto[]>(fotosExemplo);
  const [etapas] = useState<Etapa[]>(etapasExemplo);
  const [visualizacao, setVisualizacao] = useState<"grid" | "lista">("grid");
  const [filtroEtapa, setFiltroEtapa] = useState<string>("todas");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [fotoSelecionada, setFotoSelecionada] = useState<Foto | null>(null);
  const [dialogUpload, setDialogUpload] = useState(false);
  const [novaFoto, setNovaFoto] = useState<Partial<Foto>>({});
  const [comparacaoAtiva, setComparacaoAtiva] = useState(false);
  const [fotosComparacao, setFotosComparacao] = useState<{ antes?: Foto; depois?: Foto }>({});

  // Filtrar fotos
  const fotosFiltradas = fotos.filter(foto => {
    const matchEtapa = filtroEtapa === "todas" || foto.etapa === filtroEtapa;
    const matchTipo = filtroTipo === "todos" || foto.tipo === filtroTipo;
    return matchEtapa && matchTipo;
  });

  // Agrupar fotos por data para timeline
  const fotosPorData = fotosFiltradas.reduce((acc, foto) => {
    const data = foto.data;
    if (!acc[data]) acc[data] = [];
    acc[data].push(foto);
    return acc;
  }, {} as Record<string, Foto[]>);

  const datasOrdenadas = Object.keys(fotosPorData).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const handleUpload = () => {
    if (!novaFoto.titulo || !novaFoto.etapa) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    const foto: Foto = {
      id: Math.max(...fotos.map(f => f.id), 0) + 1,
      url: "https://placehold.co/800x600/F59E0B/white?text=Nova+Foto",
      thumbnail: "https://placehold.co/300x200/F59E0B/white?text=Nova",
      titulo: novaFoto.titulo!,
      descricao: novaFoto.descricao,
      data: novaFoto.data || new Date().toISOString().split('T')[0],
      etapa: novaFoto.etapa!,
      tipo: novaFoto.tipo || "durante",
      tags: novaFoto.tags || [],
      obraId: 1,
      localizacao: novaFoto.localizacao
    };

    setFotos([foto, ...fotos]);
    setNovaFoto({});
    setDialogUpload(false);
    toast.success("Foto adicionada com sucesso!");
  };

  const navegarFoto = (direcao: "anterior" | "proxima") => {
    if (!fotoSelecionada) return;
    const index = fotosFiltradas.findIndex(f => f.id === fotoSelecionada.id);
    if (direcao === "anterior" && index > 0) {
      setFotoSelecionada(fotosFiltradas[index - 1]);
    } else if (direcao === "proxima" && index < fotosFiltradas.length - 1) {
      setFotoSelecionada(fotosFiltradas[index + 1]);
    }
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "antes":
        return <Badge className="bg-red-100 text-red-700">Antes</Badge>;
      case "durante":
        return <Badge className="bg-amber-100 text-amber-700">Durante</Badge>;
      case "depois":
        return <Badge className="bg-green-100 text-green-700">Depois</Badge>;
      default:
        return <Badge>{tipo}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluida":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Concluída</Badge>;
      case "em_andamento":
        return <Badge className="bg-amber-100 text-amber-700"><Play className="h-3 w-3 mr-1" />Em Andamento</Badge>;
      case "pendente":
        return <Badge variant="outline" className="text-gray-500"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Camera className="h-7 w-7 text-amber-500" />
            Galeria de Fotos
          </h1>
          <p className="text-muted-foreground">Registro fotográfico e timeline da obra</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={comparacaoAtiva ? "default" : "outline"} 
            className={comparacaoAtiva ? "bg-amber-500 hover:bg-amber-600 text-black" : ""}
            onClick={() => {
              setComparacaoAtiva(!comparacaoAtiva);
              setFotosComparacao({});
            }}
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Comparar Antes/Depois
          </Button>
          <Dialog open={dialogUpload} onOpenChange={setDialogUpload}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-black">
                <Upload className="h-4 w-4" />
                Adicionar Foto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Foto</DialogTitle>
                <DialogDescription>Faça upload de uma nova foto da obra</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-amber-500 transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Clique ou arraste para fazer upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG até 10MB</p>
                </div>

                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input 
                    placeholder="Título da foto"
                    value={novaFoto.titulo || ''}
                    onChange={(e) => setNovaFoto({...novaFoto, titulo: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea 
                    placeholder="Descrição opcional"
                    value={novaFoto.descricao || ''}
                    onChange={(e) => setNovaFoto({...novaFoto, descricao: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Etapa</Label>
                    <Select value={novaFoto.etapa} onValueChange={(v) => setNovaFoto({...novaFoto, etapa: v})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {etapas.map(etapa => (
                          <SelectItem key={etapa.id} value={etapa.nome}>{etapa.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select value={novaFoto.tipo} onValueChange={(v) => setNovaFoto({...novaFoto, tipo: v as any})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="antes">Antes</SelectItem>
                        <SelectItem value="durante">Durante</SelectItem>
                        <SelectItem value="depois">Depois</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input 
                    type="date"
                    value={novaFoto.data || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setNovaFoto({...novaFoto, data: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Localização (opcional)</Label>
                  <Input 
                    placeholder="Ex: Fachada frontal"
                    value={novaFoto.localizacao || ''}
                    onChange={(e) => setNovaFoto({...novaFoto, localizacao: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogUpload(false)}>Cancelar</Button>
                <Button onClick={handleUpload} className="bg-amber-500 hover:bg-amber-600 text-black">
                  Adicionar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="galeria" className="space-y-4">
        <TabsList className="bg-amber-50">
          <TabsTrigger value="galeria" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            <Grid3X3 className="h-4 w-4 mr-2" />
            Galeria
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            <Clock className="h-4 w-4 mr-2" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="etapas" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            <Building2 className="h-4 w-4 mr-2" />
            Por Etapa
          </TabsTrigger>
        </TabsList>

        {/* Tab: Galeria */}
        <TabsContent value="galeria">
          {/* Filtros */}
          <Card className="mb-4">
            <CardContent className="py-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filtros:</span>
                </div>
                <Select value={filtroEtapa} onValueChange={setFiltroEtapa}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Etapa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as etapas</SelectItem>
                    {etapas.map(etapa => (
                      <SelectItem key={etapa.id} value={etapa.nome}>{etapa.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="antes">Antes</SelectItem>
                    <SelectItem value="durante">Durante</SelectItem>
                    <SelectItem value="depois">Depois</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1 ml-auto">
                  <Button 
                    variant={visualizacao === "grid" ? "default" : "ghost"} 
                    size="icon"
                    onClick={() => setVisualizacao("grid")}
                    className={visualizacao === "grid" ? "bg-amber-500 hover:bg-amber-600" : ""}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={visualizacao === "lista" ? "default" : "ghost"} 
                    size="icon"
                    onClick={() => setVisualizacao("lista")}
                    className={visualizacao === "lista" ? "bg-amber-500 hover:bg-amber-600" : ""}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Modo Comparação */}
          {comparacaoAtiva && (
            <Card className="mb-4 border-amber-200 bg-amber-50/50">
              <CardContent className="py-4">
                <p className="text-sm text-amber-700 mb-4">
                  Selecione duas fotos para comparar (uma "Antes" e uma "Depois")
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-amber-300 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                    {fotosComparacao.antes ? (
                      <div className="relative w-full">
                        <img src={fotosComparacao.antes.thumbnail} alt="Antes" className="w-full h-48 object-cover rounded" />
                        <Badge className="absolute top-2 left-2 bg-red-500">Antes</Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2 bg-white/80"
                          onClick={() => setFotosComparacao({...fotosComparacao, antes: undefined})}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p className="text-amber-600">Selecione foto "Antes"</p>
                    )}
                  </div>
                  <div className="border-2 border-dashed border-amber-300 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                    {fotosComparacao.depois ? (
                      <div className="relative w-full">
                        <img src={fotosComparacao.depois.thumbnail} alt="Depois" className="w-full h-48 object-cover rounded" />
                        <Badge className="absolute top-2 left-2 bg-green-500">Depois</Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2 bg-white/80"
                          onClick={() => setFotosComparacao({...fotosComparacao, depois: undefined})}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p className="text-amber-600">Selecione foto "Depois"</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Grid de Fotos */}
          {visualizacao === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {fotosFiltradas.map((foto) => (
                <Card 
                  key={foto.id} 
                  className={`overflow-hidden cursor-pointer hover:shadow-lg transition-all ${
                    comparacaoAtiva ? 'hover:ring-2 hover:ring-amber-500' : ''
                  }`}
                  onClick={() => {
                    if (comparacaoAtiva) {
                      if (foto.tipo === "antes" && !fotosComparacao.antes) {
                        setFotosComparacao({...fotosComparacao, antes: foto});
                      } else if ((foto.tipo === "depois" || foto.tipo === "durante") && !fotosComparacao.depois) {
                        setFotosComparacao({...fotosComparacao, depois: foto});
                      }
                    } else {
                      setFotoSelecionada(foto);
                    }
                  }}
                >
                  <div className="relative aspect-video">
                    <img src={foto.thumbnail} alt={foto.titulo} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2">
                      {getTipoBadge(foto.tipo)}
                    </div>
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                      <ZoomIn className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm truncate">{foto.titulo}</h3>
                    <p className="text-xs text-muted-foreground">{foto.etapa}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(foto.data).toLocaleDateString('pt-BR')}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {fotosFiltradas.map((foto) => (
                    <div 
                      key={foto.id} 
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setFotoSelecionada(foto)}
                    >
                      <img src={foto.thumbnail} alt={foto.titulo} className="w-24 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{foto.titulo}</h3>
                          {getTipoBadge(foto.tipo)}
                        </div>
                        <p className="text-sm text-muted-foreground">{foto.etapa}</p>
                        {foto.descricao && (
                          <p className="text-sm text-muted-foreground truncate">{foto.descricao}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{new Date(foto.data).toLocaleDateString('pt-BR')}</p>
                        {foto.localizacao && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                            <MapPin className="h-3 w-3" />
                            {foto.localizacao}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab: Timeline */}
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Timeline da Obra</CardTitle>
              <CardDescription>Evolução fotográfica ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Linha vertical */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-amber-200" />
                
                <div className="space-y-8">
                  {datasOrdenadas.map((data) => (
                    <div key={data} className="relative pl-16">
                      {/* Marcador */}
                      <div className="absolute left-4 w-5 h-5 rounded-full bg-amber-500 border-4 border-white shadow" />
                      
                      {/* Data */}
                      <div className="mb-3">
                        <h3 className="font-semibold text-lg">
                          {format(new Date(data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {fotosPorData[data].length} foto(s)
                        </p>
                      </div>
                      
                      {/* Fotos do dia */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {fotosPorData[data].map((foto) => (
                          <div 
                            key={foto.id}
                            className="relative cursor-pointer group"
                            onClick={() => setFotoSelecionada(foto)}
                          >
                            <img 
                              src={foto.thumbnail} 
                              alt={foto.titulo} 
                              className="w-full h-32 object-cover rounded-lg group-hover:opacity-90 transition-opacity" 
                            />
                            <div className="absolute top-2 left-2">
                              {getTipoBadge(foto.tipo)}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 rounded-b-lg">
                              <p className="text-white text-xs truncate">{foto.titulo}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Por Etapa */}
        <TabsContent value="etapas">
          <div className="space-y-6">
            {etapas.map((etapa) => {
              const fotosEtapa = fotos.filter(f => f.etapa === etapa.nome);
              
              return (
                <Card key={etapa.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {etapa.nome}
                          {getStatusBadge(etapa.status)}
                        </CardTitle>
                        <CardDescription>
                          {format(new Date(etapa.dataInicio), "dd/MM/yyyy")}
                          {etapa.dataFim && ` - ${format(new Date(etapa.dataFim), "dd/MM/yyyy")}`}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{fotosEtapa.length} fotos</Badge>
                    </div>
                  </CardHeader>
                  {fotosEtapa.length > 0 && (
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {fotosEtapa.map((foto) => (
                          <div 
                            key={foto.id}
                            className="relative cursor-pointer group"
                            onClick={() => setFotoSelecionada(foto)}
                          >
                            <img 
                              src={foto.thumbnail} 
                              alt={foto.titulo} 
                              className="w-full h-24 object-cover rounded group-hover:opacity-90 transition-opacity" 
                            />
                            <div className="absolute top-1 left-1">
                              {getTipoBadge(foto.tipo)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Visualização */}
      {fotoSelecionada && (
        <Dialog open={!!fotoSelecionada} onOpenChange={() => setFotoSelecionada(null)}>
          <DialogContent className="max-w-4xl">
            <div className="relative">
              <img 
                src={fotoSelecionada.url} 
                alt={fotoSelecionada.titulo} 
                className="w-full max-h-[60vh] object-contain rounded-lg" 
              />
              
              {/* Navegação */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={() => navegarFoto("anterior")}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={() => navegarFoto("proxima")}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{fotoSelecionada.titulo}</h2>
                {getTipoBadge(fotoSelecionada.tipo)}
              </div>
              
              {fotoSelecionada.descricao && (
                <p className="text-muted-foreground mb-3">{fotoSelecionada.descricao}</p>
              )}
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(fotoSelecionada.data).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  {fotoSelecionada.etapa}
                </div>
                {fotoSelecionada.localizacao && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {fotoSelecionada.localizacao}
                  </div>
                )}
              </div>
              
              {fotoSelecionada.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {fotoSelecionada.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline">{tag}</Badge>
                  ))}
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" className="gap-2 text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
