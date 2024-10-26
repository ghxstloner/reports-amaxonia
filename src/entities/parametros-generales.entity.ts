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

  @Column({ length: 100, default: 'logo_selectra.jpg' })
  img_izq: string;

  @Column({ length: 100, nullable: true })
  img_der: string;

  @Column({ length: 50 })
  moneda: string;

  @Column({ type: 'tinyint' })
  contribuyente_formal: boolean;

  @Column({ type: 'int' })
  cantidad_copias: number;

  @Column({ type: 'int' })
  dias_vencimiento: number;

  @Column({ length: 50 })
  titulo_precio1: string;

  @Column({ length: 50 })
  titulo_precio2: string;

  @Column({ length: 50 })
  titulo_precio3: string;

  @Column({ length: 50, default: 'PRECIO 4' })
  titulo_precio4: string;

  @Column({ length: 50, default: 'PRECIO 5' })
  titulo_precio5: string;

  @Column({ length: 50, default: 'PRECIO 6' })
  titulo_precio6: string;

  @Column({ type: 'date' })
  fecha_ultimo_cierre_mensual: string;

  @Column({ type: 'int', comment: 'Debe indicar cual de los tres precios es el menor' })
  precio_menor: number;

  @Column({ type: 'int' })
  unidad_tributaria: number;

  @Column({ type: 'tinyint', comment: '¿Usar clasificador de Documentos?' })
  clasificador_de_documentos: boolean;

  @Column({ length: 50 })
  nombre_impuesto_principal: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, comment: 'Porcentaje de I.V.A.' })
  porcentaje_impuesto_principal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  iva_a: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  iva_b: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  iva_c: number;

  @Column({ type: 'tinyint' })
  activar_impuesto2: boolean;

  @Column({ length: 50 })
  string_impuesto2: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  porcentaje_impuesto2: number;

  @Column({ type: 'tinyint' })
  activar_impuesto3: boolean;

  @Column({ length: 50 })
  string_impuesto3: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  porcentaje_impuesto3: number;

  @Column({ type: 'tinyint' })
  contribuyente_especial: boolean;

  @Column({ type: 'double', precision: 10, scale: 2, comment: 'porcentaje proveedores sobre impuesto principal' })
  pprovee_sobr_impu_princ: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, comment: 'porcentaje clientes sobre impuesto principal' })
  pclient_sobr_impu_princ: number;

  @Column({ length: 50 })
  string_clasificador_inventario1: string;

  @Column({ length: 50 })
  string_clasificador_inventario2: string;

  @Column({ length: 50 })
  string_clasificador_inventario3: string;

  @Column({ type: 'int', default: 0, comment: '0->PDF, 1->FISCAL, 2->FORMA LIBRE' })
  tipo_facturacion: number;

  @Column({ type: 'tinyint', default: 0, comment: '0->No,1->Si:Spooler Fiscal' })
  swterceroimp: number;

  @Column({ length: 50, nullable: true })
  impresora_marca: string;

  @Column({ length: 50, nullable: true })
  impresora_modelo: string;

  @Column({ length: 50, nullable: true })
  impresora_serial: string;

  @Column({ type: 'int', default: 1 })
  moneda_base: number;

  @Column({ type: 'int', nullable: true })
  servicio_fk: number;

  @Column({ length: 50 })
  cuenta_credito_fiscal: string;

  @Column({ length: 50 })
  cuenta_debito_fiscal: string;

  @Column({ length: 50 })
  cuenta_retencion_iva: string;

  @Column({ length: 20 })
  cuenta_retencion_islr: string;

  @Column({ length: 50 })
  cuenta_retencion_tf: string;

  @Column({ length: 50 })
  cuenta_retencion_im: string;

  @Column({ type: 'int' })
  cod_almacen: number;

  @Column({ type: 'int' })
  id_tipo_regla_existencia: number;

  @Column({ length: 30 })
  telefonos_fax: string;

  @Column({ length: 30 })
  correo: string;

  @Column({ type: 'tinyint', default: 0 })
  precio_letra: boolean;

  @Column({ length: 50 })
  tipo_factura: string;

  @Column({ type: 'tinyint' })
  talla_color: boolean;

  @Column({ length: 5 })
  puerto_com: string;

  @Column({ length: 10 })
  tipo_distribucion: string;

  @Column({ type: 'enum', enum: ['Si', 'No'] })
  pedido_muestra_descuento: 'Si' | 'No';

  @Column({ type: 'enum', enum: ['Pieza', 'Bulto'] })
  pedido_tipo_cantidad: 'Pieza' | 'Bulto';

  @Column({ type: 'int', nullable: true })
  pais_id: number;

  @Column({ type: 'int', nullable: true })
  sucursal_id: number;

  @Column({ type: 'enum', enum: ['contado', 'credito'] })
  formapago: 'contado' | 'credito';

  @Column({ type: 'enum', enum: ['No', 'Si'] })
  multi_moneda: 'No' | 'Si';

  @Column({ type: 'enum', enum: ['No', 'Si'] })
  lista_precio: 'No' | 'Si';

  @Column({ type: 'int', nullable: true })
  codigo_modelo_compra: number;

  @Column({ type: 'int', nullable: true })
  codigo_modelo_cotizacion: number;

  @Column({ type: 'int', nullable: true })
  codigo_modelo_factura: number;

  @Column({ type: 'int', nullable: true, comment: 'Factura formato libre' })
  codigo_modelo_factura_fl: number;

  @Column({ type: 'int', nullable: true })
  codigo_modelo_pedido: number;

  @Column({ type: 'int', nullable: true, comment: 'Packing List' })
  codigo_modelo_packing_list: number;

  @Column({ type: 'int', nullable: true, comment: 'Packing deposit' })
  codigo_modelo_packing_deposit: number;

  @Column({ type: 'int', nullable: true })
  codigo_modelo_packing_list_pd: number;

  @Column({ type: 'int', nullable: true })
  codigo_modelo_packing_deposit_pd: number;

  @Column({ type: 'int', nullable: true })
  codigo_modelo_antiguedad_deuda: number;

  @Column({ length: 2, nullable: true })
  tipoEmision: string;

  @Column({ type: 'datetime', nullable: true })
  fechaInicioContingencia: Date;

  @Column({ length: 250, nullable: true })
  motivoContingencia: string;

  @Column({ type: 'int', default: 1 })
  destinoOperacion: number;

  @Column({ type: 'int', default: 1 })
  procesoGeneracion: number;

  @Column({ length: 3, nullable: true })
  puntoFacturacionFiscal: string;

  @Column({ length: 7 })
  codigoSucursalEmisor: string;

  @Column({ length: 5, nullable: true })
  codigoFormato: string;

  @Column({ type: 'int' })
  codigo_modelo_devolucion: number;

  @Column({ type: 'int', default: 0 })
  codigo_modelo_cobranza: number;

  @Column({ type: 'int', default: 0 })
  codigo_modelo_registro_inventario: number;

  @Column({ type: 'int' })
  codigo_modelo_conciliacion: number;

  @Column({ length: 100 })
  pedidos_correo1: string;

  @Column({ length: 100 })
  pedidos_correo2: string;

  @Column({ length: 100 })
  pedidos_correo3: string;

  @Column({ length: 100 })
  correo_sistemas: string;

  @Column({ length: 100 })
  correo_sistemas_password: string;

  @Column({ length: 200 })
  resuelto1: string;

  @Column({ type: 'int', default: 0 })
  codigo_modelo_pedido_tienda: number;

  @Column({ type: 'int', default: 0 })
  codigo_modelo_pedido_ticket: number;

  @Column({ length: 50 })
  servidor_maestro: string;

  @Column({ length: 50 })
  string_clasificador_inventario4: string;

  @Column({ type: 'int' })
  apartado_plazo_minimo: number;

  @Column({ type: 'int' })
  apartado_plazo_maximo: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  apartado_anticipo_porcentaje: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  reparacion_anticipo_porcentaje: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  abono_minimo: number;

  @Column({ type: 'int' })
  codigo_modelo_comprobante_retencion_itbms: number;

  @Column({ length: 80, default: '000001' })
  default_cod_cliente_factura: string;

  @Column({ type: 'int', default: 15 })
  default_id_formapago_factura: number;

  @Column({ length: 50 })
  cuenta_ventas: string;

  @Column({ length: 50 })
  cuenta_ventas_devolucion: string;

  @Column({ length: 50 })
  cuenta_ventas_descuento: string;

  @Column({ length: 50 })
  cuenta_ventas_descuento_devolucion: string;

  @Column({ length: 50 })
  cuenta_ventas_coste: string;

  @Column({ length: 50 })
  cuenta_ventas_coste_devolucion: string;

  @Column({ length: 50 })
  cuenta_compras: string;

  @Column({ length: 50 })
  cuenta_compras_devolucion: string;

  @Column({ length: 50 })
  cuenta_compras_descuento: string;

  @Column({ length: 50 })
  cuenta_compras_descuento_devolucion: string;

  @Column({ length: 50 })
  cuenta_inventario_entradas: string;

  @Column({ length: 50 })
  cuenta_inventario_salidas: string;

  @Column({ length: 50 })
  cuenta_inventario_sobrantes: string;

  @Column({ length: 50 })
  cuenta_inventario_faltantes: string;

  @Column({ length: 50 })
  cuenta_clientes: string;

  @Column({ length: 50 })
  cuenta_cobros: string;

  @Column({ length: 50 })
  cuenta_pagos: string;

  @Column({ length: 50 })
  cuenta_gastos_bancarios: string;

  @Column({ length: 100 })
  facturas_correo1: string;

  @Column({ length: 100 })
  facturas_correo2: string;

  @Column({ length: 100 })
  facturas_correo3: string;

  @Column({ length: 100 })
  compras_correo1: string;

  @Column({ length: 100 })
  compras_correo2: string;

  @Column({ length: 100 })
  compras_correo3: string;

  @Column({ length: 100 })
  gerencia_correo1: string;

  @Column({ length: 100 })
  administracion_correo1: string;

  @Column({ length: 100 })
  contabilidad_correo1: string;

  @Column({ length: 36 })
  ecommerce_caja: string;

  @Column({ type: 'int' })
  ecommerce_sucursal: number;

  @Column({ type: 'int' })
  ecommerce_vendedor: number;

  @Column({ type: 'int' })
  ecommerce_forma_pago: number;

  @Column({ length: 50 })
  cuenta_debito_bancario: string;

  @Column({ type: 'int' })
  cliente_fidelizacion_vencimiento: number;

  @Column({ type: 'decimal', precision: 20, scale: 2 })
  cliente_fidelizacion_descuento_cumpleanos: number;

  @Column({ type: 'decimal', precision: 20, scale: 2 })
  cliente_fidelizacion_descuento_especial: number;

  @Column({ type: 'int' })
  cliente_fidelizacion_edad: number;

  @Column({ type: 'int', default: 0 })
  retencion_nota_credito: number;

  @Column({ length: 50 })
  cuenta_compras_servicios: string;

  @Column({ length: 50 })
  cuenta_compras_servicios_devolucion: string;

  @Column({ length: 50 })
  cuenta_ventas_servicios: string;

  @Column({ length: 50 })
  cuenta_ventas_servicios_devolucion: string;

  @Column({ length: 50 })
  cuenta_ventas_coste_servicios: string;

  @Column({ length: 50 })
  cuenta_ventas_coste_servicios_devolucion: string;

  @Column({ length: 2, default: 'SI', comment: 'SI o NO' })
  validar_stock: string;

  @Column({ length: 2, default: 'NO', comment: 'SI o NO' })
  bloquear_itbms: string;

  @Column({ type: 'int' })
  codigo_modelo_solicitud_requisicion: number;

  @Column({ length: 100 })
  cmd_impresion_directa: string;

  @Column({ length: 255, nullable: true })
  token_empresa: string;

  @Column({ length: 255, nullable: true })
  token_password: string;

  @Column({ length: 511, nullable: true })
  rango_numeracion: string;

  @Column({ length: 511, nullable: true })
  numero_consecutivo: string;

  @Column({ length: 255, nullable: true })
  direccion_envio: string;

  @Column({ length: 255, nullable: true })
  direccion_adjunto: string;

  @Column({ length: 511, nullable: true })
  puerto_correo: string;

  @Column({ length: 255, nullable: true })
  host_correo: string;

  @Column({ length: 255, nullable: true })
  direccion_estado_documento: string;

  @Column({ length: 511, nullable: true })
  direccion_anulacion: string;

  @Column({ length: 255, nullable: true })
  direccion_recepcion_xml: string;

  @Column({ length: 255, nullable: true })
  direccion_folios_restantes: string;

  @Column({ length: 255, nullable: true })
  direccion_envio_correo: string;

  @Column({ length: 255, nullable: true })
  direccion_rastro_correo: string;

  @Column({ length: 255, nullable: true })
  direccion_consulta_ruc: string;

  @Column({ length: 511, nullable: true })
  serialDispositivo: string;

  @Column({ length: 255, nullable: true })
  smtp_correo: string;

  @Column({ length: 255, nullable: true })
  direccion_recepcion: string;

  @Column({ length: 255, nullable: true })
  prefijo_fe: string;

  @Column({ length: 255, nullable: true })
  establecimiento_fe: string;

  @Column({ length: 255, nullable: true })
  username: string;

  @Column({ length: 255, nullable: true })
  taxid: string;

  @Column({ length: 255, nullable: true })
  format: string;

  @Column({ type: 'text', nullable: true })
  token: string;

  @Column({ type: 'datetime', nullable: true })
  token_expiracion: Date;

  @Column({ length: 255, nullable: true })
  digifact_tipoEmision: string;

  @Column({ length: 255, nullable: true })
  digifact_fechaInicioContingencia: string;

  @Column({ length: 255, nullable: true })
  digifact_motivoContingencia: string;

  @Column({ length: 255, nullable: true })
  digifact_destinoOperacion: string;

  @Column({ length: 255, nullable: true })
  digifact_puntoFacturacionFiscal: string;

  @Column({ length: 255, nullable: true })
  digifact_codigoSucursalEmisor: string;

  @Column({ length: 255, nullable: true })
  digifact_procesoGeneracion: string;

  @Column({ length: 255, nullable: true })
  digifact_tokenEmpresa: string;

  @Column({ length: 255, nullable: true })
  digifact_tokenPassword: string;

  @Column({ length: 255, nullable: true })
  digifact_direccion_envio: string;

  @Column({ length: 50 })
  cuenta_cxc: string;

  @Column({ length: 50 })
  cuenta_cxp: string;

  @Column({ length: 50, nullable: true })
  id_departamentos: string;

  @Column({ type: 'int', default: 25 })
  codigo_modelo_fac_preimpreso: number;

  @Column({ type: 'int', default: 26 })
  codigo_modelo_cotizacion_proveedor: number;

  @Column({ length: 37, nullable: true })
  CompanyId: string;

  @Column({ length: 50, default: '' })
  cuenta_debito_nota_debito: string;

  @Column({ length: 50, default: '' })
  cuenta_credito_nota_debito: string;

  @Column({ type: 'text', nullable: true })
  url_company: string;

  @Column({ length: 50, default: '' })
  id_tipo_procesamiento_materia: string;

  @Column({ length: 50, default: '' })
  id_tipo_procesamiento_terminado: string;

  @Column({ length: 255, default: '' })
  ff_company: string;

  @Column({ length: 255, default: '' })
  ff_api_key: string;

  @Column({ length: 255, default: '' })
  ff_branch: string;

  @Column({ type: 'tinyint', nullable: true, comment: '1 = Prod | 2 = Demo' })
  ff_entorno: number;

  @Column({ type: 'enum', enum: ['No', 'Si'], default: 'No' })
  contabilizacion_automatica: 'No' | 'Si';

  @Column({ type: 'int', default: 2 })
  tipo_contribuyente: number;

  @Column({ type: 'int', default: 26 })
  codigo_modelo_factura_proveedor: number;

  @Column({ type: 'enum', enum: ['No', 'Si'], default: 'Si' })
  generar_inventario: 'No' | 'Si';

  @Column({ type: 'enum', enum: ['No', 'Si'], default: 'Si' })
  generar_orden_pago: 'No' | 'Si';

  @Column({ type: 'int', default: 27 })
  codigo_modelo_ach_proveedor: number;

  @Column({ length: 2, default: 'No' })
  ticket_facturacion_express: string;

  @Column({ length: 2, default: 'No' })
  caja_configuracion_pos_automatico: string;

  @Column({ length: 255 })
  momi_consumer_key: string;

  @Column({ length: 255 })
  momi_consumer_secret: string;

  @Column({ length: 255 })
  momi_access_token: string;

  @Column({ length: 255 })
  momi_token_secret: string;

  @Column({ length: 255 })
  momi_realm: string;

  @Column({ length: 45, nullable: true })
  id_comercio: string;

  @Column({ length: 200, nullable: true })
  clave_secreta: string;

  @Column({ length: 2, nullable: true })
  modo_prueba_yappy: string;

  @Column({ length: 70, nullable: true })
  yappy_plugin: string;

  @Column({ type: 'enum', enum: ['No', 'Si'], default: 'No' })
  devolucion_generica_inventario: 'No' | 'Si';

  @Column({ type: 'enum', enum: ['No', 'Si'], default: 'No' })
  devolucion_generica_saldo_cliente: 'No' | 'Si';

  @Column({ type: 'tinyint', default: 0 })
  enviarComandaPOS: number;

  @Column({ type: 'tinyint', default: 0 })
  filtrar_por_departamento: number;

  @Column({ type: 'enum', enum: ['No', 'Si'], nullable: true })
  transf_automatica: 'No' | 'Si';

  @Column({ type: 'int', default: 50 })
  codigo_modelo_entrada_inventario: number;

  @Column({ length: 2, default: 'No' })
  resumen_movimiento: string;

  @Column({ length: 2, default: 'SI' })
  kardex_almacen_decimales: string;

  @Column({ type: 'tinyint', default: 0, comment: '0 para ver PDF en el POS, 1 para no ver PDF en el POS' })
  impresion_directa: number;

  @Column({ length: 255, default: '' })
  netsuite_url_base: string;
}

