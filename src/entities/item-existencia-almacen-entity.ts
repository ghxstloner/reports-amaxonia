import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('item_existencia_almacen')
export class ItemExistenciaAlmacen {
    @PrimaryGeneratedColumn({ type: 'int', name: 'cod_item_existencia_almacen' })
    codItemExistenciaAlmacen: number;

    @Column('int', { name: 'cod_almacen' })
    codAlmacen: number;

    @Column('int', { name: 'id_item', unsigned: true, nullable: true })
    idItem: number;

    @Column('float', { precision: 10, scale: 2, default: 0.00 })
    cantidad: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    cantidadProcesamiento: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    cantidadPreparacion: number;

    @Column('decimal', { precision: 20, scale: 4, nullable: true })
    cantidadMerma: number;

    @Column('int', { name: 'cantidad_muestra' })
    cantidadMuestra: number;

    @Column('bigint', { name: 'minimo' })
    minimo: number;

    @Column('bigint', { name: 'maximo' })
    maximo: number;
}
