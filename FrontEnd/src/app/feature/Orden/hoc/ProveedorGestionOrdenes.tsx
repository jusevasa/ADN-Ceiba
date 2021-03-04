import {
  agregarOrdenAsync,
  eliminarOrdenAsync,
  listarOrdenesAsync,
} from 'app/core/redux/acciones/ordenes/OrdenesAcciones';
import { EstadoGeneral } from 'app/core/redux/modelo/EstadoGeneral';
import { GestionOrdenes } from '../containers/GestionOrdenes';
import { connect } from 'react-redux';

const mapStateToProps = (state: EstadoGeneral) => {
  return state.ordenes;
};

export const ProveedorGestionOrdenes = connect(mapStateToProps, {
  listarOrdenes: listarOrdenesAsync,
  agregarOrden: agregarOrdenAsync,
  eliminarOrden: eliminarOrdenAsync,
})(GestionOrdenes);
