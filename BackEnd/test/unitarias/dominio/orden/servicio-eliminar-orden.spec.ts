import { ServicioEliminarOrden } from 'src/dominio/orden/servicio/servicio-eliminar-orden';
import { ordenTestDataBuilder } from '../../../tdb/orden/orden-tdb';
import { RepositorioOrden } from 'src/dominio/orden/puerto/repositorio/repositorio-orden';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioActualizarOrden', () => {

  let servicioEliminarOrden: ServicioEliminarOrden;
  let repositorioOrdenStub: SinonStubbedInstance<RepositorioOrden>;
  const id = '1'

  beforeEach(() => {

    repositorioOrdenStub = createStubObj<RepositorioOrden>(['existeOrden', 'eliminar']);
    servicioEliminarOrden = new ServicioEliminarOrden(repositorioOrdenStub);
  });

  it('si la orden existe permite eliminarla', async () => {

    repositorioOrdenStub.existeOrden.returns(Promise.resolve(true));

    await servicioEliminarOrden.ejecutar(id);

    expect(repositorioOrdenStub.eliminar.getCalls().length).toBe(1);
    expect(repositorioOrdenStub.eliminar.calledWith(id)).toBeTruthy();
  });

  it('si la orden no existe genera error', async () => {

    repositorioOrdenStub.existeOrden.returns(Promise.resolve(false));

    await expect(
      servicioEliminarOrden.ejecutar(id),
    ).rejects.toThrow(`La orden ${id} no existe en la base de datos`);

  });
});
