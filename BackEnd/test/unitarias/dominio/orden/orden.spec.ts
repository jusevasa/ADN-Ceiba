import { Orden } from 'src/dominio/orden/modelo/orden';
import { ErrorHorarioLaboral } from 'src/dominio/errores/error-horario-laboral';

describe('Orden', () => {

  const _Orden = Orden as any;

  it('orden con horario fuera del horario laboral retornar error', () => {
    return expect(async () => new _Orden(1, 1, new Date().toISOString(), new Date().toISOString(), '18:00:00'))
      .rejects
      .toStrictEqual(new ErrorHorarioLaboral('La hora ingresada no corresponde al horario laboral'));
  });

  it('orden con horario laboral debería crear bien', () => {
    const orden = new _Orden(1, 1, new Date().toISOString(), new Date().toISOString(), '14:00:00');

    expect(orden.idCoordinador).toEqual(1);
  });
});
