import { ApiProperty } from '@nestjs/swagger';

export class ComandoEliminarOrden {
  @ApiProperty()
  public id: string;
}
