import { ErrorHorarioLaboral } from 'src/dominio/errores/error-horario-laboral';
import { OrdenTestDataBuilder } from '../../../tdb/orden/orden-tdb'
describe('Orden', () => {

  it('orden con horario fuera del horario laboral retornar error', () => {

    return expect(async () => new OrdenTestDataBuilder().withHoraEntrega('18:00:00').build())
      .rejects
      .toStrictEqual(new ErrorHorarioLaboral('La hora ingresada no corresponde al horario laboral'));
  });

  it('orden con horario laboral debería crear bien', () => {

    const orden = new OrdenTestDataBuilder().withHoraEntrega('14:00:00').build();
    expect(orden.idCoordinador).toEqual(2);

  });
});
