import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tasas_cambio')
export class TasasCambio {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int', nullable: true })
  divisa: number | null;

  @Column({ type: 'datetime', nullable: true })
  fecha: Date | null;

  @Column({ type: 'decimal', precision: 16, scale: 16, nullable: true })
  tasa: string | null;

  @Column({ type: 'decimal', precision: 20, scale: 8, nullable: false })
  tasa_inversa: string;

  @Column({ type: 'int', nullable: true })
  monedabase: number | null;

  @Column({ type: 'varchar', length: 1, default: () => "'N'", comment: 'Valor S, ya se uso la tasa para facturar, N aun no se ha facturado con esta tasa' })
  facturado: string;
}
