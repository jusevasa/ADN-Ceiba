import { ErrorHorarioLaboral } from '../../errores/error-horario-laboral'
import { ErrorFranjaHoraria } from '../../errores/error-franja-horaria'

const HORA_INICIAL = 7;
const HORA_FINAL = 17;
const VALIDAR_MINUTOS = new RegExp("0[0]|[3]0");

export class Orden {
  readonly #idCoordinador: number;
  readonly #idRepartidor: number;
  readonly #fechaCreacion: Date;
  readonly #fechaEntrega: Date;
  readonly #horaEntrega: string;

  constructor(idCoordinador: number, idRepartidor: number, fechaCreacion: Date, fechaEntrega: Date, horaEntrega: string) {
    this.validarHorario(horaEntrega);
    this.intervaloMinutos(horaEntrega);
    this.#idCoordinador = idCoordinador;
    this.#idRepartidor = idRepartidor;
    this.#fechaCreacion = new Date(fechaCreacion);
    this.#fechaEntrega = new Date(fechaEntrega);
    this.#horaEntrega = horaEntrega;
  }

  //El horario laboral es de 7:00am a 5:00pm, no se trabajan los fines de semana
  private validarHorario(hora: string) {

    const horaIngresada = Number(hora.split(':')[0]);

    if (horaIngresada <= HORA_INICIAL || horaIngresada >= HORA_FINAL) {
      throw new ErrorHorarioLaboral(`La hora ingresada no corresponde al horario laboral`)
    }

  }

  //Las franjas horarias para los motociclistas están determinadas por intervalos de 30 min, es decir 7:00, 7:30
  private intervaloMinutos(hora: string) {

    const minutoIngresado = hora.split(':')[1];
    if (!VALIDAR_MINUTOS.test(minutoIngresado)) {
      throw new ErrorFranjaHoraria(`La franja horaria determina no es valida`)
    }

  }

  get idCoordinador(): number {
    return this.#idCoordinador;
  }

  get idRepartidor(): number {
    return this.#idRepartidor;
  }

  get fechaCreacion(): Date {
    return this.#fechaCreacion;
  }

  get fechaEntrega(): Date {
    return this.#fechaEntrega;
  }

  get horaEntrega(): string {
    return this.#horaEntrega;
  }

}
