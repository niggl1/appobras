-- ==================== AppObras - Script de Criação de Tabelas ====================
-- Execute este script no TiDB Cloud para criar as tabelas do módulo de obras
-- Nota: As tabelas base (users, condominios, etc.) já devem existir

-- ==================== OBRAS ====================
CREATE TABLE IF NOT EXISTS obras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuarioId INT NOT NULL,
  codigo VARCHAR(50),
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  tipo ENUM('residencial', 'comercial', 'industrial', 'reforma', 'infraestrutura', 'projeto_especial') DEFAULT 'residencial' NOT NULL,
  status ENUM('planejamento', 'em_andamento', 'pausada', 'finalizada', 'cancelada') DEFAULT 'planejamento' NOT NULL,
  endereco TEXT,
  cidade VARCHAR(100),
  estado VARCHAR(50),
  cep VARCHAR(10),
  latitude VARCHAR(20),
  longitude VARCHAR(20),
  dataInicio TIMESTAMP,
  dataPrevisaoFim TIMESTAMP,
  dataFim TIMESTAMP,
  orcamentoTotal DECIMAL(15, 2),
  valorRealizado DECIMAL(15, 2) DEFAULT 0,
  responsavelNome VARCHAR(255),
  responsavelTelefone VARCHAR(20),
  responsavelEmail VARCHAR(255),
  clienteNome VARCHAR(255),
  clienteTelefone VARCHAR(20),
  clienteEmail VARCHAR(255),
  imagemCapaUrl TEXT,
  progressoFisico DECIMAL(5, 2) DEFAULT 0,
  progressoFinanceiro DECIMAL(5, 2) DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (usuarioId) REFERENCES users(id)
);

-- ==================== ORÇAMENTOS DE OBRA ====================
CREATE TABLE IF NOT EXISTS obra_orcamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  categoria ENUM('mao_de_obra', 'materiais', 'equipamentos', 'servicos_terceiros', 'taxas_licencas', 'transporte', 'administrativo', 'contingencia', 'outros') DEFAULT 'outros' NOT NULL,
  valorPrevisto DECIMAL(15, 2) NOT NULL,
  valorRealizado DECIMAL(15, 2) DEFAULT 0,
  status ENUM('pendente', 'aprovado', 'em_execucao', 'finalizado', 'cancelado') DEFAULT 'pendente' NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (obraId) REFERENCES obras(id)
);

-- ==================== ITENS DE ORÇAMENTO ====================
CREATE TABLE IF NOT EXISTS obra_orcamento_itens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orcamentoId INT NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  unidade VARCHAR(20) DEFAULT 'un',
  quantidade DECIMAL(10, 2) NOT NULL,
  valorUnitario DECIMAL(15, 2) NOT NULL,
  valorTotal DECIMAL(15, 2) NOT NULL,
  valorRealizado DECIMAL(15, 2) DEFAULT 0,
  observacoes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (orcamentoId) REFERENCES obra_orcamentos(id)
);

-- ==================== TRABALHADORES ====================
CREATE TABLE IF NOT EXISTS obra_trabalhadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(14),
  funcao ENUM('pedreiro', 'servente', 'eletricista', 'encanador', 'pintor', 'carpinteiro', 'armador', 'soldador', 'mestre_obras', 'engenheiro', 'arquiteto', 'tecnico_seguranca', 'operador_maquinas', 'ajudante_geral', 'outro') DEFAULT 'ajudante_geral' NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(255),
  salarioHora DECIMAL(10, 2),
  salarioMensal DECIMAL(10, 2),
  tipoContrato ENUM('clt', 'pj', 'diaria', 'empreitada') DEFAULT 'diaria',
  dataAdmissao TIMESTAMP,
  dataDemissao TIMESTAMP,
  ativo BOOLEAN DEFAULT TRUE,
  observacoes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (obraId) REFERENCES obras(id)
);

