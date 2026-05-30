# Backend - Estrutura e arquitetura geral

## Objetivo
Este guia padroniza como agentes devem criar e evoluir codigo no backend do We4U Hub.
A regra principal e manter separacao de responsabilidades por camada:
- Controller: entrada HTTP
- Service: regra de negocio
- Repository: acesso a dados
- Schema: validacao e tipos

## Mapa do backend

```text
backend/src/
  app.ts
  server.ts
  routes.ts
  config/
  infra/
    database/
    database/integration/
  middlewares/
  modules/
    _integrations/
    <dominio>/
      <dominio>.controller.ts
      <dominio>.service.ts
      <dominio>.repository.ts
      <dominio>.schema.ts|schemas.ts
  utils/
```

## Fluxo padrao de requisicao
1. Rota em `routes.ts` aponta para metodo do controller.
2. `app.ts` monta prefixos de rota e aplica middlewares globais.
3. Controller valida payload/query e chama service.
4. Service executa regra de negocio e orquestra repositorios.
5. Repository faz leitura/escrita no banco via Prisma (ou provider de integracao).
6. Erros sobem para `errorHandler.middleware.ts`.

## Convencoes obrigatorias

### Nomes de arquivos e classes
- Dominio comum:
  - `clients.controller.ts`
  - `clients.service.ts`
  - `clients.repository.ts`
  - `clients.schema.ts` ou `clients.schemas.ts`
- Integracoes:
  - `employees.integration.controller.ts`
  - `employees.integration.service.ts`
  - `employees.integration.repository.ts`
  - `employees.integration.schemas.ts`

### Importacao
- Preferir alias `@/` para modulos internos.
- Evitar import relativo longo quando existir alias equivalente.

### Resposta HTTP
Responder com padrao:
- `status`
- `description`
- `message`
- `requestId`
- `data` (quando aplicavel)

### Tratamento de erro
- Controller sempre com `try/catch` e `next(error)`.
- Erros de dominio devem usar classes de `utils/errors`.
- Nunca retornar stack trace para cliente.

### Paginacao
- Ler query com `parsePagination` (`utils/pagination/index.ts`).
- Repository retorna `buildPaginatedResult` quando houver listagem paginada.

### Transacao
- Quando houver multiplas gravacoes relacionadas, usar `prisma.$transaction`.

## Onde registrar novos modulos
1. Criar pasta do modulo em `backend/src/modules/<modulo>`.
2. Criar controller/service/repository/schema.
3. Instanciar controller em `backend/src/routes.ts`.
4. Registrar subrouter no arquivo `backend/src/app.ts` com prefixo `/api/v1/<recurso>`.

## Checklist de qualidade para agente
- Nomes seguem padrao do projeto.
- Controller sem regra de negocio complexa.
- Service sem acesso SQL direto.
- Repository sem logica de HTTP.
- Validacao de entrada com Zod quando houver payload.
- Mensagens de sucesso/erro coerentes com contexto.
- Rota protegida com `permissionHandler` quando necessario.
- Sem quebrar formato de resposta existente.

## Checklist de performance e agilidade
- Listagens devem ser paginadas por padrao.
- Evitar N+1 em loops quando possivel (consultas em lote).
- Reutilizar repositorios existentes antes de criar novos.
- Reutilizar helpers compartilhados de validacao, erro e paginacao.
