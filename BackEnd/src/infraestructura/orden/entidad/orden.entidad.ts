import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ordenes' })
export class OrdenEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idCoordinador: number;

  @Column()
  idRepartidor: number;

  @Column()
  fechaCreacion: Date;

  @Column()
  fechaEntrega: Date;

  @Column()
  horaEntrega: string;
}
