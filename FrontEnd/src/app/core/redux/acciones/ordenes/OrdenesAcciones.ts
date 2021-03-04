import {
  ACTUALIZAR_ORDEN,
  AGREGAR_ORDEN,
  ELIMINAR_ORDEN,
  LISTAR_ORDEN,
  LISTAR_ORDENES,
  TiposAccionesOrden,
} from './OrdenesTiposAcciones';
import { ordenInterface, ordenPeticion } from 'app/feature/Orden/models/Orden';
import { OrdenRepositorio } from 'app/core/api/orden.repositorio';

export function listarOrden(orden: ordenPeticion): TiposAccionesOrden {
  return {
    type: LISTAR_ORDEN,
    payload: orden,
  };
}

export function listarOrdenes(
  ordenes: Array<ordenPeticion>
): TiposAccionesOrden {
  return {
    type: LISTAR_ORDENES,
    payload: ordenes,
  };
}

export function agregarOrden(orden: ordenInterface): TiposAccionesOrden {
  return {
    type: AGREGAR_ORDEN,
    payload: orden,
  };
}

export function actualizarOrden(orden: ordenInterface): TiposAccionesOrden {
  return {
    type: ACTUALIZAR_ORDEN,
    payload: orden,
  };
}

export function listarOrdenesAsync() {
  return function (dispacth: any) {
    OrdenRepositorio.consultarOrdenes().then((respuesta: any) => {
      dispacth(listarOrdenes(respuesta.data));
    });
  };
}

export function listarOrdenAsync(id: number) {
  return function (dispacth: any) {
    OrdenRepositorio.consultarOrden(id).then((respuesta: any) => {
      dispacth(listarOrden(respuesta.data));
    });
  };
}

export function agregarOrdenAsync(orden: ordenInterface) {
  return function (dispacth: any) {
    OrdenRepositorio.agregarOrden(orden).then((respuesta: any) => {
      dispacth(agregarOrden(respuesta.data));
    });
  };
}

export function actualizarOrdenAsync(id: number, orden: ordenInterface) {
  return function (dispacth: any) {
    OrdenRepositorio.actualizarOrden(id, orden).then((respuesta: any) => {
      dispacth(actualizarOrden(respuesta.data));
    });
  };
}

export function eliminarOrdenAsync(id: number) {
  return function (dispacth: any) {
    OrdenRepositorio.eliminarOrden(id).then((respuesta: any) => {
      dispacth({
        type: ELIMINAR_ORDEN,
        payload: respuesta.data,
      });
    });
  };
}
