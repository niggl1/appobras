"use client";
import { useLocation, useSearch } from "wouter";
import { trpc } from "@/lib/trpc";
import { useCondominioAtivo } from "@/hooks/useCondominioAtivo";
// DashboardLayout removido - agora usa o menu do Dashboard.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Filter,
  ClipboardList,
  Settings,
  BarChart3,
  Clock,
  MapPin,
  Users,
  Package,
  DollarSign,
  MessageSquare,
  Image,
  Play,
  Square,
  Trash2,
  Edit,
  Eye,
  ChevronRight,
  Zap,
  Droplets,
  Building2,
  TreePine,
  Sparkles,
  Paintbrush,
  Shield,
  MoreHorizontal,
  ArrowDown,
  Minus,
  ArrowUp,
  AlertTriangle,
  FolderOpen,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Wrench,
  Tag,
  Flag,
  Circle,
  Calendar,
  FileText,
  Share2,
  Copy,
  ExternalLink,
  X,
} from "lucide-react";
import { useState } from "react";

// Mapeamento de ícones
const iconMap: Record<string, any> = {
  Zap, Droplets, Building2, TreePine, Sparkles, Paintbrush, Shield, MoreHorizontal,
  ArrowDown, Minus, ArrowUp, AlertTriangle, FolderOpen, CheckCircle, CheckCircle2,
  XCircle, Wrench, Tag, Flag, Circle, Search, Package,
};

