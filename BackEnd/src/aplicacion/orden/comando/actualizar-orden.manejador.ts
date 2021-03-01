import { Injectable } from '@nestjs/common';
import { ServicioActualizarOrden } from 'src/dominio/orden/servicio/servicio-actualizar-orden';
import { ComandoActualizarOrden } from './actualizar-orden.comando';
import { Orden } from 'src/dominio/orden/modelo/orden';

@Injectable()
export class ManejadorActualizarOrden {
  constructor(private servicioActualizarOrden: ServicioActualizarOrden) { }

  async ejecutar(id: string, comandoActualizarOrden: ComandoActualizarOrden) {
    await this.servicioActualizarOrden.ejecutar(id,
      new Orden(
        comandoActualizarOrden.idCoordinador,
        comandoActualizarOrden.idRepartidor,
        comandoActualizarOrden.fechaCreacion,
        comandoActualizarOrden.fechaEntrega,
        comandoActualizarOrden.horaEntrega,
      ),
    );
  }
}
