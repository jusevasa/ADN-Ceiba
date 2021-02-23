import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComandoCrearOrden } from 'src/aplicacion/orden/comando/crear-orden.comando';
import { ManejadorCrearOrden } from 'src/aplicacion/orden/comando/crear-orden.manejador';
import { ManejadorListarOrden } from 'src/aplicacion/orden/consulta/listar-ordenes.manejador';
import { OrdenDto } from 'src/aplicacion/orden/consulta/dto/orden.dto';

@Controller('ordenes')
export class OrdenesControlador {
  constructor(
    private readonly manejadorCrearOrden: ManejadorCrearOrden,
    private readonly manejadorListarOrden: ManejadorListarOrden,
  ) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoCrearOrden: ComandoCrearOrden) {
    await this.manejadorCrearOrden.ejecutar(comandoCrearOrden);
  }

  @Get()
  async listar(): Promise<OrdenDto[]> {
    return this.manejadorListarOrden.ejecutar();
  }
}
