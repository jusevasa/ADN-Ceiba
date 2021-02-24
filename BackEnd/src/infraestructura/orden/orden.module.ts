import { Module } from '@nestjs/common';
import { OrdenControlador } from './controlador/orden.controlador';
import { OrdenProveedorModule } from './proveedor/orden-proveedor.module';

@Module({
  imports: [
    OrdenProveedorModule
  ],
  controllers: [OrdenControlador],
})
export class OrdenModule {}
