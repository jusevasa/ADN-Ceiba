import { RepositorioOrden } from '../puerto/repositorio/repositorio-orden';
import { Orden } from '../modelo/orden';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioCrearOrden {

  constructor(private readonly repositorioOrden: RepositorioOrden) {
  }

  async ejecutar(orden: Orden) {
    if (await this.repositorioOrden.existeRepartidor(orden.idRepartidor, orden.fechaEntrega, orden.horaEntrega)) {
      throw new ErrorDeNegocio(
        `El repartidor ya fue asignado en esta franja horaria`,
      );
    }
    await this.repositorioOrden.guardar(orden);
  }
}
