import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Share2, 
  Users, 
  MessageCircle, 
  Mail, 
  Send,
  CheckCircle,
  User,
  Phone
} from "lucide-react";

interface MembroEquipe {
  id: number;
  nome: string;
  whatsapp: string | null;
  email: string | null;
  cargo: string | null;
  fotoUrl: string | null;
}

interface CompartilharComEquipeProps {
  condominioId: number;
  tipo: "vistoria" | "manutencao" | "ocorrencia" | "checklist" | "antes_depois";
  itemId: number;
  itemTitulo: string;
  itemDescricao?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CompartilharComEquipe({
  condominioId,
  tipo,
  itemId,
  itemTitulo,
  itemDescricao,
  open,
  onOpenChange,
}: CompartilharComEquipeProps) {
  const [membrosSelecionados, setMembrosSelecionados] = useState<number[]>([]);
  const [mensagemPersonalizada, setMensagemPersonalizada] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviadosPorWhatsapp, setEnviadosPorWhatsapp] = useState<number[]>([]);
  const [enviadosPorEmail, setEnviadosPorEmail] = useState<number[]>([]);

  const { data: membros, isLoading } = trpc.membroEquipe.list.useQuery(
    { condominioId },
    { enabled: open }
  );

  const enviarEmailMutation = trpc.membroEquipe.enviarCompartilhamento.useMutation({
    onSuccess: (result) => {
      if (result.sucesso) {
        toast.success(`Email enviado para ${result.destinatario}`);
        setEnviadosPorEmail(prev => [...prev, result.membroId]);
      } else {
        toast.error(`Erro ao enviar para ${result.destinatario}: ${result.erro}`);
      }
    },
    onError: (error) => {
      toast.error("Erro ao enviar email: " + error.message);
    },
  });

  const getTipoLabel = () => {
    switch (tipo) {
      case "vistoria": return "Vistoria";
      case "manutencao": return "Manutenção";
      case "ocorrencia": return "Ocorrência";
      case "checklist": return "Checklist";
      case "antes_depois": return "Antes e Depois";
      default: return "Item";
    }
  };

  const getMensagemBase = () => {
    const tipoLabel = getTipoLabel();
    let mensagem = `*${tipoLabel}*\n\n`;
    mensagem += `📋 *Título:* ${itemTitulo}\n`;
    if (itemDescricao) {
      mensagem += `📝 *Descrição:* ${itemDescricao}\n`;
    }
    if (mensagemPersonalizada) {
      mensagem += `\n💬 *Mensagem:* ${mensagemPersonalizada}\n`;
    }
    mensagem += `\n_Compartilhado via App Manutenção_`;
    return mensagem;
  };

  const handleToggleMembro = (membroId: number) => {
    setMembrosSelecionados(prev => 
      prev.includes(membroId) 
        ? prev.filter(id => id !== membroId)
        : [...prev, membroId]
    );
  };

  const handleSelecionarTodos = () => {
    if (membros) {
      const todosIds = membros.map(m => m.id);
      if (membrosSelecionados.length === todosIds.length) {
        setMembrosSelecionados([]);
      } else {
        setMembrosSelecionados(todosIds);
      }
    }
  };

