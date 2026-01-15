# App Manutenção - TODO

## Fase 1: Setup Inicial
- [x] Inicializar projeto com scaffold web-db-user
- [x] Copiar componentes UI do AppSindico
- [x] Configurar tema premium (cores, fontes, sombras)
- [x] Configurar DashboardLayout

## Fase 2: Schema da Base de Dados
- [x] Criar tabela organizacoes (universal, substitui condominios)
- [x] Criar tabelas de Ordens de Serviço (OS)
- [x] Criar tabelas de Vistorias
- [x] Criar tabelas de Manutenções
- [x] Criar tabelas de Ocorrências
- [x] Criar tabelas de Checklists
- [x] Criar tabelas de Vencimentos
- [x] Criar tabelas de Realizações/Melhorias/Aquisições
- [x] Criar tabelas de Revistas
- [x] Criar tabelas de Relatórios

## Fase 3: Módulos Core
- [x] Dashboard principal com estatísticas
- [x] Gestão de Organizações (universal)
- [x] Sistema de Ordens de Serviço completo
- [x] Configurações de OS (categorias, status, prioridades)

## Fase 4: Módulos Operacionais
- [x] Vistorias
- [x] Manutenções preventivas/corretivas
- [x] Ocorrências
- [x] Checklists
- [x] Agenda de Vencimentos

## Fase 5: Módulos de Documentação
- [x] Antes e Depois
- [x] Realizações
- [x] Melhorias
- [x] Aquisições

## Fase 6: Relatórios e Revistas
- [x] Sistema de Relatórios
- [x] Construtor de Relatórios
- [x] Editor de Revistas Digitais
- [x] Visualizador de Revistas
- [x] Exportação PDF

## Fase 7: Personalização
- [x] Configurações do sistema
- [x] Personalização de cores/logo
- [x] Páginas customizadas

## Fase 8: Compatibilidade
- [ ] Configurar para Vercel
- [ ] Integrar Capacitor
- [ ] Testes em mobile

## Bugs Reportados
(nenhum até agora)

