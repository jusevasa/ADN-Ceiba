import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ComandoCrearOrden } from 'src/aplicacion/orden/comando/crear-orden.comando';
import { ManejadorCrearOrden } from 'src/aplicacion/orden/comando/crear-orden.manejador';
import { ComandoActualizarOrden } from 'src/aplicacion/orden/comando/actualizar-orden.comando';
import { ManejadorActualizarOrden } from 'src/aplicacion/orden/comando/actualizar-orden.manejador';
import { ComandoEliminarOrden } from 'src/aplicacion/orden/comando/eliminar-orden.comando';
import { ManejadorEliminarOrden } from 'src/aplicacion/orden/comando/eliminar-orden.manejador';
import { ManejadorListarOrdenes } from 'src/aplicacion/orden/consulta/listar-ordenes.manejador';
import { ManejadorListarOrden } from 'src/aplicacion/orden/consulta/listar-orden.manejador';
import { OrdenDto } from 'src/aplicacion/orden/consulta/dto/orden.dto';

@Controller('orden')
export class OrdenControlador {
  constructor(
    private readonly manejadorListarOrdenes: ManejadorListarOrdenes,
    private readonly manejadorListarOrden: ManejadorListarOrden,
    private readonly manejadorCrearOrden: ManejadorCrearOrden,
    private readonly manejadorActualizarOrden: ManejadorActualizarOrden,
    private readonly manejadorEliminarOrden: ManejadorEliminarOrden,
  ) {}

  @Get()
  async listar(): Promise<OrdenDto[]> {
    return this.manejadorListarOrdenes.ejecutar();
  }

  @Get(':id')
  async listarById(@Param('id') id: string): Promise<OrdenDto> {
    return this.manejadorListarOrden.ejecutar(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoCrearOrden: ComandoCrearOrden) {
    return this.manejadorCrearOrden.ejecutar(comandoCrearOrden);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async actualizar(
    @Param('id') id: string,
    @Body() comandoActualizarOrden: ComandoActualizarOrden,
  ) {
    return this.manejadorActualizarOrden.ejecutar(id, comandoActualizarOrden);
  }

  @Delete(':id')
  async eliminar(@Param('id') comandoEliminarOrden: ComandoEliminarOrden) {
    return this.manejadorEliminarOrden.ejecutar(comandoEliminarOrden);
  }
}
