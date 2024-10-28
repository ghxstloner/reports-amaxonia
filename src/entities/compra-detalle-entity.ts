import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('compra_detalle')
export class CompraDetalle {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id_detalle_compra: number;

    @Column('int', { unsigned: true, nullable: true })
    id_compra: number;

    @Column('int', { unsigned: true, nullable: true })
    id_item: number;

    @Column('int', { nullable: true })
    _item_almacen: number;

    @Column('decimal', { precision: 20, scale: 4, default: 0.0000 })
    _item_cantidad: number;

    @Column('decimal', { precision: 16, scale: 4, default: 0.0000 })
    _item_preciosiniva: number;

    @Column('decimal', { precision: 16, scale: 4, default: 0.0000 })
    _item_totalsiniva: number;

    @Column('decimal', { precision: 16, scale: 4, default: 0.0000 })
    _item_totalconiva: number;

    @Column('varchar', { length: 32 })
    usuario_creacion: string;

    @Column('datetime', { nullable: true })
    fecha_creacion: Date;

    @Column('varchar', { length: 40 })
    codfabricante: string;

    @Column('varchar', { length: 10 })
    piva: string;

    @Column('decimal', { precision: 10, scale: 2 })
    _tiva: number;

    @Column('varchar', { length: 100 })
    _item_descripcion: string;

    @Column('mediumtext')
    _item_observacion: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    _item_descuento: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    _item_montodescuento: number;

    @Column('int', { default: 0 })
    _cantidad_bulto: number;

    @Column('varchar', { length: 80, nullable: true })
    _unidad_empaque: string;

    @Column('varchar', { length: 15, nullable: true })
    _item_unidad_empaque: string;

    @Column('int', { default: 0 })
    _item_cantidad_total: number;

    @Column('varchar', { length: 2, nullable: true })
    _posee_talla_color: string;

    @Column('varchar', { length: 80, nullable: true })
    seriales_seleccionados: string;

    @Column('varchar', { length: 2, nullable: true })
    _posee_serial: string;

    @Column('varchar', { length: 50 })
    _item_codigo: string;

    @Column('varchar', { length: 50 })
    _item_referencia: string;

    @Column('varchar', { length: 30, default: '' })
    codigo_lote_item: string;

    @Column('int', { default: 0 })
    id_lote_item: number;

    @Column('decimal', { precision: 20, scale: 4, nullable: true })
    _item_cantidad_recibida: number;

    @Column('varchar', { length: 2, nullable: true })
    _posee_caja_configuracion: string;

    @Column('varchar', { length: 2, nullable: true })
    _posee_configuracion_lote: string;

    @Column('varchar', { length: 2, nullable: true })
    _posee_producto_variable: string;
}
