import { RepositorioOrden } from '../puerto/repositorio/repositorio-orden';
import { Orden } from '../modelo/orden';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioRegistrarOrden {

  constructor(private readonly repositorioOrden: RepositorioOrden) {
  }

  // async ejecutar(orden: Orden) {
  //   if (await this.repositorioOrden.existeOrden(orden.id)) {
  //     throw new ErrorDeNegocio(
  //       `La orden ${orden.id} ya existe`,
  //     );
  //   }
  //   await this.repositorioOrden.guardar(orden);
  // }
}
