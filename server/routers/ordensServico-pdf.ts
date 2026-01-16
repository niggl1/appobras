import { protectedProcedure } from "../_core/procedures";
import { z } from "zod";
import { generateOSPDF } from "../pdf-generator";
import { db } from "../db";
import { ordensServico, osImagens } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const ordensServicoPDFRouter = {
  generatePDF: protectedProcedure
    .input(z.object({ osId: z.number() }))
    .mutation(async ({ input }: any) => {
      try {
        // Buscar ordem de serviço
        const os = await db.query.ordensServico.findFirst({
          where: eq(ordensServico.id, input.osId),
        });

        if (!os) {
          throw new Error("Ordem de serviço não encontrada");
        }

        // Buscar imagens
        const imagens = (await db.query.osImagens.findMany({
          where: eq(osImagens.osId, input.osId),
        })) as any[];

        // Preparar dados para PDF
        const pdfData = {
          protocolo: os.protocolo,
          titulo: os.titulo,
          descricao: os.descricao,
          responsavelPrincipalNome: os.responsavelPrincipalNome,
          tempoEstimadoDias: os.tempoEstimadoDias,
          tempoEstimadoHoras: os.tempoEstimadoHoras,
          tempoEstimadoMinutos: os.tempoEstimadoMinutos,
          latitude: os.latitude,
          longitude: os.longitude,
          localizacaoDescricao: os.localizacaoDescricao,
          materiais: os.materiais || [],
          imagens: imagens.map((img: any) => ({ url: img.url })),
          dataCriacao: os.dataCriacao,
          prioridadeNome: os.prioridadeNome,
          categoriaNome: os.categoriaNome,
          setorNome: os.setorNome,
        };

        // Gerar PDF
        const pdfBuffer = await generateOSPDF(pdfData);

        // Retornar base64 para download
        return {
          success: true,
          pdfBase64: pdfBuffer.toString("base64"),
          filename: `OS-${os.protocolo}-${new Date().toISOString().split("T")[0]}.pdf`,
        };
      } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        const errorMessage = error instanceof Error ? error.message : "Desconhecido";
        throw new Error(`Erro ao gerar PDF: ${errorMessage}`);
      }
    }),
} as any;
