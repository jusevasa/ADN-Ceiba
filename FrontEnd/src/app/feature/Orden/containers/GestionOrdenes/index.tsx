import * as PropTypes from 'prop-types';
import * as React from 'react';

import { DivContainer, DivRow } from './styles';
import { ordenInterface, ordenPeticion } from '../../models/Orden';

import { FormCrearOrden } from '../../components/FormCrearOrden';
import { ListarOrdenes } from '../../components/ListarOrdenes';
import { useEffect } from 'react';

interface GestionOrdenesProps {
  ordenes: Array<ordenPeticion>;
  updated: number;
  listarOrdenes: () => void;
  agregarOrden: (orden: ordenInterface) => void;
  eliminarOrden: (id: number) => void;
}

export const GestionOrdenes: React.FC<GestionOrdenesProps> = ({
  ordenes,
  updated,
  eliminarOrden,
  listarOrdenes,
  agregarOrden,
}) => {
  useEffect(() => {
    listarOrdenes();
  }, [listarOrdenes, updated]);
  return (
    <DivContainer>
      <DivRow>
        <FormCrearOrden onSubmit={agregarOrden} formTitle="Crear orden" />
      </DivRow>
      <DivRow>
        <ListarOrdenes ordenes={ordenes} onClickEliminarOrden={eliminarOrden} />
      </DivRow>
    </DivContainer>
  );
};

GestionOrdenes.propTypes = {
  ordenes: PropTypes.array.isRequired,
  updated: PropTypes.number.isRequired,
  listarOrdenes: PropTypes.func.isRequired,
  agregarOrden: PropTypes.func.isRequired,
  eliminarOrden: PropTypes.func.isRequired,
};
