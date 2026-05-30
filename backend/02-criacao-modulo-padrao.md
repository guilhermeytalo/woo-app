# Backend - Como criar modulo padrao (nao integracao)

## Escopo
Aplica para modulos em:
- `backend/src/modules/<modulo>/*`

## Estrutura minima do modulo

```text
backend/src/modules/<modulo>/
  <modulo>.controller.ts
  <modulo>.service.ts
  <modulo>.repository.ts
  <modulo>.schema.ts|schemas.ts
```

## Passo a passo
1. Criar schema Zod do recurso.
2. Criar repository com metodos de acesso a dados.
3. Criar service com regra de negocio.
4. Criar controller com validacao e resposta HTTP.
5. Adicionar rotas em `backend/src/routes.ts`.
6. Montar prefixo da rota em `backend/src/app.ts`.

## Template de schema
```ts
import { z } from "zod";

export const ResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  active: z.boolean().default(true),
  createdAt: z.date().optional().default(() => new Date()),
  updatedAt: z.date().optional().default(() => new Date()),
});

export const CreateResourceSchema = ResourceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateResourceSchema = CreateResourceSchema.partial();

export type Resource = z.infer<typeof ResourceSchema>;
export type CreateResource = z.infer<typeof CreateResourceSchema>;
export type UpdateResource = z.infer<typeof UpdateResourceSchema>;
```

## Template de repository
```ts
import { prisma } from "@/infra/database";
import { Prisma } from "@/infra/database/prisma/generated/client";
import { buildPaginatedResult, PaginationParams } from "@/utils/pagination";
import { CreateResource, UpdateResource } from "./resource.schemas";

export class ResourceRepository {
  async findAll(pagination: PaginationParams, tx?: Prisma.TransactionClient) {
    const connection = tx || prisma;

    const [data, quantity] = await connection.$transaction([
      connection.resource.findMany({
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { createdAt: "desc" },
      }),
      connection.resource.count(),
    ]);

    return buildPaginatedResult(data, quantity, pagination.limit);
  }

  async findById(id: string, tx?: Prisma.TransactionClient) {
    const connection = tx || prisma;
    return connection.resource.findUnique({ where: { id } });
  }

  async create(data: CreateResource, tx?: Prisma.TransactionClient) {
    const connection = tx || prisma;
    return connection.resource.create({ data });
  }

  async updateById(id: string, data: UpdateResource, tx?: Prisma.TransactionClient) {
    const connection = tx || prisma;
    return connection.resource.update({ where: { id }, data });
  }

  async deleteById(id: string, tx?: Prisma.TransactionClient) {
    const connection = tx || prisma;
    return connection.resource.delete({ where: { id } });
  }
}
```

## Template de service
```ts
import { NotFoundError } from "@/utils/errors";
import { ResourceRepository } from "./resource.repository";
import { CreateResource, UpdateResource } from "./resource.schemas";
import { PaginationParams } from "@/utils/pagination";

export class ResourceService {
  private repository: ResourceRepository;

  constructor() {
    this.repository = new ResourceRepository();
  }

  async findAll(pagination: PaginationParams) {
    return this.repository.findAll(pagination);
  }

  async findById(id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundError({ message: "Resource not found" });
    return found;
  }

  async create(data: CreateResource) {
    return this.repository.create(data);
  }

  async updateById(id: string, data: UpdateResource) {
    await this.findById(id);
    return this.repository.updateById(id, data);
  }

  async deleteById(id: string) {
    await this.findById(id);
    await this.repository.deleteById(id);
  }
}
```

## Template de controller
```ts
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@/utils/errors";
import { parsePagination } from "@/utils/pagination";
import { ResourceService } from "./resource.service";
import { CreateResourceSchema, UpdateResourceSchema } from "./resource.schemas";

export class ResourceController {
  private service: ResourceService;

  constructor() {
    this.service = new ResourceService();
  }

  readAll = async (req: Request, res: Response, next: NextFunction) => {
    const requestId = req.requestId;

    try {
      const pagination = parsePagination(req.query);
      const data = await this.service.findAll(pagination);

      return res.status(200).json({
        status: 200,
        description: "Success",
        message: "Sucesso ao listar recursos",
        requestId,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    const requestId = req.requestId;

    try {
      const validation = CreateResourceSchema.safeParse(req.body);
      if (!validation.success) {
        throw new BadRequestError({
          message: "Invalid payload",
          details: validation.error.issues,
        });
      }

      const data = await this.service.create(validation.data);

      return res.status(201).json({
        status: 201,
        description: "Created",
        message: "Sucesso ao criar recurso",
        requestId,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
```

## Registro de rotas
No `routes.ts`:
- instanciar controller
- criar router dedicado
- registrar endpoints com `permissionHandler`

No `app.ts`:
- `app.use('/api/v1/<recurso>', routes.<resourceRoutes>)`

## Regras de ouro
- Nao duplicar regra de negocio entre controller e service.
- Nao acessar banco no controller.
- Nao retornar erro bruto de biblioteca para o cliente.
- Preservar naming e formato de resposta usados no projeto.
