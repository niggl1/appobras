import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Edit, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  FileText,
  Download,
  PieChart,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
  Users,
  Wrench,
  Building2,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { toast } from "sonner";

// Tipos
interface ItemOrcamento {
  id: number;
  categoria: string;
  descricao: string;
  unidade: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

interface CustoRealizado {
  id: number;
  itemId: number;
  data: string;
  descricao: string;
  valor: number;
  notaFiscal?: string;
  fornecedor?: string;
}

interface Orcamento {
  id: number;
  nome: string;
  obraId: number;
  dataCriacao: string;
  status: "rascunho" | "aprovado" | "em_execucao" | "finalizado";
  itens: ItemOrcamento[];
  custosRealizados: CustoRealizado[];
}

// Dados de exemplo
const categoriasOrcamento = [
  { id: "materiais", nome: "Materiais", icon: Package },
  { id: "mao_de_obra", nome: "Mão de Obra", icon: Users },
  { id: "equipamentos", nome: "Equipamentos", icon: Wrench },
  { id: "servicos", nome: "Serviços Terceirizados", icon: Building2 },
  { id: "administrativo", nome: "Custos Administrativos", icon: FileText },
];

const unidades = ["un", "m²", "m³", "m", "kg", "l", "h", "dia", "vb"];

export default function OrcamentosPage() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([
    {
      id: 1,
      nome: "Orçamento Principal - Obra Residencial",
      obraId: 1,
      dataCriacao: "2026-01-10",
      status: "em_execucao",
      itens: [
        { id: 1, categoria: "materiais", descricao: "Cimento CP-II", unidade: "kg", quantidade: 5000, valorUnitario: 0.85, valorTotal: 4250 },
        { id: 2, categoria: "materiais", descricao: "Areia média", unidade: "m³", quantidade: 50, valorUnitario: 120, valorTotal: 6000 },
        { id: 3, categoria: "materiais", descricao: "Tijolo cerâmico", unidade: "un", quantidade: 10000, valorUnitario: 0.95, valorTotal: 9500 },
        { id: 4, categoria: "mao_de_obra", descricao: "Pedreiro", unidade: "dia", quantidade: 60, valorUnitario: 180, valorTotal: 10800 },
        { id: 5, categoria: "mao_de_obra", descricao: "Servente", unidade: "dia", quantidade: 60, valorUnitario: 100, valorTotal: 6000 },
        { id: 6, categoria: "equipamentos", descricao: "Betoneira 400L", unidade: "dia", quantidade: 30, valorUnitario: 80, valorTotal: 2400 },
        { id: 7, categoria: "servicos", descricao: "Instalação elétrica", unidade: "vb", quantidade: 1, valorUnitario: 8500, valorTotal: 8500 },
        { id: 8, categoria: "servicos", descricao: "Instalação hidráulica", unidade: "vb", quantidade: 1, valorUnitario: 6500, valorTotal: 6500 },
      ],
      custosRealizados: [
        { id: 1, itemId: 1, data: "2026-01-12", descricao: "Compra cimento - 1ª remessa", valor: 2125, notaFiscal: "NF-001234", fornecedor: "Materiais ABC" },
        { id: 2, itemId: 2, data: "2026-01-12", descricao: "Areia - entrega completa", valor: 6200, notaFiscal: "NF-001235", fornecedor: "Areial São José" },
        { id: 3, itemId: 3, data: "2026-01-13", descricao: "Tijolos - 1ª entrega", valor: 4750, notaFiscal: "NF-001240", fornecedor: "Cerâmica Central" },
        { id: 4, itemId: 4, data: "2026-01-15", descricao: "Pagamento pedreiros - semana 1", valor: 3600, fornecedor: "Equipe própria" },
        { id: 5, itemId: 5, data: "2026-01-15", descricao: "Pagamento serventes - semana 1", valor: 2000, fornecedor: "Equipe própria" },
      ]
    }
  ]);

