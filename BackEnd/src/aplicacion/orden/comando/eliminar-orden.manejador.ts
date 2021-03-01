import { Injectable } from '@nestjs/common';
import { ComandoEliminarOrden } from './eliminar-orden.comando'
import { ServicioEliminarOrden } from 'src/dominio/orden/servicio/servicio-eliminar-orden';

@Injectable()
export class ManejadorEliminarOrden {
  constructor(private servicioEliminarOrden: ServicioEliminarOrden) { }

  async ejecutar(comandoEliminarOrden: ComandoEliminarOrden) {
    await this.servicioEliminarOrden.ejecutar(String(comandoEliminarOrden))
  }
}
