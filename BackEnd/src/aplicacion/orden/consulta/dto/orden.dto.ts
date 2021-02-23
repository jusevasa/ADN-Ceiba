import { ApiProperty } from '@nestjs/swagger';

export class OrdenDto {

  @ApiProperty({ example: '1' })
  idCoordinador: number;

  @ApiProperty({ example: '1' })
  idRepartidor: number;

  @ApiProperty({ type: Date })
  fechaCreacion: string;

  @ApiProperty({ type: Date })
  fechaEntrega: string;

  @ApiProperty({ type: Date })
  horaEntrega: string;
}
