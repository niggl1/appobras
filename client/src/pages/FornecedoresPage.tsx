import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Building2, 
  Plus, 
  Phone, 
  Mail,
  MapPin,
  FileText,
  Star,
  StarHalf,
  Calendar,
  DollarSign,
  Package,
  Truck,
  Wrench,
  CheckCircle,
  AlertCircle,
  Clock,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  Eye,
  Search
} from "lucide-react";
import { toast } from "sonner";

// Tipos
interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  tipo: "materiais" | "servicos" | "equipamentos" | "mao_de_obra";
  categoria: string;
  telefone: string;
  email: string;
  endereco: string;
  contato: string;
  avaliacao: number;
  status: "ativo" | "inativo" | "bloqueado";
  observacoes?: string;
}

interface Contrato {
  id: number;
  fornecedorId: number;
  numero: string;
  descricao: string;
  tipo: "fornecimento" | "servico" | "locacao";
  valorTotal: number;
  valorPago: number;
  dataInicio: string;
  dataFim: string;
  status: "vigente" | "encerrado" | "cancelado" | "pendente";
  obraId: number;
}

// Dados de exemplo
const tiposFornecedor = [
  { id: "materiais", nome: "Materiais de Construção", icon: Package },
  { id: "servicos", nome: "Serviços Especializados", icon: Wrench },
  { id: "equipamentos", nome: "Equipamentos e Locação", icon: Truck },
  { id: "mao_de_obra", nome: "Mão de Obra Terceirizada", icon: Building2 },
];

const categorias = {
  materiais: ["Cimento e Argamassa", "Areia e Brita", "Tijolos e Blocos", "Ferragens", "Madeiras", "Tintas", "Elétrica", "Hidráulica", "Acabamentos"],
  servicos: ["Elétrica", "Hidráulica", "Pintura", "Gesso", "Impermeabilização", "Terraplanagem", "Fundações", "Estruturas Metálicas"],
  equipamentos: ["Betoneiras", "Andaimes", "Escoras", "Ferramentas", "Caminhões", "Guindastes", "Compactadores"],
  mao_de_obra: ["Pedreiros", "Eletricistas", "Encanadores", "Pintores", "Carpinteiros", "Serralheiros"],
};