  const [orcamentoAtivo, setOrcamentoAtivo] = useState<Orcamento>(orcamentos[0]);
  const [dialogNovoItem, setDialogNovoItem] = useState(false);
  const [dialogNovoCusto, setDialogNovoCusto] = useState(false);
  const [novoItem, setNovoItem] = useState<Partial<ItemOrcamento>>({});
  const [novoCusto, setNovoCusto] = useState<Partial<CustoRealizado>>({});

  // Cálculos
  const totalOrcado = orcamentoAtivo.itens.reduce((acc, item) => acc + item.valorTotal, 0);
  const totalRealizado = orcamentoAtivo.custosRealizados.reduce((acc, custo) => acc + custo.valor, 0);
  const saldo = totalOrcado - totalRealizado;
  const percentualExecutado = (totalRealizado / totalOrcado) * 100;

  // Custos por categoria
  const custosPorCategoria = categoriasOrcamento.map(cat => {
    const orcado = orcamentoAtivo.itens
      .filter(item => item.categoria === cat.id)
      .reduce((acc, item) => acc + item.valorTotal, 0);
    
    const realizado = orcamentoAtivo.custosRealizados
      .filter(custo => {
        const item = orcamentoAtivo.itens.find(i => i.id === custo.itemId);
        return item?.categoria === cat.id;
      })
      .reduce((acc, custo) => acc + custo.valor, 0);

    return {
      ...cat,
      orcado,
      realizado,
      diferenca: orcado - realizado,
      percentual: orcado > 0 ? (realizado / orcado) * 100 : 0
    };
  });

  const handleAdicionarItem = () => {
    if (!novoItem.descricao || !novoItem.categoria || !novoItem.quantidade || !novoItem.valorUnitario) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const item: ItemOrcamento = {
      id: Math.max(...orcamentoAtivo.itens.map(i => i.id), 0) + 1,
      categoria: novoItem.categoria!,
      descricao: novoItem.descricao!,
      unidade: novoItem.unidade || "un",
      quantidade: novoItem.quantidade!,
      valorUnitario: novoItem.valorUnitario!,
      valorTotal: novoItem.quantidade! * novoItem.valorUnitario!
    };

    setOrcamentoAtivo({
      ...orcamentoAtivo,
      itens: [...orcamentoAtivo.itens, item]
    });

    setNovoItem({});
    setDialogNovoItem(false);
    toast.success("Item adicionado ao orçamento!");
  };

