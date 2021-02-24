import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoOrden } from 'src/dominio/orden/puerto/dao/dao-orden';
import { OrdenDto } from 'src/aplicacion/orden/consulta/dto/orden.dto';

@Injectable()
export class DaoOrdenMysql implements DaoOrden {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async listarOrdenes(): Promise<OrdenDto[]> {
    return this.entityManager.query(
      'SELECT o.id, o.idCoordinador, o.idRepartidor, o.fechaCreacion, o.fechaEntrega, o.horaEntrega  FROM ORDENES o',
    );
  }
  async listarOrden(): Promise<OrdenDto> {
    return this.entityManager.query(
      'SELECT o.id, o.idCoordinador, o.idRepartidor, o.fechaCreacion, o.fechaEntrega, o.horaEntrega  FROM ORDENES o',
    );
  }
}
