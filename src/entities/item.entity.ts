import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('item')
@Index('id_item_marca_departamento', ['id_item', 'departamento_id', 'marca_id'], { unique: true })
@Index('cod_item_forma', ['cod_item_forma'])
@Index('FK_item_2', ['usuario_creacion'])
@Index('fk_cod_departamento2', ['cod_departamento'])
@Index('fk_cod_grupo2', ['cod_grupo'])
@Index('fk_cod_linea2', ['cod_linea'])
@Index('cod_item_forma_2', ['cod_item_forma'])
@Index('descripcion1', ['descripcion1'])
@Index('codigo_barras', ['codigo_barras'])
@Index('referencia', ['referencia'])
@Index('cod_categoria', ['cod_categoria'])
@Index('descripcion1_2', ['descripcion1'])
@Index('referencia_2', ['referencia'])
@Index('descripcion1_3', ['descripcion1'])
@Index('referencia_3', ['referencia'])
@Index('descripcion1_4', ['descripcion1'])
@Index('referencia_4', ['referencia'])
@Index('cod_item', ['cod_item'])
@Index('ECOMMERCE', ['visible_web'])
@Index('POS', ['visible_pos'])
@Index('idrefbarra', ['id_item', 'referencia', 'codigo_barras'])
export class Item {
    @PrimaryGeneratedColumn({ name: 'id_item', type: 'int', unsigned: true })
    id_item: number;

    @Column({ name: 'cod_item', type: 'varchar', length: 20 })
    cod_item: string;

    @Column({ name: 'familia1', type: 'varchar', length: 100, nullable: true })
    familia1: string;

    @Column({ name: 'familia2', type: 'varchar', length: 100, nullable: true })
    familia2: string;

    @Column({ name: 'codigo_barras', type: 'varchar', length: 50 })
    codigo_barras: string;

    @Column({ name: 'descripcion1', type: 'varchar', length: 150 })
    descripcion1: string;

    @Column({ name: 'descripcion2', type: 'text', nullable: true })
    descripcion2: string;

    @Column({ name: 'descripcion3', type: 'varchar', length: 500, nullable: true })
    descripcion3: string;

    @Column({ name: 'referencia', type: 'varchar', length: 50, nullable: true })
    referencia: string;

    @Column({ name: 'codigo_fabricante', type: 'varchar', length: 50, nullable: true })
    codigo_fabricante: string;

    @Column({ name: 'unidad_empaque', type: 'varchar', length: 40, nullable: true })
    unidad_empaque: string;

    @Column({ name: 'cantidad', type: 'int', default: 0 })
    cantidad: number;

    @Column({ name: 'seriales', type: 'tinyint', default: 0, comment: '¿Producto con seriales?' })
    seriales: number;

    @Column({ name: 'garantia', type: 'tinyint', default: 0, comment: '¿Seriales con garantía?' })
    garantia: number;

    @Column({ name: 'tipo_item', type: 'varchar', length: 50, nullable: true, comment: "items(Producto): 'Nacional','Importado'" })
    tipo_item: string;

    @Column({ name: 'factor_cambio', type: 'decimal', precision: 10, scale: 2, default: 0.00, comment: 'Si o solo si Tipo de Producto = Importado' })
    factor_cambio: number;

    @Column({ name: 'ultimo_costo', type: 'decimal', precision: 10, scale: 2, default: 0.00, comment: 'Si o solo si Tipo de Producto = Importado' })
    ultimo_costo: number;

    @Column({ name: 'precio_x_escala', type: 'tinyint', default: 0 })
    precio_x_escala: number;

    @Column({ name: 'comision_x_item', type: 'tinyint', default: 0 })
    comision_x_item: number;

    @Column({ name: 'tipo_comision_x_item', type: 'varchar', length: 50, nullable: true })
    tipo_comision_x_item: string;

    @Column({ name: 'desdeA1', type: 'int', default: 0, comment: 'Sin son precios por Escala' })
    desdeA1: number;

