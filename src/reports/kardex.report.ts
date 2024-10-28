import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection, footerSection } from "./sections";

interface KardexReportItem {
    codigo: string;
    descripcion: string;
    cantidad: number;
    tipoMovimiento: 'Entrada' | 'Salida';
}

interface KardexReportOptions {
    title?: string;
    subTitle?: string;
    data: KardexReportItem[];
}

export const getKardexReport = (options: KardexReportOptions): TDocumentDefinitions => {
    const { title, subTitle, data } = options;

    return {
        pageOrientation: 'landscape',
        header: headerSection({
            title: title ?? 'Kardex Report',
            subTitle: subTitle ?? 'Reporte de Movimientos de Almacén'
        }),
        footer: footerSection,
        pageMargins: [40, 80, 40, 60],
        content: [
            {
                layout: 'customLayout01',
                table: {
                    headerRows: 1,
                    widths: ['auto', '*', 'auto', 'auto'],
                    body: [
                        // Encabezado de la tabla
                        ['Código', 'Descripción', 'Cantidad', 'Tipo de Movimiento'],
                        // Filas de datos
                        ...data.map(item => [
                            { text: item.codigo, fontSize: 8 },
                            { text: item.descripcion, fontSize: 8, bold: true },
                            { text: item.cantidad.toString(), fontSize: 8 },
                            { text: item.tipoMovimiento, fontSize: 8 },
                        ]),
                    ],
                }
            },
            // Tabla de Totales
            {
                text: 'Totales',
                style: { fontSize: 14, bold: true, margin: [0, 40, 0, 0] }
            },
            {
                layout: 'noBorders',
                table: {
                    widths: [100, '*'],
                    body: [
                        [
                            { text: 'Total de Movimientos', bold: true },
                            { text: `${data.length} movimientos`, fontSize: 10, bold: true }
                        ]
                    ]
                }
            }
        ]
    };
};
