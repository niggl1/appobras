import { useLocation, useSearch } from "wouter";
import { trpc } from "@/lib/trpc";
import { useCondominioAtivo } from "@/hooks/useCondominioAtivo";
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
import { ShareModal } from "@/components/ShareModal";
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


      {/* Modal de Compartilhamento */}
export default function OrdensServico() {
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

  const { data: categorias } = trpc.ordensServico.getCategorias.useQuery(
    { condominioId: condominioAtivo?.id || 0 },
    { enabled: !!condominioAtivo?.id }
  );

  const { data: prioridades } = trpc.ordensServico.getPrioridades.useQuery(
    { condominioId: condominioAtivo?.id || 0 },
    { enabled: !!condominioAtivo?.id }
  );

  const { data: setores } = trpc.ordensServico.getSetores.useQuery(
    { condominioId: condominioAtivo?.id || 0 },
    { enabled: !!condominioAtivo?.id }
  );

  // Mutations
  const createOS = trpc.ordensServico.create.useMutation();
  const createCategoria = trpc.ordensServico.createCategoria.useMutation();
  const createPrioridade = trpc.ordensServico.createPrioridade.useMutation();
  const createSetor = trpc.ordensServico.createSetor.useMutation();

  // Estados do modal
  const [showNovaOS, setShowNovaOS] = useState(false);
  const [showAddCategoria, setShowAddCategoria] = useState(false);
  const [showAddPrioridade, setShowAddPrioridade] = useState(false);
  const [showAddSetor, setShowAddSetor] = useState(false);

  const [novaOS, setNovaOS] = useState({
    responsavelPrincipal: "",
    protocolo: "",
    titulo: "",
    descricao: "",
    categoriaId: "",
    prioridadeId: "",
    setorId: "",
    tempoEstimadoDias: 0,
    tempoEstimadoHoras: 0,
    tempoEstimadoMinutos: 0,
    latitude: "",
    longitude: "",
    localizacaoDescricao: "",
    materiais: [] as { nome: string; quantidade: number }[],
    imagens: [] as { file: File; preview: string }[],
  });

  const [novaCategoria, setNovaCategoria] = useState("");
  const [novaPrioridade, setNovaPrioridade] = useState("");
  const [novoSetor, setNovoSetor] = useState("");
  const [novoMaterial, setNovoMaterial] = useState({ nome: "", quantidade: 1 });
  const [showShareModal, setShowShareModal] = useState(false);
  const [osIdCriada, setOsIdCriada] = useState<number | null>(null);
  const [osProtocoloCriada, setOsProtocoloCriada] = useState<string>("");

  const handleCreateCategoria = async () => {
    if (!novaCategoria.trim()) return;
    try {
      await createCategoria.mutateAsync({
        condominioId: condominioAtivo?.id || 0,
        nome: novaCategoria,
      });
      setNovaCategoria("");
      setShowAddCategoria(false);
      toast.success("Categoria criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar categoria");
    }
  };

  const handleCreatePrioridade = async () => {
    if (!novaPrioridade.trim()) return;
    try {
      await createPrioridade.mutateAsync({
        condominioId: condominioAtivo?.id || 0,
        nome: novaPrioridade,
      });
      setNovaPrioridade("");
      setShowAddPrioridade(false);
      toast.success("Prioridade criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar prioridade");
    }
  };

  const handleCreateSetor = async () => {
    if (!novoSetor.trim()) return;
    try {
      await createSetor.mutateAsync({
        condominioId: condominioAtivo?.id || 0,
        nome: novoSetor,
      });
      setNovoSetor("");
      setShowAddSetor(false);
      toast.success("Setor criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar setor");
    }
  };

  const handleAddMaterial = () => {
    if (novoMaterial.nome.trim()) {
      setNovaOS({
        ...novaOS,
        materiais: [...novaOS.materiais, novoMaterial],
      });
      setNovoMaterial({ nome: "", quantidade: 1 });
    }
  };

  const handleRemoveMaterial = (index: number) => {
    setNovaOS({
      ...novaOS,
      materiais: novaOS.materiais.filter((_, i) => i !== index),
    });
  };

  const handleFilesSelected = (files: File[]) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 100 * 1024 * 1024; // 100MB

    const newImagens = files
      .filter((file) => {
        if (!validTypes.includes(file.type)) {
          toast.error(`Tipo de arquivo inválido: ${file.name}`);
          return false;
        }
        if (file.size > maxSize) {
          toast.error(`Arquivo muito grande: ${file.name}`);
          return false;
        }
        return true;
      })
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

    setNovaOS({
      ...novaOS,
      imagens: [...(novaOS.imagens || []), ...newImagens],
    });
  };

  const handleRemoveImage = (index: number) => {
    const imagemRemovida = novaOS.imagens?.[index];
    if (imagemRemovida?.preview) {
      URL.revokeObjectURL(imagemRemovida.preview);
    }
    setNovaOS({
      ...novaOS,
      imagens: novaOS.imagens?.filter((_, i) => i !== index) || [],
    });
  };

  const handleCreateOS = async () => {
    if (!novaOS.titulo.trim()) {
      toast.error("Título é obrigatório");
      return;
    }

    try {
      // Gerar protocolo automático se não foi preenchido
      const protocoloFinal = novaOS.protocolo.trim() || String(Math.floor(100000 + Math.random() * 900000));
      await createOS.mutateAsync({
        condominioId: condominioAtivo?.id || 0,
        solicitanteNome: novaOS.responsavelPrincipal,
        titulo: novaOS.titulo,
        descricao: novaOS.descricao,
        categoriaId: novaOS.categoriaId ? parseInt(novaOS.categoriaId) : undefined,
        prioridadeId: novaOS.prioridadeId ? parseInt(novaOS.prioridadeId) : undefined,
        setorId: novaOS.setorId ? parseInt(novaOS.setorId) : undefined,
        tempoEstimadoDias: novaOS.tempoEstimadoDias,
        tempoEstimadoHoras: novaOS.tempoEstimadoHoras,
        tempoEstimadoMinutos: novaOS.tempoEstimadoMinutos,
      });

      toast.success("Ordem de serviço criada com sucesso!");
      setShowNovaOS(false);
      setNovaOS({
        responsavelPrincipal: "",
        protocolo: "",
        titulo: "",
        descricao: "",
        categoriaId: "",
        prioridadeId: "",
        setorId: "",
        tempoEstimadoDias: 0,
        tempoEstimadoHoras: 0,
        tempoEstimadoMinutos: 0,
        latitude: "",
        longitude: "",
        localizacaoDescricao: "",
        materiais: [],
        imagens: [],
      });
    } catch (error) {
      toast.error("Erro ao criar ordem de serviço");
    }
  };

  if (!condominioAtivo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Selecione uma organização</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-background">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Ordens de Serviço
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Gerencie todas as ordens de serviço da sua organização
              </p>
            </div>
            <Dialog open={showNovaOS} onOpenChange={setShowNovaOS}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Ordem de Serviço
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-orange-600">
                    Nova Ordem de Serviço
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Seção 1: Identificação */}
                  <div className="border border-border rounded-lg p-4 bg-muted/30">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-orange-500" />
                      Identificação
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Responsável Principal</Label>
                          <Input
                            placeholder="Nome do responsável"
                            value={novaOS.responsavelPrincipal}
                            onChange={(e) =>
                              setNovaOS({ ...novaOS, responsavelPrincipal: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Protocolo (Auto-gerado)</Label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              placeholder="Deixe em branco para auto-gerar"
                              value={novaOS.protocolo}
                              onChange={(e) =>
                                setNovaOS({ ...novaOS, protocolo: e.target.value })
                              }
                              className="mt-0"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const novoProtocolo = String(Math.floor(100000 + Math.random() * 900000));
                                setNovaOS({ ...novaOS, protocolo: novoProtocolo });
                              }}
                              className="whitespace-nowrap"
                            >
                              Gerar
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {novaOS.protocolo ? `Protocolo: ${novaOS.protocolo}` : "Será gerado automaticamente ao salvar"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seção 2: Descrição */}
                  <div className="border border-border rounded-lg p-4 bg-muted/30">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-orange-500" />
                      Descrição
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Título *</Label>
                        <Input
                          placeholder="Ex: Reparo na bomba d'água"
                          value={novaOS.titulo}
                          onChange={(e) =>
                            setNovaOS({ ...novaOS, titulo: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Descrição Detalhada</Label>
                        <Textarea
                          placeholder="Descreva detalhadamente o serviço a ser realizado..."
                          value={novaOS.descricao}
                          onChange={(e) =>
                            setNovaOS({ ...novaOS, descricao: e.target.value })
                          }
                          className="mt-1 min-h-24"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Seção 3: Classificação */}
                  <div className="border border-border rounded-lg p-4 bg-muted/30">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-orange-500" />
                      Classificação
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Categoria</Label>
                        <div className="flex gap-2 mt-1">
                          <Select value={novaOS.categoriaId} onValueChange={(value) => setNovaOS({ ...novaOS, categoriaId: value })}>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              {categorias?.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id.toString()}>
                                  {cat.nome}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => setShowAddCategoria(true)}
                            className="text-orange-500 hover:bg-orange-50"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Prioridade</Label>
                        <div className="flex gap-2 mt-1">
                          <Select value={novaOS.prioridadeId} onValueChange={(value) => setNovaOS({ ...novaOS, prioridadeId: value })}>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              {prioridades?.map((pri) => (
                                <SelectItem key={pri.id} value={pri.id.toString()}>
                                  {pri.nome}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => setShowAddPrioridade(true)}
                            className="text-orange-500 hover:bg-orange-50"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Setor</Label>
                        <div className="flex gap-2 mt-1">
                          <Select value={novaOS.setorId} onValueChange={(value) => setNovaOS({ ...novaOS, setorId: value })}>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              {setores?.map((set) => (
                                <SelectItem key={set.id} value={set.id.toString()}>
                                  {set.nome}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => setShowAddSetor(true)}
                            className="text-orange-500 hover:bg-orange-50"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seção 4: Tempo Estimado */}
                  <div className="border border-border rounded-lg p-4 bg-muted/30">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      Tempo Estimado
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Dias</Label>
                        <Input
                          type="number"
                          min="0"
                          value={novaOS.tempoEstimadoDias}
                          onChange={(e) =>
                            setNovaOS({ ...novaOS, tempoEstimadoDias: parseInt(e.target.value) || 0 })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Horas</Label>
                        <Input
                          type="number"
                          min="0"
                          max="23"
                          value={novaOS.tempoEstimadoHoras}
                          onChange={(e) =>
                            setNovaOS({ ...novaOS, tempoEstimadoHoras: parseInt(e.target.value) || 0 })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Minutos</Label>
                        <Input
                          type="number"
                          min="0"
                          max="59"
                          value={novaOS.tempoEstimadoMinutos}
                          onChange={(e) =>
                            setNovaOS({ ...novaOS, tempoEstimadoMinutos: parseInt(e.target.value) || 0 })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>

                  {/* Seção 5: Localização */}
                  <div className="border border-border rounded-lg p-4 bg-muted/30">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      Localização
                    </h3>
                    <div className="space-y-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-dashed border-orange-300 hover:bg-orange-50"
                        onClick={() => {
                          if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(
                              (position) => {
                                const { latitude, longitude } = position.coords;
                                setNovaOS({
                                  ...novaOS,
                                  latitude: latitude.toString(),
                                  longitude: longitude.toString(),
                                });
                                toast.success(`Localização capturada: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                              },
                              (error) => {
                                toast.error("Erro ao capturar localização: " + error.message);
                              }
                            );
                          } else {
                            toast.error("Geolocalização não suportada no seu navegador");
                          }
                        }}
                      >
                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                        Capturar Localização (GPS)
                      </Button>
                      {novaOS.latitude && novaOS.longitude && (
                        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                            ✓ Localização capturada
                          </p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                            Latitude: {novaOS.latitude} | Longitude: {novaOS.longitude}
                          </p>
                        </div>
                      )}
                      <div>
                        <Label className="text-sm font-medium">Descrição da Localização</Label>
                        <Input
                          placeholder="Ex: Sala de máquinas, Andar 3"
                          value={novaOS.localizacaoDescricao || ""}
                          onChange={(e) =>
                            setNovaOS({ ...novaOS, localizacaoDescricao: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Seção 6: Material Necessário */}
                  <div className="border border-border rounded-lg p-4 bg-muted/30">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-orange-500" />
                      Material Necessário
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Nome do material"
                          value={novoMaterial.nome}
                          onChange={(e) =>
                            setNovoMaterial({ ...novoMaterial, nome: e.target.value })
                          }
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          min="1"
                          placeholder="Qtd"
                          value={novoMaterial.quantidade}
                          onChange={(e) =>
                            setNovoMaterial({ ...novoMaterial, quantidade: parseInt(e.target.value) || 1 })
                          }
                          className="w-20"
                        />
                        <Button
                          onClick={handleAddMaterial}
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {novaOS.materiais.length > 0 && (
                        <div className="space-y-2">
                          {novaOS.materiais.map((material, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-background p-2 rounded border border-border"
                            >
                              <span className="text-sm">
                                {material.nome} <Badge variant="secondary">{material.quantidade}</Badge>
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoveMaterial(index)}
                              >
                                <X className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Seção 7: Upload de Imagens */}
                  <div className="border border-border rounded-lg p-4 bg-muted/30">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Image className="w-5 h-5 text-orange-500" />
                      Imagens da Ordem
                    </h3>
                    <div className="space-y-4">
                      {/* Drag and Drop Area */}
                      <div
                        className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center cursor-pointer hover:bg-orange-50 transition-colors"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const files = Array.from(e.dataTransfer.files);
                          handleFilesSelected(files);
                        }}
                        onClick={() => document.getElementById("file-input")?.click()}
                      >
                        <Image className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">Arraste imagens aqui ou clique para selecionar</p>
                        <p className="text-xs text-muted-foreground mt-1">Máximo 100MB por arquivo (JPEG, PNG, GIF, WebP)</p>
                        <input
                          id="file-input"
                          type="file"
                          multiple
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          className="hidden"
                          onChange={(e) => handleFilesSelected(Array.from(e.target.files || []))}
                        />
                      </div>
                      {novaOS.imagens && novaOS.imagens.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {novaOS.imagens.map((imagem, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={imagem.preview}
                                alt={`Preview ${index}`}
                                className="w-full h-24 object-cover rounded border border-border"
                              />
                              <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowNovaOS(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleCreateOS}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                      disabled={createOS.isPending}
                    >
                      {createOS.isPending ? "Criando..." : "Criar Ordem"}
                    </Button>
                  </div>

                  {/* Botão de Compartilhamento (aparece após criar) */}
                  {osIdCriada && (
                    <div className="pt-4 border-t border-border">
                      <Button
                        onClick={() => setShowShareModal(true)}
                        variant="outline"
                        className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartilhar com Equipe
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Modais de Adicionar Itens */}
        <Dialog open={showAddCategoria} onOpenChange={setShowAddCategoria}>
          <DialogContent className="w-[95vw] max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Categoria</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Nome da categoria"
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowAddCategoria(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleCreateCategoria} className="flex-1 bg-orange-500 hover:bg-orange-600">
                  Criar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showAddPrioridade} onOpenChange={setShowAddPrioridade}>
          <DialogContent className="w-[95vw] max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Prioridade</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Nome da prioridade"
                value={novaPrioridade}
                onChange={(e) => setNovaPrioridade(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowAddPrioridade(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleCreatePrioridade} className="flex-1 bg-orange-500 hover:bg-orange-600">
                  Criar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showAddSetor} onOpenChange={setShowAddSetor}>
          <DialogContent className="w-[95vw] max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Setor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Nome do setor"
                value={novoSetor}
                onChange={(e) => setNovoSetor(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowAddSetor(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleCreateSetor} className="flex-1 bg-orange-500 hover:bg-orange-600">
                  Criar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Conteúdo Principal */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Carregando ordens de serviço...</p>
            </div>
          ) : ordensServico && ordensServico.length > 0 ? (
            <div className="grid gap-4">
              {ordensServico.map((os) => (
                <div
                  key={os.id}
                  className="border border-border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition"
                  onClick={() => setLocation(`/dashboard/ordens-servico/${os.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{os.titulo}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{os.descricao}</p>
                      <div className="flex gap-2 mt-3">
                        {os.protocolo && <Badge variant="secondary">{os.protocolo}</Badge>}
                        {os.responsavelPrincipalNome && (
                          <Badge variant="outline">{os.responsavelPrincipalNome}</Badge>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Nenhuma ordem de serviço criada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
