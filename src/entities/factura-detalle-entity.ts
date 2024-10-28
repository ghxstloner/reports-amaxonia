import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('factura_detalle')
export class FacturaDetalle {
    @PrimaryColumn('varchar', { length: 36 })
    id_detalle_factura: string;

    @Column('varchar', { length: 36 })
    id_factura: string;

    @Column('int', { nullable: true, unsigned: true })
    id_item: number;

    @Column('int', { nullable: true })
    _item_almacen: number;

    @Column('varchar', { length: 500 })
    _item_descripcion: string;

    @Column('decimal', { precision: 32, scale: 2, default: 0.00 })
    _item_cantidad: number;

    @Column('int', { default: 0 })
    _item_merma: number;

    @Column('decimal', { precision: 12, scale: 6, nullable: true })
    _id_costo_actual: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    _item_preciosiniva: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    _item_descuento: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    _item_montodescuento: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    _item_piva: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    _item_totalsiniva: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    _item_totalconiva: number;

    @Column('int', { nullable: true })
    _cantidad_bulto: number;

    @Column('int', { nullable: true })
    _cantidad_bulto_kilos: number;

    @Column('varchar', { length: 80, nullable: true })
    _unidad_empaque: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    _ganancia_item_individual: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    _porcentaje_ganancia: number;

    @Column('decimal', { precision: 10, scale: 4, nullable: true })
    _totalm3: number;

    @Column('decimal', { precision: 10, scale: 4, nullable: true })
    _totalft3: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    _peso_total_item: number;

    @Column('varchar', { length: 2, nullable: true })
    _posee_talla_color: string;

    @Column('varchar', { length: 2 })
    _posee_serial: string;

    @Column('varchar', { length: 80 })
    seriales_seleccionados: string;

    @Column('varchar', { length: 32 })
    usuario_creacion: string;

    @Column('datetime', { nullable: true })
    fecha_creacion: Date;

    @Column('tinyint', { width: 1, default: 0 })
    anulado: boolean;

    @Column('varchar', { length: 10 })
    _item_lista_precio: string;

    @Column('varchar', { length: 15 })
    _item_unidad_empaque: string;

    @Column('decimal', { precision: 32, scale: 2, default: 0.00 })
    _item_cantidad_total: number;

    @Column('varchar', { length: 20 })
    promocion_tipo: string;

    @Column('varchar', { length: 36, nullable: true })
    promocion_id: string;

    @Column('varchar', { length: 15 })
    promocion_codigo: string;

    @Column('varchar', { length: 200 })
    promocion_nombre: string;

    @Column('varchar', { length: 36 })
    promocion_grupo: string;

    @Column('varchar', { length: 36 })
    promocion_detalle_id: string;

    @Column('int', { default: 0 })
    grupo: number;

    @Column('varchar', { length: 36 })
    descuento_autorizacion: string;

    @Column('int')
    cod_vendedor: number;

    @Column('varchar', { length: 50 })
    _item_codigo: string;

    @Column('varchar', { length: 50 })
    _item_referencia: string;

    @Column('int', { nullable: true })
    promocion_cantidad: number;

    @Column('int', { nullable: true })
    id_segmento: number;

    @Column('int', { nullable: true })
    id_familia: number;

    @Column('decimal', { precision: 10, scale: 6, nullable: true })
    importe_isc: number;

    @Column('decimal', { precision: 10, scale: 6, nullable: true })
    importe_acarreo: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    importe_seguro: number;

    @Column('int', { nullable: true })
    id_isc: number;

    @Column('int', { width: 3, nullable: true })
    porcentaje_isc: number;

    @Column('int', { nullable: true })
    id_oti: number;

    @Column('decimal', { precision: 10, scale: 6, nullable: true })
    importe_oti: number;

    @Column('int', { default: 0 })
    id_centro_costo: number;

    @Column('varchar', { length: 50, nullable: true })
    lote_codigo: string;

    @Column('varchar', { length: 50, nullable: true })
    lote_vencimiento: string;

    @Column('int', { nullable: true })
    id_lote_item: number;
}