  const handleEnviarWhatsApp = (membro: MembroEquipe) => {
    if (!membro.whatsapp) {
      toast.error("Este membro não tem WhatsApp cadastrado");
      return;
    }

    const mensagem = getMensagemBase();
    const numeroLimpo = membro.whatsapp.replace(/\D/g, "");
    const url = `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, "_blank");
    setEnviadosPorWhatsapp(prev => [...prev, membro.id]);
    toast.success(`WhatsApp aberto para ${membro.nome}`);
  };

  const handleEnviarEmail = async (membro: MembroEquipe) => {
    if (!membro.email) {
      toast.error("Este membro não tem email cadastrado");
      return;
    }

    setEnviando(true);
    try {
      await enviarEmailMutation.mutateAsync({
        membroId: membro.id,
        email: membro.email,
        nome: membro.nome,
        tipo,
        itemId,
        itemTitulo,
        itemDescricao: itemDescricao || "",
        mensagemPersonalizada,
      });
    } finally {
      setEnviando(false);
    }
  };

  const handleEnviarParaSelecionados = async (metodo: "whatsapp" | "email") => {
    if (membrosSelecionados.length === 0) {
      toast.error("Selecione pelo menos um membro");
      return;
    }

    const membrosParaEnviar = membros?.filter(m => membrosSelecionados.includes(m.id)) || [];
    
    if (metodo === "whatsapp") {
      for (const membro of membrosParaEnviar) {
        if (membro.whatsapp) {
          handleEnviarWhatsApp(membro);
        }
      }
    } else {
      setEnviando(true);
      for (const membro of membrosParaEnviar) {
        if (membro.email) {
          await handleEnviarEmail(membro);
        }
      }
      setEnviando(false);
    }
  };

  const resetState = () => {
    setMembrosSelecionados([]);
    setMensagemPersonalizada("");
    setEnviadosPorWhatsapp([]);
    setEnviadosPorEmail([]);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetState();
      onOpenChange(isOpen);
    }}>
      <DialogContent className="w-[95vw] sm:max-w-xl max-h-[90vh] overflow-hidden p-0 rounded-2xl border-0 shadow-2xl">
        {/* Header Premium */}
        <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 px-6 py-5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <DialogHeader className="relative z-10">
            <DialogTitle className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold block">Compartilhar com Equipe</span>
                <span className="text-sm text-white/80 font-normal">{getTipoLabel()}: {itemTitulo}</span>
              </div>
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Conteúdo */}
        <div className="overflow-y-auto max-h-[60vh] px-6 py-4">
          {/* Mensagem Personalizada */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Mensagem personalizada (opcional)
            </label>
            <Textarea
              placeholder="Adicione uma mensagem para os membros..."
              value={mensagemPersonalizada}
              onChange={(e) => setMensagemPersonalizada(e.target.value)}
              className="resize-none h-20"
            />
          </div>

          {/* Ações em Lote */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelecionarTodos}
              className="text-sm"
            >
              <Users className="w-4 h-4 mr-1" />
              {membrosSelecionados.length === membros?.length ? "Desmarcar Todos" : "Selecionar Todos"}
            </Button>
            
            {membrosSelecionados.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => handleEnviarParaSelecionados("whatsapp")}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  WhatsApp ({membrosSelecionados.length})
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleEnviarParaSelecionados("email")}
                  disabled={enviando}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Email ({membrosSelecionados.length})
                </Button>
              </div>
            )}
          </div>

          {/* Lista de Membros */}
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-3 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            </div>
          ) : !membros || membros.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Nenhum membro cadastrado
              </h3>
              <p className="text-sm text-gray-500">
                Adicione membros à equipe para compartilhar.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {membros.map((membro) => (
                <div
                  key={membro.id}
                  className={`p-4 rounded-xl border transition-all ${
                    membrosSelecionados.includes(membro.id)
                      ? "bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <Checkbox
                      checked={membrosSelecionados.includes(membro.id)}
                      onCheckedChange={() => handleToggleMembro(membro.id)}
                      className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />

                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center overflow-hidden">
                      {membro.fotoUrl ? (
                        <img src={membro.fotoUrl} alt={membro.nome} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-white" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {membro.nome}
                      </h4>
                      {membro.cargo && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {membro.cargo}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        {membro.whatsapp && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {membro.whatsapp}
                          </span>
                        )}
                        {membro.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {membro.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Ações Individuais */}
                    <div className="flex items-center gap-2">
                      {membro.whatsapp && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEnviarWhatsApp(membro)}
                          className={`p-2 ${
                            enviadosPorWhatsapp.includes(membro.id)
                              ? "text-green-600 bg-green-100"
                              : "text-green-600"
                          }`}
                          title="Enviar via WhatsApp"
                        >
                          {enviadosPorWhatsapp.includes(membro.id) ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <MessageCircle className="w-5 h-5" />
                          )}
                        </Button>
                      )}
                      {membro.email && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEnviarEmail(membro)}
                          disabled={enviando}
                          className={`p-2 ${
                            enviadosPorEmail.includes(membro.id)
                              ? "text-blue-600 bg-blue-100"
                              : "text-blue-600"
                          }`}
                          title="Enviar via Email"
                        >
                          {enviadosPorEmail.includes(membro.id) ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Mail className="w-5 h-5" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {enviadosPorWhatsapp.length + enviadosPorEmail.length > 0 && (
                <>
                  <CheckCircle className="w-4 h-4 inline mr-1 text-green-500" />
                  {enviadosPorWhatsapp.length + enviadosPorEmail.length} enviado(s)
                </>
              )}
            </span>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Botão de compartilhar para usar nas páginas
interface BotaoCompartilharProps {
  condominioId: number;
  tipo: "vistoria" | "manutencao" | "ocorrencia" | "checklist" | "antes_depois";
  itemId: number;
  itemTitulo: string;
  itemDescricao?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function BotaoCompartilhar({
  condominioId,
  tipo,
  itemId,
  itemTitulo,
  itemDescricao,
  variant = "ghost",
  size = "sm",
  className = "",
}: BotaoCompartilharProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setOpen(true)}
        className={`text-orange-600 ${className}`}
        title="Compartilhar com equipe"
      >
        <Share2 className="w-4 h-4" />
      </Button>
      
      <CompartilharComEquipe
        condominioId={condominioId}
        tipo={tipo}
        itemId={itemId}
        itemTitulo={itemTitulo}
        itemDescricao={itemDescricao}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
