import { ServicioActualizarOrden } from 'src/dominio/orden/servicio/servicio-actualizar-orden';
import { OrdenTestDataBuilder } from '../../../tdb/orden/orden-tdb';
import { RepositorioOrden } from 'src/dominio/orden/puerto/repositorio/repositorio-orden';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioActualizarOrden', () => {

  let servicioActualizarOrden: ServicioActualizarOrden;
  let repositorioOrdenStub: SinonStubbedInstance<RepositorioOrden>;
  const orden = new OrdenTestDataBuilder().withHoraEntrega('14:00:00').build()
  const id = '1'

  beforeEach(() => {

    repositorioOrdenStub = createStubObj<RepositorioOrden>(['existeOrden', 'actualizar']);
    servicioActualizarOrden = new ServicioActualizarOrden(repositorioOrdenStub);
  });

  it('si la orden existe permite actualizarla', async () => {

    repositorioOrdenStub.existeOrden.returns(Promise.resolve(true));

    await servicioActualizarOrden.ejecutar(id, orden);

    expect(repositorioOrdenStub.actualizar.getCalls().length).toBe(1);
    expect(repositorioOrdenStub.actualizar.calledWith(id, orden)).toBeTruthy();
  });

  it('si la orden no existe genera error', async () => {

    repositorioOrdenStub.existeOrden.returns(Promise.resolve(false));

    await expect(
      servicioActualizarOrden.ejecutar(id, orden),
    ).rejects.toThrow(`La orden ${id} no existe en la base de datos`);

  });
});
