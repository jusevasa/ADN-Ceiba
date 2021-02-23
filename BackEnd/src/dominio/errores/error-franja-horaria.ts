import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorFranjaHoraria extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorFranjaHoraria.name);
  }
}
