import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerCustomSection, footerSection } from "./sections";

interface KardexReportItem {
    codigo: string;
    descripcion1: string;
    cantidadEntrada: number;
    montoEntrada: number;
    cantidadSalida: number;
    montoSalida: number;
    cantidadExistencia: number;
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

    const totalMontoEntrada = data.reduce((sum, item) => sum + item.montoEntrada, 0).toFixed(2);
    const totalMontoSalida = data.reduce((sum, item) => sum + item.montoSalida, 0).toFixed(2);

    return {
        pageOrientation: 'landscape',
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
        pageMargins: [40, 80, 40, 60],
        content: [
            {
                layout: 'customLayout01',
                table: {
                    headerRows: 3,
                    widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: [
                        [
                            { text: '', border: [false, false, false, true] },
                            { text: '', border: [false, false, false, true] },
                            { text: 'EXISTENCIA INICIAL', colSpan: 3, alignment: 'center', bold: true, fontSize: 8 },
                            { text: '' }, { text: '' }, // Columnas adicionales para EXISTENCIA INICIAL
                            { text: 'ENTRADAS', colSpan: 2, alignment: 'center', bold: true, fontSize: 8 },
                            { text: '' }, // Columna adicional para ENTRADAS
                            { text: 'SALIDAS', colSpan: 2, alignment: 'center', bold: true, fontSize: 8 },
                            { text: '' }, // Columna adicional para SALIDAS
                            { text: 'AUTO-CONSUMO', alignment: 'center', bold: true, fontSize: 8 },
                            { text: 'EXISTENCIA FINAL', colSpan: 3, alignment: 'center', bold: true, fontSize: 8 },
                            { text: '' }, { text: '' } // Columnas adicionales para EXISTENCIA FINAL
                        ],
                        [
                            { text: 'Código', fontSize: 8, bold: true },
                            { text: 'Descripción', fontSize: 8, bold: true },
                            { text: 'Cantidad', fontSize: 8, bold: true },
                            { text: 'Costo UNI.', fontSize: 8, bold: true },
                            { text: 'Mto. Total', fontSize: 8, bold: true },
                            { text: 'Cantidad', fontSize: 8, bold: true },
                            { text: 'Monto Bs.', fontSize: 8, bold: true },
                            { text: 'Cantidad', fontSize: 8, bold: true },
                            { text: 'Monto Bs.', fontSize: 8, bold: true },
                            { text: 'Cantidad', fontSize: 8, bold: true },
                            { text: 'Cantidad', fontSize: 8, bold: true },
                            { text: 'Costo UNI.', fontSize: 8, bold: true },
                            { text: 'Mto. Total', fontSize: 8, bold: true },
                        ],
                        // Filas de datos
                        ...data.map(item => [
                            { text: item.codigo, fontSize: 6 },
                            { text: item.descripcion1, fontSize: 6, bold: true },
                            { text: '0', fontSize: 6 }, // Cantidad Existencia Inicial
                            { text: '0.00', fontSize: 6, alignment: 'center' }, // Costo UNI. Existencia Inicial
                            { text: '0.00', fontSize: 6, alignment: 'center' }, // Mto. Total Existencia Inicial
                            { text: item.cantidadEntrada.toString(), fontSize: 6 },
                            { text: item.montoEntrada.toFixed(2), fontSize: 6, bold: true, alignment: 'center' },
                            { text: item.cantidadSalida.toString(), fontSize: 6 },
                            { text: item.montoSalida.toFixed(2), fontSize: 6, bold: true, alignment: 'center' },
                            { text: '0', fontSize: 6 }, // Cantidad Auto-consumo (0 por ahora)
                            { text: item.cantidadExistencia.toString(), fontSize: 6 },
                            { text: '0.00', fontSize: 6, alignment: 'center' }, // Costo UNI. Existencia Final
                            { text: '0.00', fontSize: 6, alignment: 'center' }  // Mto. Total Existencia Final
                        ]),
                        [
                            { text: '', colSpan: 5, border: [false, false, false, false] },
                            {}, 
                            {}, 
                            {}, 
                            {},
                            { text: '' }, // Columna para ENTRADAS (puede ser vacía o tener contenido)
                            { text: `${totalMontoEntrada}`, fontSize: 6, bold: true, alignment: 'center' },
                            {}, // Columna adicional para SALIDAS
                            { text: `${totalMontoSalida}`, fontSize: 6, bold: true, alignment: 'center' },
                            {}, 
                            {}, 
                            {},
                            {}
                        ]
                        
                    ],
                }
            }
        ]
    };
};
