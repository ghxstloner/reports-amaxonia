import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('divisas')
export class Divisas {
  @PrimaryGeneratedColumn({ name: 'id_divisa', type: 'int' })
  idDivisa: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  nombre: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  abreviatura: string | null;

  @Column({ type: 'decimal', precision: 20, scale: 8, nullable: true })
  cambioUnico: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  operacion: string | null;
}