export default function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([
    { id: 1, nome: "Materiais ABC Ltda", cnpj: "12.345.678/0001-90", tipo: "materiais", categoria: "Cimento e Argamassa", telefone: "(11) 3333-1111", email: "contato@materiaisabc.com", endereco: "Rua das Obras, 123 - São Paulo/SP", contato: "João Silva", avaliacao: 4.5, status: "ativo" },
    { id: 2, nome: "Areial São José", cnpj: "23.456.789/0001-01", tipo: "materiais", categoria: "Areia e Brita", telefone: "(11) 3333-2222", email: "vendas@areialsaojose.com", endereco: "Rod. SP-100, Km 50 - Guarulhos/SP", contato: "Maria Santos", avaliacao: 4.0, status: "ativo" },
    { id: 3, nome: "Elétrica Total", cnpj: "34.567.890/0001-12", tipo: "servicos", categoria: "Elétrica", telefone: "(11) 3333-3333", email: "orcamento@eletricatotal.com", endereco: "Av. Industrial, 456 - São Paulo/SP", contato: "Carlos Oliveira", avaliacao: 5.0, status: "ativo" },
    { id: 4, nome: "Locadora de Equipamentos XYZ", cnpj: "45.678.901/0001-23", tipo: "equipamentos", categoria: "Betoneiras", telefone: "(11) 3333-4444", email: "locacao@xyz.com", endereco: "Rua dos Equipamentos, 789 - São Paulo/SP", contato: "Pedro Lima", avaliacao: 3.5, status: "ativo" },
    { id: 5, nome: "Cerâmica Central", cnpj: "56.789.012/0001-34", tipo: "materiais", categoria: "Tijolos e Blocos", telefone: "(11) 3333-5555", email: "vendas@ceramicacentral.com", endereco: "Estrada do Barro, 1000 - Itaquaquecetuba/SP", contato: "Ana Costa", avaliacao: 4.0, status: "ativo" },
  ]);

  const [contratos, setContratos] = useState<Contrato[]>([
    { id: 1, fornecedorId: 1, numero: "CT-2026-001", descricao: "Fornecimento de cimento e argamassa", tipo: "fornecimento", valorTotal: 15000, valorPago: 7500, dataInicio: "2026-01-01", dataFim: "2026-06-30", status: "vigente", obraId: 1 },
    { id: 2, fornecedorId: 2, numero: "CT-2026-002", descricao: "Fornecimento de areia e brita", tipo: "fornecimento", valorTotal: 8000, valorPago: 8000, dataInicio: "2026-01-01", dataFim: "2026-03-31", status: "vigente", obraId: 1 },
    { id: 3, fornecedorId: 3, numero: "CT-2026-003", descricao: "Instalação elétrica completa", tipo: "servico", valorTotal: 12000, valorPago: 4000, dataInicio: "2026-02-01", dataFim: "2026-04-30", status: "vigente", obraId: 1 },
    { id: 4, fornecedorId: 4, numero: "CT-2026-004", descricao: "Locação de betoneira 400L", tipo: "locacao", valorTotal: 2400, valorPago: 800, dataInicio: "2026-01-15", dataFim: "2026-02-15", status: "vigente", obraId: 1 },
  ]);

  const [dialogNovoFornecedor, setDialogNovoFornecedor] = useState(false);
  const [dialogNovoContrato, setDialogNovoContrato] = useState(false);
  const [novoFornecedor, setNovoFornecedor] = useState<Partial<Fornecedor>>({});
  const [novoContrato, setNovoContrato] = useState<Partial<Contrato>>({});
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [busca, setBusca] = useState("");

  // Cálculos
  const totalContratos = contratos.reduce((acc, c) => acc + c.valorTotal, 0);
  const totalPago = contratos.reduce((acc, c) => acc + c.valorPago, 0);
  const contratosVigentes = contratos.filter(c => c.status === "vigente").length;

  const fornecedoresFiltrados = fornecedores.filter(f => {
    const matchTipo = filtroTipo === "todos" || f.tipo === filtroTipo;
    const matchBusca = f.nome.toLowerCase().includes(busca.toLowerCase()) || 
                       f.categoria.toLowerCase().includes(busca.toLowerCase());
    return matchTipo && matchBusca;
  });

  const handleAdicionarFornecedor = () => {
    if (!novoFornecedor.nome || !novoFornecedor.cnpj || !novoFornecedor.tipo) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    const fornecedor: Fornecedor = {
      id: Math.max(...fornecedores.map(f => f.id), 0) + 1,
      nome: novoFornecedor.nome!,
      cnpj: novoFornecedor.cnpj!,
      tipo: novoFornecedor.tipo as any,
      categoria: novoFornecedor.categoria || "",
      telefone: novoFornecedor.telefone || "",
      email: novoFornecedor.email || "",
      endereco: novoFornecedor.endereco || "",
      contato: novoFornecedor.contato || "",
      avaliacao: 0,
      status: "ativo"
    };

    setFornecedores([...fornecedores, fornecedor]);
    setNovoFornecedor({});
    setDialogNovoFornecedor(false);
    toast.success("Fornecedor cadastrado com sucesso!");
  };

  const handleAdicionarContrato = () => {
    if (!novoContrato.fornecedorId || !novoContrato.descricao || !novoContrato.valorTotal) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    const contrato: Contrato = {
      id: Math.max(...contratos.map(c => c.id), 0) + 1,
      fornecedorId: novoContrato.fornecedorId!,
      numero: `CT-2026-${String(contratos.length + 1).padStart(3, '0')}`,
      descricao: novoContrato.descricao!,
      tipo: novoContrato.tipo || "fornecimento",
      valorTotal: novoContrato.valorTotal!,
      valorPago: 0,
      dataInicio: novoContrato.dataInicio || new Date().toISOString().split('T')[0],
      dataFim: novoContrato.dataFim || "",
      status: "vigente",
      obraId: 1
    };

    setContratos([...contratos, contrato]);
    setNovoContrato({});
    setDialogNovoContrato(false);
    toast.success("Contrato criado com sucesso!");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />);
    }
    if (hasHalf) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-amber-400 text-amber-400" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
    }
    return stars;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
      case "vigente":
        return <Badge className="bg-green-100 text-green-700">Ativo</Badge>;
      case "inativo":
      case "encerrado":
        return <Badge className="bg-gray-100 text-gray-700">Encerrado</Badge>;
      case "bloqueado":
      case "cancelado":
        return <Badge className="bg-red-100 text-red-700">Cancelado</Badge>;
      case "pendente":
        return <Badge className="bg-amber-100 text-amber-700">Pendente</Badge>;
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
            <Building2 className="h-7 w-7 text-amber-500" />
            Fornecedores e Contratos
          </h1>
          <p className="text-muted-foreground">Gerencie seus fornecedores e contratos de obra</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={dialogNovoContrato} onOpenChange={setDialogNovoContrato}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Novo Contrato
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Novo Contrato</DialogTitle>
                <DialogDescription>Crie um novo contrato com fornecedor</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Fornecedor</Label>
                  <Select value={novoContrato.fornecedorId?.toString()} onValueChange={(v) => setNovoContrato({...novoContrato, fornecedorId: parseInt(v)})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {fornecedores.filter(f => f.status === "ativo").map(forn => (
                        <SelectItem key={forn.id} value={forn.id.toString()}>{forn.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Contrato</Label>
                  <Select value={novoContrato.tipo} onValueChange={(v) => setNovoContrato({...novoContrato, tipo: v as any})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fornecimento">Fornecimento de Materiais</SelectItem>
                      <SelectItem value="servico">Prestação de Serviço</SelectItem>
                      <SelectItem value="locacao">Locação de Equipamentos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea 
                    placeholder="Descreva o objeto do contrato"
                    value={novoContrato.descricao || ''}
                    onChange={(e) => setNovoContrato({...novoContrato, descricao: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Valor Total (R$)</Label>
                  <Input 
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={novoContrato.valorTotal || ''}
                    onChange={(e) => setNovoContrato({...novoContrato, valorTotal: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data Início</Label>
                    <Input 
                      type="date"
                      value={novoContrato.dataInicio || ''}
                      onChange={(e) => setNovoContrato({...novoContrato, dataInicio: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Data Fim</Label>
                    <Input 
                      type="date"
                      value={novoContrato.dataFim || ''}
                      onChange={(e) => setNovoContrato({...novoContrato, dataFim: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogNovoContrato(false)}>Cancelar</Button>
                <Button onClick={handleAdicionarContrato} className="bg-amber-500 hover:bg-amber-600 text-black">
                  Criar Contrato
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={dialogNovoFornecedor} onOpenChange={setDialogNovoFornecedor}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-black">
                <Plus className="h-4 w-4" />
                Novo Fornecedor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Cadastrar Fornecedor</DialogTitle>
                <DialogDescription>Adicione um novo fornecedor ao sistema</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label>Nome/Razão Social</Label>
                    <Input 
                      placeholder="Nome do fornecedor"
                      value={novoFornecedor.nome || ''}
                      onChange={(e) => setNovoFornecedor({...novoFornecedor, nome: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>CNPJ</Label>
                    <Input 
                      placeholder="00.000.000/0000-00"
                      value={novoFornecedor.cnpj || ''}
                      onChange={(e) => setNovoFornecedor({...novoFornecedor, cnpj: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select value={novoFornecedor.tipo} onValueChange={(v) => setNovoFornecedor({...novoFornecedor, tipo: v as any, categoria: ""})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposFornecedor.map(tipo => (
                          <SelectItem key={tipo.id} value={tipo.id}>{tipo.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {novoFornecedor.tipo && (
                    <div className="space-y-2 col-span-2">
                      <Label>Categoria</Label>
                      <Select value={novoFornecedor.categoria} onValueChange={(v) => setNovoFornecedor({...novoFornecedor, categoria: v})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorias[novoFornecedor.tipo as keyof typeof categorias]?.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input 
                      placeholder="(00) 0000-0000"
                      value={novoFornecedor.telefone || ''}
                      onChange={(e) => setNovoFornecedor({...novoFornecedor, telefone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      placeholder="email@fornecedor.com"
                      value={novoFornecedor.email || ''}
                      onChange={(e) => setNovoFornecedor({...novoFornecedor, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Endereço</Label>
                    <Input 
                      placeholder="Endereço completo"
                      value={novoFornecedor.endereco || ''}
                      onChange={(e) => setNovoFornecedor({...novoFornecedor, endereco: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Pessoa de Contato</Label>
                    <Input 
                      placeholder="Nome do contato"
                      value={novoFornecedor.contato || ''}
                      onChange={(e) => setNovoFornecedor({...novoFornecedor, contato: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogNovoFornecedor(false)}>Cancelar</Button>
                <Button onClick={handleAdicionarFornecedor} className="bg-amber-500 hover:bg-amber-600 text-black">
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
                <p className="text-sm text-muted-foreground">Fornecedores Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{fornecedores.filter(f => f.status === "ativo").length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Contratos Vigentes</p>
                <p className="text-2xl font-bold text-gray-900">{contratosVigentes}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor Contratado</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalContratos)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor Pago</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPago)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Conteúdo */}
      <Tabs defaultValue="fornecedores" className="space-y-4">
        <TabsList className="bg-amber-50">
          <TabsTrigger value="fornecedores" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            Fornecedores
          </TabsTrigger>
          <TabsTrigger value="contratos" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            Contratos
          </TabsTrigger>
        </TabsList>

        {/* Tab: Fornecedores */}
        <TabsContent value="fornecedores">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Lista de Fornecedores</CardTitle>
                  <CardDescription>Todos os fornecedores cadastrados</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Buscar fornecedor..."
                      className="pl-9 w-64"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                    />
                  </div>
                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrar por tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os tipos</SelectItem>
                      {tiposFornecedor.map(tipo => (
                        <SelectItem key={tipo.id} value={tipo.id}>{tipo.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fornecedoresFiltrados.map((forn) => {
                  const tipo = tiposFornecedor.find(t => t.id === forn.tipo);
                  const Icon = tipo?.icon || Building2;
                  const contratosAtivos = contratos.filter(c => c.fornecedorId === forn.id && c.status === "vigente").length;
                  
                  return (
                    <Card key={forn.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                              <Icon className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{forn.nome}</h3>
                              <p className="text-sm text-muted-foreground">{forn.categoria}</p>
                              <div className="flex items-center gap-1 mt-1">
                                {renderStars(forn.avaliacao)}
                                <span className="text-sm text-muted-foreground ml-1">({forn.avaliacao})</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(forn.status)}
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{forn.telefone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{forn.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{forn.endereco}</span>
                          </div>
                        </div>

                        {contratosAtivos > 0 && (
                          <div className="mt-3 pt-3 border-t">
                            <Badge variant="outline" className="gap-1">
                              <FileText className="h-3 w-3" />
                              {contratosAtivos} contrato(s) ativo(s)
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Contratos */}
        <TabsContent value="contratos">
          <Card>
            <CardHeader>
              <CardTitle>Contratos</CardTitle>
              <CardDescription>Lista de todos os contratos com fornecedores</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Número</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Vigência</TableHead>
                      <TableHead className="text-right">Valor Total</TableHead>
                      <TableHead className="text-right">Pago</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contratos.map((contrato) => {
                      const fornecedor = fornecedores.find(f => f.id === contrato.fornecedorId);
                      const percentPago = (contrato.valorPago / contrato.valorTotal) * 100;
                      
                      return (
                        <TableRow key={contrato.id}>
                          <TableCell className="font-medium">{contrato.numero}</TableCell>
                          <TableCell>{fornecedor?.nome}</TableCell>
                          <TableCell className="max-w-xs truncate">{contrato.descricao}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {contrato.tipo === "fornecimento" ? "Fornecimento" : 
                               contrato.tipo === "servico" ? "Serviço" : "Locação"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(contrato.dataInicio).toLocaleDateString('pt-BR')} - {new Date(contrato.dataFim).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell className="text-right">{formatCurrency(contrato.valorTotal)}</TableCell>
                          <TableCell className="text-right">
                            <div>
                              <span className="font-medium">{formatCurrency(contrato.valorPago)}</span>
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                <div 
                                  className="bg-green-500 h-1.5 rounded-full" 
                                  style={{ width: `${percentPago}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{getStatusBadge(contrato.status)}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
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
      </Tabs>
    </div>
  );
}
