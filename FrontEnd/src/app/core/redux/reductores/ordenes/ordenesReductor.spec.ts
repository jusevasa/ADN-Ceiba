import {
  actualizarOrden,
  agregarOrden,
} from 'app/core/redux/acciones/ordenes/OrdenesAcciones';

import { EstadoOrden } from 'app/core/redux/modelo/EstadoOrden';
import { ordenPeticion } from 'app/feature/Orden/models/Orden';
import reductorOrdenes from './ordenesReductor';

describe('Reductor Orden', () => {
  it('debería agregar orden', () => {
    // Arrange
    const estadoInicial: EstadoOrden = {
      ordenes: [],
      updated: 0,
      orden: {
        idRepartidor: 1,
        idCoordinador: 1,
        id: 1,
        horaEntrega: '12:00:00',
        fechaEntrega: new Date().toISOString(),
        fechaCreacion: new Date().toISOString(),
      },
    };
    const nuevaOrden: ordenPeticion = {
      id: 2,
      idRepartidor: 1,
      idCoordinador: 1,
      horaEntrega: '12:00:00',
      fechaEntrega: new Date().toISOString(),
      fechaCreacion: new Date().toISOString(),
    };
    const estadoEsperado: EstadoOrden = {
      ...estadoInicial,
      updated: 1,
    };

    // Act
    const nuevoEstado = reductorOrdenes(
      estadoInicial,
      agregarOrden(nuevaOrden)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
  it('debería actualizar orden', () => {
    // Arrange
    const estadoInicial: EstadoOrden = {
      ordenes: [],
      updated: 0,
      orden: {
        idRepartidor: 1,
        idCoordinador: 1,
        id: 1,
        horaEntrega: '12:00:00',
        fechaEntrega: new Date().toISOString(),
        fechaCreacion: new Date().toISOString(),
      },
    };
    const nuevaOrden: ordenPeticion = {
      id: 2,
      idRepartidor: 1,
      idCoordinador: 1,
      horaEntrega: '12:00:00',
      fechaEntrega: new Date().toISOString(),
      fechaCreacion: new Date().toISOString(),
    };
    const estadoEsperado: EstadoOrden = {
      ...estadoInicial,
      updated: 1,
    };

    // Act
    const nuevoEstado = reductorOrdenes(
      estadoInicial,
      actualizarOrden(nuevaOrden)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
});
