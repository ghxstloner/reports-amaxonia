import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity('kardex_almacen')
@Index('fk_id_tipo_movimiento_almacen', ['tipo_movimiento_almacen'])
@Index('fecha', ['fecha'])
@Index('id_documento', ['id_documento'])
@Index('cod_documento', ['cod_documento'])
export class KardexAlmacen {
  @PrimaryColumn({ length: 36 })
  id_transaccion: string;

  @Column({ type: 'int' })
  tipo_movimiento_almacen: number;

  @Column({ length: 100 })
  autorizado_por: string;

  @Column({ length: 200 })
  observacion: string;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ length: 100 })
  usuario_creacion: string;

  @Column({ type: 'datetime', nullable: true })
  fecha_creacion: Date;

  @Column({ length: 20 })
  estado: string;

  @Column({ type: 'datetime', nullable: true })
  fecha_ejecucion: Date;

  @Column({ length: 36, comment: 'id Factura y/o Compra' })
  id_documento: string;

  @Column({ type: 'int' })
  cod_proveedor: number;

  @Column({ length: 30 })
  comprobante: string;

  @Column({ type: 'int' })
  anio: number;

  @Column({ length: 5 })
  tipo_costo: string;

  @Column({ type: 'tinyint', default: 0 })
  estatus: number;

  @Column({ length: 10 })
  entregado_a_codigo: string;

  @Column({ length: 30 })
  entregado_a_nombre: string;

  @Column({ length: 50 })
  cod_documento: string;

  @Column({ type: 'int' })
  subtipo_movimiento_almacen: number;

  @Column({ type: 'int' })
  contabilizado: number;

  @Column({ type: 'date' })
  fecha_contabilizacion: string;

  @Column({ length: 50 })
  usuario_contabilizacion: string;

  @Column({ type: 'date', nullable: true })
  envio_fecha: string;

  @Column({ length: 20, nullable: true })
  envio_usuario: string;

  @Column({ length: 200, nullable: true })
  envio_observacion: string;

  @Column({ type: 'date', nullable: true })
  recibido_fecha: string;

  @Column({ length: 20, nullable: true })
  recibido_usuario: string;

  @Column({ length: 200, nullable: true })
  recibido_observacion: string;

  @Column({ type: 'int', nullable: true })
  id_almacen_entrada: number;

  @Column({ type: 'int', nullable: true })
  id_almacen_salida: number;

  @Column({ type: 'int', default: 0 })
  id_sucursal: number;

  @Column({ type: 'date' })
  validado_fecha: string;

  @Column({ length: 20 })
  validado_usuario: string;

  @Column({ length: 200 })
  validado_observacion: string;

  @Column({ type: 'tinyint', default: 1 })
  controla_stock: number;
}
