import { Injectable, Inject, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { ParametrosGenerales } from './entities/parametros-generales.entity';
import { KardexAlmacen } from './entities/kardex-almacen.entity';
import { KardexAlmacenDetalle } from './entities/kardex-almacen-detalle.entity';

@Injectable({ scope: Scope.REQUEST })
export class BasicReportsService {
  constructor(
    @Inject(REQUEST) private readonly req: Request, 
  ) {}

  async getAllParametrosGenerales(): Promise<ParametrosGenerales[]> {
    const manager = this.req['dbConnection'];
    const repository = manager.getRepository(ParametrosGenerales);
    return repository.find();
  }

  async getAllKardexAlmacen(): Promise<KardexAlmacen[]> {
    const manager = this.req['dbConnection'];
    const repository = manager.getRepository(KardexAlmacen);
    return repository.find({ relations: ['detalles'] });
  }

  async getAllKardexAlmacenDetalle(): Promise<KardexAlmacenDetalle[]> {
    const manager = this.req['dbConnection'];
    const repository = manager.getRepository(KardexAlmacenDetalle);
    return repository.find({ relations: ['kardexAlmacen'] });
  }

  async getFirstKardexAlmacen(): Promise<KardexAlmacen> {
    const manager = this.req['dbConnection'];
    const repository = manager.getRepository(KardexAlmacen);
    const [firstRecord] = await repository.find({
      order: { fecha: 'ASC' },
      take: 1,
    });
    return firstRecord;
  }
}
