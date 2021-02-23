import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorHorarioLaboral extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorHorarioLaboral.name);
  }
}
