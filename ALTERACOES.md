# AppObras - Alterações Realizadas

## Resumo
Sistema de gestão de obras adaptado a partir do sistema de manutenção universal.

## Identidade Visual

### Cores
- **Primária:** Amarelo (#F59E0B / amber-500)
- **Secundária:** Preto (#000000)
- **Fundo:** Branco (#FFFFFF)
- **Gradientes:** Amarelo para dourado

### Logo
- Logo personalizada com trabalhador de construção
- Favicon gerado em múltiplos tamanhos (16x16, 32x32, 180x180, 192x192, 512x512)

## Terminologia Adaptada

| Original | Adaptado |
|----------|----------|
| Manutenção | Obra |
| Condomínio | Obra |
| Síndico | Engenheiro |
| Administradora | Construtora |
| Morador | Colaborador |
| Manutenção Completa | Obra Completa |
| Manutenção Rápida | Obra Rápida |

## Funcionalidades Adaptadas

### Módulos Principais
1. **Ordens de Serviço** - Gestão de ordens de obra
2. **Vistorias de Obra** - Vistorias com fotos e checklists
3. **Gestão de Equipes** - Controle de colaboradores
4. **Cronograma de Obras** - Planeamento com alertas
5. **Controle de Materiais** - Gestão de estoque
6. **Relatórios Detalhados** - Relatórios de progresso
7. **Registro Fotográfico** - Documentação visual
8. **Localização GPS** - Geolocalização de serviços
9. **Gestão de Ocorrências** - Problemas e não conformidades

### Setores Atendidos
- Construção Residencial
- Construção Comercial
- Construção Industrial
- Reformas
- Infraestrutura
- Projetos Especiais
- Logística de Obra
- Segurança do Trabalho

## Ficheiros Modificados

### Páginas
- `client/src/pages/Home.tsx` - Landing page completa
- `client/src/pages/Login.tsx` - Página de login
- `client/src/pages/Registar.tsx` - Página de registo
- `client/src/pages/Dashboard.tsx` - Painel principal

### Estilos
- `client/src/index.css` - Variáveis CSS e tema

### Configuração
- `client/index.html` - Meta tags e título
- `package.json` - Nome do projeto

### Assets
- `client/public/logo-appobras.png` - Logo principal
- `client/public/favicon-*.png` - Favicons

## Como Executar

```bash
cd /home/ubuntu/appobras
pnpm install
pnpm dev
```

## Build de Produção

```bash
pnpm build:client
```

Os ficheiros compilados estarão em `/home/ubuntu/appobras/dist/`
