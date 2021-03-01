import { Module } from '@nestjs/common';
import { ServicioCrearOrden } from 'src/dominio/orden/servicio/servicio-crear-orden';
import { ServicioActualizarOrden } from 'src/dominio/orden/servicio/servicio-actualizar-orden';
import { ServicioEliminarOrden } from 'src/dominio/orden/servicio/servicio-eliminar-orden';
import { RepositorioOrden } from 'src/dominio/orden/puerto/repositorio/repositorio-orden';
import { servicioCrearOrdenProveedor } from './servicio/servicio-crear-orden.proveedor';
import { servicioActualizarOrdenProveedor } from './servicio/servicio-actualizar-orden.proveedor';
import { servicioEliminarOrdenProveedor } from './servicio/servicio-eliminar-orden.proveedor';
import { repositorioOrdenProvider } from './repositorio/repositorio-orden.proveedor';
import { daoOrdenProvider } from './dao/dao-orden.proveedor';
import { ManejadorCrearOrden } from 'src/aplicacion/orden/comando/crear-orden.manejador';
import { ManejadorActualizarOrden } from 'src/aplicacion/orden/comando/actualizar-orden.manejador';
import { ManejadorEliminarOrden } from 'src/aplicacion/orden/comando/eliminar-orden.manejador';
import { ManejadorListarOrdenes } from 'src/aplicacion/orden/consulta/listar-ordenes.manejador';
import { ManejadorListarOrden } from 'src/aplicacion/orden/consulta/listar-orden.manejador';
import { DaoOrden } from 'src/dominio/orden/puerto/dao/dao-orden';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenEntidad } from '../entidad/orden.entidad';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenEntidad])],
  providers: [
    { provide: ServicioCrearOrden, inject: [RepositorioOrden], useFactory: servicioCrearOrdenProveedor },
    { provide: ServicioActualizarOrden, inject: [RepositorioOrden], useFactory: servicioActualizarOrdenProveedor },
    { provide: ServicioEliminarOrden, inject: [RepositorioOrden], useFactory: servicioEliminarOrdenProveedor },
    repositorioOrdenProvider,
    daoOrdenProvider,
    ManejadorCrearOrden,
    ManejadorActualizarOrden,
    ManejadorEliminarOrden,
    ManejadorListarOrdenes,
    ManejadorListarOrden,
  ],
  exports: [
    ServicioCrearOrden,
    ManejadorCrearOrden,
    ManejadorActualizarOrden,
    ManejadorEliminarOrden,
    ManejadorListarOrdenes,
    ManejadorListarOrden,
    RepositorioOrden,
    DaoOrden,
  ],
})
export class OrdenProveedorModule {

}
