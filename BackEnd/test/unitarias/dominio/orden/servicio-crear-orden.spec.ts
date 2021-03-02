import { ServicioCrearOrden } from 'src/dominio/orden/servicio/servicio-crear-orden';
import { OrdenTestDataBuilder } from '../../../tdb/orden/orden-tdb';
import { RepositorioOrden } from 'src/dominio/orden/puerto/repositorio/repositorio-orden';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioCrearOrden', () => {

  let servicioCrearOrden: ServicioCrearOrden;
  let repositorioOrdenStub: SinonStubbedInstance<RepositorioOrden>;

  beforeEach(() => {

    repositorioOrdenStub = createStubObj<RepositorioOrden>(['existeRepartidor', 'guardar']);
    servicioCrearOrden = new ServicioCrearOrden(repositorioOrdenStub);
  });

  it('si el repartidor esta disponible guarda la orden', async () => {
    const orden = new OrdenTestDataBuilder().withHoraEntrega('14:00:00').build()
    repositorioOrdenStub.existeRepartidor.returns(Promise.resolve(false));

    await servicioCrearOrden.ejecutar(orden);

    expect(repositorioOrdenStub.guardar.getCalls().length).toBe(1);
    expect(repositorioOrdenStub.guardar.calledWith(orden)).toBeTruthy();
  });

  it('si el repartidor no esta disponible genera error', async () => {

    repositorioOrdenStub.existeRepartidor.returns(Promise.resolve(true));

    await expect(
      servicioCrearOrden.ejecutar(
        new OrdenTestDataBuilder().withHoraEntrega('14:00:00').build(),
      ),
    ).rejects.toThrow('El repartidor ya fue asignado en esta franja horaria');

  });
});
