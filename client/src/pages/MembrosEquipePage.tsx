import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Phone, User, Briefcase, MessageCircle } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

interface MembrosEquipePageProps {
  condominioId: number;
}

export function MembrosEquipePage({ condominioId }: MembrosEquipePageProps) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    descricao: "",
    cargo: "",
    fotoUrl: "",
  });

  const { data: membros, refetch } = trpc.membroEquipe.list.useQuery({ condominioId });
  const createMutation = trpc.membroEquipe.create.useMutation({
    onSuccess: () => {
      toast.success("Membro adicionado com sucesso!");
      refetch();
      resetForm();
    },
    onError: () => toast.error("Erro ao adicionar membro"),
  });
  const updateMutation = trpc.membroEquipe.update.useMutation({
    onSuccess: () => {
      toast.success("Membro atualizado com sucesso!");
      refetch();
      resetForm();
    },
    onError: () => toast.error("Erro ao atualizar membro"),
  });
  const deleteMutation = trpc.membroEquipe.delete.useMutation({
    onSuccess: () => {
      toast.success("Membro removido com sucesso!");
      refetch();
    },
    onError: () => toast.error("Erro ao remover membro"),
  });

  const resetForm = () => {
    setFormData({ nome: "", whatsapp: "", descricao: "", cargo: "", fotoUrl: "" });
    setEditingId(null);
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...formData });
    } else {
      createMutation.mutate({ condominioId, ...formData });
    }
  };

  const handleEdit = (membro: NonNullable<typeof membros>[0]) => {
    setFormData({
      nome: membro.nome,
      whatsapp: membro.whatsapp,
      descricao: membro.descricao || "",
      cargo: membro.cargo || "",
      fotoUrl: membro.fotoUrl || "",
    });
    setEditingId(membro.id);
    setIsOpen(true);
  };

  const formatWhatsApp = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.startsWith("55") ? cleaned : `55${cleaned}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Equipe de Gestão
          </h2>
          <p className="text-muted-foreground mt-1">
            Gerencie os membros da equipe para compartilhamento de vistorias, manutenções e ocorrências
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => resetForm()}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 rounded-xl h-10 px-5 font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Membro
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] sm:max-w-md overflow-y-auto max-h-[90vh] p-0 rounded-2xl border-0 shadow-2xl">
            {/* Header Premium com Gradiente Laranja */}
            <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 px-6 py-5 overflow-hidden">
              {/* Efeito de brilho */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <DialogHeader className="relative z-10">
                <DialogTitle className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold block">
                      {editingId ? "Editar Membro" : "Novo Membro"}
                    </span>
                    <span className="text-orange-100 text-sm font-normal">
                      Equipe de Gestão
                    </span>
                  </div>
                </DialogTitle>
              </DialogHeader>
            </div>
            
            {/* Formulário Premium */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-gradient-to-b from-white to-orange-50/30 dark:from-gray-900 dark:to-gray-900">
              {/* Upload de Foto com estilo premium */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur opacity-30" />
                  <ImageUpload
                    value={formData.fotoUrl}
                    onChange={(url: string | undefined) => setFormData({ ...formData, fotoUrl: url || "" })}
                    className="relative w-24 h-24 rounded-full ring-4 ring-white shadow-xl"
                    placeholder="Foto"
                    compact
                  />
                </div>
              </div>
              
              {/* Campo Nome */}
              <div className="space-y-1.5">
                <Label htmlFor="nome" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  Nome <span className="text-orange-500">*</span>
                </Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Nome completo"
                  required
                  className="h-11 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all"
                />
              </div>
              
              {/* Campo WhatsApp */}
              <div className="space-y-1.5">
                <Label htmlFor="whatsapp" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-orange-500" />
                  WhatsApp <span className="text-orange-500">*</span>
                </Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="(11) 99999-9999"
                  required
                  className="h-11 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all"
                />
              </div>
              
              {/* Campo Cargo */}
              <div className="space-y-1.5">
                <Label htmlFor="cargo" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-orange-500" />
                  Cargo
                </Label>
                <Input
                  id="cargo"
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  placeholder="Ex: Zelador, Porteiro, Técnico"
                  className="h-11 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all"
                />
              </div>
              
              {/* Campo Descrição */}
              <div className="space-y-1.5">
                <Label htmlFor="descricao" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Descrição
                </Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Responsabilidades e observações"
                  rows={2}
                  className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all resize-none"
                />
              </div>
            </form>
            
            {/* Botões Premium */}
            <div className="flex gap-3 px-6 py-4 bg-gray-50/80 dark:bg-gray-900/80 border-t border-gray-100 dark:border-gray-800">
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetForm} 
                className="flex-1 h-11 rounded-xl border-gray-200 hover:bg-gray-100 transition-all"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmit}
                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/30"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Salvando...
                  </span>
                ) : (
                  editingId ? "Salvar Alterações" : "Adicionar Membro"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Membros */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {membros?.map((membro) => (
          <Card key={membro.id} className="group hover:shadow-xl transition-all duration-300 border border-orange-100 dark:border-orange-900/30 bg-gradient-to-br from-white to-orange-50/30 dark:from-slate-900 dark:to-slate-800 rounded-xl overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {membro.fotoUrl ? (
                    <img
                      src={membro.fotoUrl}
                      alt={membro.nome}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500/20"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-semibold text-lg shadow-lg shadow-orange-500/20">
                      {membro.nome.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-base font-semibold">{membro.nome}</CardTitle>
                    {membro.cargo && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {membro.cargo}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEdit(membro)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => deleteMutation.mutate({ id: membro.id })}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {membro.descricao && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {membro.descricao}
                </p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {membro.whatsapp}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 border-orange-200 hover:bg-orange-50 rounded-lg"
                  onClick={() => {
                    const phone = formatWhatsApp(membro.whatsapp);
                    window.open(`https://wa.me/${phone}`, "_blank");
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {(!membros || membros.length === 0) && (
          <Card className="col-span-full py-12 border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Nenhum membro cadastrado</h3>
              <p className="text-muted-foreground mb-4 max-w-sm">
                Adicione membros da equipe para facilitar o compartilhamento de vistorias, manutenções e ocorrências via WhatsApp.
              </p>
              <Button 
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Membro
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
