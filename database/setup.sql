-- AppObras - Setup do Banco de Dados
-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS appobras;
USE appobras;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  tipo ENUM('engenheiro', 'construtora', 'admin') DEFAULT 'engenheiro',
  telefone VARCHAR(20),
  empresa VARCHAR(255),
  ativo BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de obras
CREATE TABLE IF NOT EXISTS obras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuarioId INT NOT NULL,
  codigo VARCHAR(50),
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  tipo VARCHAR(50) DEFAULT 'residencial',
  status VARCHAR(50) DEFAULT 'planejamento',
  endereco TEXT,
  cidade VARCHAR(100),
  estado VARCHAR(50),
  cep VARCHAR(10),
  latitude VARCHAR(20),
  longitude VARCHAR(20),
  dataInicio TIMESTAMP NULL,
  dataPrevisaoFim TIMESTAMP NULL,
  dataFim TIMESTAMP NULL,
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
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuarioId) REFERENCES users(id)
);

-- Tabela de orçamentos
CREATE TABLE IF NOT EXISTS obra_orcamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  categoria VARCHAR(50) DEFAULT 'outros',
  valorPrevisto DECIMAL(15, 2) NOT NULL,
  valorRealizado DECIMAL(15, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pendente',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (obraId) REFERENCES obras(id)
);

-- Tabela de trabalhadores
CREATE TABLE IF NOT EXISTS obra_trabalhadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(14),
  funcao VARCHAR(50) DEFAULT 'ajudante_geral',
  telefone VARCHAR(20),
  email VARCHAR(255),
  salarioHora DECIMAL(10, 2),
  salarioMensal DECIMAL(10, 2),
  tipoContrato VARCHAR(20) DEFAULT 'diaria',
  dataAdmissao TIMESTAMP NULL,
  dataDemissao TIMESTAMP NULL,
  ativo BOOLEAN DEFAULT TRUE,
  observacoes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (obraId) REFERENCES obras(id)
);

-- Tabela de horas trabalhadas
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
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (trabalhadorId) REFERENCES obra_trabalhadores(id)
);

-- Tabela de fornecedores
CREATE TABLE IF NOT EXISTS obra_fornecedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuarioId INT NOT NULL,
  razaoSocial VARCHAR(255) NOT NULL,
  nomeFantasia VARCHAR(255),
  cnpj VARCHAR(20),
  cpf VARCHAR(14),
  categoria VARCHAR(50) DEFAULT 'outros',
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
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuarioId) REFERENCES users(id)
);

-- Tabela de contratos
CREATE TABLE IF NOT EXISTS obra_contratos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  fornecedorId INT NOT NULL,
  numero VARCHAR(50),
  descricao TEXT,
  tipo VARCHAR(50) DEFAULT 'fornecimento',
  valorTotal DECIMAL(15, 2) NOT NULL,
  valorPago DECIMAL(15, 2) DEFAULT 0,
  dataInicio TIMESTAMP NULL,
  dataFim TIMESTAMP NULL,
  status VARCHAR(50) DEFAULT 'rascunho',
  arquivoUrl TEXT,
  observacoes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (fornecedorId) REFERENCES obra_fornecedores(id)
);

-- Tabela de diário de obra
CREATE TABLE IF NOT EXISTS obra_diarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  data TIMESTAMP NOT NULL,
  clima VARCHAR(20) DEFAULT 'ensolarado',
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
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (obraId) REFERENCES obras(id)
);

-- Tabela de etapas da obra
CREATE TABLE IF NOT EXISTS obra_etapas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  ordem INT DEFAULT 0,
  pesoPercentual DECIMAL(5, 2) DEFAULT 0,
  dataInicioPrevista TIMESTAMP NULL,
  dataFimPrevista TIMESTAMP NULL,
  dataInicioReal TIMESTAMP NULL,
  dataFimReal TIMESTAMP NULL,
  status VARCHAR(50) DEFAULT 'pendente',
  progressoAtual DECIMAL(5, 2) DEFAULT 0,
  valorPrevisto DECIMAL(15, 2),
  valorRealizado DECIMAL(15, 2) DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (obraId) REFERENCES obras(id)
);

-- Tabela de medições
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
  status VARCHAR(50) DEFAULT 'rascunho',
  aprovadoPor VARCHAR(255),
  dataAprovacao TIMESTAMP NULL,
  observacoes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (etapaId) REFERENCES obra_etapas(id)
);

-- Tabela de fotos
CREATE TABLE IF NOT EXISTS obra_fotos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  etapaId INT,
  diarioId INT,
  url TEXT NOT NULL,
  thumbnailUrl TEXT,
  titulo VARCHAR(255),
  descricao TEXT,
  tipo VARCHAR(20) DEFAULT 'geral',
  dataFoto TIMESTAMP NULL,
  latitude VARCHAR(20),
  longitude VARCHAR(20),
  tags TEXT,
  uploadPor VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (etapaId) REFERENCES obra_etapas(id),
  FOREIGN KEY (diarioId) REFERENCES obra_diarios(id)
);

-- Tabela de ocorrências
CREATE TABLE IF NOT EXISTS obra_ocorrencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  etapaId INT,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  tipo VARCHAR(50) DEFAULT 'outros',
  gravidade VARCHAR(20) DEFAULT 'media',
  status VARCHAR(50) DEFAULT 'aberta',
  dataOcorrencia TIMESTAMP NOT NULL,
  dataResolucao TIMESTAMP NULL,
  acaoTomada TEXT,
  responsavel VARCHAR(255),
  custoImpacto DECIMAL(15, 2),
  diasImpacto INT,
  registradoPor VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (etapaId) REFERENCES obra_etapas(id)
);

-- Tabela de materiais
CREATE TABLE IF NOT EXISTS obra_materiais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  obraId INT NOT NULL,
  fornecedorId INT,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  categoria VARCHAR(50) DEFAULT 'outros',
  unidade VARCHAR(20) DEFAULT 'un',
  quantidadePrevista DECIMAL(10, 2),
  quantidadeRecebida DECIMAL(10, 2) DEFAULT 0,
  quantidadeUtilizada DECIMAL(10, 2) DEFAULT 0,
  valorUnitario DECIMAL(15, 2),
  valorTotal DECIMAL(15, 2),
  localizacaoEstoque VARCHAR(255),
  estoqueMinimo DECIMAL(10, 2),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (obraId) REFERENCES obras(id),
  FOREIGN KEY (fornecedorId) REFERENCES obra_fornecedores(id)
);

-- Inserir usuário admin de teste
INSERT INTO users (nome, email, senha, tipo) VALUES 
('Admin AppObras', 'admin@appobras.com', '$2b$10$XYZ123', 'admin');

SELECT 'Banco de dados AppObras criado com sucesso!' AS status;
