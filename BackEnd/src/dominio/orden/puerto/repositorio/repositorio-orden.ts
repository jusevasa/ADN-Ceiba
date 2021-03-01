import { Orden } from '../../modelo/orden';

export abstract class RepositorioOrden {
  /**
  * @param {number} idRepartidor
  * @param {Date} fechaEntrega
  * @param {string} hora
  ** @returns  boolean
  */
  abstract async existeRepartidor(idRepartidor: number, fechaEntrega: Date, hora: string): Promise<boolean>;

  /**
  * @param {number} id
  * @returns  boolean
  */
  abstract async existeOrden(id: string): Promise<boolean>;

  /**
  * @param {object} Orden
  */
  abstract async guardar(orden: Orden): Promise<void>;

  /**
  * @param {number} id
  * @param {object} OrdenDto
  */
  abstract async actualizar(id: string, orden: Orden): Promise<void>;

  /**
  * @param {number} id
  */
  abstract async eliminar(id: string): Promise<void>;

}
