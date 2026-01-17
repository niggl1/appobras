import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  BookOpen, 
  Plus, 
  Calendar,
  Cloud,
  Sun,
  CloudRain,
  CloudSun,
  Thermometer,
  Users,
  Package,
  Wrench,
  Camera,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";
import { format, addDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

// Tipos
interface RegistroDiario {
  id: number;
  data: string;
  obraId: number;
  clima: {
    condicao: "sol" | "nublado" | "chuva" | "parcialmente_nublado";
    temperatura: number;
    observacao?: string;
  };
  maoDeObra: {
    pedreiros: number;
    serventes: number;
    eletricistas: number;
    encanadores: number;
    outros: number;
    observacao?: string;
  };
  equipamentos: string[];
  materiais: {
    item: string;
    quantidade: string;
    unidade: string;
  }[];
  atividadesRealizadas: string[];
  atividadesPrevistas: string[];
  ocorrencias: {
    tipo: "acidente" | "atraso" | "problema_material" | "problema_equipamento" | "outro";
    descricao: string;
    resolvido: boolean;
  }[];
  fotos: string[];
  observacoesGerais: string;
  responsavel: string;
  horaRegistro: string;
}

// Dados de exemplo
const climaIcons = {
  sol: Sun,
  nublado: Cloud,
  chuva: CloudRain,
  parcialmente_nublado: CloudSun,
};

const climaLabels = {
  sol: "Ensolarado",
  nublado: "Nublado",
  chuva: "Chuvoso",
  parcialmente_nublado: "Parcialmente Nublado",
};

const tiposOcorrencia = [
  { id: "acidente", nome: "Acidente de Trabalho", cor: "red" },
  { id: "atraso", nome: "Atraso na Execução", cor: "amber" },
  { id: "problema_material", nome: "Problema com Material", cor: "orange" },
  { id: "problema_equipamento", nome: "Problema com Equipamento", cor: "purple" },
  { id: "outro", nome: "Outro", cor: "gray" },
];

export default function DiarioObraPage() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [dialogNovoRegistro, setDialogNovoRegistro] = useState(false);
  
  const [registros, setRegistros] = useState<RegistroDiario[]>([
    {
      id: 1,
      data: "2026-01-17",
      obraId: 1,
      clima: { condicao: "sol", temperatura: 28, observacao: "Dia quente, sem previsão de chuva" },
      maoDeObra: { pedreiros: 4, serventes: 3, eletricistas: 1, encanadores: 0, outros: 1, observacao: "Equipe completa" },
      equipamentos: ["Betoneira 400L", "Andaime metálico", "Furadeira industrial"],
      materiais: [
        { item: "Cimento CP-II", quantidade: "20", unidade: "sacos" },
        { item: "Areia média", quantidade: "2", unidade: "m³" },
        { item: "Tijolo cerâmico", quantidade: "500", unidade: "un" },
      ],
      atividadesRealizadas: [
        "Conclusão da alvenaria do 1º pavimento - parede norte",
        "Início da instalação elétrica - eletrodutos",
        "Preparação da área para concretagem da laje",
      ],
      atividadesPrevistas: [
        "Continuação da alvenaria - parede sul",
        "Concretagem da laje do 1º pavimento",
        "Instalação de caixas elétricas",
      ],
      ocorrencias: [
        { tipo: "atraso", descricao: "Atraso de 2h na entrega de cimento", resolvido: true },
      ],
      fotos: [],
      observacoesGerais: "Obra progredindo conforme cronograma. Previsão de conclusão da estrutura mantida.",
      responsavel: "Eng. Fernando Silva",
      horaRegistro: "17:30",
    },
    {
      id: 2,
      data: "2026-01-16",
      obraId: 1,
      clima: { condicao: "parcialmente_nublado", temperatura: 25 },
      maoDeObra: { pedreiros: 4, serventes: 3, eletricistas: 0, encanadores: 1, outros: 1 },
      equipamentos: ["Betoneira 400L", "Andaime metálico"],
      materiais: [
        { item: "Cimento CP-II", quantidade: "15", unidade: "sacos" },
        { item: "Tijolo cerâmico", quantidade: "800", unidade: "un" },
      ],
      atividadesRealizadas: [
        "Alvenaria do 1º pavimento - 60% concluído",
        "Instalação hidráulica - tubulação de água fria",
      ],
      atividadesPrevistas: [
        "Conclusão da alvenaria do 1º pavimento",
        "Início da instalação elétrica",
      ],
      ocorrencias: [],
      fotos: [],
      observacoesGerais: "Dia produtivo, sem intercorrências.",
      responsavel: "Eng. Fernando Silva",
      horaRegistro: "17:45",
    },
  ]);

  const [novoRegistro, setNovoRegistro] = useState<Partial<RegistroDiario>>({
    data: format(dataSelecionada, "yyyy-MM-dd"),
    clima: { condicao: "sol", temperatura: 25 },
    maoDeObra: { pedreiros: 0, serventes: 0, eletricistas: 0, encanadores: 0, outros: 0 },
    equipamentos: [],
    materiais: [],
    atividadesRealizadas: [],
    atividadesPrevistas: [],
    ocorrencias: [],
    fotos: [],
    observacoesGerais: "",
  });

  const [novaAtividade, setNovaAtividade] = useState("");
  const [novaAtividadePrevista, setNovaAtividadePrevista] = useState("");
  const [novoMaterial, setNovoMaterial] = useState({ item: "", quantidade: "", unidade: "un" });
  const [novoEquipamento, setNovoEquipamento] = useState("");

  const registroDoDia = registros.find(r => r.data === format(dataSelecionada, "yyyy-MM-dd"));

  const navegarData = (direcao: "anterior" | "proximo") => {
    setDataSelecionada(prev => direcao === "anterior" ? subDays(prev, 1) : addDays(prev, 1));
  };

  const handleAdicionarAtividade = () => {
    if (!novaAtividade.trim()) return;
    setNovoRegistro({
      ...novoRegistro,
      atividadesRealizadas: [...(novoRegistro.atividadesRealizadas || []), novaAtividade]
    });
    setNovaAtividade("");
  };

  const handleAdicionarAtividadePrevista = () => {
    if (!novaAtividadePrevista.trim()) return;
    setNovoRegistro({
      ...novoRegistro,
      atividadesPrevistas: [...(novoRegistro.atividadesPrevistas || []), novaAtividadePrevista]
    });
    setNovaAtividadePrevista("");
  };

  const handleAdicionarMaterial = () => {
    if (!novoMaterial.item.trim() || !novoMaterial.quantidade.trim()) return;
    setNovoRegistro({
      ...novoRegistro,
      materiais: [...(novoRegistro.materiais || []), novoMaterial]
    });
    setNovoMaterial({ item: "", quantidade: "", unidade: "un" });
  };

  const handleAdicionarEquipamento = () => {
    if (!novoEquipamento.trim()) return;
    setNovoRegistro({
      ...novoRegistro,
      equipamentos: [...(novoRegistro.equipamentos || []), novoEquipamento]
    });
    setNovoEquipamento("");
  };

  const handleSalvarRegistro = () => {
    const registro: RegistroDiario = {
      id: Math.max(...registros.map(r => r.id), 0) + 1,
      data: novoRegistro.data || format(dataSelecionada, "yyyy-MM-dd"),
      obraId: 1,
      clima: novoRegistro.clima as any,
      maoDeObra: novoRegistro.maoDeObra as any,
      equipamentos: novoRegistro.equipamentos || [],
      materiais: novoRegistro.materiais || [],
      atividadesRealizadas: novoRegistro.atividadesRealizadas || [],
      atividadesPrevistas: novoRegistro.atividadesPrevistas || [],
      ocorrencias: novoRegistro.ocorrencias || [],
      fotos: [],
      observacoesGerais: novoRegistro.observacoesGerais || "",
      responsavel: "Eng. Fernando Silva",
      horaRegistro: format(new Date(), "HH:mm"),
    };

    setRegistros([registro, ...registros]);
    setDialogNovoRegistro(false);
    toast.success("Registro do diário salvo com sucesso!");
    
    // Reset form
    setNovoRegistro({
      data: format(dataSelecionada, "yyyy-MM-dd"),
      clima: { condicao: "sol", temperatura: 25 },
      maoDeObra: { pedreiros: 0, serventes: 0, eletricistas: 0, encanadores: 0, outros: 0 },
      equipamentos: [],
      materiais: [],
      atividadesRealizadas: [],
      atividadesPrevistas: [],
      ocorrencias: [],
      fotos: [],
      observacoesGerais: "",
    });
  };

  const ClimaIcon = registroDoDia ? climaIcons[registroDoDia.clima.condicao] : Sun;
  const totalTrabalhadores = registroDoDia 
    ? registroDoDia.maoDeObra.pedreiros + registroDoDia.maoDeObra.serventes + 
      registroDoDia.maoDeObra.eletricistas + registroDoDia.maoDeObra.encanadores + 
      registroDoDia.maoDeObra.outros
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-amber-500" />
            Diário de Obra
          </h1>
          <p className="text-muted-foreground">Registro diário das atividades e ocorrências da obra</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar PDF
          </Button>
          <Dialog open={dialogNovoRegistro} onOpenChange={setDialogNovoRegistro}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-black">
                <Plus className="h-4 w-4" />
                Novo Registro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Novo Registro do Diário</DialogTitle>
                <DialogDescription>
                  Registre as informações do dia {format(dataSelecionada, "dd/MM/yyyy")}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                {/* Clima */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-amber-500" />
                    Condições Climáticas
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Condição</Label>
                      <Select 
                        value={novoRegistro.clima?.condicao} 
                        onValueChange={(v) => setNovoRegistro({
                          ...novoRegistro, 
                          clima: { ...novoRegistro.clima!, condicao: v as any }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(climaLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Temperatura (°C)</Label>
                      <Input 
                        type="number"
                        value={novoRegistro.clima?.temperatura || ''}
                        onChange={(e) => setNovoRegistro({
                          ...novoRegistro,
                          clima: { ...novoRegistro.clima!, temperatura: parseInt(e.target.value) }
                        })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Mão de Obra */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-amber-500" />
                    Mão de Obra Presente
                  </Label>
                  <div className="grid grid-cols-5 gap-3">
                    {[
                      { key: "pedreiros", label: "Pedreiros" },
                      { key: "serventes", label: "Serventes" },
                      { key: "eletricistas", label: "Eletricistas" },
                      { key: "encanadores", label: "Encanadores" },
                      { key: "outros", label: "Outros" },
                    ].map(({ key, label }) => (
                      <div key={key} className="space-y-1">
                        <Label className="text-xs">{label}</Label>
                        <Input 
                          type="number"
                          min="0"
                          className="h-9"
                          value={(novoRegistro.maoDeObra as any)?.[key] || 0}
                          onChange={(e) => setNovoRegistro({
                            ...novoRegistro,
                            maoDeObra: { ...novoRegistro.maoDeObra!, [key]: parseInt(e.target.value) || 0 }
                          })}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Equipamentos */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-amber-500" />
                    Equipamentos Utilizados
                  </Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Nome do equipamento"
                      value={novoEquipamento}
                      onChange={(e) => setNovoEquipamento(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAdicionarEquipamento()}
                    />
                    <Button type="button" onClick={handleAdicionarEquipamento} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {novoRegistro.equipamentos?.map((eq, idx) => (
                      <Badge key={idx} variant="secondary" className="gap-1">
                        {eq}
                        <button 
                          onClick={() => setNovoRegistro({
                            ...novoRegistro,
                            equipamentos: novoRegistro.equipamentos?.filter((_, i) => i !== idx)
                          })}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Materiais */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Package className="h-5 w-5 text-amber-500" />
                    Materiais Utilizados
                  </Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Material"
                      className="flex-1"
                      value={novoMaterial.item}
                      onChange={(e) => setNovoMaterial({ ...novoMaterial, item: e.target.value })}
                    />
                    <Input 
                      placeholder="Qtd"
                      className="w-20"
                      value={novoMaterial.quantidade}
                      onChange={(e) => setNovoMaterial({ ...novoMaterial, quantidade: e.target.value })}
                    />
                    <Select value={novoMaterial.unidade} onValueChange={(v) => setNovoMaterial({ ...novoMaterial, unidade: v })}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["un", "m²", "m³", "kg", "sacos", "l"].map(un => (
                          <SelectItem key={un} value={un}>{un}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" onClick={handleAdicionarMaterial} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {novoRegistro.materiais && novoRegistro.materiais.length > 0 && (
                    <div className="space-y-1">
                      {novoRegistro.materiais.map((mat, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                          <span>{mat.item} - {mat.quantidade} {mat.unidade}</span>
                          <button 
                            onClick={() => setNovoRegistro({
                              ...novoRegistro,
                              materiais: novoRegistro.materiais?.filter((_, i) => i !== idx)
                            })}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Atividades Realizadas */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Atividades Realizadas
                  </Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Descreva a atividade realizada"
                      value={novaAtividade}
                      onChange={(e) => setNovaAtividade(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAdicionarAtividade()}
                    />
                    <Button type="button" onClick={handleAdicionarAtividade} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {novoRegistro.atividadesRealizadas && novoRegistro.atividadesRealizadas.length > 0 && (
                    <ul className="space-y-1">
                      {novoRegistro.atividadesRealizadas.map((at, idx) => (
                        <li key={idx} className="flex items-center justify-between bg-green-50 px-3 py-2 rounded">
                          <span className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {at}
                          </span>
                          <button 
                            onClick={() => setNovoRegistro({
                              ...novoRegistro,
                              atividadesRealizadas: novoRegistro.atividadesRealizadas?.filter((_, i) => i !== idx)
                            })}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Separator />

                {/* Atividades Previstas */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Atividades Previstas para Amanhã
                  </Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Descreva a atividade prevista"
                      value={novaAtividadePrevista}
                      onChange={(e) => setNovaAtividadePrevista(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAdicionarAtividadePrevista()}
                    />
                    <Button type="button" onClick={handleAdicionarAtividadePrevista} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {novoRegistro.atividadesPrevistas && novoRegistro.atividadesPrevistas.length > 0 && (
                    <ul className="space-y-1">
                      {novoRegistro.atividadesPrevistas.map((at, idx) => (
                        <li key={idx} className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded">
                          <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            {at}
                          </span>
                          <button 
                            onClick={() => setNovoRegistro({
                              ...novoRegistro,
                              atividadesPrevistas: novoRegistro.atividadesPrevistas?.filter((_, i) => i !== idx)
                            })}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Separator />

                {/* Observações */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Observações Gerais</Label>
                  <Textarea 
                    placeholder="Observações adicionais sobre o dia de trabalho..."
                    rows={3}
                    value={novoRegistro.observacoesGerais || ''}
                    onChange={(e) => setNovoRegistro({ ...novoRegistro, observacoesGerais: e.target.value })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogNovoRegistro(false)}>Cancelar</Button>
                <Button onClick={handleSalvarRegistro} className="bg-amber-500 hover:bg-amber-600 text-black">
                  Salvar Registro
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Navegação de Data */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navegarData("anterior")}>
              <ChevronLeft className="h-5 w-5 mr-1" />
              Anterior
            </Button>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {format(dataSelecionada, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
              <p className="text-muted-foreground">
                {format(dataSelecionada, "EEEE", { locale: ptBR })}
              </p>
            </div>
            <Button variant="ghost" onClick={() => navegarData("proximo")}>
              Próximo
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {registroDoDia ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resumo do Dia */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <ClimaIcon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Clima</p>
                      <p className="font-semibold">{climaLabels[registroDoDia.clima.condicao]}</p>
                      <p className="text-sm text-muted-foreground">{registroDoDia.clima.temperatura}°C</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Trabalhadores</p>
                      <p className="font-semibold">{totalTrabalhadores} pessoas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Atividades</p>
                      <p className="font-semibold">{registroDoDia.atividadesRealizadas.length} realizadas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`border-l-4 ${registroDoDia.ocorrencias.length > 0 ? 'border-l-red-500' : 'border-l-gray-300'}`}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full ${registroDoDia.ocorrencias.length > 0 ? 'bg-red-100' : 'bg-gray-100'} flex items-center justify-center`}>
                      <AlertTriangle className={`h-5 w-5 ${registroDoDia.ocorrencias.length > 0 ? 'text-red-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Ocorrências</p>
                      <p className="font-semibold">{registroDoDia.ocorrencias.length} registro(s)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Atividades Realizadas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Atividades Realizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {registroDoDia.atividadesRealizadas.map((atividade, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{atividade}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Atividades Previstas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Atividades Previstas para Amanhã
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {registroDoDia.atividadesPrevistas.map((atividade, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{atividade}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Ocorrências */}
            {registroDoDia.ocorrencias.length > 0 && (
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Ocorrências
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {registroDoDia.ocorrencias.map((ocorrencia, idx) => {
                      const tipo = tiposOcorrencia.find(t => t.id === ocorrencia.tipo);
                      return (
                        <li key={idx} className="flex items-start justify-between p-3 bg-red-50 rounded-lg">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <Badge variant="outline" className="mb-1">{tipo?.nome}</Badge>
                              <p>{ocorrencia.descricao}</p>
                            </div>
                          </div>
                          {ocorrencia.resolvido && (
                            <Badge className="bg-green-100 text-green-700">Resolvido</Badge>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            {/* Mão de Obra */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-amber-500" />
                  Mão de Obra
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: "Pedreiros", value: registroDoDia.maoDeObra.pedreiros },
                    { label: "Serventes", value: registroDoDia.maoDeObra.serventes },
                    { label: "Eletricistas", value: registroDoDia.maoDeObra.eletricistas },
                    { label: "Encanadores", value: registroDoDia.maoDeObra.encanadores },
                    { label: "Outros", value: registroDoDia.maoDeObra.outros },
                  ].filter(item => item.value > 0).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{item.label}</span>
                      <Badge variant="secondary">{item.value}</Badge>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <Badge className="bg-amber-100 text-amber-700">{totalTrabalhadores}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equipamentos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wrench className="h-5 w-5 text-amber-500" />
                  Equipamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {registroDoDia.equipamentos.map((eq, idx) => (
                    <Badge key={idx} variant="outline">{eq}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Materiais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5 text-amber-500" />
                  Materiais Utilizados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {registroDoDia.materiais.map((mat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span>{mat.item}</span>
                      <Badge variant="secondary">{mat.quantidade} {mat.unidade}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Observações */}
            {registroDoDia.observacoesGerais && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-amber-500" />
                    Observações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{registroDoDia.observacoesGerais}</p>
                </CardContent>
              </Card>
            )}

            {/* Info do Registro */}
            <Card className="bg-gray-50">
              <CardContent className="pt-4">
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Responsável:</strong> {registroDoDia.responsavel}</p>
                  <p><strong>Registrado às:</strong> {registroDoDia.horaRegistro}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="py-12">
          <CardContent className="text-center">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum registro para este dia</h3>
            <p className="text-muted-foreground mb-4">
              Não há registro no diário de obra para {format(dataSelecionada, "dd/MM/yyyy")}
            </p>
            <Button onClick={() => setDialogNovoRegistro(true)} className="bg-amber-500 hover:bg-amber-600 text-black">
              <Plus className="h-4 w-4 mr-2" />
              Criar Registro
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
