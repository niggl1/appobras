import PDFDocument from "pdfkit";
import { Readable } from "stream";

interface OSPDFData {
  protocolo: string;
  titulo: string;
  descricao: string;
  responsavelPrincipalNome?: string;
  tempoEstimadoDias: number;
  tempoEstimadoHoras: number;
  tempoEstimadoMinutos: number;
  latitude?: string;
  longitude?: string;
  localizacaoDescricao?: string;
  materiais: Array<{ nome: string; quantidade: number }>;
  imagens: Array<{ url: string }>;
  dataCriacao: Date;
  prioridadeNome?: string;
  categoriaNome?: string;
  setorNome?: string;
}

export async function generateOSPDF(data: OSPDFData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Header
    doc
      .fontSize(24)
      .fillColor("#FF8C00")
      .text("RELATÓRIO DE ORDEM DE SERVIÇO", { align: "center" });

    doc.moveDown(0.5);
    doc.strokeColor("#FF8C00").lineWidth(2).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
    doc.moveDown(0.5);

    // Protocolo and Date
    doc.fontSize(11).fillColor("#000000");
    doc.text(`Protocolo: ${data.protocolo}`);
    doc.text(
      `Data de Geração: ${new Date().toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}`
    );
    doc.moveDown(0.5);

    // Section: Informações Principais
    doc.fontSize(14).fillColor("#FF8C00").text("INFORMAÇÕES PRINCIPAIS");
    doc.fontSize(10).fillColor("#000000");
    doc.moveDown(0.3);

    const infoData = [
      [`Título: ${data.titulo}`, `Responsável: ${data.responsavelPrincipalNome || "N/A"}`],
      [`Categoria: ${data.categoriaNome || "N/A"}`, `Setor: ${data.setorNome || "N/A"}`],
      [`Prioridade: ${data.prioridadeNome || "N/A"}`, ""],
    ];

    for (const [left, right] of infoData) {
      doc.text(left, 40, doc.y, { width: 250, continued: right ? true : false });
      if (right) {
        doc.text(right, 300, doc.y - 15, { width: 250 });
      }
      doc.moveDown(0.3);
    }

    doc.moveDown(0.5);

    // Section: Descrição do Serviço
    doc.fontSize(14).fillColor("#FF8C00").text("DESCRIÇÃO DO SERVIÇO");
    doc.fontSize(10).fillColor("#000000");
    doc.moveDown(0.3);

    doc.text(data.descricao, {
      align: "justify",
      lineGap: 5,
    });

    doc.moveDown(0.5);

    // Section: Prazo para Conclusão
    doc.fontSize(14).fillColor("#FF8C00").text("PRAZO PARA CONCLUSÃO");
    doc.fontSize(10).fillColor("#000000");
    doc.moveDown(0.3);

    const totalHours =
      data.tempoEstimadoDias * 24 +
      data.tempoEstimadoHoras +
      data.tempoEstimadoMinutos / 60;
    const prazoText = `${data.tempoEstimadoDias}d ${data.tempoEstimadoHoras}h ${data.tempoEstimadoMinutos}min (Total: ${totalHours.toFixed(1)} horas)`;

    doc.text(prazoText);
    doc.moveDown(0.5);

    // Section: Localização
    if (data.latitude && data.longitude) {
      doc.fontSize(14).fillColor("#FF8C00").text("LOCALIZAÇÃO");
      doc.fontSize(10).fillColor("#000000");
      doc.moveDown(0.3);

      doc.text(`Latitude: ${data.latitude}`);
      doc.text(`Longitude: ${data.longitude}`);

      if (data.localizacaoDescricao) {
        doc.text(`Descrição: ${data.localizacaoDescricao}`);
      }

      doc.moveDown(0.3);
      doc.fontSize(9).fillColor("#808080");
      doc.text("Mapa: https://maps.google.com/maps?q=" + data.latitude + "," + data.longitude);
      doc.moveDown(0.5);
    }

    // Section: Materiais
    if (data.materiais.length > 0) {
      doc.fontSize(14).fillColor("#FF8C00").text("MATERIAIS NECESSÁRIOS");
      doc.fontSize(10).fillColor("#000000");
      doc.moveDown(0.3);

      // Table header
      const tableTop = doc.y;
      const col1 = 40;
      const col2 = 350;

      doc.text("Material", col1, tableTop);
      doc.text("Quantidade", col2, tableTop);

      // Separator line
      doc.strokeColor("#CCCCCC").lineWidth(1);
      doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();
      doc.moveDown(0.3);

      // Table rows
      for (const material of data.materiais) {
        doc.fillColor("#000000").text(material.nome, col1, doc.y);
        doc.text(material.quantidade.toString(), col2, doc.y - 15);
        doc.moveDown(0.4);
      }

      doc.moveDown(0.5);
    }

    // Section: Imagens
    if (data.imagens.length > 0) {
      doc.fontSize(14).fillColor("#FF8C00").text("IMAGENS");
      doc.fontSize(10).fillColor("#000000");
      doc.moveDown(0.3);

      doc.text(`Total de imagens: ${data.imagens.length}`);

      for (let i = 0; i < data.imagens.length; i++) {
        const image = data.imagens[i];
        doc.text(`${i + 1}. ${image.url}`);
      }

      doc.moveDown(0.5);
    }

    // Footer
    doc.moveDown(1);
    doc.strokeColor("#CCCCCC").lineWidth(1);
    doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();
    doc.moveDown(0.3);

    doc.fontSize(8).fillColor("#808080");
    doc.text("Documento gerado automaticamente pelo Sistema de Manutenção", {
      align: "center",
    });

    doc.end();
  });
}
