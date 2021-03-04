import {
  ACTUALIZAR_ORDEN,
  AGREGAR_ORDEN,
  ELIMINAR_ORDEN,
  LISTAR_ORDEN,
  LISTAR_ORDENES,
  TiposAccionesOrden,
} from '../../acciones/ordenes/OrdenesTiposAcciones';

import { EstadoOrden } from '../../modelo/EstadoOrden';
import { ordenPeticion } from 'app/feature/Orden/models/Orden';

const initialState: EstadoOrden = {
  ordenes: Array<ordenPeticion>(),
  orden: {
    id: 0,
    idRepartidor: 0,
    idCoordinador: 0,
    fechaCreacion: '',
    fechaEntrega: '',
    horaEntrega: '',
  },
  updated: 0,
};

export default function (
  state = initialState,
  action: TiposAccionesOrden
): EstadoOrden {
  switch (action.type) {
    case LISTAR_ORDEN: {
      const orden = action.payload;
      return {
        ...state,
        orden,
      };
    }
    case LISTAR_ORDENES: {
      const ordenes = action.payload;
      return {
        ...state,
        ordenes,
      };
    }
    case ACTUALIZAR_ORDEN:
    case ELIMINAR_ORDEN:
    case AGREGAR_ORDEN: {
      return {
        ...state,
        updated: state.updated + 1,
      };
    }

    default:
      return state;
  }
}
