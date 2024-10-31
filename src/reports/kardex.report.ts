import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerCustomSection, footerSection } from "./sections";

interface KardexReportItem {
    codigo: string;
    descripcion1: string;
    cantidadEntrada: number;
    montoEntrada: number;
    cantidadSalida: number;
    montoSalida: number;
    cantidadConsumo: number;
    montoConsumo: number;
    existenciaInicial: number;
    existenciaFinal: number;
    costoUnitario: number;
}

interface KardexReportOptions {
    title?: string;
    subTitle?: string;
    data: KardexReportItem[];
    startDate?: string;
    endDate?: string;
    companyParams?: string | { nombre_empresa: string; direccion: string; telefonos: string; rif: string; };
}

export const getKardexReport = (options: KardexReportOptions): TDocumentDefinitions => {
    const { title, subTitle, data, startDate, endDate, companyParams } = options;

    const totalMontoEntrada = data.reduce((sum, item) => sum + (item.cantidadEntrada * item.costoUnitario), 0).toFixed(2);
    const totalMontoSalida = data.reduce((sum, item) => sum + item.montoSalida, 0).toFixed(2);
    const totalMontoExistenciaInicial = data.reduce((sum, item) => sum + (item.existenciaInicial * item.costoUnitario), 0).toFixed(2);
    const totalMontoConsumo = data.reduce((sum, item) => sum + ((item.cantidadConsumo ?? 0) * (item.costoUnitario ?? 0)), 0).toFixed(2);
    const totalExistenciaFinal = data.reduce((sum, item) => {
        const existenciaFinal = (item.existenciaInicial ?? 0) + (item.cantidadEntrada ?? 0) - (item.cantidadSalida ?? 0) - (item.cantidadConsumo ?? 0);
        return sum + (existenciaFinal * (item.costoUnitario ?? 0));
    }, 0).toFixed(2);

    return {
        pageOrientation: 'landscape',
        pageSize: {
            width: 1007.12,
            height: 612.28 
        },
        header: headerCustomSection({
            title: title ?? 'Kardex Report',
            subTitle: subTitle ?? 'Reporte de Movimientos de Almacén',
            startDate: startDate,
            endDate: endDate,
            companyParams: typeof companyParams === 'string'
                ? { nombre_empresa: 'Nombre de la Empresa', direccion: 'Dirección', telefonos: 'Teléfono', rif: 'RIF' }
                : companyParams,
            showDate: true
        }),
        footer: footerSection,
        pageMargins: [20, 80, 20, 60],
        content: [
            {
                layout: 'customLayout01',
                table: {
                    headerRows: 3,
                    widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: [
                        [
                            { text: '', border: [false, false, false, true] },                         
                            { text: '', border: [false, false, false, true] },                         
                            { text: 'EXISTENCIA INICIAL', colSpan: 3, alignment: 'center', bold: true, fontSize: 8 },
                            { text: '' },                                                              
                            { text: '' },                                                              
                            { text: 'ENTRADAS', colSpan: 2, alignment: 'center', bold: true, fontSize: 8 },           
                            { text: '' },                                                              
                            { text: 'SALIDAS', colSpan: 2, alignment: 'center', bold: true, fontSize: 8 },           
                            { text: '' },                                                              
                            { text: 'AUTO-CONSUMO', colSpan: 2, alignment: 'center', bold: true, fontSize: 8, noWrap: true }, 
                            { text: '' },                                                              
                            { text: 'EXISTENCIA FINAL', colSpan: 3, alignment: 'center', bold: true, fontSize: 8 },
                            { text: '' },
                            { text: '' }
                        ],                                  
                        [
                            { text: 'Código', fontSize: 8, bold: true },
                            { text: 'Descripción', fontSize: 8, bold: true },
                            { text: 'Cantidad', fontSize: 8, bold: true },
                            { text: 'Costo UNI.', fontSize: 8, bold: true, noWrap: true },
                            { text: 'Mto. Total', fontSize: 8, bold: true, noWrap: true },
                            { text: 'Cantidad', fontSize: 8, bold: true },
                            { text: 'Monto', fontSize: 8, bold: true },
                            { text: 'Cantidad', fontSize: 8, bold: true },
                            { text: 'Monto', fontSize: 8, bold: true },
                            { text: 'Cantidad', fontSize: 8, bold: true },
                            { text: 'Monto', fontSize: 8, bold: true },
                            { text: 'Cantidad', fontSize: 8, bold: true }, 
                            { text: 'Costo UNI.', fontSize: 8, bold: true, noWrap: true },
                            { text: 'Mto. Total', fontSize: 8, bold: true },
                        ],
                        ...data.map(item => {
                            const existenciaFinal = (item.existenciaInicial ?? 0) + (item.cantidadEntrada ?? 0) - (item.cantidadSalida ?? 0) - (item.cantidadConsumo ?? 0);
                            return [
                                { text: item.codigo, fontSize: 7 },
                                { text: item.descripcion1, fontSize: 7, bold: true },
                                { text: (item.existenciaInicial ?? 0).toFixed(2), fontSize: 7, alignment: 'center' },                                                       // Cantidad Existencia Inicial
                                { text: (item.costoUnitario ?? 0).toFixed(2), fontSize: 7, alignment: 'center' },                                                           // Costo UNI. Existencia Inicial
                                { text: ((item.existenciaInicial ?? 0) * (item.costoUnitario ?? 0)).toFixed(2), fontSize: 7, alignment: 'center', bold:true },              // Mto. Total Existencia Inicial
                                { text: (item.cantidadEntrada ?? 0).toFixed(2), fontSize: 7, alignment: 'center' },                                                         // Cantidad Entrada
                                { text: ((item.cantidadEntrada ?? 0) * (item.costoUnitario ?? 0)).toFixed(2), fontSize: 7, bold: true, alignment: 'center' },               // Monto Entrada
                                { text: (item.cantidadSalida ?? 0).toFixed(2), fontSize: 7, alignment: 'center' },                                                          // Cantidad Salida
                                { text: ((item.montoSalida ?? 0).toFixed(2)), fontSize: 7, bold: true, alignment: 'center' },                                               // Monto Salida
                                { text: (item.cantidadConsumo ?? 0).toFixed(2), fontSize: 7, alignment: 'center' },                                                         // Cantidad Autoconsumo
                                { text: ((item.montoConsumo ?? 0).toFixed(2)), fontSize: 7, alignment: 'center', bold: true },                                              // Monto Autoconsumo
                                { text: existenciaFinal.toFixed(2), fontSize: 7, alignment: 'center' },                                                                     // Cantidad Existencia Final
                                { text: (item.costoUnitario ?? 0).toFixed(2), fontSize: 7, alignment: 'center' },                                                           // Costo UNI. Existencia Final
                                { text: (existenciaFinal * (item.costoUnitario ?? 0)).toFixed(2), fontSize: 7, alignment: 'center', bold:true }                             // Mto. Total Existencia Final
                            ];
                        }),
                        [
                            { text: '', colSpan: 4, border: [false, false, false, false] },
                            {}, {}, {}, 
                            { text: totalMontoExistenciaInicial, fontSize: 7, bold: true, alignment: 'center' }, // Total Monto Existencia Inicial
                            {}, 
                            { text: totalMontoEntrada, fontSize: 7, bold: true, alignment: 'center' }, // Total Monto Entrada
                            {},
                            { text: totalMontoSalida, fontSize: 7, bold: true, alignment: 'center' },  // Total Monto Salida
                            {},
                            { text: totalMontoConsumo, fontSize: 7, alignment: 'center', bold: true }, // Total Monto Autoconsumo
                            {},
                            {}, // Total Existencia Final Cantidad
                            { text: totalExistenciaFinal, fontSize: 7, alignment: 'center', bold: true }  // Total Monto Existencia Final
                        ]
                    ]
                }
            }
        ]
    };
};