-- ==================== HORAS TRABALHADAS ====================
CREATE TABLE IF NOT EXISTS obra_horas_trabalhadas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  trabalhadorId INT NOT NULL,
  data TIMESTAMP NOT NULL,
  horaEntrada VARCHAR(5),
  horaSaida VARCHAR(5),
  horasNormais DECIMAL(5, 2) DEFAULT 0,
  horasExtras DECIMAL(5, 2) DEFAULT 0,
  valorDia DECIMAL(10, 2),
  observacoes TEXT,
  aprovado BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (trabalhadorId) REFERENCES obra_trabalhadores(id)
);

-- ==================== FORNECEDORES ====================
CREATE TABLE IF NOT EXISTS obra_fornecedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuarioId INT NOT NULL,
  razaoSocial VARCHAR(255) NOT NULL,
  nomeFantasia VARCHAR(255),
  cnpj VARCHAR(20),
  cpf VARCHAR(14),
  categoria ENUM('materiais_construcao', 'ferragens', 'eletrica', 'hidraulica', 'acabamentos', 'equipamentos', 'mao_de_obra', 'transporte', 'outros') DEFAULT 'outros' NOT NULL,
  telefone VARCHAR(20),
  celular VARCHAR(20),
  email VARCHAR(255),
  endereco TEXT,
  cidade VARCHAR(100),
  estado VARCHAR(50),
  cep VARCHAR(10),
  website VARCHAR(255),
  avaliacao INT DEFAULT 0,
  observacoes TEXT,
  ativo BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (usuarioId) REFERENCES users(id)
);

-- ==================== CONTRATOS ====================
CREATE TABLE IF NOT EXISTS obra_contratos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  fornecedorId INT NOT NULL,
  numero VARCHAR(50),
  descricao TEXT,
  tipo ENUM('fornecimento', 'servico', 'empreitada', 'locacao', 'misto') DEFAULT 'fornecimento' NOT NULL,
  valorTotal DECIMAL(15, 2) NOT NULL,
  valorPago DECIMAL(15, 2) DEFAULT 0,
  dataInicio TIMESTAMP,
  dataFim TIMESTAMP,
  status ENUM('rascunho', 'ativo', 'suspenso', 'finalizado', 'cancelado') DEFAULT 'rascunho' NOT NULL,
  arquivoUrl TEXT,
  observacoes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (fornecedorId) REFERENCES obra_fornecedores(id)
);

-- ==================== DIÁRIO DE OBRA ====================
CREATE TABLE IF NOT EXISTS obra_diarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  data TIMESTAMP NOT NULL,
  clima ENUM('ensolarado', 'nublado', 'chuvoso', 'tempestade', 'frio', 'quente') DEFAULT 'ensolarado',
  temperaturaMin INT,
  temperaturaMax INT,
  choveu BOOLEAN DEFAULT FALSE,
  horasParadas DECIMAL(5, 2) DEFAULT 0,
  motivoParada TEXT,
  qtdPedreiros INT DEFAULT 0,
  qtdServentes INT DEFAULT 0,
  qtdEletricistas INT DEFAULT 0,
  qtdEncanadores INT DEFAULT 0,
  qtdPintores INT DEFAULT 0,
  qtdCarpinteiros INT DEFAULT 0,
  qtdOutros INT DEFAULT 0,
  totalTrabalhadores INT DEFAULT 0,
  atividadesRealizadas TEXT,
  atividadesPrevistas TEXT,
  materiaisRecebidos TEXT,
  materiaisUtilizados TEXT,
  equipamentosUtilizados TEXT,
  ocorrencias TEXT,
  observacoesGerais TEXT,
  registradoPor VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (obraId) REFERENCES obras(id)
);

