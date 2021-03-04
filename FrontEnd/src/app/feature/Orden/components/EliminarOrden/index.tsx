import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Button } from 'react-bootstrap';

interface BtnEliminarOrdenProps {
  idOrden: number;
  onEliminar: (id: number) => any;
}

export const BtnEliminarProducto: React.FC<BtnEliminarOrdenProps> = ({
  idOrden,
  onEliminar,
}) => {
  const handleEliminar = () => onEliminar(idOrden);
  return (
    <Button variant="danger" onClick={handleEliminar}>
      <span role="img" aria-labelledby="trash">
        🗑️
      </span>
    </Button>
  );
};

BtnEliminarProducto.propTypes = {
  idOrden: PropTypes.number.isRequired,
  onEliminar: PropTypes.func.isRequired,
};
