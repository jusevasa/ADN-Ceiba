import {
  LISTAR_ORDEN,
  LISTAR_ORDENES,
  AGREGAR_ORDEN,
  ACTUALIZAR_ORDEN,
  ELIMINAR_ORDEN,
  TiposAccionesOrden,
} from './OrdenesTiposAcciones';
import { Orden } from 'app/feature/Orden/models/Orden';
import { ProductoRepositorio } from 'app/core/api/productos.repositorio';

export function listarProductos(
  ordenes: Array<Orden>,
  cantidadTotalProducto: number
): TiposAccionesOrden {
  return {
    type: LISTAR_PRODUCTOS,
    payload: productos,
    cantidadTotalProducto,
  };
}

export function agregarNuevoProducto(
  producto: Producto
): TiposAccionesProducto {
  return {
    type: AGREGAR_PRODUCTO,
    payload: producto,
  };
}

export function eliminarProducto(producto: Producto): TiposAccionesProducto {
  return {
    type: ELIMINAR_PRODUCTO,
    payload: producto,
  };
}

export function listarProductosAsync(numeroPagina: number) {
  return function (dispacth: any) {
    ProductoRepositorio.consultarPorPagina(
      numeroPagina
    ).then((respuesta: any) =>
      dispacth(
        listarProductos(respuesta.data.articles, respuesta.data.articlesCount)
      )
    );
  };
}