-- ==================== ETAPAS DA OBRA ====================
CREATE TABLE IF NOT EXISTS obra_etapas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  ordem INT DEFAULT 0,
  pesoPercentual DECIMAL(5, 2) DEFAULT 0,
  dataInicioPrevista TIMESTAMP,
  dataFimPrevista TIMESTAMP,
  dataInicioReal TIMESTAMP,
  dataFimReal TIMESTAMP,
  status ENUM('pendente', 'em_andamento', 'concluida', 'atrasada') DEFAULT 'pendente' NOT NULL,
  progressoAtual DECIMAL(5, 2) DEFAULT 0,
  valorPrevisto DECIMAL(15, 2),
  valorRealizado DECIMAL(15, 2) DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (obraId) REFERENCES obras(id)
);

-- ==================== MEDIÇÕES ====================
CREATE TABLE IF NOT EXISTS obra_medicoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  etapaId INT,
  numero INT NOT NULL,
  dataReferencia TIMESTAMP NOT NULL,
  descricao TEXT,
  percentualAnterior DECIMAL(5, 2) DEFAULT 0,
  percentualAtual DECIMAL(5, 2) NOT NULL,
  percentualAcumulado DECIMAL(5, 2) NOT NULL,
  valorMedicao DECIMAL(15, 2),
  valorAcumulado DECIMAL(15, 2),
  status ENUM('rascunho', 'enviada', 'aprovada', 'rejeitada') DEFAULT 'rascunho' NOT NULL,
  aprovadoPor VARCHAR(255),
  dataAprovacao TIMESTAMP,
  observacoes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (etapaId) REFERENCES obra_etapas(id)
);

-- ==================== FOTOS ====================
CREATE TABLE IF NOT EXISTS obra_fotos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  etapaId INT,
  diarioId INT,
  url TEXT NOT NULL,
  thumbnailUrl TEXT,
  titulo VARCHAR(255),
  descricao TEXT,
  tipo ENUM('antes', 'durante', 'depois', 'problema', 'entrega', 'geral') DEFAULT 'geral' NOT NULL,
  dataFoto TIMESTAMP,
  latitude VARCHAR(20),
  longitude VARCHAR(20),
  tags TEXT,
  uploadPor VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (etapaId) REFERENCES obra_etapas(id),
  FOREIGN KEY (diarioId) REFERENCES obra_diarios(id)
);

-- ==================== OCORRÊNCIAS ====================
CREATE TABLE IF NOT EXISTS obra_ocorrencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  etapaId INT,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  tipo ENUM('acidente', 'problema_tecnico', 'atraso', 'falta_material', 'clima', 'qualidade', 'seguranca', 'outros') DEFAULT 'outros' NOT NULL,
  gravidade ENUM('baixa', 'media', 'alta', 'critica') DEFAULT 'media' NOT NULL,
  status ENUM('aberta', 'em_analise', 'resolvida', 'fechada') DEFAULT 'aberta' NOT NULL,
  dataOcorrencia TIMESTAMP NOT NULL,
  dataResolucao TIMESTAMP,
  acaoTomada TEXT,
  responsavel VARCHAR(255),
  custoImpacto DECIMAL(15, 2),
  diasImpacto INT,
  registradoPor VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (etapaId) REFERENCES obra_etapas(id)
);

-- ==================== MATERIAIS ====================
CREATE TABLE IF NOT EXISTS obra_materiais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  fornecedorId INT,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  categoria ENUM('cimento', 'areia', 'brita', 'tijolos', 'ferro', 'madeira', 'eletrico', 'hidraulico', 'acabamento', 'ferramentas', 'epi', 'outros') DEFAULT 'outros' NOT NULL,
  unidade VARCHAR(20) DEFAULT 'un',
  quantidadePrevista DECIMAL(10, 2),
  quantidadeRecebida DECIMAL(10, 2) DEFAULT 0,
  quantidadeUtilizada DECIMAL(10, 2) DEFAULT 0,
  quantidadeEstoque DECIMAL(10, 2) DEFAULT 0,
  valorUnitario DECIMAL(10, 2),
  valorTotal DECIMAL(15, 2),
  dataEntrega TIMESTAMP,
  notaFiscal VARCHAR(50),
  observacoes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (fornecedorId) REFERENCES obra_fornecedores(id)
);