## Testes Realizados
- [x] Cadastro de organização (Empresa Teste Manutenção)
- [x] Criação de Ordem de Serviço (#891947)
- [x] Visualização de Checklists
- [x] Sistema de Relatórios com gráficos
- [x] Navegação pelo menu lateral
- [x] Funções rápidas no dashboard

## Notas
- Todas as referências a "condomínio" devem ser substituídas por "organização" (tarefa futura)
- Layout premium consistente em todos os módulos
- Sistema universal para qualquer tipo de organização
- Capacitor será configurado após validação do sistema base

## Fase 9: Personalização da Logo
- [x] Copiar nova logo para pasta public
- [x] Atualizar logo no header
- [x] Atualizar favicon
- [x] Atualizar referências no sidebar/dashboard

## Fase 10: Universalização Completa
- [x] Substituir "condomínio" por "organização" em todos os ficheiros
- [x] Substituir "síndico" por "gestor" em todos os ficheiros
- [x] Substituir "morador" por "equipa" onde aplicável
- [x] Atualizar nome da aplicação de "App Síndico" para "App Manutenção"

## Fase 11: Capacitor
- [ ] Instalar Capacitor
- [ ] Configurar capacitor.config.ts
- [ ] Adicionar plataformas iOS e Android

## Fase 12: Personalização de Cores (Laranja, Branco, Preto)
- [x] Atualizar variáveis CSS no index.css
- [x] Ajustar cor primária para laranja (oklch 0.65 0.2 45)
- [x] Ajustar backgrounds para branco/preto
- [x] Atualizar botões e elementos de destaque
- [x] Testar contraste e legibilidade
- [x] Verificar consistência em todas as páginas
- [x] Atualizar gradientes para tons de laranja

## Fase 13: Redesign da Página Inicial - Manutenção Universal
- [x] Redesenhar hero section com foco em manutenção universal
- [x] Criar secção de setores atendidos (predial, industrial, comercial, hospitalar, escolar, máquinas)
- [x] Adicionar ícones representativos para cada setor
- [x] Atualizar textos e descrições para refletir versatilidade
- [x] Criar secção de funcionalidades principais (OS, Vistorias, Checklists, Relatórios)
- [x] Atualizar título da secção de features
- [x] Testar visual no browser

## Fase 14: Filtro por Setores na Página Inicial
- [ ] Tornar os cards de setores clicáveis/selecionáveis
- [ ] Adicionar estado de seleção visual (borda, cor de fundo)
- [ ] Criar mapeamento de módulos por setor
- [ ] Filtrar lista de funcionalidades baseado no setor selecionado
- [ ] Adicionar opção "Todos os Setores" para mostrar tudo
- [ ] Testar interatividade e responsividade

## Fase 15: Redesign Completo da Página Inicial - Premium
- [x] Criar novo layout premium do zero
- [x] Aplicar cores branco, laranja e preto
- [x] Incluir preço R$99,00 em destaque
- [x] Design moderno e profissional
- [x] Destacar setores atendidos (predial, industrial, comercial, hospitalar, escolar, máquinas)
- [x] Cards de setores com design premium interativo
- [x] Botões "Acessar Plataforma" e "Ver Demonstração" estilizados
- [x] Testar visual no browser

## Fase 16: Redesign Completo da Página Inicial do Zero
- [x] Manter Hero section (título, descrição, preço R$99, botões, card de setores)
- [x] Remover todo conteúdo herdado do template de condomínios
- [x] Criar nova secção de Funcionalidades (8 cards focados em manutenção)
- [x] Criar nova secção de Benefícios (lista + 4 cards)
- [x] Criar secção de Preço com card premium R$99/mês
- [x] Criar CTA final "Pronto para transformar sua gestão?"
- [x] Criar novo Footer simples e profissional
- [x] Header fixo com navegação por âncoras
- [x] Design 100% focado em gestão de manutenção universal

## Fase 17: Limpeza do Menu Lateral do Dashboard
- [x] Remover seção "Interativo / Comunidade" (Votações, Classificados, Achados e Perdidos, Caronas)
- [x] Remover seção "Documentação e Regras" (Regras e Normas, Dicas de Segurança, Links Úteis, Telefones Úteis)
- [x] Remover seção "Publicidade" (Anunciantes, Campanhas)
- [x] Remover seção "Configurações" (Perfil do Usuário, Config. Notificações, Preferências)
- [x] Remover seção "Eventos e Agenda" (Eventos, Reservas)
- [x] Remover "Vagas de Estacionamento" da seção Gestão da Organização
- [x] Mover "Agenda de Vencimentos" para seção Operacional / Manutenção
- [x] Alterar "Moradores" para "Moradores (Exclusivo p/ condomínios)"
- [x] Testar menu lateral no navegador

## Bugs Corrigidos - Fase 17
- [x] Corrigir erro de chave duplicada "revista" no menuSections do Dashboard.tsx

## Fase 18: Limpeza das Funções Rápidas
- [x] Remover "Eventos" das funções rápidas disponíveis
- [x] Remover "Votações" das funções rápidas disponíveis
- [x] Remover "Avisos" das funções rápidas disponíveis
- [x] Remover "Notificações" das funções rápidas disponíveis
- [x] Testar funções rápidas no navegador

## Fase 19: Atualização de Textos - Cadastro de Organização
- [x] Alterar "Meu Condomínio" para "Cadastro de locais e itens para manutenção"
- [x] Alterar botão "Novo Condomínio" para "Novo Local"
- [x] Testar alterações no navegador


## Fase 20: Atualização de Textos dos Cards do Dashboard
- [x] Alterar "Apps Criados" para "App de Manutenção" e "Crie seu app de manutenção personalizado"
- [x] Alterar "Revistas Criadas" para "Livro de Manutenções"
- [x] Alterar descrição de revistas para "Registre todas as manutenções para apresentar aos seus clientes e gestores"
- [x] Testar alterações no navegador


## Fase 21: Atualização da Logo do Dashboard
- [x] Copiar nova logo para pasta public
- [x] Logo já referenciada como /logo-manutencao.png (atualizada)
- [x] Testar alterações no navegador

## Fase 22: Remover Logo Duplicada
- [x] Remover segunda tag img da logo no Dashboard.tsx (desktop e mobile)
- [x] Testar alterações no navegador

## Fase 23: Atualização do Favicon
- [x] Criar favicon a partir da logo de engrenagem
- [x] Configurar favicon no index.html
- [x] Testar alterações no navegador

## Fase 24: Renomear Botão Criar Revista
- [x] Alterar "Criar Revista" para "Criar Livro" no Dashboard.tsx (4 ocorrências)
- [x] Testar alterações no navegador

## Fase 25: Atualizar Modal de Criação de Livro
- [x] Alterar "Criar Nova Revista" para "Criar Livro de Manutenções"
- [x] Alterar "Título da Revista" para "Título do Livro"
- [x] Alterar descrição do modal
- [x] Alterar botão "Criar Livro" para "Criar Livro de Manutenções"
- [x] Testar alterações no navegador

## Fase 26: Limpar Funções do Relatório
- [x] Identificar funções disponíveis no menu do sistema
- [x] Identificar funções listadas no relatório
- [x] Remover funções do relatório que não existem no menu (Avisos, Notificações, Eventos, Votações, Segurança, Comunidade, Áreas, Informações, Publicidade)
- [x] Testar alterações no navegador

## Fase 27: Adicionar Ordens de Serviço ao Relatório
- [x] Adicionar "Ordens de Serviço" ao availableSections
- [x] Testar alterações no navegador

## Fase 28: Universalizar Terminologia - Condomínio para Organização
- [x] Identificar arquivos com referências a "Condomínio" (163 referências em 20 arquivos)
- [x] Substituir referências nos arquivos do frontend (DashboardLayout, Dashboard, CondominioForm, AssistenteCriacao)
- [x] Testar alterações no navegador

## Fase 29: Renomear Revista Digital para Livro de Manutenções
- [x] Alterar "Revista Digital" para "Livro de Manutenções" no DashboardLayout.tsx
- [x] Alterar "Revista Digital" para "Livro de Manutenções" no Dashboard.tsx e AssistenteCriacao.tsx
- [x] Testar alterações no navegador

## Fase 30: Atualizar Passo 3 dos Primeiros Passos
- [x] Alterar "App, revista ou relatório" para "App, livro ou relatório"
- [x] Testar alterações no navegador

## Fase 31: Funções Simples - Sistema de Registro Rápido
### Schema e Backend
- [x] Criar tabela tarefas_simples no schema.ts
- [x] Criar tabela status_personalizados para status customizáveis
- [x] Criar rotas tRPC para CRUD de tarefas simples
- [x] Implementar geração automática de protocolo

### Frontend - Modal de Registro
- [x] Criar componente TarefasSimplesModal.tsx
- [x] Implementar design premium laranja clean
- [x] Campo título com botão "+" para salvar e adicionar
- [x] Upload de imagens (opcional)
- [x] Captura de localização automática GPS
- [x] Geração de protocolo automático
- [x] Campo descrição (opcional)
- [x] Status personalizável pelo usuário
- [x] Botão "Registrar e Adicionar Outra"
- [x] Botão "Enviar" para enviar todos os rascunhos
- [x] Salvamento automático como rascunho

### Frontend - Histórico
- [x] Criar página HistoricoTarefasSimples.tsx
- [x] Listar todas as tarefas simples
- [x] Filtro por tipo (Vistoria, Manutenção, Ocorrência, Antes/Depois)
- [x] Filtro por status
- [x] Visualização de detalhes
### Integração
- [x] Adicionar funções simples ao menu lateral
- [x] Adicionar às funções rápidas disponíveis
- [x] Integrar ao construtor de relatórios

### Exportação
- [x] Criar pasta com arquivos para exportar ao outro sistema
- [x] Documentar instruções de implementação

## Ajustes

- [x] Mover Funções Simples para dentro do menu Operacional/Manutenção existente

- [x] Criar seção separada "Funções Simples" no menu lateral (Opção 2)

- [x] Bug: Seção Funções Simples não aparece no menu publicado - resolvido (problema de cache)


## Fase 32: Integrar Revista Digital de Condomínios
- [ ] Extrair arquivos do ZIP
- [ ] Analisar estrutura dos componentes
- [ ] Integrar ao menu do sistema acima da opção MENU
- [ ] Testar funcionamento


## Fase 33: Botões "+" para Salvar Templates nos Campos
- [x] Criar tabela campos_rapidos_templates no banco de dados
- [x] Criar rotas tRPC para CRUD de templates (listar, criar, usar, toggleFavorito, deletar)
- [x] Atualizar TarefasSimplesModal com componente TemplateSelector
- [x] Adicionar botão "+" ao lado do campo Título
- [x] Adicionar botão "+" ao lado do campo Descrição
- [x] Implementar popover com lista de valores salvos
- [x] Implementar funcionalidade de salvar valor atual
- [x] Implementar contador de uso e ordenação por frequência
- [x] Implementar favoritos com estrela
- [x] Implementar soft delete de templates
- [x] Criar testes Vitest para camposRapidosTemplates (14 testes passando)
- [x] Todos os 30 testes passando (tarefasSimples + camposRapidosTemplates + auth)


## Bugs Reportados - Fase 33
- [x] Página de Vistorias não carrega conteúdo (área principal em branco) - Corrigido: adicionado fallback SemOrganizacaoMessage

- [x] Adicionar botões "+" para personalizar campos na página VistoriasPage (formulário de Nova Vistoria) - Todos os 8 campos agora têm botão "+"

## Fase 34: Botões Função Rápida e Botões "+" nas Páginas
### Manutenções
- [x] Adicionar botão ⚡ Manutenção Rápida
- [x] Adicionar botões "+" em todos os campos do formulário
- [x] Adicionar novos tipos ao schema (titulo_manutencao, subtitulo_manutencao, descricao_manutencao, observacoes_manutencao)

### Ocorrências
- [x] Adicionar botão ⚡ Ocorrência Rápida
- [x] Adicionar botões "+" em todos os campos do formulário
- [x] Adicionar novos tipos ao schema (titulo_ocorrencia, subtitulo_ocorrencia, descricao_ocorrencia, observacoes_ocorrencia)

### Antes e Depois
- [x] Adicionar botão ⚡ Antes/Depois Rápido
- [x] Adicionar novos tipos ao schema (titulo_antesdepois, descricao_antesdepois)

## Fase 35: Campo Local no Modal de Funções Rápidas
- [x] Adicionar campo "Local" ao TarefasSimplesModal
- [x] Integrar com TemplateSelector para salvar locais frequentes
- [x] Salvar localização no banco de dados

## Bug: Botões "+" faltando nos modais de Funções Rápidas
- [ ] Verificar modal de Manutenção Rápida
- [ ] Verificar modal de Ocorrência Rápida
- [ ] Verificar modal de Antes/Depois Rápido
- [ ] Corrigir botões "+" que estão faltando

## Bug: Botões "+" ocultos no modal de Funções Rápidas
- [x] Ajustar layout do modal para que os botões "+" fiquem visíveis ao lado dos campos - Corrigido: botões movidos para a linha do label

## Fase 36: Repositório GitHub
- [x] Criar repositório no GitHub para o sistema App Manutenção - https://github.com/niggl1/app-manutencao

## Fase 37: GitHub Actions CI/CD
- [ ] Criar workflow de CI (testes automatizados)
- [ ] Criar workflow de lint e type-check
- [ ] Fazer push dos workflows para o GitHub
## Fase 38: Limpeza - Sistema de Manutenções Universal

### Alterações Realizadas:
- [x] Remover seções Comunicação, Livro de Manutenções e Relatórios do menu
- [x] Remover botões Criar App, Criar Relatório e Criar Livro do dropdown
- [x] Atualizar cards da página inicial para Vistorias, Manutenções e Ocorrências
- [x] Atualizar mensagem de boas vindas para focar em manutenções
- [x] Atualizar Primeiros Passos para focar em manutenções
- [x] Limpar menu lateral no DashboardLayout
- [x] Limpar menuSections no Dashboard.tsx

### Funções Mantidas:
- Vistorias
- Manutenções
- Ocorrências
- Checklists
- Antes e Depois
- Ordens de Serviço
- Agenda de Vencimentos
- Funções Rápidas
- Galeria e Mídia (Realizações, Melhorias, Aquisições)
- Gestão da Organização (Cadastro, Equipe)


## Fase 39: Ajustar Modais - Botões e Textos Cortados
- [x] Identificar todos os modais com problemas de layout (81 modais encontrados)
- [x] Ajustar TarefasSimplesModal (Funções Rápidas)
- [x] Ajustar modais de Nova Vistoria, Nova Manutenção, Nova Ocorrência
- [x] Ajustar outros modais do sistema (adicionado w-[95vw] a todos)
- [x] Testar todos os modais no navegador


## Fase 40: Renomear botões de "Simples" para "Rápida/Rápido"
- [x] Vistoria Simples → Vistoria Rápida
- [x] Ocorrência Simples → Ocorrência Rápida
- [x] Manutenção Simples → Manutenção Rápida
- [x] Antes e Depois Simples → Antes e Depois Rápido


## Fase 41: Atalho Funções Rápidas no Menu
- [x] Adicionar seção "REGISTRO RÁPIDO" no menu lateral acima de "ATALHOS"
- [x] Incluir botões: Vistoria, Manutenção, Ocorrência, Antes/Depois
- [x] Botões abrem modais de Registro Rápido


## Fase 42: Limpeza do Construtor de App - Foco em Manutenção

### Categorias a MANTER:
- [x] Operacional (Manutenções, Vistorias, Ocorrências, Checklists, Melhorias, Aquisições)
- [x] Eventos e Agenda (apenas Agenda de Vencimentos)
- [x] Galeria e Mídia (Galeria de Fotos, Antes e Depois, Vídeos)
- [x] Estatísticas (Painel de Controlo, Relatórios Gráficos, Métricas)

### Categorias a REMOVER:
- [x] Comunicação (Avisos, Comunicados, Notificações, Mensagem do Gestor)
- [x] Votações e Decisões (Votações, Enquetes, Funcionário do Mês)
- [x] Comunidade (Classificados, Achados e Perdidos, Caronas, Pets)
- [x] Moradores e Funcionários (Moradores, Funcionários, Equipe de Gestão)
- [x] Áreas e Espaços (Vagas, Reservas, Piscina, Academia, Salão, Churrasqueira, Playground, Quadra)
- [x] Documentação (Regras e Normas, Dicas de Segurança, Documentos, Atas)
- [x] Informações (Telefones Úteis, Links Úteis, Sobre a Organização)
- [x] Publicidade e Parceiros (Anúncios, Parceiros, Promoções)

### Arquivos a Modificar:
- [x] AssistenteCriacao.tsx - Remover categorias e módulos não relacionados
- [x] QuickFunctionsEditor.tsx - Remover funções não relacionadas
- [x] AppBuilder.tsx - Remover módulos não relacionados (de 42 para 11)
- [x] Testar Construtor de App no navegador
- [x] Salvar checkpoint


## Fase 43: Limpeza do Sistema de Relatórios - Foco em Manutenção

### Seções a MANTER:
- [x] Operacional (Manutenções, Vistorias, Ocorrências, Checklists, Antes e Depois, Ordens de Serviço, Agenda de Vencimentos)
- [x] Funções Rápidas (Vistorias, Manutenções, Ocorrências, Antes/Depois)
- [x] Galeria e Mídia (Álbuns de Fotos, Realizações, Melhorias, Aquisições)

### Seções a REMOVER:
- [x] Gestão (Moradores, Funcionários, Organização)
- [x] Comunicação (Comunicados, Mensagens do Gestor)
- [x] Destaques

### Arquivos a Modificar:
- [x] RelatorioBuilder.tsx - Remover seções não relacionadas (de 21 para 16 seções, de 5 para 3 categorias)
- [x] Testar geração de relatórios
- [x] Salvar checkpoint


## Fase 44: Limpeza da Revista/Livro de Manutenção - Foco em Manutenção

### Seções antigas REMOVIDAS:
- [x] Mensagem do Síndico
- [x] Avisos
- [x] Eventos
- [x] Funcionários
- [x] Votações
- [x] Telefones Úteis
- [x] Links Úteis
- [x] Classificados
- [x] Caronas
- [x] Achados e Perdidos

### Seções ADICIONADAS (relacionadas a manutenção):
- [x] Resumo do Período (estatísticas gerais)
- [x] Manutenções
- [x] Vistorias
- [x] Ocorrências
- [x] Checklists
- [x] Antes e Depois
- [x] Agenda de Vencimentos
- [x] Realizações
- [x] Melhorias
- [x] Aquisições

### Arquivos Modificados:
- [x] RevistaEditor.tsx - Completamente reescrito com 10 seções de manutenção
- [x] Testar a função Livro de Manutenção
- [x] Salvar checkpoint (versão 19ef2c19)


## Fase 45: Atualizar Modelo do Livro de Manutenção

### Tarefas:
- [x] Analisar os modelos/templates existentes
- [x] Atualizar MagazineWithTemplate.tsx - Páginas de manutenção (Resumo, Manutenções, Vistorias, Ocorrências, Checklists, Antes/Depois)
- [x] Atualizar TemplateSelector.tsx - Preview com seções de manutenção
- [x] Atualizar RevistaForm.tsx - Descrições dos templates
- [x] Atualizar MagazineViewer.tsx - demoMagazine com dados de manutenção
- [x] Adicionar função getPageTitle para novos tipos de página
- [x] Criar componentes ResumoPeriodoPage, ManutencoesPage, VistoriasPage, OcorrenciasPage, ChecklistsPage
- [x] Testar as alterações
- [x] Salvar checkpoint (versão 42b62eea)


## Fase 46: Interatividade do Livro de Manutenção

### 1. Navegação Cruzada entre Seções
- [x] Clicar em Manutenção → Abre detalhes completos
- [x] Clicar em Vistoria → Mostra ocorrências e manutenções relacionadas
- [x] Clicar em Ocorrência → Exibe manutenção que a resolveu
- [x] Links entre seções relacionadas

### 2. Filtros Interativos
- [x] Filtrar por status (Concluída, Em Andamento, Pendente)
- [x] Filtrar por período (semana, mês, trimestre)
- [x] Filtrar por local ou equipamento
- [x] Barra de filtros no topo de cada seção

### 3. Visualização de Detalhes (Modal/Popup)
- [x] Modal com informações completas ao clicar em item
- [x] Galeria de fotos expandida
- [x] Histórico de alterações
- [x] Comentários e observações

### 4. Gráficos Interativos
- [x] Gráfico de pizza clicável (filtrar por status)
- [x] Gráfico de barras por mês (filtrar por período)
- [x] Timeline visual de manutenções
- [x] Integrar Chart.js ou Recharts

### 5. Ações Rápidas
- [x] Botão "Gerar PDF" em cada seção
- [x] Botão "Partilhar" para enviar link específico
- [x] Botão "Exportar" para Excel/CSV
- [x] Botão "Imprimir" otimizado

### Arquivos a Modificar:
- [x] MagazineViewer.tsx - Adicionar interatividade às páginas
- [x] Criar componentes de filtro e modal
- [x] Testar todas as funcionalidades
- [x] Salvar checkpoint


## Fase 47: Sistema de Acesso Híbrido para Apps Criados

### Schema da Base de Dados
- [x] Criar tabela app_usuarios (email, senha_hash, app_id, permissoes)
- [x] Criar tabela app_codigos_acesso (codigo, app_id, ativo, validade)
- [x] Criar tabela app_sessoes (token, usuario_id, app_id, expira_em)
- [x] Criar tabela app_acessos_log (para auditoria)

### Backend (tRPC)
- [x] Criar rota appAcesso.loginComCodigo
- [x] Criar rota appAcesso.loginComEmail
- [x] Criar rota appAcesso.gerarCodigo
- [x] Criar rota appAcesso.cadastrarUsuario
- [x] Criar rota appAcesso.validarSessao
- [x] Criar rota appAcesso.logout
- [ ] Criar rota appAcesso.registarUsuario
- [ ] Criar rota appAcesso.recuperarSenha
- [ ] Criar rota appAcesso.listarUsuarios
- [ ] Criar rota appAcesso.removerUsuario
- [ ] Criar rota appAcesso.gerarCodigo
- [ ] Criar rota appAcesso.validarSessao

### Frontend - Construtor de App (CONCLUÍDO)
- [x] Adicionar aba "Configurar Acesso" no AppBuilder
- [x] Campo para definir código de acesso único
- [x] Lista de utilizadores cadastrados
- [x] Formulário para adicionar novo utilizador (email + senha) (email + senha)
- [x] Opção de permissões (visualizar, editar, administrar) (visualizar, editar, administrar)
- [x] Botão para gerar novo código de acesso

### Frontend - Página Inicial (CONCLUÍDO)
- [x] Criar secção "Aceder ao Meu App" na Home na Home
- [x] Campo para código do app
- [x] Campos email + senha (alternativa) (alternativa)
- [x] Botão "Entrar no App"
- [x] Link "Esqueceu a senha?"
- [x] Link "Primeiro acesso?"

### Autenticação (CONCLUÍDO)
- [x] Implementar hash de senhas (bcrypt) (bcrypt)
- [x] Implementar geração de tokens para apps para apps
- [x] Implementar middleware de validação de sessão de sessão
- [x] Implementar logout

### Testes (CONCLUÍDO)
- [x] Criar testes Vitest para appAcesso (8 testes)
- [x] Testar login com código APP-2026-CNVZ3O
- [x] Testar login com email/senha
- [ ] Testar recuperação de senha (pendente)
- [x] Salvar checkpoint



## Fase 48: Recuperação de Senha por Email para Apps Criados

### Schema da Base de Dados
- [ ] Criar tabela app_tokens_recuperacao (token, usuario_id, app_id, expira_em, usado)

### Backend (tRPC)
- [ ] Criar rota appAcesso.solicitarRecuperacaoSenha
- [ ] Criar rota appAcesso.validarTokenRecuperacao
- [ ] Criar rota appAcesso.redefinirSenha

### Envio de Email
- [ ] Integrar serviço de email (Resend, SendGrid ou similar)
- [ ] Criar template de email de recuperação
- [ ] Implementar função de envio de email

### Frontend - Modal de Login
- [ ] Adicionar link "Esqueceu a senha?" no modal de login
- [ ] Criar modal/página de solicitação de recuperação
- [ ] Campo para inserir email
- [ ] Mensagem de confirmação após envio

### Frontend - Página de Redefinição
- [ ] Criar página /app/recuperar-senha/:token
- [ ] Campo para nova senha
- [ ] Campo para confirmar senha
- [ ] Validação de força de senha
- [ ] Botão "Redefinir Senha"
- [ ] Mensagem de sucesso/erro

### Testes
- [ ] Criar testes para solicitarRecuperacaoSenha
- [ ] Criar testes para validarTokenRecuperacao
- [ ] Criar testes para redefinirSenha
- [ ] Testar fluxo completo no navegador
- [ ] Salvar checkpoint


## Fase 45: Implementação de Exportação PDF para Relatórios

- [x] Verificar bibliotecas de PDF existentes no projeto
- [x] Criar funções de exportação de PDF para Manutenções
- [x] Criar funções de exportação de PDF para Ocorrências
- [x] Criar funções de exportação de PDF para Vistorias
- [x] Criar funções de exportação de PDF para Checklists
- [x] Integrar funções de exportação na página RelatoriosManutencaoPage
- [x] Testar exportações de PDF
- [x] Salvar checkpoint final


## Fase 46: Adicionar Gráficos aos PDFs de Relatórios

- [x] Verificar bibliotecas de gráficos (Chart.js) no projeto
- [x] Instalar dependências necessárias (chartjs-node-canvas ou similar)
- [x] Criar funções para gerar gráficos de distribuição por status
- [x] Criar funções para gerar gráficos de distribuição por responsável
- [x] Criar funções para gerar gráficos de distribuição por prioridade
- [x] Integrar gráficos nas funções de exportação PDF de Manutenções
- [x] Integrar gráficos nas funções de exportação PDF de Ocorrências
- [x] Integrar gráficos nas funções de exportação PDF de Vistorias
- [x] Testar exportações com gráficos
- [x] Salvar checkpoint final


## Fase 47: Implementar Exportação para Excel/CSV

- [x] Verificar bibliotecas de Excel (xlsx, papaparse) no projeto
- [x] Instalar dependências necessárias
- [x] Criar função de exportação Excel para Manutenções
- [x] Criar função de exportação Excel para Ocorrências
- [x] Criar função de exportação Excel para Vistorias
- [x] Criar função de exportação Excel para Checklists
- [x] Adicionar botões de exportação Excel na página RelatoriosManutencaoPage
- [x] Testar exportações Excel
- [x] Salvar checkpoint final


## Fase 48: Melhorias na Agenda de Vencimentos

### Cron Job Automático
- [x] Criar endpoint para processar alertas automaticamente
- [x] Configurar scheduler para executar diariamente às 8h
- [x] Adicionar logs de execução do cron job
- [x] Implementar retry em caso de falha

### Calendário Visual
- [ ] Criar componente de calendário mensal
- [ ] Mostrar vencimentos por dia com cores por tipo
- [ ] Adicionar navegação entre meses
- [ ] Implementar clique para ver detalhes do vencimento

### Upload de Arquivos
- [ ] Adicionar campo de upload no formulário de vencimento
- [ ] Integrar com S3 para armazenar arquivos
- [ ] Mostrar arquivos anexados na visualização
- [ ] Permitir download e exclusão de arquivos

### Exportação Excel
- [ ] Criar função de exportação para Excel
- [ ] Adicionar filtros (tipo, status, período)
- [ ] Incluir todas as colunas relevantes
- [ ] Adicionar botão de exportação na interface



## Fase 49: Sistema de Email - Zoho SMTP
- [ ] Criar serviço de email com Zoho SMTP
- [ ] Integrar envio de email no processamento de alertas de vencimento
- [ ] Configurar credenciais do Zoho (SMTP_USER, SMTP_PASSWORD)
- [ ] Testar envio de emails de alerta


## Fase 49: Sistema de Email - Resend API
- [x] Instalar SDK do Resend
- [x] Criar serviço de email com Resend
- [x] Testar conexão com Resend API
- [x] Verificar domínio appmanutencao.com.br no Resend
- [x] Enviar email de teste com sucesso
- [x] Integrar Resend no processamento de alertas de vencimento
- [x] Remover código SMTP/Zoho desnecessário
- [x] Testar envio de alerta de vencimento real


## Bug: Segundo Menu Duplicado
- [ ] Identificar segundo menu nas páginas de Ordem de Serviço e Agenda de Vencimentos
- [ ] Remover menu duplicado
- [ ] Testar correção


## Fase 50: Configuração do Capacitor
- [x] Instalar @capacitor/core e @capacitor/cli
- [x] Criar capacitor.config.ts
- [x] Fazer build da aplicação
- [x] Adicionar plataforma Android
- [x] Adicionar plataforma iOS
- [x] Testar configuração


## Fase 51: Atualização do Logotipo
- [ ] Remover ícones duplicados das páginas de Ordens de Serviço e Agenda de Vencimentos
- [ ] Adicionar novo logotipo (LogoManutenção2.png) ao projeto
- [ ] Testar alterações


## Bug: Agenda de Vencimentos não carrega conteúdo
- [ ] Investigar erro na página de Agenda de Vencimentos
- [ ] Corrigir o problema
- [ ] Testar a correção


## Bug: Formulário de cadastro de vencimentos não aparece
- [ ] Investigar onde está o formulário de cadastro na página de Agenda de Vencimentos
- [ ] Corrigir a exibição do formulário
- [ ] Testar a correção


## Melhoria: Botões de cadastro na Agenda de Vencimentos
- [ ] Adicionar botões de cadastro de Contratos, Serviços e Manutenções no espaço vazio
- [ ] Testar a funcionalidade


## Bug Corrigido: Erro de validação do campo tipo na Agenda de Vencimentos
- [x] Identificar erro: tipo undefined não aceite na query vencimentos.list
- [x] Tornar campo tipo opcional no backend (routers.ts)
- [x] Remover "undefined as any" do frontend (AgendaVencimentos.tsx)
- [x] Testar correção


## Reorganização da Logo
- [x] Substituir as duas logos do menu lateral pela logo completa "APP MANUTENÇÃO"
- [x] Remover logo da área de conteúdo (Agenda de Vencimentos e Ordens de Serviço)
- [x] Testar alterações


## Bug: Ícone pequeno duplicado no menu lateral
- [ ] Remover ícone pequeno que aparece ao lado da nova logo
- [ ] Testar alteração


## Fase 52: Página de Administração de Usuários

### Análise do Sistema Atual
- [x] Tabela users com campos: id, openId, name, email, loginMethod, role (user/admin/sindico/morador), tipoConta (sindico/administradora/admin)
- [x] adminProcedure já existe para proteger rotas de admin
- [x] Página AdminFuncoes.tsx existe como referência de padrão

### Backend (tRPC)
- [x] Criar rota admin.listarUsuarios (listar todos os usuários com filtros)
- [x] Criar rota admin.atualizarUsuario (alterar role, tipoConta, ativo)
- [x] Criar rota admin.excluirUsuario (soft delete ou hard delete)
- [x] Criar rota admin.estatisticasUsuarios (contagem por role, por mês)

### Frontend
- [x] Criar página AdminUsuarios.tsx
- [x] Tabela com lista de usuários (nome, email, role, tipoConta, último login)
- [x] Filtros por role, tipoConta, período de cadastro
- [x] Ações: Editar role, Desativar, Excluir
- [x] Modal de edição de usuário
- [x] Gráficos de estatísticas (usuários por mês, por role)

### Integração
- [x] Adicionar rota /admin/usuarios no App.tsx
- [x] Adicionar link no menu lateral (apenas para admins)
- [x] Testar funcionalidades
- [x] Salvar checkpoint

## Fase 53: Correção do Menu de Administração

### Bug
- [x] Links Admin Usuários e Admin Funções não aparecem no menu para usuários admin
- [x] Verificar se o menu está sendo renderizado corretamente
- [x] Garantir que o role do usuário está sendo lido corretamente
- [x] Mover menu de admin para o SidebarFooter para evitar sobreposição

## Fase 54: Investigar inconsistências entre menus

### Problema real identificado
- [x] Menu de admin só aparece em algumas páginas (Agenda de Vencimentos, Ordens de Serviço)
- [x] Funções Rápidas diferentes entre os dois menus
- [x] Possivelmente existem dois layouts diferentes sendo usados
- [x] Investigar quais páginas usam qual layout
- [x] Unificar os menus para consistência
- [x] Adicionado Admin Usuários e Admin Funções no Dashboard.tsx

## Fase 55: Unificação dos Layouts de Dashboard

### Objetivo
Remover DashboardLayout das páginas e fazer todas usarem o menu do Dashboard.tsx (menu do síndico).

### Páginas que usam DashboardLayout (9 páginas)
- [ ] AgendaVencimentos.tsx
- [ ] HistoricoAcessosPage.tsx
- [ ] HistoricoInfracoesPage.tsx
- [ ] HistoricoTarefasSimples.tsx
- [ ] NotificarMoradorPage.tsx
- [ ] OrdemServicoDetalhe.tsx
- [ ] OrdensServico.tsx
- [ ] OrdensServicoConfig.tsx
- [ ] AdminUsuarios.tsx

### Implementação
- [ ] Migrar páginas para serem renderizadas dentro do Dashboard.tsx
- [ ] Remover DashboardLayout.tsx (ou manter apenas para casos específicos)
- [ ] Testar todas as páginas afetadas
