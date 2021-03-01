import { RepositorioOrden } from '../puerto/repositorio/repositorio-orden';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioEliminarOrden {

  constructor(private readonly repositorioOrden: RepositorioOrden) {
  }

  async ejecutar(id: string) {
    if (!await this.repositorioOrden.existeOrden(id)) {
      throw new ErrorDeNegocio(
        `La orden ${id} no existe en la base de datos`,
      );
    }
    await this.repositorioOrden.eliminar(id);
  }
}
