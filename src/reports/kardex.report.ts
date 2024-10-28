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
                    headerRows: 2,
                    widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: [
                        [
                            { text: '', border: [false, false, false, true] },
                            { text: '', border: [false, false, false, true] },
                            { text: 'Entrada', colSpan: 2, alignment: 'center', bold: true, fontSize: 9 },
                            {},
                            { text: 'Salida', colSpan: 2, alignment: 'center', bold: true, fontSize: 9 },
                            {},
                            { text: 'Existencia Final', alignment: 'center', bold: true, fontSize: 9 }
                        ],
                        [
                            { text: 'Código', fontSize: 9, bold: true },
                            { text: 'Descripción', fontSize: 9, bold: true },
                            { text: 'Cantidad', fontSize: 9, bold: true },
                            { text: 'Monto', fontSize: 9, bold: true },
                            { text: 'Cantidad', fontSize: 9, bold: true },
                            { text: 'Monto', fontSize: 9, bold: true },
                            { text: 'Cantidad', fontSize: 9, bold: true }
                        ],
                        // Filas de datos
                        ...data.map(item => [
                            { text: item.codigo, fontSize: 8 },
                            { text: item.descripcion1, fontSize: 8, bold: true },
                            { text: item.cantidadEntrada.toString(), fontSize: 8 },
                            { text: item.montoEntrada.toFixed(2), fontSize: 8, bold: true, alignment: 'center'},
                            { text: item.cantidadSalida.toString(), fontSize: 8 },
                            { text: item.montoSalida.toFixed(2), fontSize: 8, bold: true, alignment: 'center'},
                            { text: (item.cantidadExistencia ?? 0.00).toString(), fontSize: 8 }
                        ]),
                        [
                            { text: '', colSpan: 2, border: [false, false, false, false] },
                            {},
                            { text: '', border: [false, false, false, false] },
                            { text: `${totalMontoEntrada}`, fontSize: 8, bold: true, alignment: 'right' },
                            { text: '', border: [false, false, false, false] },
                            { text: `${totalMontoSalida}`, fontSize: 8, bold: true, alignment: 'right' },
                            { text: '', border: [false, false, false, false] }
                        ]
                    ],
                }
            }
        ]
    };
};
