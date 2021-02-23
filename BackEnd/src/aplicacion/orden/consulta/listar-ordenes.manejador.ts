import { Injectable } from '@nestjs/common';

import { DaoOrden } from 'src/dominio/orden/puerto/dao/dao-orden';
import { OrdenDto } from 'src/aplicacion/orden/consulta/dto/orden.dto';

@Injectable()
export class ManejadorListarOrden {
  constructor(private daoOrden: DaoOrden) { }

  async ejecutar(): Promise<OrdenDto[]> {
    return this.daoOrden.listarOrdenes();
  }
}
