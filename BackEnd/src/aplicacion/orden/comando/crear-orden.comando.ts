import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoCrearOrden {
  @IsNumber()
  @ApiProperty({ example: '1' })
  public idCoordinador: number;

  @IsNumber()
  @ApiProperty({ example: '1' })
  public idRepartidor: number;

  @IsString()
  @ApiProperty({ example: '02-23-2021' })
  public fechaCreacion: Date;

  @IsString()
  @ApiProperty({example: '02-23-2021' })
  public fechaEntrega: Date;

  @IsString()
  @ApiProperty({ example: '7:30:00' })
  public horaEntrega: string;

}
