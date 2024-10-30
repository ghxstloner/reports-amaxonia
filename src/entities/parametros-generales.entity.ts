import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parametros_generales')
export class ParametrosGenerales {
  @PrimaryGeneratedColumn()
  cod_empresa: number;

  @Column({ length: 80 })
  nombre_empresa: string;

  @Column({ length: 400 })
  direccion: string;

  @Column({ length: 32 })
  ciudad: string;

  @Column({ length: 32 })
  provincia: string;

  @Column({ length: 32 })
  distrito: string;

  @Column({ length: 32 })
  corregimiento: string;

  @Column({ length: 32 })
  codUbi: string;

  @Column({ length: 32 })
  coordenadas: string;

  @Column({ length: 100 })
  telefonos: string;

  @Column({ length: 20 })
  id_fiscal: string;

  @Column({ length: 50 })
  rif: string;

  @Column({ length: 10 })
  dv: string;

  @Column({ length: 50 })
  id_fiscal2: string;

  @Column({ length: 50 })
  nit: string;
}