  const handleAdicionarCusto = () => {
    if (!novoCusto.itemId || !novoCusto.valor || !novoCusto.descricao) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const custo: CustoRealizado = {
      id: Math.max(...orcamentoAtivo.custosRealizados.map(c => c.id), 0) + 1,
      itemId: novoCusto.itemId!,
      data: novoCusto.data || new Date().toISOString().split('T')[0],
      descricao: novoCusto.descricao!,
      valor: novoCusto.valor!,
      notaFiscal: novoCusto.notaFiscal,
      fornecedor: novoCusto.fornecedor
    };

    setOrcamentoAtivo({
      ...orcamentoAtivo,
      custosRealizados: [...orcamentoAtivo.custosRealizados, custo]
    });

    setNovoCusto({});
    setDialogNovoCusto(false);
    toast.success("Custo registrado com sucesso!");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calculator className="h-7 w-7 text-amber-500" />
            Orçamentos e Custos
          </h1>
          <p className="text-muted-foreground">Gerencie orçamentos e acompanhe os custos das suas obras</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-black">
            <Plus className="h-4 w-4" />
            Novo Orçamento
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orçado</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalOrcado)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Realizado</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRealizado)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={percentualExecutado} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{percentualExecutado.toFixed(1)}% executado</p>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-l-4 ${saldo >= 0 ? 'border-l-green-500' : 'border-l-red-500'}`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Saldo</p>
                <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(saldo)}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-full ${saldo >= 0 ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center`}>
                {saldo >= 0 ? (
                  <TrendingUp className="h-6 w-6 text-green-600" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Itens no Orçamento</p>
                <p className="text-2xl font-bold text-gray-900">{orcamentoAtivo.itens.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Conteúdo */}
      <Tabs defaultValue="itens" className="space-y-4">
        <TabsList className="bg-amber-50">
          <TabsTrigger value="itens" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            Itens do Orçamento
          </TabsTrigger>
          <TabsTrigger value="custos" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            Custos Realizados
          </TabsTrigger>
          <TabsTrigger value="categorias" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            Por Categoria
          </TabsTrigger>
        </TabsList>

        {/* Tab: Itens do Orçamento */}
        <TabsContent value="itens">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Itens do Orçamento</CardTitle>
                <CardDescription>Lista de todos os itens orçados para a obra</CardDescription>
              </div>
              <Dialog open={dialogNovoItem} onOpenChange={setDialogNovoItem}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-black">
                    <Plus className="h-4 w-4" />
                    Adicionar Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Novo Item de Orçamento</DialogTitle>
                    <DialogDescription>Adicione um novo item ao orçamento da obra</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Categoria</Label>
                      <Select value={novoItem.categoria} onValueChange={(v) => setNovoItem({...novoItem, categoria: v})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoriasOrcamento.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.nome}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Descrição</Label>
                      <Input 
                        placeholder="Ex: Cimento CP-II"
                        value={novoItem.descricao || ''}
                        onChange={(e) => setNovoItem({...novoItem, descricao: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Unidade</Label>
                        <Select value={novoItem.unidade} onValueChange={(v) => setNovoItem({...novoItem, unidade: v})}>
                          <SelectTrigger>
                            <SelectValue placeholder="un" />
                          </SelectTrigger>
                          <SelectContent>
                            {unidades.map(un => (
                              <SelectItem key={un} value={un}>{un}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Quantidade</Label>
                        <Input 
                          type="number"
                          placeholder="0"
                          value={novoItem.quantidade || ''}
                          onChange={(e) => setNovoItem({...novoItem, quantidade: parseFloat(e.target.value)})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Valor Unitário (R$)</Label>
                      <Input 
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        value={novoItem.valorUnitario || ''}
                        onChange={(e) => setNovoItem({...novoItem, valorUnitario: parseFloat(e.target.value)})}
                      />
                    </div>
                    {novoItem.quantidade && novoItem.valorUnitario && (
                      <div className="p-3 bg-amber-50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Valor Total</p>
                        <p className="text-xl font-bold text-amber-600">
                          {formatCurrency(novoItem.quantidade * novoItem.valorUnitario)}
                        </p>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogNovoItem(false)}>Cancelar</Button>
                    <Button onClick={handleAdicionarItem} className="bg-amber-500 hover:bg-amber-600 text-black">
                      Adicionar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-center">Qtd</TableHead>
                      <TableHead className="text-center">Un</TableHead>
                      <TableHead className="text-right">Valor Unit.</TableHead>
                      <TableHead className="text-right">Valor Total</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orcamentoAtivo.itens.map((item) => {
                      const categoria = categoriasOrcamento.find(c => c.id === item.categoria);
                      const Icon = categoria?.icon || Package;
                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-amber-500" />
                              <span className="text-sm">{categoria?.nome}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{item.descricao}</TableCell>
                          <TableCell className="text-center">{item.quantidade}</TableCell>
                          <TableCell className="text-center">{item.unidade}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.valorUnitario)}</TableCell>
                          <TableCell className="text-right font-semibold">{formatCurrency(item.valorTotal)}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
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

        {/* Tab: Custos Realizados */}
        <TabsContent value="custos">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Custos Realizados</CardTitle>
                <CardDescription>Registro de todos os custos efetivamente realizados</CardDescription>
              </div>
              <Dialog open={dialogNovoCusto} onOpenChange={setDialogNovoCusto}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-black">
                    <Plus className="h-4 w-4" />
                    Registrar Custo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Registrar Custo</DialogTitle>
                    <DialogDescription>Registre um custo realizado na obra</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Item do Orçamento</Label>
                      <Select value={novoCusto.itemId?.toString()} onValueChange={(v) => setNovoCusto({...novoCusto, itemId: parseInt(v)})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o item" />
                        </SelectTrigger>
                        <SelectContent>
                          {orcamentoAtivo.itens.map(item => (
                            <SelectItem key={item.id} value={item.id.toString()}>{item.descricao}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Input 
                        type="date"
                        value={novoCusto.data || new Date().toISOString().split('T')[0]}
                        onChange={(e) => setNovoCusto({...novoCusto, data: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Descrição</Label>
                      <Input 
                        placeholder="Ex: Compra de materiais"
                        value={novoCusto.descricao || ''}
                        onChange={(e) => setNovoCusto({...novoCusto, descricao: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Valor (R$)</Label>
                      <Input 
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        value={novoCusto.valor || ''}
                        onChange={(e) => setNovoCusto({...novoCusto, valor: parseFloat(e.target.value)})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nota Fiscal (opcional)</Label>
                        <Input 
                          placeholder="NF-000000"
                          value={novoCusto.notaFiscal || ''}
                          onChange={(e) => setNovoCusto({...novoCusto, notaFiscal: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Fornecedor (opcional)</Label>
                        <Input 
                          placeholder="Nome do fornecedor"
                          value={novoCusto.fornecedor || ''}
                          onChange={(e) => setNovoCusto({...novoCusto, fornecedor: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogNovoCusto(false)}>Cancelar</Button>
                    <Button onClick={handleAdicionarCusto} className="bg-amber-500 hover:bg-amber-600 text-black">
                      Registrar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>NF</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orcamentoAtivo.custosRealizados.map((custo) => {
                      const item = orcamentoAtivo.itens.find(i => i.id === custo.itemId);
                      return (
                        <TableRow key={custo.id}>
                          <TableCell>{new Date(custo.data).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell className="font-medium">{item?.descricao}</TableCell>
                          <TableCell>{custo.descricao}</TableCell>
                          <TableCell>{custo.fornecedor || '-'}</TableCell>
                          <TableCell>
                            {custo.notaFiscal ? (
                              <Badge variant="outline">{custo.notaFiscal}</Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell className="text-right font-semibold">{formatCurrency(custo.valor)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Por Categoria */}
        <TabsContent value="categorias">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {custosPorCategoria.map((cat) => {
              const Icon = cat.icon;
              const isOver = cat.realizado > cat.orcado;
              return (
                <Card key={cat.id} className={`${isOver ? 'border-red-200 bg-red-50/50' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-10 w-10 rounded-lg ${isOver ? 'bg-red-100' : 'bg-amber-100'} flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${isOver ? 'text-red-600' : 'text-amber-600'}`} />
                        </div>
                        <CardTitle className="text-base">{cat.nome}</CardTitle>
                      </div>
                      {isOver && (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Acima
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Orçado:</span>
                        <span className="font-medium">{formatCurrency(cat.orcado)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Realizado:</span>
                        <span className={`font-medium ${isOver ? 'text-red-600' : ''}`}>{formatCurrency(cat.realizado)}</span>
                      </div>
                      <Progress value={Math.min(cat.percentual, 100)} className={`h-2 ${isOver ? '[&>div]:bg-red-500' : ''}`} />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{cat.percentual.toFixed(1)}% executado</span>
                        <div className={`flex items-center gap-1 text-sm font-medium ${cat.diferenca >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {cat.diferenca >= 0 ? (
                            <ArrowDownRight className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                          {formatCurrency(Math.abs(cat.diferenca))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
