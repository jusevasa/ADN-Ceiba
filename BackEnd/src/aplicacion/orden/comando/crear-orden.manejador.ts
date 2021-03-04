import { ComandoCrearOrden } from './crear-orden.comando';
import { Injectable } from '@nestjs/common';
import { Orden } from 'src/dominio/orden/modelo/orden';
import { ServicioCrearOrden } from 'src/dominio/orden/servicio/servicio-crear-orden';

@Injectable()
export class ManejadorCrearOrden {
  constructor(private servicioCrearOrden: ServicioCrearOrden) {}

  async ejecutar(comandoCrearOrden: ComandoCrearOrden) {
    return await this.servicioCrearOrden.ejecutar(
      new Orden(
        comandoCrearOrden.idCoordinador,
        comandoCrearOrden.idRepartidor,
        comandoCrearOrden.fechaCreacion,
        comandoCrearOrden.fechaEntrega,
        comandoCrearOrden.horaEntrega,
      ),
    );
  }
}
