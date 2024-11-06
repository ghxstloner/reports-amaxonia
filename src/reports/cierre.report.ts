import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerCustomSection, footerSection } from "./sections";

interface CierreReportItem {
    idCajaSecuencia: string;
    formasDePagoActivas: string[];
    fecha: string;
    tipo: string;
    documento: string;
}

interface CierreReportOptions {
    title?: string;
    subTitle?: string;
    data: CierreReportItem[];
    companyParams?: string | { nombre_empresa: string; direccion: string; telefonos: string; rif: string; };
}

export const getCierreReport = (options: CierreReportOptions): TDocumentDefinitions => {
    const { title, subTitle, data, companyParams } = options;

    const headerOptions = {
        title: title ?? 'Cierre Report',
        subTitle: subTitle ?? 'Reporte de Movimientos de Almacén',
        showDate: true,
        showFilterDate: false,
        companyParams: typeof companyParams === 'string'
            ? { nombre_empresa: 'Nombre de la Empresa', direccion: 'Dirección', telefonos: 'Teléfono', rif: 'RIF' }
            : companyParams,
    };

    const fixedHeaders = [
        { text: 'Fecha', fontSize: 8, bold: true },
        { text: 'Tipo', fontSize: 8, bold: true },
        { text: 'Documento', fontSize: 8, bold: true }
    ];

    const dynamicHeaders = data[0].formasDePagoActivas.map(forma => ({
        text: forma, fontSize: 8, bold: true
    }));

    const allHeaders = [
        ...fixedHeaders,
        ...data[0].formasDePagoActivas.map(forma => ({ text: forma, fontSize: 8, bold: true }))
    ];
    
    const widths = [
        '10%', '10%', '10%',
        ...data[0].formasDePagoActivas.map(() => `${70 / data[0].formasDePagoActivas.length}%`)
    ];

    return {
        pageOrientation: 'landscape',
        pageSize: {
            width: 1007.12,
            height: 612.28 
        },
        header: headerCustomSection(headerOptions),
        footer: footerSection,
        pageMargins: [20, 80, 20, 60],
        content: [
            {
                layout: 'customLayout01',
                table: {
                    headerRows: 2,
                    widths: widths,
                    body: [
                        // Agregar encabezados
                        allHeaders,
                        // Mapear datos
                        ...data.map(item => {
                            const fixedData = [
                                { text: item.fecha ?? '', fontSize: 7 },
                                { text: item.tipo ?? '', fontSize: 7, bold: true },
                                { text: item.documento ?? '', fontSize: 7, bold: true },
                            ];
                        
                            const dynamicData = item.formasDePagoActivas.map(() => ({ text: '', fontSize: 7, alignment: 'center' }));
                        
                            return [...fixedData, ...dynamicData];
                        })
                    ]
                }
            }
        ]
    };
};