export function OrdensServico() {
  const { condominioAtivo } = useCondominioAtivo();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const tab = params.get("tab") || "lista";

  // Queries
  const { data: ordensServico, isLoading } = trpc.ordensServico.list.useQuery(
    { condominioId: condominioAtivo?.id || 0 },
    { enabled: !!condominioAtivo?.id }
  );

  const { data: categorias } = trpc.categorias.list.useQuery(
    { condominioId: condominioAtivo?.id || 0 },
    { enabled: !!condominioAtivo?.id }
  );

  const { data: prioridades } = trpc.prioridades.list.useQuery(
    { condominioId: condominioAtivo?.id || 0 },
    { enabled: !!condominioAtivo?.id }
  );

  const { data: setores } = trpc.setores.list.useQuery(
    { condominioId: condominioAtivo?.id || 0 },
    { enabled: !!condominioAtivo?.id }
  );

  const { data: configuracoes } = trpc.configuracoes.get.useQuery(
    { condominioId: condominioAtivo?.id || 0 },
    { enabled: !!condominioAtivo?.id }
  );

  // Mutations
  const createOS = trpc.ordensServico.create.useMutation({
    onSuccess: () => {
      toast.success("Ordem de serviço criada com sucesso!");
      setShowNovaOS(false);
      setNovaOS({
        titulo: "",
        descricao: "",
        categoriaId: "",
        prioridadeId: "",
        setorId: "",
        tempoEstimadoDias: 0,
        tempoEstimadoHoras: 0,
        tempoEstimadoMinutos: 0,
        valorEstimado: "",
        solicitanteNome: "",
        responsavelPrincipal: "",
        protocolo: "",
        materiais: [],
      });
    },
    onError: () => toast.error("Erro ao criar ordem de serviço"),
  });

  const refetchConfiguracoes = trpc.useUtils().configuracoes.get.invalidate;

  // Form state para nova OS
  const [novaOS, setNovaOS] = useState({
    titulo: "",
    descricao: "",
    categoriaId: "",
    prioridadeId: "",
    setorId: "",
    tempoEstimadoDias: 0,
    tempoEstimadoHoras: 0,
    tempoEstimadoMinutos: 0,
    valorEstimado: "",
    solicitanteNome: "",
    responsavelPrincipal: "",
    protocolo: "",
    materiais: [] as Array<{ nome: string; quantidade: number }>,
  });

  // Estados para modais de criar novos itens
  const [showAddCategoria, setShowAddCategoria] = useState(false);
  const [showAddPrioridade, setShowAddPrioridade] = useState(false);
  const [showAddSetor, setShowAddSetor] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [novaPrioridade, setNovaPrioridade] = useState("");
  const [novoSetor, setNovoSetor] = useState("");

  // Mutations para criar novos itens
  const createCategoriaM = trpc.categorias.createCategoria.useMutation({
    onSuccess: (data) => {
      toast.success("Categoria criada com sucesso!");
      setShowAddCategoria(false);
      setNovaCategoria("");
      setNovaOS({ ...novaOS, categoriaId: String(data.id) });
    },
    onError: () => toast.error("Erro ao criar categoria"),
  });

  const createPrioridadeM = trpc.prioridades.createPrioridade.useMutation({
    onSuccess: (data) => {
      toast.success("Prioridade criada com sucesso!");
      setShowAddPrioridade(false);
      setNovaPrioridade("");
      setNovaOS({ ...novaOS, prioridadeId: String(data.id) });
    },
    onError: () => toast.error("Erro ao criar prioridade"),
  });

  const createSetorM = trpc.setores.createSetor.useMutation({
    onSuccess: (data) => {
      toast.success("Setor criado com sucesso!");
      setShowAddSetor(false);
      setNovoSetor("");
      setNovaOS({ ...novaOS, setorId: String(data.id) });
    },
    onError: () => toast.error("Erro ao criar setor"),
  });

  const [showNovaOS, setShowNovaOS] = useState(false);

  const handleCreateOS = () => {
    if (!condominioAtivo?.id) return;
    if (!novaOS.titulo.trim()) {
      toast.error("Título é obrigatório");
      return;
    }

    createOS.mutate({
      condominioId: condominioAtivo.id,
      titulo: novaOS.titulo,
      descricao: novaOS.descricao || undefined,
      categoriaId: novaOS.categoriaId ? parseInt(novaOS.categoriaId) : undefined,
      prioridadeId: novaOS.prioridadeId ? parseInt(novaOS.prioridadeId) : undefined,
      setorId: novaOS.setorId ? parseInt(novaOS.setorId) : undefined,
      tempoEstimadoDias: novaOS.tempoEstimadoDias,
      tempoEstimadoHoras: novaOS.tempoEstimadoHoras,
      tempoEstimadoMinutos: novaOS.tempoEstimadoMinutos,
      valorEstimado: novaOS.valorEstimado || undefined,
      solicitanteNome: novaOS.solicitanteNome || undefined,
    });
  };

  const handleCreateCategoria = () => {
    if (!novaCategoria.trim()) {
      toast.error("Nome da categoria é obrigatório");
      return;
    }
    if (!condominioAtivo?.id) return;
    createCategoriaM.mutate({
      condominioId: condominioAtivo.id,
      nome: novaCategoria,
    });
  };

  const handleCreatePrioridade = () => {
    if (!novaPrioridade.trim()) {
      toast.error("Nome da prioridade é obrigatório");
      return;
    }
    if (!condominioAtivo?.id) return;
    createPrioridadeM.mutate({
      condominioId: condominioAtivo.id,
      nome: novaPrioridade,
    });
  };

  const handleCreateSetor = () => {
    if (!novoSetor.trim()) {
      toast.error("Nome do setor é obrigatório");
      return;
    }
    if (!condominioAtivo?.id) return;
    createSetorM.mutate({
      condominioId: condominioAtivo.id,
      nome: novoSetor,
    });
  };

  const getIconComponent = (iconName: string) => {
    const Icon = iconMap[iconName] || Circle;
    return Icon;
  };

  const formatTempo = (dias: number, horas: number, minutos: number) => {
    const parts = [];
    if (dias > 0) parts.push(`${dias}d`);
    if (horas > 0) parts.push(`${horas}h`);
    if (minutos > 0) parts.push(`${minutos}min`);
    return parts.length > 0 ? parts.join(" ") : "-";
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ordens de Serviço</h1>
          <p className="text-gray-500 mt-1">Gerencie todas as ordens de serviço</p>
        </div>
        <Dialog open={showNovaOS} onOpenChange={setShowNovaOS}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-5 h-5 text-white" />
              Nova Ordem de Serviço
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nova Ordem de Serviço</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Título */}
              <div>
                <Label className="text-gray-700">Título *</Label>
                <Input
                  placeholder="Ex: Reparo na bomba d'água"
                  value={novaOS.titulo}
                  onChange={(e) => setNovaOS({ ...novaOS, titulo: e.target.value })}
                  className="mt-1 border-amber-200"
                />
              </div>

              {/* Descrição */}
              <div>
                <Label className="text-gray-700">Descrição</Label>
                <Textarea
                  placeholder="Descreva detalhadamente o serviço a ser realizado..."
                  value={novaOS.descricao}
                  onChange={(e) => setNovaOS({ ...novaOS, descricao: e.target.value })}
                  className="mt-1 border-amber-200 focus:border-amber-400 min-h-[100px]"
                />
              </div>

              {/* Categoria, Prioridade, Setor */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-gray-700">Categoria</Label>
                    <Dialog open={showAddCategoria} onOpenChange={setShowAddCategoria}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-amber-600 hover:bg-amber-50"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adicionar Nova Categoria</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Nome da Categoria</Label>
                            <Input
                              placeholder="Ex: Hidráulica"
                              value={novaCategoria}
                              onChange={(e) => setNovaCategoria(e.target.value)}
                              className="mt-1 border-amber-200"
                            />
                          </div>
                          <Button
                            onClick={handleCreateCategoria}
                            disabled={createCategoriaM.isPending}
                            className="w-full bg-amber-600 hover:bg-amber-700"
                          >
                            {createCategoriaM.isPending ? "Criando..." : "Criar Categoria"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Select
                    value={novaOS.categoriaId}
                    onValueChange={(v) => setNovaOS({ ...novaOS, categoriaId: v })}
                  >
                    <SelectTrigger className="mt-1 border-amber-200">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias?.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-gray-700">Prioridade</Label>
                    <Dialog open={showAddPrioridade} onOpenChange={setShowAddPrioridade}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-amber-600 hover:bg-amber-50"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adicionar Nova Prioridade</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Nome da Prioridade</Label>
                            <Input
                              placeholder="Ex: Urgente"
                              value={novaPrioridade}
                              onChange={(e) => setNovaPrioridade(e.target.value)}
                              className="mt-1 border-amber-200"
                            />
                          </div>
                          <Button
                            onClick={handleCreatePrioridade}
                            disabled={createPrioridadeM.isPending}
                            className="w-full bg-amber-600 hover:bg-amber-700"
                          >
                            {createPrioridadeM.isPending ? "Criando..." : "Criar Prioridade"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Select
                    value={novaOS.prioridadeId}
                    onValueChange={(v) => setNovaOS({ ...novaOS, prioridadeId: v })}
                  >
                    <SelectTrigger className="mt-1 border-amber-200">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {prioridades?.map((p) => (
                        <SelectItem key={p.id} value={String(p.id)}>
                          {p.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-gray-700">Setor</Label>
                    <Dialog open={showAddSetor} onOpenChange={setShowAddSetor}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-amber-600 hover:bg-amber-50"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adicionar Novo Setor</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Nome do Setor</Label>
                            <Input
                              placeholder="Ex: Manutenção Predial"
                              value={novoSetor}
                              onChange={(e) => setNovoSetor(e.target.value)}
                              className="mt-1 border-amber-200"
                            />
                          </div>
                          <Button
                            onClick={handleCreateSetor}
                            disabled={createSetorM.isPending}
                            className="w-full bg-amber-600 hover:bg-amber-700"
                          >
                            {createSetorM.isPending ? "Criando..." : "Criar Setor"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Select
                    value={novaOS.setorId}
                    onValueChange={(v) => setNovaOS({ ...novaOS, setorId: v })}
                  >
                    <SelectTrigger className="mt-1 border-amber-200">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {setores?.map((s) => (
                        <SelectItem key={s.id} value={String(s.id)}>
                          {s.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tempo Estimado */}
              <div>
                <Label className="text-gray-700">Tempo Estimado</Label>
                <div className="grid grid-cols-3 gap-4 mt-1">
                  <div>
                    <Label className="text-xs text-gray-500">Dias</Label>
                    <Input
                      type="number"
                      min="0"
                      value={novaOS.tempoEstimadoDias}
                      onChange={(e) => setNovaOS({ ...novaOS, tempoEstimadoDias: parseInt(e.target.value) || 0 })}
                      className="border-amber-200"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Horas</Label>
                    <Input
                      type="number"
                      min="0"
                      max="23"
                      value={novaOS.tempoEstimadoHoras}
                      onChange={(e) => setNovaOS({ ...novaOS, tempoEstimadoHoras: parseInt(e.target.value) || 0 })}
                      className="border-amber-200"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Minutos</Label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={novaOS.tempoEstimadoMinutos}
                      onChange={(e) => setNovaOS({ ...novaOS, tempoEstimadoMinutos: parseInt(e.target.value) || 0 })}
                      className="border-amber-200"
                    />
                  </div>
                </div>
              </div>

              {/* Responsável */}
              <div>
                <Label className="text-gray-700">Responsável Principal</Label>
                <Input
                  placeholder="Nome do responsável"
                  value={novaOS.responsavelPrincipal || ""}
                  onChange={(e) => setNovaOS({ ...novaOS, responsavelPrincipal: e.target.value })}
                  className="mt-1 border-amber-200"
                />
              </div>

              {/* Protocolo */}
              <div>
                <Label className="text-gray-700">Protocolo</Label>
                <Input
                  placeholder="Número do protocolo (gerado automaticamente)"
                  value={novaOS.protocolo || ""}
                  onChange={(e) => setNovaOS({ ...novaOS, protocolo: e.target.value })}
                  className="mt-1 border-amber-200"
                  disabled
                />
              </div>

              {/* Valor Estimado */}
              {configuracoes?.habilitarGestaoFinanceira && (
                <div>
                  <Label className="text-gray-700">Valor Estimado (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={novaOS.valorEstimado}
                    onChange={(e) => setNovaOS({ ...novaOS, valorEstimado: e.target.value })}
                    className="mt-1 border-amber-200"
                  />
                </div>
              )}

              {/* Material Necessário */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-gray-700">Material Necessário</Label>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-amber-600 hover:bg-amber-50"
                    onClick={() => alert("Adicionar novo material")}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {novaOS.materiais && novaOS.materiais.length > 0 ? (
                  <div className="space-y-2 bg-amber-50 p-3 rounded-lg">
                    {novaOS.materiais.map((material, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-amber-200">
                        <span className="text-sm text-gray-700">{material.nome} (Qtd: {material.quantidade})</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                          onClick={() => {
                            setNovaOS({
                              ...novaOS,
                              materiais: novaOS.materiais?.filter((_, i) => i !== idx)
                            });
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Nenhum material adicionado</p>
                )}
              </div>

              {/* Solicitante */}
              <div>
                <Label className="text-gray-700">Nome do Solicitante</Label>
                <Input
                  placeholder="Nome de quem solicitou o serviço"
                  value={novaOS.solicitanteNome}
                  onChange={(e) => setNovaOS({ ...novaOS, solicitanteNome: e.target.value })}
                  className="mt-1 border-amber-200"
                />
              </div>

              {/* Botão de Teste */}
              <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-300"
                  onClick={() => {
                    console.log("Estado de novaOS:", novaOS);
                    alert(JSON.stringify(novaOS, null, 2));
                  }}
                >
                  🧪 Botão de Teste - Ver Estado
                </Button>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleCreateOS}
                  disabled={createOS.isPending}
                  className="flex-1 bg-amber-600 hover:bg-amber-700"
                >
                  {createOS.isPending ? "Criando..." : "Criar Ordem de Serviço"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNovaOS(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Placeholder para lista de ordens */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Carregando ordens de serviço...</p>
      </div>
    </div>
  );
}

export default OrdensServico;
