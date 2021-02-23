import { RepositorioOrden } from 'src/dominio/orden/puerto/repositorio/repositorio-orden';
import { Orden } from 'src/dominio/orden/modelo/orden';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdenEntidad } from '../../entidad/orden.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioOrdenImp implements RepositorioOrden {
  constructor(
    @InjectRepository(OrdenEntidad)
    private readonly repositorio: Repository<OrdenEntidad>,
  ) { }

  async existeRepartidor(idRepartidor: number, fechaEntrega: Date, horaEntrega: string): Promise<boolean> {
    const [orden, ordenCount] = await this.repositorio.findAndCount({
      idRepartidor: idRepartidor,
      fechaEntrega: fechaEntrega,
      horaEntrega: horaEntrega
    })
    return ordenCount > 0 ? true : false
  }

  async guardar(orden: Orden) {
    const entidad = new OrdenEntidad();
    entidad.idCoordinador = orden.idCoordinador;
    entidad.idRepartidor = orden.idRepartidor;
    entidad.fechaCreacion = orden.fechaCreacion;
    entidad.fechaEntrega = orden.fechaEntrega;
    entidad.horaEntrega = orden.horaEntrega;
    await this.repositorio.save(entidad);
  }

  async actualizar(id: number, orden: Orden) {
    console.log('true')
  }

  async eliminar(id: number) {
    console.log('true')
  }

}
