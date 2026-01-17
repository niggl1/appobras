import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { 
  obras, 
  obraOrcamentos, 
  obraOrcamentoItens,
  obraTrabalhadores,
  obraHorasTrabalhadas,
  obraFornecedores,
  obraContratos,
  obraDiarios,
  obraEtapas,
  obraMedicoes,
  obraFotos,
  obraOcorrencias,
  obraMateriais,
  obraPagamentos,
  obraChecklists,
  obraChecklistItens,
  obraDocumentos
} from "../drizzle/schema";
import { eq, and, desc, asc, sql, gte, lte } from "drizzle-orm";

// ==================== OBRAS ====================
export const obrasRouter = router({
  // Listar todas as obras do usuário
  listar: publicProcedure
    .input(z.object({
      usuarioId: z.number(),
      status: z.enum(["planejamento", "em_andamento", "pausada", "finalizada", "cancelada"]).optional(),
      tipo: z.enum(["residencial", "comercial", "industrial", "reforma", "infraestrutura", "projeto_especial"]).optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      let query = db.select().from(obras).where(eq(obras.usuarioId, input.usuarioId));
      
      if (input.status) {
        query = query.where(and(eq(obras.usuarioId, input.usuarioId), eq(obras.status, input.status)));
      }
      
      return query.orderBy(desc(obras.createdAt));
    }),

  // Obter obra por ID
  obter: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const result = await db.select().from(obras).where(eq(obras.id, input.id)).limit(1);
      return result[0] || null;
    }),

  // Criar nova obra
  criar: publicProcedure
    .input(z.object({
      usuarioId: z.number(),
      nome: z.string().min(1),
      descricao: z.string().optional(),
      tipo: z.enum(["residencial", "comercial", "industrial", "reforma", "infraestrutura", "projeto_especial"]),
      endereco: z.string().optional(),
      cidade: z.string().optional(),
      estado: z.string().optional(),
      cep: z.string().optional(),
      latitude: z.string().optional(),
      longitude: z.string().optional(),
      dataInicio: z.date().optional(),
      dataPrevisaoFim: z.date().optional(),
      orcamentoTotal: z.string().optional(),
      responsavelNome: z.string().optional(),
      responsavelTelefone: z.string().optional(),
      responsavelEmail: z.string().optional(),
      clienteNome: z.string().optional(),
      clienteTelefone: z.string().optional(),
      clienteEmail: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const codigo = `OBR-${Date.now().toString(36).toUpperCase()}`;
      
      const result = await db.insert(obras).values({
        ...input,
        codigo,
        status: "planejamento",
      });
      
      return { id: result[0].insertId, codigo };
    }),

  // Atualizar obra
  atualizar: publicProcedure
    .input(z.object({
      id: z.number(),
      nome: z.string().optional(),
      descricao: z.string().optional(),
      tipo: z.enum(["residencial", "comercial", "industrial", "reforma", "infraestrutura", "projeto_especial"]).optional(),
      status: z.enum(["planejamento", "em_andamento", "pausada", "finalizada", "cancelada"]).optional(),
      endereco: z.string().optional(),
      cidade: z.string().optional(),
      estado: z.string().optional(),
      cep: z.string().optional(),
      latitude: z.string().optional(),
      longitude: z.string().optional(),
      dataInicio: z.date().optional(),
      dataPrevisaoFim: z.date().optional(),
      dataFim: z.date().optional(),
      orcamentoTotal: z.string().optional(),
      valorRealizado: z.string().optional(),
      progressoFisico: z.string().optional(),
      progressoFinanceiro: z.string().optional(),
      responsavelNome: z.string().optional(),
      responsavelTelefone: z.string().optional(),
      responsavelEmail: z.string().optional(),
      clienteNome: z.string().optional(),
      clienteTelefone: z.string().optional(),
      clienteEmail: z.string().optional(),
      imagemCapaUrl: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const { id, ...data } = input;
      await db.update(obras).set(data).where(eq(obras.id, id));
      return { success: true };
    }),

  // Excluir obra
  excluir: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.delete(obras).where(eq(obras.id, input.id));
      return { success: true };
    }),

  // Dashboard - Estatísticas gerais
  dashboard: publicProcedure
    .input(z.object({ usuarioId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const todasObras = await db.select().from(obras).where(eq(obras.usuarioId, input.usuarioId));
      
      const stats = {
        total: todasObras.length,
        emAndamento: todasObras.filter(o => o.status === "em_andamento").length,
        pausadas: todasObras.filter(o => o.status === "pausada").length,
        finalizadas: todasObras.filter(o => o.status === "finalizada").length,
        planejamento: todasObras.filter(o => o.status === "planejamento").length,
        orcamentoTotal: todasObras.reduce((acc, o) => acc + (parseFloat(o.orcamentoTotal || "0")), 0),
        valorRealizado: todasObras.reduce((acc, o) => acc + (parseFloat(o.valorRealizado || "0")), 0),
      };

      return stats;
    }),
});