    @Column({ name: 'desdeA2', type: 'int', default: 0, comment: 'Sin son precios por Escala' })
    desdeA2: number;

    @Column({ name: 'desdeB1', type: 'int', default: 0, comment: 'Sin son precios por Escala' })
    desdeB1: number;

    @Column({ name: 'comisiones1', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    comisiones1: number;

    @Column({ name: 'comisiones2', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    comisiones2: number;

    @Column({ name: 'comisiones3', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    comisiones3: number;

    @Column({ name: 'desdeB2', type: 'int', default: 0, comment: 'Sin son precios por Escala' })
    desdeB2: number;

    @Column({ name: 'desdeC1', type: 'int', default: 0, comment: 'Sin son precios por Escala' })
    desdeC1: number;

    @Column({ name: 'desdeC2', type: 'int', default: 0, comment: 'Sin son precios por Escala' })
    desdeC2: number;

    @Column({ name: 'precio1', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    precio1: number;

    @Column({ name: 'utilidad1', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    utilidad1: number;

    @Column({ name: 'coniva1', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    coniva1: number;

    @Column({ name: 'precio2', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    precio2: number;

    @Column({ name: 'utilidad2', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    utilidad2: number;

    @Column({ name: 'coniva2', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    coniva2: number;

    @Column({ name: 'precio3', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    precio3: number;

    @Column({ name: 'utilidad3', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    utilidad3: number;

    @Column({ name: 'coniva3', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    coniva3: number;

    @Column({ name: 'precio_referencial1', type: 'decimal', precision: 10, scale: 2, default: 0.00, comment: 'Si o solo si Tipo de Producto = Importado' })
    precio_referencial1: number;

    @Column({ name: 'precio_referencial2', type: 'decimal', precision: 10, scale: 2, default: 0.00, comment: 'Si o solo si Tipo de Producto = Importado' })
    precio_referencial2: number;

    @Column({ name: 'precio_referencial3', type: 'decimal', precision: 10, scale: 2, default: 0.00, comment: 'Si o solo si Tipo de Producto = Importado' })
    precio_referencial3: number;

    @Column({ name: 'costo_actual', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    costo_actual: number;

    @Column({ name: 'costo_promedio', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    costo_promedio: number;

    @Column({ name: 'costo_anterior', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    costo_anterior: number;

    @Column({ name: 'existencia_total', type: 'int', default: 0 })
    existencia_total: number;

    @Column({ name: 'existencia_min', type: 'int', default: 0 })
    existencia_min: number;

    @Column({ name: 'existencia_max', type: 'int', default: 0 })
    existencia_max: number;

    @Column({ name: 'monto_exento', type: 'tinyint', default: 0 })
    monto_exento: number;

    @Column({ name: 'iva', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    iva: number;

    @Column({ name: 'ubicacion1', type: 'varchar', length: 50, nullable: true })
    ubicacion1: string;

    @Column({ name: 'ubicacion2', type: 'varchar', length: 50, nullable: true })
    ubicacion2: string;

    @Column({ name: 'ubicacion3', type: 'varchar', length: 50, nullable: true })
    ubicacion3: string;

    @Column({ name: 'ubicacion4', type: 'varchar', length: 50, nullable: true })
    ubicacion4: string;

    @Column({ name: 'ubicacion5', type: 'varchar', length: 50, nullable: true })
    ubicacion5: string;

    @Column({ name: 'cod_departamento', type: 'int', default: 0 })
    cod_departamento: number;

    @Column({ name: 'cod_grupo', type: 'int', default: 0 })
    cod_grupo: number;

    @Column({ name: 'cod_categoria', type: 'int', nullable: true })
    cod_categoria: number;

    @Column({ name: 'cod_linea', type: 'int', default: 0 })
    cod_linea: number;

    @Column({ name: 'estatus', type: 'varchar', length: 1 })
    estatus: string;

    @Column({ name: 'usuario_creacion', type: 'varchar', length: 60 })
    usuario_creacion: string;

    @Column({ name: 'fecha_creacion', type: 'datetime' })
    fecha_creacion: Date;

    @Column({ name: 'cod_item_forma', type: 'int' })
    cod_item_forma: number;

    @Column({ name: 'tipo_prod', type: 'tinyint', default: 2, comment: 'Activo Fijo=0,Consumo=1,Venta=2,Otro=3' })
    tipo_prod: number;

    @Column({ name: 'cuenta_contable1', type: 'varchar', length: 25 })
    cuenta_contable1: string;

    @Column({ name: 'cuenta_contable2', type: 'varchar', length: 25 })
    cuenta_contable2: string;

    @Column({ name: 'codigo_cuenta', type: 'varchar', length: 15 })
    codigo_cuenta: string;

    @Column({ name: 'serial1', type: 'varchar', length: 25 })
    serial1: string;

    @Column({ name: 'foto', type: 'varchar', length: 60 })
    foto: string;

    @Column({ name: 'cantidad_bulto', type: 'decimal', precision: 9, scale: 2 })
    cantidad_bulto: number;

    @Column({ name: 'kilos_bulto', type: 'decimal', precision: 9, scale: 2 })
    kilos_bulto: number;

    @Column({ name: 'proveedor', type: 'int' })
    proveedor: number;

    @Column({ name: 'fecha_ingreso', type: 'date' })
    fecha_ingreso: Date;

    @Column({ name: 'origen', type: 'varchar', length: 45 })
    origen: string;

    @Column({ name: 'costo_cif', type: 'decimal', precision: 9, scale: 2 })
    costo_cif: number;

    @Column({ name: 'costo_origen', type: 'decimal', precision: 9, scale: 2 })
    costo_origen: number;

    @Column({ name: 'temporada', type: 'varchar', length: 45 })
    temporada: string;

    @Column({ name: 'mate_compo_clase', type: 'varchar', length: 45 })
    mate_compo_clase: string;

    @Column({ name: 'punto_pedido', type: 'decimal', precision: 9, scale: 2 })
    punto_pedido: number;

    @Column({ name: 'tejido', type: 'varchar', length: 45 })
    tejido: string;

    @Column({ name: 'reg_sanit', type: 'varchar', length: 45 })
    reg_sanit: string;

    @Column({ name: 'cod_barra_bulto', type: 'varchar', length: 45 })
    cod_barra_bulto: string;

    @Column({ name: 'observacion', type: 'mediumtext' })
    observacion: string;

    @Column({ name: 'foto1', type: 'varchar', length: 60 })
    foto1: string;

    @Column({ name: 'foto2', type: 'varchar', length: 60 })
    foto2: string;

    @Column({ name: 'foto3', type: 'varchar', length: 60 })
    foto3: string;

    @Column({ name: 'foto4', type: 'varchar', length: 60 })
    foto4: string;

    @Column({ name: 'cont_licen_nro', type: 'varchar', length: 45 })
    cont_licen_nro: string;

    @Column({ name: 'precio_cont', type: 'decimal', precision: 9, scale: 2 })
    precio_cont: number;

    @Column({ name: 'aprob_arte', type: 'varchar', length: 45 })
    aprob_arte: string;

    @Column({ name: 'propiedad', type: 'varchar', length: 45 })
    propiedad: string;

    @Column({ name: 'posicion_arancel', type: 'int' })
    posicion_arancel: number;

    @Column({ name: 'ubicacion', type: 'int' })
    ubicacion: number;

    @Column({ name: 'codigo_base', type: 'int' })
    codigo_base: number;

    @Column({ name: 'precio4', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    precio4: number;

    @Column({ name: 'utilidad4', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    utilidad4: number;

    @Column({ name: 'coniva4', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    coniva4: number;

    @Column({ name: 'precio5', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    precio5: number;

    @Column({ name: 'utilidad5', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    utilidad5: number;

    @Column({ name: 'coniva5', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    coniva5: number;

    @Column({ name: 'precio6', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    precio6: number;

    @Column({ name: 'utilidad6', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    utilidad6: number;

    @Column({ name: 'coniva6', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    coniva6: number;

    @Column({ name: 'sinuso', type: 'int', width: 1 })
    sinuso: number;

    @Column({ name: 'cubi1', type: 'varchar', length: 5 })
    cubi1: string;

    @Column({ name: 'cubi2', type: 'varchar', length: 5 })
    cubi2: string;

    @Column({ name: 'cubi3', type: 'varchar', length: 5 })
    cubi3: string;

    @Column({ name: 'cubi4', type: 'decimal', precision: 6, scale: 4 })
    cubi4: number;

    @Column({ name: 'cubi5', type: 'decimal', precision: 6, scale: 4 })
    cubi5: number;

    @Column({ name: 'unidad_medida', type: 'int', width: 2 })
    unidad_medida: number;

    @Column({ name: 'inner_bulto', type: 'decimal', precision: 9, scale: 2 })
    inner_bulto: number;

    @Column({ name: 'caracteristicas', type: 'varchar', length: 60 })
    caracteristicas: string;

    @Column({ name: 'ingles', type: 'varchar', length: 60 })
    ingles: string;

    @Column({ name: 'peso_neto', type: 'decimal', precision: 9, scale: 2 })
    peso_neto: number;

    @Column({ name: 'unidad_porcion', type: 'varchar', length: 40, nullable: true })
    unidad_porcion: string;

    @Column({ name: 'cantidad_unidad_porcion', type: 'decimal', precision: 10, scale: 2, nullable: true })
    cantidad_unidad_porcion: number;

    @Column({ name: 'cantidad_porcion', type: 'int', nullable: true })
    cantidad_porcion: number;

    @Column({ name: 'receta_porciones', type: 'int', nullable: true })
    receta_porciones: number;

    @Column({ name: 'total_porciones', type: 'int', nullable: true })
    total_porciones: number;

    @Column({ name: 'contenedor_entrada', type: 'int', default: 0 })
    contenedor_entrada: number;

    @Column({ name: 'contenedor_salida', type: 'int', default: 0 })
    contenedor_salida: number;

    @Column({ name: 'procesamiento', type: 'int' })
    procesamiento: number;

    @Column({ name: 'costo_procesamiento', type: 'decimal', precision: 10, scale: 4, default: 0.0000 })
    costo_procesamiento: number;

    @Column({ name: 'sucursal', type: 'int' })
    sucursal: number;

    @Column({ name: 'turno', type: 'int' })
    turno: number;

    @Column({ name: 'horas', type: 'int' })
    horas: number;

    @Column({ name: 'rol_semanal', type: 'int' })
    rol_semanal: number;

    @Column({ name: 'codigo_crm', type: 'varchar', length: 50 })
    codigo_crm: string;

    @Column({ name: 'unidad_o_empaque', type: 'varchar', length: 10 })
    unidad_o_empaque: string;

    @Column({ name: 'precio1_extra', type: 'decimal', precision: 10, scale: 2 })
    precio1_extra: number;

    @Column({ name: 'precio2_extra', type: 'decimal', precision: 10, scale: 2 })
    precio2_extra: number;

    @Column({ name: 'precio3_extra', type: 'decimal', precision: 10, scale: 2 })
    precio3_extra: number;

    @Column({ name: 'precio4_extra', type: 'decimal', precision: 10, scale: 2 })
    precio4_extra: number;

    @Column({ name: 'precio5_extra', type: 'decimal', precision: 10, scale: 2 })
    precio5_extra: number;

    @Column({ name: 'precio6_extra', type: 'decimal', precision: 10, scale: 2 })
    precio6_extra: number;

    @Column({ name: 'utilidad1_extra', type: 'decimal', precision: 10, scale: 2 })
    utilidad1_extra: number;

    @Column({ name: 'utilidad2_extra', type: 'decimal', precision: 10, scale: 2 })
    utilidad2_extra: number;

    @Column({ name: 'utilidad3_extra', type: 'decimal', precision: 10, scale: 2 })
    utilidad3_extra: number;

    @Column({ name: 'utilidad4_extra', type: 'decimal', precision: 10, scale: 2 })
    utilidad4_extra: number;

    @Column({ name: 'utilidad5_extra', type: 'decimal', precision: 10, scale: 2 })
    utilidad5_extra: number;

    @Column({ name: 'utilidad6_extra', type: 'decimal', precision: 10, scale: 2 })
    utilidad6_extra: number;

    @Column({ name: 'coniva1_extra', type: 'decimal', precision: 10, scale: 2 })
    coniva1_extra: number;

    @Column({ name: 'coniva2_extra', type: 'decimal', precision: 10, scale: 2 })
    coniva2_extra: number;

    @Column({ name: 'coniva3_extra', type: 'decimal', precision: 10, scale: 2 })
    coniva3_extra: number;

    @Column({ name: 'coniva4_extra', type: 'decimal', precision: 10, scale: 2 })
    coniva4_extra: number;

    @Column({ name: 'coniva5_extra', type: 'decimal', precision: 10, scale: 2 })
    coniva5_extra: number;

    @Column({ name: 'coniva6_extra', type: 'decimal', precision: 10, scale: 2 })
    coniva6_extra: number;

    @Column({ name: 'descuento1', type: 'decimal', precision: 10, scale: 2 })
    descuento1: number;

    @Column({ name: 'descuento2', type: 'decimal', precision: 10, scale: 2 })
    descuento2: number;

    @Column({ name: 'descuento3', type: 'decimal', precision: 10, scale: 2 })
    descuento3: number;

    @Column({ name: 'descuento4', type: 'decimal', precision: 10, scale: 2 })
    descuento4: number;

    @Column({ name: 'descuento5', type: 'decimal', precision: 10, scale: 2 })
    descuento5: number;

    @Column({ name: 'descuento6', type: 'decimal', precision: 10, scale: 2 })
    descuento6: number;

    @Column({ name: 'descuento1_extra', type: 'decimal', precision: 10, scale: 2 })
    descuento1_extra: number;

    @Column({ name: 'descuento2_extra', type: 'decimal', precision: 10, scale: 2 })
    descuento2_extra: number;

    @Column({ name: 'descuento3_extra', type: 'decimal', precision: 10, scale: 2 })
    descuento3_extra: number;

    @Column({ name: 'descuento4_extra', type: 'decimal', precision: 10, scale: 2 })
    descuento4_extra: number;

    @Column({ name: 'descuento5_extra', type: 'decimal', precision: 10, scale: 2 })
    descuento5_extra: number;

    @Column({ name: 'descuento6_extra', type: 'decimal', precision: 10, scale: 2 })
    descuento6_extra: number;

    @Column({ name: 'codigo_barras2', type: 'varchar', length: 50 })
    codigo_barras2: string;

    @Column({ name: 'codigo_barras3', type: 'varchar', length: 50 })
    codigo_barras3: string;

    @Column({ name: 'departamento_id', type: 'int', default: 0 })
    departamento_id: number;

    @Column({ name: 'seccion_id', type: 'int', default: 0 })
    seccion_id: number;

    @Column({ name: 'familia_id', type: 'int', default: 0 })
    familia_id: number;

    @Column({ name: 'subfamilia_id', type: 'int', default: 0 })
    subfamilia_id: number;

    @Column({ name: 'marca_id', type: 'int', default: 0 })
    marca_id: number;

    @Column({ name: 'linea_id', type: 'int' })
    linea_id: number;

    @Column({ name: 'origen_id', type: 'int', default: 0 })
    origen_id: number;

    @Column({ name: 'tipo_id', type: 'int', default: 0 })
    tipo_id: number;

    @Column({ name: 'tecnologia_id', type: 'int', default: 0 })
    tecnologia_id: number;

    @Column({ name: 'categoria', type: 'varchar', length: 1 })
    categoria: string;

    @Column({ name: 'referencia_proveedor', type: 'varchar', length: 50 })
    referencia_proveedor: string;

    @Column({ name: 'impuesto_compra', type: 'decimal', precision: 10, scale: 2 })
    impuesto_compra: number;

    @Column({ name: 'tipo_articulo', type: 'varchar', length: 1 })
    tipo_articulo: string;

    @Column({ name: 'cuenta_contable3', type: 'varchar', length: 25 })
    cuenta_contable3: string;

    @Column({ name: 'cuenta_contable1_devolucion', type: 'varchar', length: 25 })
    cuenta_contable1_devolucion: string;

    @Column({ name: 'cuenta_contable2_devolucion', type: 'varchar', length: 25 })
    cuenta_contable2_devolucion: string;

    @Column({ name: 'cuenta_contable3_devolucion', type: 'varchar', length: 25 })
    cuenta_contable3_devolucion: string;

    @Column({ name: 'cuenta_contable_faltantes', type: 'varchar', length: 25 })
    cuenta_contable_faltantes: string;

    @Column({ name: 'cuenta_contable_sobrantes', type: 'varchar', length: 25 })
    cuenta_contable_sobrantes: string;

    @Column({ name: 'cuenta_contable_entradas', type: 'varchar', length: 25 })
    cuenta_contable_entradas: string;

    @Column({ name: 'cuenta_contable_salidas', type: 'varchar', length: 25 })
    cuenta_contable_salidas: string;

    @Column({ name: 'costo_minimo', type: 'decimal', precision: 20, scale: 2 })
    costo_minimo: number;

    @Column({ name: 'costo_maximo', type: 'decimal', precision: 20, scale: 2 })
    costo_maximo: number;

    @Column({ name: 'precio_minimo', type: 'decimal', precision: 20, scale: 2 })
    precio_minimo: number;

    @Column({ name: 'precio_maximo', type: 'decimal', precision: 20, scale: 2 })
    precio_maximo: number;

    @Column({ name: 'precio_ultima_compra', type: 'decimal', precision: 20, scale: 2 })
    precio_ultima_compra: number;

    @Column({ name: 'costo_fob', type: 'decimal', precision: 20, scale: 2 })
    costo_fob: number;

    @Column({ name: 'fecha_modificacion', type: 'datetime' })
    fecha_modificacion: Date;

    @Column({ name: 'fecha_ult_compra', type: 'datetime' })
    fecha_ult_compra: Date;

    @Column({ name: 'fecha_ult_venta', type: 'datetime' })
    fecha_ult_venta: Date;

    @Column({ name: 'usuario_modificacion', type: 'varchar', length: 50 })
    usuario_modificacion: string;

    @Column({ name: 'generar_etiqueta', type: 'int', default: 1 })
    generar_etiqueta: number;

    @Column({ name: 'costo_franco', type: 'decimal', precision: 10, scale: 2 })
    costo_franco: number;

    @Column({ name: 'visible_web', type: 'char', length: 1, nullable: true })
    visible_web: string;

    @Column({ name: 'visible_pos', type: 'char', length: 1, default: 'T' })
    visible_pos: string;

    @Column({ name: 'congelacion_id', type: 'int', default: 0 })
    congelacion_id: number;

    @Column({ name: 'visible_procesamiento', type: 'varchar', length: 1, default: 'F' })
    visible_procesamiento: string;

    @Column({ name: 'detalles_kit', type: 'varchar', length: 1, default: 'T', comment: 'T = True | F = False' })
    detalles_kit: string;

    @Column({ name: 'id_segmento_gob', type: 'int', nullable: true })
    id_segmento_gob: number;

    @Column({ name: 'id_familia_gob', type: 'int', nullable: true })
    id_familia_gob: number;

    @Column({ name: 'id_moneda_base', type: 'int', default: 0 })
    id_moneda_base: number;
}
