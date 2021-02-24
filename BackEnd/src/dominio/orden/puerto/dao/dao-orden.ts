import { OrdenDto } from 'src/aplicacion/orden/consulta/dto/orden.dto';

export abstract class DaoOrden {

  /**
    * @returns todas las `ordenes` contenidas en la data
    */
  abstract async listarOrdenes(): Promise<OrdenDto[]>;

  /**
    * @param {number} id
    * @returns  la `orden` filtrada por id
    */
  abstract async listarOrden(id: number): Promise<OrdenDto>;

}
