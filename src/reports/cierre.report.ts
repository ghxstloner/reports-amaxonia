import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerCustomSection, footerSection } from "./sections";

// Actualizamos la interfaz Factura
interface Factura {
    codFactura: string;
    fechaFactura: string;
    totalFactura: number;
    formasDePago: { [key: string]: string }; // Montos por cada forma de pago
}

interface CierreReportItem {
    idCajaSecuencia: string;
    formasDePagoActivas: string[];
    fecha: string;
    tipo: string;
    facturas: Factura[];
}

interface CierreReportOptions {
    title?: string;
    subTitle?: string;
    data: CierreReportItem[];
    companyParams?: string | { nombre_empresa: string; direccion: string; telefonos: string; rif: string; };
}

export const getCierreReport = (options: CierreReportOptions): TDocumentDefinitions => {
    const { title, subTitle, data, companyParams } = options;
    const reportData = Array.isArray(data) ? data[0] : data; 

    const formasDePagoActivas = Array.isArray(reportData.formasDePagoActivas) ? reportData.formasDePagoActivas : [];
    const headerOptions = {
        title: title ?? 'Flujo de Caja Detallado',
        subTitle: subTitle ?? 'Reporte de Movimientos de la Caja',
        showDate: true,
        showFilterDate: false,
        companyParams: typeof companyParams === 'string'
            ? { nombre_empresa: 'Nombre de la Empresa', direccion: 'Dirección', telefonos: 'Teléfono', rif: 'RIF' }
            : companyParams,
    };

    const fixedHeaders = [
        { text: 'Fecha', fontSize: 8, bold: true, alignment: 'center', border: [true, true, true, true] },
        { text: 'Tipo', fontSize: 8, bold: true, alignment: 'center', border: [true, true, true, true] },
        { text: 'Documento', fontSize: 8, bold: true, alignment: 'center', border: [true, true, true, true] },
        { text: 'Total', fontSize: 8, bold: true, alignment: 'center', border: [true, true, true, true] }
    ];
    
    const dynamicHeaders = formasDePagoActivas.map(forma => ({
        text: forma,
        fontSize: 7,
        bold: true,
        alignment: 'center',
        noWrap: false,
        border: [true, true, true, true],
        margin: [0, 2] 
    }));

    const allHeaders = [
        ...fixedHeaders,
        ...dynamicHeaders
    ];
    
    const widths = [
        '6%', '6%', '6%', '6%', 
        ...formasDePagoActivas.map(() => '9.3%')
    ];

    const facturasData = reportData.facturas.map(factura => {
        const fechaFormateada = new Date(factura.fechaFactura).toLocaleDateString('es-ES');

        const fixedData = [
            { text: fechaFormateada, fontSize: 8, alignment: 'center' },
            { text: reportData.tipo, fontSize: 8, alignment: 'center' },
            { text: factura.codFactura, fontSize: 8, alignment: 'center' },
            { text: Number(factura.totalFactura).toFixed(2), fontSize: 8, alignment: 'center' }
        ];

        const dynamicData = formasDePagoActivas.map(forma => ({
            text: factura.formasDePago[forma] || "0.00",
            fontSize: 8,
            alignment: 'center'
        }));
        
        return [...fixedData, ...dynamicData];
    });

    const totalGeneral = reportData.facturas.reduce((sum, factura) => sum + Number(factura.totalFactura), 0);

    const totalFormasDePago = formasDePagoActivas.map(forma =>
        reportData.facturas.reduce((sum, factura) => sum + (parseFloat(factura.formasDePago[forma] || "0")), 0)
    );
    
    const totalRow = [
        { text: 'Totales', colSpan: 3, alignment: 'center', bold: true, fontSize: 8 }, 
        {}, 
        {}, 
        { text: totalGeneral.toFixed(2), alignment: 'center', bold: true, fontSize: 8 },
        ...totalFormasDePago.map(total => ({
            text: total.toFixed(2),
            alignment: 'center',
            bold: true,
            fontSize: 8
        }))
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
                        allHeaders,
                        ...facturasData,
                        totalRow
                    ]
                }
            }
        ]
    };
};
