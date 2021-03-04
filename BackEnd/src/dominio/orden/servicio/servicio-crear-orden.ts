import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { Orden } from '../modelo/orden';
import { RepositorioOrden } from '../puerto/repositorio/repositorio-orden';

export class ServicioCrearOrden {

  constructor(private readonly repositorioOrden: RepositorioOrden) {
  }

  async ejecutar(orden: Orden) {
    if (await this.repositorioOrden.existeRepartidor(orden.idRepartidor, orden.fechaEntrega, orden.horaEntrega)) {
      throw new ErrorDeNegocio(
        `El repartidor ya fue asignado en esta franja horaria`,
      );
    }
    return await this.repositorioOrden.guardar(orden);
  }
}