// ==================== ORÇAMENTOS ====================
export const orcamentosRouter = router({
  listar: publicProcedure
    .input(z.object({ obraId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      return db.select().from(obraOrcamentos).where(eq(obraOrcamentos.obraId, input.obraId)).orderBy(desc(obraOrcamentos.createdAt));
    }),

  criar: publicProcedure
    .input(z.object({
      obraId: z.number(),
      nome: z.string().min(1),
      descricao: z.string().optional(),
      categoria: z.enum(["mao_de_obra", "materiais", "equipamentos", "servicos_terceiros", "taxas_licencas", "transporte", "administrativo", "contingencia", "outros"]),
      valorPrevisto: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const result = await db.insert(obraOrcamentos).values(input);
      return { id: result[0].insertId };
    }),

  atualizar: publicProcedure
    .input(z.object({
      id: z.number(),
      nome: z.string().optional(),
      descricao: z.string().optional(),
      categoria: z.enum(["mao_de_obra", "materiais", "equipamentos", "servicos_terceiros", "taxas_licencas", "transporte", "administrativo", "contingencia", "outros"]).optional(),
      valorPrevisto: z.string().optional(),
      valorRealizado: z.string().optional(),
      status: z.enum(["pendente", "aprovado", "em_execucao", "finalizado", "cancelado"]).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const { id, ...data } = input;
      await db.update(obraOrcamentos).set(data).where(eq(obraOrcamentos.id, id));
      return { success: true };
    }),

  excluir: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.delete(obraOrcamentoItens).where(eq(obraOrcamentoItens.orcamentoId, input.id));
      await db.delete(obraOrcamentos).where(eq(obraOrcamentos.id, input.id));
      return { success: true };
    }),
});

// ==================== TRABALHADORES ====================
export const trabalhadoresRouter = router({
  listar: publicProcedure
    .input(z.object({ obraId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      return db.select().from(obraTrabalhadores).where(eq(obraTrabalhadores.obraId, input.obraId)).orderBy(asc(obraTrabalhadores.nome));
    }),

  criar: publicProcedure
    .input(z.object({
      obraId: z.number(),
      nome: z.string().min(1),
      cpf: z.string().optional(),
      funcao: z.enum(["pedreiro", "servente", "eletricista", "encanador", "pintor", "carpinteiro", "armador", "soldador", "mestre_obras", "engenheiro", "arquiteto", "tecnico_seguranca", "operador_maquinas", "ajudante_geral", "outro"]),
      telefone: z.string().optional(),
      email: z.string().optional(),
      salarioHora: z.string().optional(),
      salarioMensal: z.string().optional(),
      tipoContrato: z.enum(["clt", "pj", "diaria", "empreitada"]).optional(),
      dataAdmissao: z.date().optional(),
      observacoes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const result = await db.insert(obraTrabalhadores).values(input);
      return { id: result[0].insertId };
    }),

  atualizar: publicProcedure
    .input(z.object({
      id: z.number(),
      nome: z.string().optional(),
      cpf: z.string().optional(),
      funcao: z.enum(["pedreiro", "servente", "eletricista", "encanador", "pintor", "carpinteiro", "armador", "soldador", "mestre_obras", "engenheiro", "arquiteto", "tecnico_seguranca", "operador_maquinas", "ajudante_geral", "outro"]).optional(),
      telefone: z.string().optional(),
      email: z.string().optional(),
      salarioHora: z.string().optional(),
      salarioMensal: z.string().optional(),
      tipoContrato: z.enum(["clt", "pj", "diaria", "empreitada"]).optional(),
      ativo: z.boolean().optional(),
      dataDemissao: z.date().optional(),
      observacoes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const { id, ...data } = input;
      await db.update(obraTrabalhadores).set(data).where(eq(obraTrabalhadores.id, id));
      return { success: true };
    }),

  excluir: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.delete(obraTrabalhadores).where(eq(obraTrabalhadores.id, input.id));
      return { success: true };
    }),
});

// ==================== DIÁRIO DE OBRA ====================
export const diarioRouter = router({
  listar: publicProcedure
    .input(z.object({ 
      obraId: z.number(),
      dataInicio: z.date().optional(),
      dataFim: z.date().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      return db.select().from(obraDiarios).where(eq(obraDiarios.obraId, input.obraId)).orderBy(desc(obraDiarios.data));
    }),

  criar: publicProcedure
    .input(z.object({
      obraId: z.number(),
      data: z.date(),
      clima: z.enum(["ensolarado", "nublado", "chuvoso", "tempestade", "frio", "quente"]).optional(),
      temperaturaMin: z.number().optional(),
      temperaturaMax: z.number().optional(),
      choveu: z.boolean().optional(),
      horasParadas: z.string().optional(),
      motivoParada: z.string().optional(),
      qtdPedreiros: z.number().optional(),
      qtdServentes: z.number().optional(),
      qtdEletricistas: z.number().optional(),
      qtdEncanadores: z.number().optional(),
      qtdPintores: z.number().optional(),
      qtdCarpinteiros: z.number().optional(),
      qtdOutros: z.number().optional(),
      atividadesRealizadas: z.string().optional(),
      atividadesPrevistas: z.string().optional(),
      materiaisRecebidos: z.string().optional(),
      materiaisUtilizados: z.string().optional(),
      equipamentosUtilizados: z.string().optional(),
      ocorrencias: z.string().optional(),
      observacoesGerais: z.string().optional(),
      registradoPor: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const totalTrabalhadores = (input.qtdPedreiros || 0) + (input.qtdServentes || 0) + 
        (input.qtdEletricistas || 0) + (input.qtdEncanadores || 0) + (input.qtdPintores || 0) + 
        (input.qtdCarpinteiros || 0) + (input.qtdOutros || 0);

      const result = await db.insert(obraDiarios).values({
        ...input,
        totalTrabalhadores,
      });
      return { id: result[0].insertId };
    }),

  atualizar: publicProcedure
    .input(z.object({
      id: z.number(),
      clima: z.enum(["ensolarado", "nublado", "chuvoso", "tempestade", "frio", "quente"]).optional(),
      temperaturaMin: z.number().optional(),
      temperaturaMax: z.number().optional(),
      choveu: z.boolean().optional(),
      horasParadas: z.string().optional(),
      motivoParada: z.string().optional(),
      qtdPedreiros: z.number().optional(),
      qtdServentes: z.number().optional(),
      qtdEletricistas: z.number().optional(),
      qtdEncanadores: z.number().optional(),
      qtdPintores: z.number().optional(),
      qtdCarpinteiros: z.number().optional(),
      qtdOutros: z.number().optional(),
      atividadesRealizadas: z.string().optional(),
      atividadesPrevistas: z.string().optional(),
      materiaisRecebidos: z.string().optional(),
      materiaisUtilizados: z.string().optional(),
      equipamentosUtilizados: z.string().optional(),
      ocorrencias: z.string().optional(),
      observacoesGerais: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const { id, ...data } = input;
      
      const totalTrabalhadores = (data.qtdPedreiros || 0) + (data.qtdServentes || 0) + 
        (data.qtdEletricistas || 0) + (data.qtdEncanadores || 0) + (data.qtdPintores || 0) + 
        (data.qtdCarpinteiros || 0) + (data.qtdOutros || 0);

      await db.update(obraDiarios).set({ ...data, totalTrabalhadores }).where(eq(obraDiarios.id, id));
      return { success: true };
    }),

  excluir: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.delete(obraDiarios).where(eq(obraDiarios.id, input.id));
      return { success: true };
    }),
});

// ==================== FORNECEDORES ====================
export const fornecedoresRouter = router({
  listar: publicProcedure
    .input(z.object({ usuarioId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      return db.select().from(obraFornecedores).where(eq(obraFornecedores.usuarioId, input.usuarioId)).orderBy(asc(obraFornecedores.razaoSocial));
    }),

  criar: publicProcedure
    .input(z.object({
      usuarioId: z.number(),
      razaoSocial: z.string().min(1),
      nomeFantasia: z.string().optional(),
      cnpj: z.string().optional(),
      cpf: z.string().optional(),
      categoria: z.enum(["materiais_construcao", "ferragens", "eletrica", "hidraulica", "acabamentos", "equipamentos", "mao_de_obra", "transporte", "outros"]),
      telefone: z.string().optional(),
      celular: z.string().optional(),
      email: z.string().optional(),
      endereco: z.string().optional(),
      cidade: z.string().optional(),
      estado: z.string().optional(),
      cep: z.string().optional(),
      website: z.string().optional(),
      observacoes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const result = await db.insert(obraFornecedores).values(input);
      return { id: result[0].insertId };
    }),

  atualizar: publicProcedure
    .input(z.object({
      id: z.number(),
      razaoSocial: z.string().optional(),
      nomeFantasia: z.string().optional(),
      cnpj: z.string().optional(),
      cpf: z.string().optional(),
      categoria: z.enum(["materiais_construcao", "ferragens", "eletrica", "hidraulica", "acabamentos", "equipamentos", "mao_de_obra", "transporte", "outros"]).optional(),
      telefone: z.string().optional(),
      celular: z.string().optional(),
      email: z.string().optional(),
      endereco: z.string().optional(),
      cidade: z.string().optional(),
      estado: z.string().optional(),
      cep: z.string().optional(),
      website: z.string().optional(),
      avaliacao: z.number().optional(),
      observacoes: z.string().optional(),
      ativo: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const { id, ...data } = input;
      await db.update(obraFornecedores).set(data).where(eq(obraFornecedores.id, id));
      return { success: true };
    }),

  excluir: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.delete(obraFornecedores).where(eq(obraFornecedores.id, input.id));
      return { success: true };
    }),
});

// ==================== ETAPAS ====================
export const etapasRouter = router({
  listar: publicProcedure
    .input(z.object({ obraId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      return db.select().from(obraEtapas).where(eq(obraEtapas.obraId, input.obraId)).orderBy(asc(obraEtapas.ordem));
    }),

  criar: publicProcedure
    .input(z.object({
      obraId: z.number(),
      nome: z.string().min(1),
      descricao: z.string().optional(),
      ordem: z.number().optional(),
      pesoPercentual: z.string().optional(),
      dataInicioPrevista: z.date().optional(),
      dataFimPrevista: z.date().optional(),
      valorPrevisto: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const result = await db.insert(obraEtapas).values(input);
      return { id: result[0].insertId };
    }),

  atualizar: publicProcedure
    .input(z.object({
      id: z.number(),
      nome: z.string().optional(),
      descricao: z.string().optional(),
      ordem: z.number().optional(),
      pesoPercentual: z.string().optional(),
      dataInicioPrevista: z.date().optional(),
      dataFimPrevista: z.date().optional(),
      dataInicioReal: z.date().optional(),
      dataFimReal: z.date().optional(),
      status: z.enum(["pendente", "em_andamento", "concluida", "atrasada"]).optional(),
      progressoAtual: z.string().optional(),
      valorPrevisto: z.string().optional(),
      valorRealizado: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const { id, ...data } = input;
      await db.update(obraEtapas).set(data).where(eq(obraEtapas.id, id));
      return { success: true };
    }),

  excluir: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.delete(obraEtapas).where(eq(obraEtapas.id, input.id));
      return { success: true };
    }),
});

// ==================== MEDIÇÕES ====================
export const medicoesRouter = router({
  listar: publicProcedure
    .input(z.object({ obraId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      return db.select().from(obraMedicoes).where(eq(obraMedicoes.obraId, input.obraId)).orderBy(desc(obraMedicoes.numero));
    }),

  criar: publicProcedure
    .input(z.object({
      obraId: z.number(),
      etapaId: z.number().optional(),
      numero: z.number(),
      dataReferencia: z.date(),
      descricao: z.string().optional(),
      percentualAnterior: z.string().optional(),
      percentualAtual: z.string(),
      percentualAcumulado: z.string(),
      valorMedicao: z.string().optional(),
      valorAcumulado: z.string().optional(),
      observacoes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const result = await db.insert(obraMedicoes).values(input);
      return { id: result[0].insertId };
    }),

  aprovar: publicProcedure
    .input(z.object({
      id: z.number(),
      aprovadoPor: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.update(obraMedicoes).set({
        status: "aprovada",
        aprovadoPor: input.aprovadoPor,
        dataAprovacao: new Date(),
      }).where(eq(obraMedicoes.id, input.id));
      return { success: true };
    }),

  excluir: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.delete(obraMedicoes).where(eq(obraMedicoes.id, input.id));
      return { success: true };
    }),
});

// ==================== FOTOS ====================
export const fotosRouter = router({
  listar: publicProcedure
    .input(z.object({ 
      obraId: z.number(),
      etapaId: z.number().optional(),
      tipo: z.enum(["antes", "durante", "depois", "problema", "entrega", "geral"]).optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      let query = db.select().from(obraFotos).where(eq(obraFotos.obraId, input.obraId));
      
      return query.orderBy(desc(obraFotos.createdAt));
    }),

  criar: publicProcedure
    .input(z.object({
      obraId: z.number(),
      etapaId: z.number().optional(),
      diarioId: z.number().optional(),
      url: z.string(),
      thumbnailUrl: z.string().optional(),
      titulo: z.string().optional(),
      descricao: z.string().optional(),
      tipo: z.enum(["antes", "durante", "depois", "problema", "entrega", "geral"]),
      dataFoto: z.date().optional(),
      latitude: z.string().optional(),
      longitude: z.string().optional(),
      tags: z.string().optional(),
      uploadPor: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const result = await db.insert(obraFotos).values(input);
      return { id: result[0].insertId };
    }),

  excluir: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.delete(obraFotos).where(eq(obraFotos.id, input.id));
      return { success: true };
    }),
});

// ==================== OCORRÊNCIAS ====================
export const ocorrenciasRouter = router({
  listar: publicProcedure
    .input(z.object({ obraId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      return db.select().from(obraOcorrencias).where(eq(obraOcorrencias.obraId, input.obraId)).orderBy(desc(obraOcorrencias.dataOcorrencia));
    }),

  criar: publicProcedure
    .input(z.object({
      obraId: z.number(),
      etapaId: z.number().optional(),
      titulo: z.string().min(1),
      descricao: z.string().optional(),
      tipo: z.enum(["acidente", "problema_tecnico", "atraso", "falta_material", "clima", "qualidade", "seguranca", "outros"]),
      gravidade: z.enum(["baixa", "media", "alta", "critica"]),
      dataOcorrencia: z.date(),
      responsavel: z.string().optional(),
      custoImpacto: z.string().optional(),
      diasImpacto: z.number().optional(),
      registradoPor: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const result = await db.insert(obraOcorrencias).values(input);
      return { id: result[0].insertId };
    }),

  resolver: publicProcedure
    .input(z.object({
      id: z.number(),
      acaoTomada: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.update(obraOcorrencias).set({
        status: "resolvida",
        acaoTomada: input.acaoTomada,
        dataResolucao: new Date(),
      }).where(eq(obraOcorrencias.id, input.id));
      return { success: true };
    }),

  excluir: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.delete(obraOcorrencias).where(eq(obraOcorrencias.id, input.id));
      return { success: true };
    }),
});

// ==================== MATERIAIS ====================
export const materiaisRouter = router({
  listar: publicProcedure
    .input(z.object({ obraId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      return db.select().from(obraMateriais).where(eq(obraMateriais.obraId, input.obraId)).orderBy(asc(obraMateriais.nome));
    }),

  criar: publicProcedure
    .input(z.object({
      obraId: z.number(),
      fornecedorId: z.number().optional(),
      nome: z.string().min(1),
      descricao: z.string().optional(),
      categoria: z.enum(["cimento", "areia", "brita", "tijolos", "ferro", "madeira", "eletrico", "hidraulico", "acabamento", "ferramentas", "epi", "outros"]),
      unidade: z.string().optional(),
      quantidadePrevista: z.string().optional(),
      valorUnitario: z.string().optional(),
      observacoes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const valorTotal = input.quantidadePrevista && input.valorUnitario 
        ? (parseFloat(input.quantidadePrevista) * parseFloat(input.valorUnitario)).toString()
        : undefined;

      const result = await db.insert(obraMateriais).values({
        ...input,
        valorTotal,
      });
      return { id: result[0].insertId };
    }),

  registrarEntrada: publicProcedure
    .input(z.object({
      id: z.number(),
      quantidade: z.string(),
      notaFiscal: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const material = await db.select().from(obraMateriais).where(eq(obraMateriais.id, input.id)).limit(1);
      if (!material[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Material não encontrado" });

      const novaQuantidade = parseFloat(material[0].quantidadeRecebida || "0") + parseFloat(input.quantidade);
      const novoEstoque = parseFloat(material[0].quantidadeEstoque || "0") + parseFloat(input.quantidade);

      await db.update(obraMateriais).set({
        quantidadeRecebida: novaQuantidade.toString(),
        quantidadeEstoque: novoEstoque.toString(),
        notaFiscal: input.notaFiscal,
        dataEntrega: new Date(),
      }).where(eq(obraMateriais.id, input.id));
      return { success: true };
    }),

  excluir: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.delete(obraMateriais).where(eq(obraMateriais.id, input.id));
      return { success: true };
    }),
});

// ==================== PAGAMENTOS ====================
export const pagamentosRouter = router({
  listar: publicProcedure
    .input(z.object({ obraId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      return db.select().from(obraPagamentos).where(eq(obraPagamentos.obraId, input.obraId)).orderBy(desc(obraPagamentos.dataVencimento));
    }),

  criar: publicProcedure
    .input(z.object({
      obraId: z.number(),
      contratoId: z.number().optional(),
      fornecedorId: z.number().optional(),
      trabalhadorId: z.number().optional(),
      descricao: z.string().min(1),
      tipo: z.enum(["fornecedor", "mao_de_obra", "servico", "taxa", "outros"]),
      valor: z.string(),
      dataVencimento: z.date().optional(),
      observacoes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const result = await db.insert(obraPagamentos).values(input);
      return { id: result[0].insertId };
    }),

  pagar: publicProcedure
    .input(z.object({
      id: z.number(),
      formaPagamento: z.enum(["dinheiro", "pix", "transferencia", "boleto", "cartao", "cheque"]),
      comprovante: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.update(obraPagamentos).set({
        status: "pago",
        formaPagamento: input.formaPagamento,
        comprovante: input.comprovante,
        dataPagamento: new Date(),
      }).where(eq(obraPagamentos.id, input.id));
      return { success: true };
    }),

  excluir: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      await db.delete(obraPagamentos).where(eq(obraPagamentos.id, input.id));
      return { success: true };
    }),
});
