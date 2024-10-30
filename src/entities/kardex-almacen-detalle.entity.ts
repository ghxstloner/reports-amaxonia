import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { KardexAlmacen } from './kardex-almacen.entity';
import { Item } from './item.entity';

@Entity('kardex_almacen_detalle')
@Index('fk_id_transaccion', ['id_transaccion'])
@Index('id_detalle_compra', ['id_detalle_compra'])
@Index('id_almacen_entrada', ['id_almacen_entrada'])
@Index('id_almacen_salida', ['id_almacen_salida'])
@Index('id_detalle_factura_proveedor', ['id_detalle_factura_proveedor'])
export class KardexAlmacenDetalle {
  @PrimaryColumn({ length: 36 })
  id_transaccion_detalle: string;

  @Column({ length: 36 })
  id_transaccion: string;

  @ManyToOne(() => KardexAlmacen, kardexAlmacen => kardexAlmacen.detalle)
  @JoinColumn({ name: 'id_transaccion' })
  kardexAlmacen: KardexAlmacen;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'id_item' })
  item: Item;

  @Column({ type: 'int', nullable: true })
  id_detalle_compra: number;

  @Column({ type: 'int' })
  id_almacen_entrada: number;

  @Column({ type: 'int' })
  id_almacen_salida: number;

  @Column({ type: 'int' })
  id_item: number;

  @Column({ type: 'float', precision: 10, scale: 2 })
  cantidad: number;

  @Column({ type: 'int' })
  cantidad_distribuida: number;

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  precio: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cantidad_procesamiento: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  precio_procesamiento: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cantidad_preparacion: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  precio_preparacion: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cantidad_merma: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  precio_merma: number;

  @Column({ type: 'int' })
  cantidad_muestra: number;

  @Column({ length: 80, comment: 'Unidad de Medida' })
  unidad_bulto: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidad_bulto: number;

  @Column({ length: 15, comment: 'UNIDAD O EMPAQUE' })
  unidad_empaque: string;

  @Column({ type: 'decimal', precision: 32, scale: 2 })
  cantidad_total: number;

  @Column({ type: 'int', default: 0 })
  validado: number;

  @Column({ type: 'int', default: 0 })
  id_centro_costo: number;

  @Column({ type: 'int', default: 0 })
  id_lote_item: number;

  @Column({ type: 'int', nullable: true })
  id_detalle_factura_proveedor: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: false })
  costo: number;
}
