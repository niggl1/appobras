# AppObras - Sistema Completo de Gestão de Obras

## Visão Geral

O **AppObras** é um sistema completo de gestão de obras, reformas e construções, desenvolvido com tecnologias modernas e interface responsiva para desktop e dispositivos móveis.

---

## Módulos Implementados

### 1. Dashboard de Obras (`/dashboard/dashboard-obras`)
- **Visão geral** de todas as obras ativas
- **Gráficos de progresso** com barras e pizza
- **Indicadores de performance** (prazo, orçamento, produtividade, qualidade)
- **Alertas** de prazos e orçamentos
- **Atividades recentes** com timeline
- **Resumo mensal** de medições, diários, pagamentos e entregas

### 2. Orçamentos e Custos (`/dashboard/orcamentos`)
- **Criação de orçamentos** detalhados por categoria
- **Itens de orçamento** com quantidade, unidade e valores
- **Comparativo** orçado vs. realizado
- **Gráficos de custos** por categoria
- **Exportação** para Excel e PDF
- **Templates** de orçamento reutilizáveis

### 3. Mão de Obra (`/dashboard/mao-de-obra`)
- **Cadastro de trabalhadores** com função e salário
- **Controle de horas** trabalhadas e extras
- **Folha de pagamento** automatizada
- **Histórico de presença** por trabalhador
- **Relatórios de produtividade**
- **Exportação** para Excel

### 4. Fornecedores e Contratos (`/dashboard/fornecedores`)
- **Cadastro de fornecedores** com dados completos
- **Gestão de contratos** com valores e prazos
- **Avaliação de fornecedores** (1-5 estrelas)
- **Histórico de compras** por fornecedor
- **Alertas de vencimento** de contratos
- **Categorização** por tipo de serviço/material

### 5. Diário de Obra (`/dashboard/diario-obra`)
- **Registro diário** de atividades
- **Condições climáticas** (temperatura, clima)
- **Mão de obra presente** por função
- **Atividades realizadas** com descrição
- **Materiais utilizados** no dia
- **Equipamentos** em uso
- **Ocorrências e observações**
- **Exportação para PDF** formatado

### 6. Medições e Avanço (`/dashboard/medicoes`)
- **Etapas da obra** com peso percentual
- **Medições periódicas** por etapa
- **Avanço físico** acumulado
- **Avanço financeiro** com valores
- **Gráficos de evolução** temporal
- **Comparativo** previsto vs. realizado
- **Exportação** para PDF e Excel

### 7. Galeria de Fotos (`/dashboard/galeria`)
- **Upload de fotos** com metadados
- **Organização por etapa** da obra
- **Classificação**: Antes / Durante / Depois
- **Timeline visual** cronológica
- **Comparação** antes/depois lado a lado
- **Tags e localização** nas fotos
- **Visualizador** em tela cheia

### 8. Mapa de Obras (`/dashboard/mapa-obras`)
- **Visualização geográfica** de todas as obras
- **Marcadores por status** (em andamento, pausada, finalizada)
- **Detalhes da obra** ao clicar
- **Integração com Google Maps** para rotas
- **Filtros** por status e tipo de obra
- **Lista alternativa** com busca

---

## Funcionalidades Transversais

### Exportação de Dados
- **Excel (XLS)** - Dados tabulares com formatação
- **CSV** - Compatível com qualquer planilha
- **PDF** - Relatórios formatados com logo

### Interface Responsiva
- **Desktop** - Layout completo com sidebar
- **Tablet** - Layout adaptado
- **Mobile** - Navegação inferior otimizada

### Componentes Mobile
- **Header fixo** com título da página
- **Bottom Navigation** com 5 itens principais
- **Menu lateral** deslizante com todas as opções
- **Cards otimizados** para touch
- **Ações rápidas** com ícones grandes

---

## Paleta de Cores

| Cor | Código | Uso |
|-----|--------|-----|
| Amarelo/Dourado | `#F59E0B` | Cor primária, botões, destaques |
| Preto | `#1a1a1a` | Textos, sidebar |
| Branco | `#FFFFFF` | Fundos, cards |
| Cinza Claro | `#F5F5F5` | Fundos secundários |

---

## Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Estilização**: TailwindCSS + shadcn/ui
- **Roteamento**: Wouter
- **Ícones**: Lucide React
- **Gráficos**: Componentes customizados
- **Notificações**: Sonner
- **Build**: Vite

---

## Estrutura de Ficheiros

```
client/src/
├── components/
│   ├── MobileNav.tsx        # Navegação mobile
│   └── ui/                  # Componentes shadcn
├── lib/
│   └── exportUtils.ts       # Utilitários de exportação
├── pages/
│   ├── Home.tsx             # Página inicial
│   ├── Login.tsx            # Login
│   ├── Registar.tsx         # Registo
│   ├── Dashboard.tsx        # Dashboard principal
│   ├── DashboardObras.tsx   # Dashboard de obras
│   ├── OrcamentosPage.tsx   # Orçamentos
│   ├── MaoDeObraPage.tsx    # Mão de obra
│   ├── FornecedoresPage.tsx # Fornecedores
│   ├── DiarioObraPage.tsx   # Diário de obra
│   ├── MedicoesPage.tsx     # Medições
│   ├── GaleriaPage.tsx      # Galeria de fotos
│   └── MapaObrasPage.tsx    # Mapa de obras
└── index.css                # Estilos globais
```

---

## Rotas Disponíveis

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial |
| `/login` | Login |
| `/registar` | Criar conta |
| `/dashboard` | Dashboard principal |
| `/dashboard/dashboard-obras` | Dashboard de obras |
| `/dashboard/orcamentos` | Orçamentos |
| `/dashboard/mao-de-obra` | Mão de obra |
| `/dashboard/fornecedores` | Fornecedores |
| `/dashboard/diario-obra` | Diário de obra |
| `/dashboard/medicoes` | Medições |
| `/dashboard/galeria` | Galeria de fotos |
| `/dashboard/mapa-obras` | Mapa de obras |

---

## Como Executar

```bash
# Instalar dependências
pnpm install

# Modo desenvolvimento
pnpm dev

# Build para produção
pnpm build:client

# Servir build
cd dist && python3 -m http.server 8080
```

---

## Próximos Passos Sugeridos

1. **Backend completo** com base de dados
2. **Autenticação** JWT com refresh tokens
3. **Upload de ficheiros** para S3/Cloud Storage
4. **Notificações push** via Firebase
5. **App nativo** com React Native
6. **Integração** com sistemas de contabilidade
7. **API pública** para integrações

---

## Licença

Propriedade de AppObras. Todos os direitos reservados.
