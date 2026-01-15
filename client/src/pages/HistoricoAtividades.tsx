import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  History,
  Search,
  Filter,
  Calendar,
  User,
  ClipboardCheck,
  Wrench,
  AlertTriangle,
  ClipboardList,
  ListChecks,
  ArrowLeftRight,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  FileText,
  Eye,
  Edit,
  MessageSquare,
  Image,
  UserPlus,
  AlertCircle,
  Clock,
  Play,
  Pause,
  CheckCircle,
  RotateCcw,
  XCircle,
  Archive,
  Send,
  Share2,
  BarChart3,
  Download,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface HistoricoAtividadesPageProps {
  condominioId: number;
}

// Mapeamento de tipos para ícones e cores
const tipoConfig: Record<string, { icon: any; cor: string; label: string }> = {
  vistoria: { icon: ClipboardCheck, cor: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300", label: "Vistoria" },
  manutencao: { icon: Wrench, cor: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300", label: "Manutenção" },
  ocorrencia: { icon: AlertTriangle, cor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300", label: "Ocorrência" },
  ordem_servico: { icon: ClipboardList, cor: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300", label: "Ordem de Serviço" },
  checklist: { icon: ListChecks, cor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300", label: "Checklist" },
  antes_depois: { icon: ArrowLeftRight, cor: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300", label: "Antes/Depois" },
};

// Mapeamento de ações para ícones e labels
const acaoConfig: Record<string, { icon: any; label: string; cor: string }> = {
  criado: { icon: FileText, label: "Criado", cor: "text-green-600" },
  editado: { icon: Edit, label: "Editado", cor: "text-blue-600" },
  status_alterado: { icon: RefreshCw, label: "Status Alterado", cor: "text-purple-600" },
  comentario_adicionado: { icon: MessageSquare, label: "Comentário Adicionado", cor: "text-cyan-600" },
  imagem_adicionada: { icon: Image, label: "Imagem Adicionada", cor: "text-pink-600" },
  imagem_removida: { icon: Image, label: "Imagem Removida", cor: "text-red-600" },
  atribuido: { icon: UserPlus, label: "Atribuído", cor: "text-indigo-600" },
  prioridade_alterada: { icon: AlertCircle, label: "Prioridade Alterada", cor: "text-orange-600" },
  agendado: { icon: Calendar, label: "Agendado", cor: "text-teal-600" },
  iniciado: { icon: Play, label: "Iniciado", cor: "text-green-600" },
  pausado: { icon: Pause, label: "Pausado", cor: "text-yellow-600" },
  retomado: { icon: Play, label: "Retomado", cor: "text-green-600" },
  concluido: { icon: CheckCircle, label: "Concluído", cor: "text-green-700" },
  reaberto: { icon: RotateCcw, label: "Reaberto", cor: "text-orange-600" },
  cancelado: { icon: XCircle, label: "Cancelado", cor: "text-red-600" },
  arquivado: { icon: Archive, label: "Arquivado", cor: "text-gray-600" },
  enviado: { icon: Send, label: "Enviado", cor: "text-blue-600" },
  compartilhado: { icon: Share2, label: "Compartilhado", cor: "text-purple-600" },
};

export default function HistoricoAtividadesPage({ condominioId }: HistoricoAtividadesPageProps) {
  // Estados dos filtros
  const [tipo, setTipo] = useState<string>("todos");
  const [acao, setAcao] = useState<string>("");
  const [protocolo, setProtocolo] = useState("");
  const [funcionarioId, setFuncionarioId] = useState<number | undefined>();
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [busca, setBusca] = useState("");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Query para listar histórico
  const { data: historico, isLoading, refetch } = trpc.historicoAtividades.listar.useQuery({
    condominioId,
    tipo: tipo as any,
    acao: acao || undefined,
    protocolo: protocolo || undefined,
    funcionarioId,
    dataInicio: dataInicio || undefined,
    dataFim: dataFim || undefined,
    busca: busca || undefined,
    page,
    limit: 50,
  });

  // Query para estatísticas
  const { data: estatisticas } = trpc.historicoAtividades.estatisticas.useQuery({
    condominioId,
    dataInicio: dataInicio || undefined,
    dataFim: dataFim || undefined,
  });

  // Query para funcionários ativos
  const { data: funcionarios } = trpc.historicoAtividades.funcionariosAtivos.useQuery({
    condominioId,
  });

  // Limpar filtros
  const limparFiltros = () => {
    setTipo("todos");
    setAcao("");
    setProtocolo("");
    setFuncionarioId(undefined);
    setDataInicio("");
    setDataFim("");
    setBusca("");
    setPage(1);
  };

  // Renderizar item do histórico
  const renderHistoricoItem = (item: any) => {
    const tipoInfo = tipoConfig[item.entidadeTipo] || { icon: FileText, cor: "bg-gray-100 text-gray-700", label: item.entidadeTipo };
    const acaoInfo = acaoConfig[item.acao] || { icon: FileText, label: item.acao, cor: "text-gray-600" };
    const TipoIcon = tipoInfo.icon;
    const AcaoIcon = acaoInfo.icon;

    return (
      <div
        key={item.id}
        className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow"
      >
        {/* Ícone do tipo */}
        <div className={`p-2 rounded-lg ${tipoInfo.cor}`}>
          <TipoIcon className="w-4 h-4" />
        </div>

        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              {item.entidadeProtocolo || `#${item.entidadeId}`}
            </Badge>
            <span className="text-sm font-medium truncate">
              {item.entidadeTitulo || tipoInfo.label}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <AcaoIcon className={`w-3 h-3 ${acaoInfo.cor}`} />
            <span className="text-xs text-muted-foreground">
              {acaoInfo.label}
            </span>
            {item.descricao && (
              <span className="text-xs text-muted-foreground truncate">
                - {item.descricao}
              </span>
            )}
          </div>

          {/* Alteração de valor */}
          {(item.valorAnterior || item.valorNovo) && (
            <div className="flex items-center gap-2 mt-1 text-xs">
              {item.valorAnterior && (
                <span className="text-red-500 line-through">{item.valorAnterior}</span>
              )}
              {item.valorAnterior && item.valorNovo && <span>→</span>}
              {item.valorNovo && (
                <span className="text-green-600">{item.valorNovo}</span>
              )}
            </div>
          )}

          {/* Rodapé */}
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{item.usuarioNome || "Sistema"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>
                {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Histórico de Atividades
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe todas as atividades operacionais e ordens de serviço
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-1" />
            Filtros
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      {estatisticas && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          <Card className="p-2">
            <div className="text-center">
              <BarChart3 className="w-4 h-4 mx-auto mb-1 text-primary" />
              <div className="text-lg font-bold">{estatisticas.total}</div>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </Card>
          {estatisticas.porTipo.map((item: any) => {
            const config = tipoConfig[item.tipo];
            const Icon = config?.icon || FileText;
            return (
              <Card key={item.tipo} className="p-2">
                <div className="text-center">
                  <Icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-lg font-bold">{item.total}</div>
                  <p className="text-xs text-muted-foreground truncate">
                    {config?.label || item.tipo}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Filtros */}
      {showFilters && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros de Busca
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Busca geral */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por protocolo, título, descrição..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-8 h-9 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {/* Tipo */}
              <div>
                <Label className="text-xs">Tipo</Label>
                <Select value={tipo} onValueChange={setTipo}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="vistoria">Vistoria</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                    <SelectItem value="ocorrencia">Ocorrência</SelectItem>
                    <SelectItem value="ordem_servico">Ordem de Serviço</SelectItem>
                    <SelectItem value="checklist">Checklist</SelectItem>
                    <SelectItem value="antes_depois">Antes/Depois</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ação */}
              <div>
                <Label className="text-xs">Ação</Label>
                <Select value={acao} onValueChange={setAcao}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    <SelectItem value="criado">Criado</SelectItem>
                    <SelectItem value="editado">Editado</SelectItem>
                    <SelectItem value="status_alterado">Status Alterado</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                    <SelectItem value="iniciado">Iniciado</SelectItem>
                    <SelectItem value="comentario_adicionado">Comentário</SelectItem>
                    <SelectItem value="imagem_adicionada">Imagem Adicionada</SelectItem>
                    <SelectItem value="atribuido">Atribuído</SelectItem>
                    <SelectItem value="compartilhado">Compartilhado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Protocolo */}
              <div>
                <Label className="text-xs">Protocolo</Label>
                <Input
                  placeholder="Ex: VIS-001"
                  value={protocolo}
                  onChange={(e) => setProtocolo(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>

              {/* Funcionário */}
              <div>
                <Label className="text-xs">Funcionário</Label>
                <Select
                  value={funcionarioId?.toString() || ""}
                  onValueChange={(v) => setFuncionarioId(v ? parseInt(v) : undefined)}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    {funcionarios?.map((f: any) => (
                      <SelectItem key={f.id} value={f.id?.toString() || ""}>
                        {f.nome || "Sem nome"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Data Início */}
              <div>
                <Label className="text-xs">De</Label>
                <Input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>

              {/* Data Fim */}
              <div>
                <Label className="text-xs">Até</Label>
                <Input
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={limparFiltros}>
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de histórico */}
      <Card>
        <CardContent className="p-3">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : historico?.registros && historico.registros.length > 0 ? (
            <div className="space-y-2">
              {historico.registros.map(renderHistoricoItem)}
            </div>
          ) : (
            <div className="text-center py-8">
              <History className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <h3 className="font-medium text-muted-foreground">Nenhuma atividade encontrada</h3>
              <p className="text-sm text-muted-foreground mt-1">
                As atividades aparecerão aqui conforme forem registradas
              </p>
            </div>
          )}

          {/* Paginação */}
          {historico && historico.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <span className="text-sm text-muted-foreground">
                Página {historico.page} de {historico.totalPages} ({historico.total} registros)
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(historico.totalPages, p + 1))}
                  disabled={page === historico.totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
