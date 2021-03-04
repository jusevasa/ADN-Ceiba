import * as PropTypes from 'prop-types';
import * as React from 'react';

import { BtnEliminarProducto } from '../EliminarOrden';
import { TableSd } from './styles';
import { ordenPeticion } from '../../models/Orden';

export interface ListaOrdenesProps {
  ordenes: Array<ordenPeticion>;
  onClickEliminarOrden: (id: number) => void;
}

export const ListarOrdenes: React.FC<ListaOrdenesProps> = ({
  ordenes,
  onClickEliminarOrden,
}) => {
  return (
    <TableSd className="mt-5" striped bordered hover>
      <thead>
        <tr>
          <th>#ID</th>
          <th>Coordinador</th>
          <th>Repartidor</th>
          <th>Fecha Creacion</th>
          <th>Fecha Entrega</th>
          <th>Hora Entrega</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {ordenes.map((ordenElement: ordenPeticion) => {
          return (
            <tr key={ordenElement.id}>
              <td>{ordenElement.id}</td>
              <td>{ordenElement.idCoordinador}</td>
              <td>{ordenElement.idRepartidor}</td>
              <td>{ordenElement.fechaCreacion}</td>
              <td>{ordenElement.fechaEntrega}</td>
              <td>{ordenElement.horaEntrega}</td>
              <td>
                <BtnEliminarProducto
                  idOrden={ordenElement.id}
                  onEliminar={onClickEliminarOrden}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableSd>
  );
};

ListarOrdenes.propTypes = {
  ordenes: PropTypes.array.isRequired,
  onClickEliminarOrden: PropTypes.func.isRequired,
};
