import { Orden } from '../../../src/dominio/orden/modelo/orden'

export class OrdenTestDataBuilder {
    public idCoordinador: number;
    public idRepartidor: number;
    public fechaCreacion: Date;
    public fechaEntrega: Date;
    public horaEntrega: string;

    constructor() {
        this.idCoordinador = 2;
        this.idRepartidor = 1;
        this.fechaCreacion = new Date("02-23-2021");
        this.fechaEntrega = new Date("02-23-2021");
        this.horaEntrega = "15:30:00";
    }

    public withIdCoordinador(idCoordinador: number) {
        this.idCoordinador = idCoordinador
        return this
    }
    public withIdRepartidor(idRepartidor: number) {
        this.idRepartidor = idRepartidor
        return this
    }
    public withFechaCreacion(fechaCreacion: Date) {
        this.fechaCreacion = fechaCreacion
        return this
    }
    public withFechaEntrega(fechaEntrega: Date) {
        this.fechaEntrega = fechaEntrega
        return this
    }
    public withHoraEntrega(horaEntrega: string) {
        this.horaEntrega = horaEntrega
        return this
    }

    build() {
        return new Orden(this.idCoordinador, this.idRepartidor, this.fechaCreacion, this.fechaEntrega, this.horaEntrega)
    }
}