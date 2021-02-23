import { Module } from '@nestjs/common';
import { OrdenesControlador } from './controlador/orden.controlador';
import { OrdenProveedorModule } from './proveedor/orden-proveedor.module';

@Module({
  imports: [
    OrdenProveedorModule
  ],
  controllers: [OrdenesControlador],
})
export class OrdenModule {}