-- ==================== PAGAMENTOS ====================
CREATE TABLE IF NOT EXISTS obra_pagamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  contratoId INT,
  fornecedorId INT,
  trabalhadorId INT,
  descricao VARCHAR(255) NOT NULL,
  tipo ENUM('fornecedor', 'mao_de_obra', 'servico', 'taxa', 'outros') DEFAULT 'outros' NOT NULL,
  valor DECIMAL(15, 2) NOT NULL,
  dataVencimento TIMESTAMP,
  dataPagamento TIMESTAMP,
  status ENUM('pendente', 'pago', 'atrasado', 'cancelado') DEFAULT 'pendente' NOT NULL,
  formaPagamento ENUM('dinheiro', 'pix', 'transferencia', 'boleto', 'cartao', 'cheque'),
  comprovante TEXT,
  notaFiscal VARCHAR(50),
  observacoes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (contratoId) REFERENCES obra_contratos(id),
  FOREIGN KEY (fornecedorId) REFERENCES obra_fornecedores(id),
  FOREIGN KEY (trabalhadorId) REFERENCES obra_trabalhadores(id)
);

-- ==================== CHECKLISTS ====================
CREATE TABLE IF NOT EXISTS obra_checklists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  etapaId INT,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  tipo ENUM('seguranca', 'qualidade', 'entrega', 'vistoria', 'geral') DEFAULT 'geral' NOT NULL,
  status ENUM('pendente', 'em_andamento', 'concluido') DEFAULT 'pendente' NOT NULL,
  dataExecucao TIMESTAMP,
  executadoPor VARCHAR(255),
  observacoes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (etapaId) REFERENCES obra_etapas(id)
);

-- ==================== ITENS DE CHECKLIST ====================
CREATE TABLE IF NOT EXISTS obra_checklist_itens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  checklistId INT NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  ordem INT DEFAULT 0,
  obrigatorio BOOLEAN DEFAULT TRUE,
  concluido BOOLEAN DEFAULT FALSE,
  conformidade ENUM('conforme', 'nao_conforme', 'nao_aplicavel'),
  observacao TEXT,
  fotoUrl TEXT,
  dataVerificacao TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (checklistId) REFERENCES obra_checklists(id)
);

-- ==================== DOCUMENTOS ====================
CREATE TABLE IF NOT EXISTS obra_documentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  tipo ENUM('projeto', 'alvara', 'art', 'contrato', 'orcamento', 'nota_fiscal', 'relatorio', 'planta', 'memorial', 'outros') DEFAULT 'outros' NOT NULL,
  url TEXT NOT NULL,
  tamanho INT,
  mimeType VARCHAR(100),
  versao INT DEFAULT 1,
  uploadPor VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (obraId) REFERENCES obras(id)
);

-- ==================== ÍNDICES PARA PERFORMANCE ====================
CREATE INDEX idx_obras_usuario ON obras(usuarioId);
CREATE INDEX idx_obras_status ON obras(status);
CREATE INDEX idx_orcamentos_obra ON obra_orcamentos(obraId);
CREATE INDEX idx_trabalhadores_obra ON obra_trabalhadores(obraId);
CREATE INDEX idx_diarios_obra ON obra_diarios(obraId);
CREATE INDEX idx_diarios_data ON obra_diarios(data);
CREATE INDEX idx_etapas_obra ON obra_etapas(obraId);
CREATE INDEX idx_medicoes_obra ON obra_medicoes(obraId);
CREATE INDEX idx_fotos_obra ON obra_fotos(obraId);
CREATE INDEX idx_ocorrencias_obra ON obra_ocorrencias(obraId);
CREATE INDEX idx_materiais_obra ON obra_materiais(obraId);
CREATE INDEX idx_pagamentos_obra ON obra_pagamentos(obraId);
CREATE INDEX idx_pagamentos_status ON obra_pagamentos(status);
CREATE INDEX idx_fornecedores_usuario ON obra_fornecedores(usuarioId);
CREATE INDEX idx_contratos_obra ON obra_contratos(obraId);
