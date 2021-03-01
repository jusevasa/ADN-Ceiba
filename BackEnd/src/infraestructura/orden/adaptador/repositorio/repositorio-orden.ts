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
    const search = await this.repositorio.find({
      idRepartidor: idRepartidor,
      fechaEntrega: fechaEntrega,
      horaEntrega: horaEntrega
    })
    return search.length > 0 ? true : false
  }

  async existeOrden(id: string): Promise<boolean> {
    const search = await this.repositorio.find({ id: Number(id) })
    return search.length > 0 ? true : false
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

  async actualizar(id: string, orden: Orden) {
    let ordenParaActualizar = await this.repositorio.findOne({ id: Number(id) });
    ordenParaActualizar.idCoordinador = orden.idCoordinador;
    ordenParaActualizar.idRepartidor = orden.idRepartidor;
    ordenParaActualizar.fechaCreacion = orden.fechaCreacion;
    ordenParaActualizar.fechaEntrega = orden.fechaEntrega;
    ordenParaActualizar.horaEntrega = orden.horaEntrega;
    await this.repositorio.save(ordenParaActualizar);
  }

  async eliminar(id: string) {
    let ordenParaEliminar = await this.repositorio.findOne({ id: Number(id) });
    await this.repositorio.remove(ordenParaEliminar);
  }

}
