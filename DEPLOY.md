# AppObras - Guia de Deploy

Este guia explica como configurar o banco de dados TiDB Cloud e fazer deploy no Vercel.

---

## 1. Configurar TiDB Cloud

### 1.1 Criar Cluster

1. Acesse [TiDB Cloud](https://tidbcloud.com/)
2. Faça login na sua conta
3. Clique em **Create Cluster**
4. Selecione **Serverless** (gratuito até 5GB)
5. Escolha a região mais próxima (ex: `us-east-1`)
6. Dê um nome ao cluster: `appobras`
7. Clique em **Create**

### 1.2 Obter Connection String

1. No dashboard do cluster, clique em **Connect**
2. Selecione **General** como tipo de conexão
3. Copie a **Connection String** no formato:
   ```
   mysql://user:password@gateway01.region.prod.aws.tidbcloud.com:4000/database?ssl={"rejectUnauthorized":true}
   ```
4. Guarde esta string - será usada como `DATABASE_URL`

### 1.3 Criar Tabelas

1. No dashboard do TiDB, clique em **SQL Editor**
2. Abra o ficheiro `database/create-tables.sql`
3. Cole e execute o conteúdo no SQL Editor
4. Verifique se todas as tabelas foram criadas

---

## 2. Configurar Vercel

### 2.1 Importar Projeto

1. Acesse [Vercel](https://vercel.com/)
2. Clique em **Add New** > **Project**
3. Importe o repositório do GitHub
4. Configure as seguintes opções:
   - **Framework Preset**: Other
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

### 2.2 Configurar Variáveis de Ambiente

No painel do projeto Vercel, vá em **Settings** > **Environment Variables** e adicione:

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `DATABASE_URL` | `mysql://...` | Connection string do TiDB |
| `JWT_SECRET` | `sua-chave-secreta` | Chave para tokens JWT |
| `OWNER_OPEN_ID` | `local_xxx` | ID do admin (opcional) |

### 2.3 Deploy

1. Clique em **Deploy**
2. Aguarde o build completar
3. Acesse a URL gerada pelo Vercel

---

## 3. Configuração Pós-Deploy

### 3.1 Executar Migrations

Se preferir usar Drizzle para migrations:

```bash
# Instalar drizzle-kit globalmente
npm install -g drizzle-kit

# Gerar migrations
DATABASE_URL="sua-connection-string" npx drizzle-kit generate:mysql

# Aplicar migrations
DATABASE_URL="sua-connection-string" npx drizzle-kit push:mysql
```

### 3.2 Criar Primeiro Usuário Admin

1. Acesse a aplicação
2. Clique em **Criar Conta**
3. Registre-se com seu email
4. No TiDB SQL Editor, execute:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'seu@email.com';
   ```

---

## 4. Domínio Personalizado (Opcional)

### 4.1 Adicionar Domínio no Vercel

1. Vá em **Settings** > **Domains**
2. Adicione seu domínio: `appobras.seudominio.com`
3. Configure os registros DNS conforme instruído

### 4.2 Configurar DNS

Adicione os seguintes registros no seu provedor de DNS:

| Tipo | Nome | Valor |
|------|------|-------|
| CNAME | appobras | cname.vercel-dns.com |

---

## 5. Troubleshooting

### Erro de Conexão com Banco

- Verifique se a `DATABASE_URL` está correta
- Confirme que o IP do Vercel está na whitelist do TiDB
- No TiDB Cloud, vá em **Security** > **IP Access List** e adicione `0.0.0.0/0` (para testes)

### Build Falha

- Verifique os logs no Vercel
- Certifique-se que todas as dependências estão no `package.json`
- Execute `pnpm build` localmente para testar

### Páginas Não Carregam

- Verifique as rewrites no `vercel.json`
- Confirme que o `outputDirectory` está correto

---

## 6. Comandos Úteis

```bash
# Desenvolvimento local
pnpm dev

# Build para produção
pnpm build

# Verificar tipos TypeScript
pnpm check

# Gerar migrations do Drizzle
pnpm db:generate

# Aplicar migrations
pnpm db:push
```

---

## 7. Estrutura de Custos

### TiDB Cloud Serverless (Gratuito)
- 5 GB de armazenamento
- 50 milhões de Request Units/mês
- Ideal para projetos pequenos/médios

### Vercel Hobby (Gratuito)
- Bandwidth: 100 GB/mês
- Serverless Function Executions: 100 GB-Hrs
- Ideal para projetos pessoais

### Upgrade (Se necessário)
- TiDB Cloud: A partir de $0.29/milhão de RUs
- Vercel Pro: $20/mês por membro

---

## Suporte

Em caso de dúvidas:
- TiDB Cloud: https://docs.pingcap.com/tidbcloud
- Vercel: https://vercel.com/docs
- Drizzle ORM: https://orm.drizzle.team/docs
