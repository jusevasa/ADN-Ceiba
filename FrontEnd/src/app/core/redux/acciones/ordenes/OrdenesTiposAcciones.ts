import { ordenInterface, ordenPeticion } from 'app/feature/Orden/models/Orden';

export const LISTAR_ORDEN = 'LISTAR_ORDEN';
export const LISTAR_ORDENES = 'LISTAR_ORDENES';
export const AGREGAR_ORDEN = 'AGREGAR_ORDEN';
export const ACTUALIZAR_ORDEN = 'ACTUALIZAR_ORDEN';
export const ELIMINAR_ORDEN = 'ELIMINAR_ORDEN';

interface AccionListarOrden {
  type: typeof LISTAR_ORDEN;
  payload: ordenPeticion;
}

interface AccionListarOrdenes {
  type: typeof LISTAR_ORDENES;
  payload: ordenPeticion[];
}

interface AccionAgregarOrden {
  type: typeof AGREGAR_ORDEN;
  payload: ordenInterface;
}

interface AccionActualizarOrden {
  type: typeof ACTUALIZAR_ORDEN;
  payload: ordenInterface;
}

interface AccionEliminarOrden {
  type: typeof ELIMINAR_ORDEN;
  payload: ordenInterface;
}

export type TiposAccionesOrden =
  | AccionListarOrden
  | AccionListarOrdenes
  | AccionAgregarOrden
  | AccionActualizarOrden
  | AccionEliminarOrden;
