import { Module } from '@nestjs/common';
import { ServicioCrearOrden } from 'src/dominio/orden/servicio/servicio-crear-orden';
import { RepositorioOrden } from 'src/dominio/orden/puerto/repositorio/repositorio-orden';
import { servicioCrearOrdenProveedor } from './servicio/servicio-crear-orden.proveedor';
import { repositorioOrdenProvider } from './repositorio/repositorio-orden.proveedor';
import { daoOrdenProvider } from './dao/dao-orden.proveedor';
import { ManejadorCrearOrden } from 'src/aplicacion/orden/comando/crear-orden.manejador';
import { ManejadorListarOrden } from 'src/aplicacion/orden/consulta/listar-ordenes.manejador';
import { DaoOrden } from 'src/dominio/orden/puerto/dao/dao-orden';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenEntidad } from '../entidad/orden.entidad';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenEntidad])],
  providers: [
    { provide: ServicioCrearOrden, inject: [RepositorioOrden], useFactory: servicioCrearOrdenProveedor },
    repositorioOrdenProvider,
    daoOrdenProvider,
    ManejadorCrearOrden,
    ManejadorListarOrden,
  ],
  exports: [
    ServicioCrearOrden,
    ManejadorCrearOrden,
    ManejadorListarOrden,
    RepositorioOrden,
    DaoOrden,
  ],
})
export class OrdenProveedorModule {

}
