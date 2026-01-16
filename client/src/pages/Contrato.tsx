import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Printer,
  Share2,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { Link } from "wouter";
import html2pdf from "html2pdf.js";


const PLANOS = [
  { id: "individual", nome: "Individual", usuarios: 1, valor: 99 },
  { id: "pequenas", nome: "Pequenas Equipes", usuarios: 3, valor: 199 },
  { id: "medias", nome: "Equipes Médias", usuarios: 5, valor: 299 },
];

const EMPRESA = {
  nome: "APP GROUP LTDA",
  cnpj: "51.797.070/0001-53",
  endereco: "Avenida Paulista, 1106 - Sala 01 - Andar 16",
  bairro: "Bela Vista",
  cidade: "São Paulo",
  estado: "SP",
  cep: "01.310-914",
  email: "abertura@contabilizei.com.br",
  telefone: "(41) 9888-0068",
};

export default function Contrato() {
  const [formData, setFormData] = useState({
    nomeCliente: "",
    cnpjCliente: "",
    plano: "",
    dataInicio: new Date().toISOString().split("T")[0],
  });

  const [mostrarContrato, setMostrarContrato] = useState(false);
  const contratoRef = useRef<HTMLDivElement>(null);

  const planoSelecionado = PLANOS.find((p) => p.id === formData.plano);
  const valorMensal = planoSelecionado?.valor || 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlanChange = (value: string) => {
    setFormData((prev) => ({ ...prev, plano: value }));
  };

  const handleGerarPDF = () => {
    if (!contratoRef.current) return;

    const element = contratoRef.current;
    const opt: any = {
      margin: 10,
      filename: `contrato-${formData.nomeCliente || "app-manutencao"}.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    };

    (html2pdf() as any).set(opt).from(element).save();
  };

  const handleImprimir = () => {
    if (!contratoRef.current) return;
    const printWindow = window.open("", "", "height=600,width=800");
    if (printWindow) {
      printWindow.document.write(
        "<html><head><title>Contrato</title><style>body { font-family: Arial, sans-serif; }</style></head><body>"
      );
      printWindow.document.write(contratoRef.current.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleCompartilhar = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Contrato App Manutenção",
          text: `Contrato para ${formData.nomeCliente}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Compartilhamento cancelado");
      }
    } else {
      // Fallback para copiar link
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Contrato de Serviço</h1>
          <div className="w-20" />
        </div>

        {!mostrarContrato ? (
          // Formulário
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardTitle>Preencha os dados para gerar seu contrato</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Nome do Cliente */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nome da Empresa *
                  </label>
                  <input
                    type="text"
                    name="nomeCliente"
                    value={formData.nomeCliente}
                    onChange={handleInputChange}
                    placeholder="Ex: Empresa XYZ LTDA"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* CNPJ do Cliente */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    CNPJ da Empresa *
                  </label>
                  <input
                    type="text"
                    name="cnpjCliente"
                    value={formData.cnpjCliente}
                    onChange={handleInputChange}
                    placeholder="Ex: 12.345.678/0001-90"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Seleção de Plano */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Selecione o Plano *
                  </label>
                  <Select value={formData.plano} onValueChange={handlePlanChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Escolha um plano" />
                    </SelectTrigger>
                    <SelectContent>
                      {PLANOS.map((plano) => (
                        <SelectItem key={plano.id} value={plano.id}>
                          {plano.nome} - {plano.usuarios} usuário(s) - R${plano.valor}/mês
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Data de Início */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Data de Início *
                  </label>
                  <input
                    type="date"
                    name="dataInicio"
                    value={formData.dataInicio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Resumo do Contrato */}
                {formData.nomeCliente && formData.plano && (
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-3">Resumo do Contrato</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Empresa Contratante:</strong> {formData.nomeCliente}
                      </p>
                      <p>
                        <strong>CNPJ:</strong> {formData.cnpjCliente}
                      </p>
                      <p>
                        <strong>Plano:</strong> {planoSelecionado?.nome}
                      </p>
                      <p>
                        <strong>Usuários:</strong> {planoSelecionado?.usuarios}
                      </p>
                      <p>
                        <strong>Valor Mensal:</strong> R$ {valorMensal.toFixed(2)}
                      </p>
                      <p>
                        <strong>Data de Início:</strong>{" "}
                        {new Date(formData.dataInicio).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                )}

                {/* Botões */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => setMostrarContrato(true)}
                    disabled={!formData.nomeCliente || !formData.cnpjCliente || !formData.plano}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Visualizar Contrato
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Visualização do Contrato
          <div className="space-y-6">
            {/* Botões de Ação */}
            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={() => setMostrarContrato(false)}
                variant="outline"
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Editar
              </Button>
              <Button
                onClick={handleImprimir}
                variant="outline"
                className="gap-2"
              >
                <Printer className="w-4 h-4" />
                Imprimir
              </Button>
              <Button
                onClick={handleGerarPDF}
                className="bg-red-500 hover:bg-red-600 text-white gap-2"
              >
                <Download className="w-4 h-4" />
                Gerar PDF
              </Button>
              <Button
                onClick={handleCompartilhar}
                className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
              >
                <Share2 className="w-4 h-4" />
                Compartilhar
              </Button>
            </div>

            {/* Contrato */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12">
                <div ref={contratoRef} className="space-y-6 text-sm">
                  {/* Cabeçalho */}
                  <div className="text-center border-b-2 border-gray-300 pb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      CONTRATO DE PRESTAÇÃO DE SERVIÇOS
                    </h1>
                    <p className="text-gray-600">
                      Plataforma de Gestão de Manutenção
                    </p>
                  </div>

                  {/* Dados da Empresa */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="font-bold text-gray-900 mb-3">
                      CONTRATANTE (PRESTADORA DE SERVIÇOS):
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <p>
                        <strong>Empresa:</strong> {EMPRESA.nome}
                      </p>
                      <p>
                        <strong>CNPJ:</strong> {EMPRESA.cnpj}
                      </p>
                      <p>
                        <strong>Endereço:</strong> {EMPRESA.endereco}
                      </p>
                      <p>
                        <strong>Cidade:</strong> {EMPRESA.cidade}, {EMPRESA.estado}
                      </p>
                      <p>
                        <strong>CEP:</strong> {EMPRESA.cep}
                      </p>
                      <p>
                        <strong>Email:</strong> {EMPRESA.email}
                      </p>
                      <p>
                        <strong>Telefone:</strong> {EMPRESA.telefone}
                      </p>
                    </div>
                  </div>

                  {/* Dados do Cliente */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="font-bold text-gray-900 mb-3">
                      CONTRATADO (CLIENTE):
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <p>
                        <strong>Empresa:</strong> {formData.nomeCliente}
                      </p>
                      <p>
                        <strong>CNPJ:</strong> {formData.cnpjCliente}
                      </p>
                    </div>
                  </div>

                  {/* Objeto do Contrato */}
                  <div>
                    <h2 className="font-bold text-gray-900 mb-3">
                      1. OBJETO DO CONTRATO
                    </h2>
                    <p className="text-justify leading-relaxed">
                      A {EMPRESA.nome} se compromete a fornecer acesso à plataforma
                      de gestão de manutenção "App Manutenção", incluindo
                      funcionalidades de ordens de serviço, vistorias, checklists,
                      relatórios profissionais, aplicativo mobile e suporte técnico.
                    </p>
                  </div>

                  {/* Plano Contratado */}
                  <div>
                    <h2 className="font-bold text-gray-900 mb-3">
                      2. PLANO CONTRATADO
                    </h2>
                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg space-y-2">
                      <p>
                        <strong>Plano:</strong> {planoSelecionado?.nome}
                      </p>
                      <p>
                        <strong>Número de Usuários:</strong> {planoSelecionado?.usuarios}
                      </p>
                      <p>
                        <strong>Valor Mensal:</strong> R$ {valorMensal.toFixed(2)}
                      </p>
                      <p>
                        <strong>Data de Início:</strong>{" "}
                        {new Date(formData.dataInicio).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  {/* Condições de Pagamento */}
                  <div>
                    <h2 className="font-bold text-gray-900 mb-3">
                      3. CONDIÇÕES DE PAGAMENTO
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-justify">
                      <li>
                        O pagamento deverá ser realizado mensalmente, conforme
                        fatura emitida pela prestadora de serviços.
                      </li>
                      <li>
                        Sem taxa de adesão ou taxa inicial. Acesso imediato após
                        confirmação do pagamento.
                      </li>
                      <li>
                        O cliente poderá cancelar o serviço a qualquer momento sem
                        multas ou penalidades.
                      </li>
                    </ul>
                  </div>

                  {/* Direitos e Responsabilidades */}
                  <div>
                    <h2 className="font-bold text-gray-900 mb-3">
                      4. DIREITOS E RESPONSABILIDADES
                    </h2>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-gray-900">
                          Da Prestadora de Serviços:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-justify ml-2">
                          <li>
                            Fornecer acesso à plataforma conforme especificado
                          </li>
                          <li>Manter suporte técnico disponível</li>
                          <li>
                            Realizar atualizações e melhorias do sistema
                          </li>
                          <li>Garantir segurança dos dados do cliente</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Do Cliente:</p>
                        <ul className="list-disc list-inside space-y-1 text-justify ml-2">
                          <li>Realizar pagamentos conforme acordado</li>
                          <li>Utilizar a plataforma de forma legal e ética</li>
                          <li>
                            Não compartilhar credenciais com terceiros não
                            autorizados
                          </li>
                          <li>Notificar imediatamente sobre acessos não autorizados</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Confidencialidade */}
                  <div>
                    <h2 className="font-bold text-gray-900 mb-3">
                      5. CONFIDENCIALIDADE
                    </h2>
                    <p className="text-justify leading-relaxed">
                      Ambas as partes se comprometem a manter confidencialidade
                      sobre informações sensíveis compartilhadas durante o período
                      de vigência do contrato e após seu término.
                    </p>
                  </div>

                  {/* Vigência */}
                  <div>
                    <h2 className="font-bold text-gray-900 mb-3">
                      6. VIGÊNCIA E RESCISÃO
                    </h2>
                    <p className="text-justify leading-relaxed">
                      Este contrato entra em vigor na data de início especificada
                      acima e permanece válido enquanto o cliente mantiver os
                      pagamentos em dia. O cliente pode cancelar a qualquer momento
                      sem penalidades. A rescisão por inadimplência será efetivada
                      após 30 dias de atraso no pagamento.
                    </p>
                  </div>

                  {/* Assinaturas */}
                  <div className="border-t-2 border-gray-300 pt-8 mt-8">
                    <p className="text-center text-xs mb-8">
                      Contrato gerado em{" "}
                      {new Date().toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="text-center">
                        <p className="border-t border-gray-400 pt-4">
                          <strong>{EMPRESA.nome}</strong>
                          <br />
                          Assinatura
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="border-t border-gray-400 pt-4">
                          <strong>{formData.nomeCliente}</strong>
                          <br />
                          Assinatura
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
