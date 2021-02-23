import { Orden } from '../../modelo/orden';

export abstract class RepositorioOrden {

  abstract async existeRepartidor(idRepartidor: number, fechaEntrega: Date, hora: string): Promise<boolean>;

  /**
  * @param {object} Orden
  * @returns  la `orden`
  */
  abstract async guardar(orden: Orden): Promise<any>;

  /**
 * @param {number} id
 * @param {object} OrdenDto
 * @returns una `orden` objeto contenido en la data
 */
  abstract async actualizar(id: number, orden: Orden): Promise<any>;

  /**
  * @param {number} id
  * @returns status code
  */
  abstract async eliminar(id: number): Promise<any>;

}
