import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerCustomSection, footerSection } from './sections';

interface Factura {
  codFactura: string;
  fechaFactura: string;
  totalFactura: number;
  formasDePago: { [key: string]: string };
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
  companyParams?:
    | string
    | {
        nombre_empresa: string;
        direccion: string;
        telefonos: string;
        rif: string;
      };
}

export const getCierreReport = (
  options: CierreReportOptions,
): TDocumentDefinitions => {
  const { title, subTitle, data, companyParams } = options;
  const reportData = Array.isArray(data) ? data[0] : data;

  const formasDePagoActivas = Array.isArray(reportData.formasDePagoActivas)
    ? reportData.formasDePagoActivas
    : [];
  const headerOptions = {
    title: title ?? 'Flujo de Caja Detallado',
    subTitle: subTitle ?? 'Reporte de Movimientos de la Caja',
    showDate: true,
    showFilterDate: false,
    companyParams:
      typeof companyParams === 'string'
        ? {
            nombre_empresa: 'Nombre de la Empresa',
            direccion: 'Dirección',
            telefonos: 'Teléfono',
            rif: 'RIF',
          }
        : companyParams,
  };

  const fixedHeaders = [
    {
      text: 'Fecha',
      fontSize: 9,
      bold: true,
      alignment: 'center',
      fillColor: '#2563EB',
      color: '#FFFFFF',
    },
    {
      text: 'Tipo',
      fontSize: 9,
      bold: true,
      alignment: 'center',
      fillColor: '#2563EB',
      color: '#FFFFFF',
    },
    {
      text: 'Documento',
      fontSize: 9,
      bold: true,
      alignment: 'center',
      fillColor: '#2563EB',
      color: '#FFFFFF',
    },
    {
      text: 'Total',
      fontSize: 9,
      bold: true,
      alignment: 'center',
      fillColor: '#2563EB',
      color: '#FFFFFF',
    },
  ];

  const dynamicHeaders = formasDePagoActivas.map((forma) => ({
    text: forma,
    fontSize: 8,
    bold: true,
    alignment: 'center',
    noWrap: false,
    fillColor: '#2563EB',
    color: '#FFFFFF',
    margin: [0, 3],
  }));

  const allHeaders = [...fixedHeaders, ...dynamicHeaders];

  const widths = [
    '6%',
    '6%',
    '6%',
    '6%',
    ...formasDePagoActivas.map(() => '9.3%'),
  ];

  const facturasData = reportData.facturas.map((factura, index) => {
    const fechaFormateada = new Date(factura.fechaFactura).toLocaleDateString(
      'es-ES',
    );
    const isEven = index % 2 === 0;

    const fixedData = [
      {
        text: fechaFormateada,
        fontSize: 9,
        alignment: 'center',
        fillColor: isEven ? '#F3F4F6' : undefined,
      },
      {
        text: factura.totalFactura > 0 ? 'Venta' : 'Nota de Crédito',
        fontSize: 9,
        alignment: 'center',
        fillColor: isEven ? '#F3F4F6' : undefined,
      },
      {
        text: factura.codFactura,
        fontSize: 9,
        alignment: 'center',
        fillColor: isEven ? '#F3F4F6' : undefined,
      },
      {
        text: Number(factura.totalFactura).toFixed(2),
        fontSize: 9,
        alignment: 'center',
        fillColor: isEven ? '#F3F4F6' : undefined,
      },
    ];

    const dynamicData = formasDePagoActivas.map((forma) => ({
      text: parseFloat(factura.formasDePago[forma] || '0').toFixed(2),
      fontSize: 9,
      alignment: 'center',
      fillColor: isEven ? '#F3F4F6' : undefined,
    }));

    return [...fixedData, ...dynamicData];
  });

  const totalGeneral = reportData.facturas.reduce(
    (sum, factura) => sum + Number(factura.totalFactura),
    0,
  );

  const totalFormasDePago = formasDePagoActivas.map((forma) =>
    reportData.facturas.reduce(
      (sum, factura) => sum + parseFloat(factura.formasDePago[forma] || '0'),
      0,
    ),
  );

  const totalRow = [
    {
      text: 'TOTALES',
      colSpan: 3,
      alignment: 'center',
      bold: true,
      fontSize: 10,
      fillColor: '#2563EB',
      color: '#FFFFFF',
    },
    {},
    {},
    {
      text: totalGeneral.toFixed(2),
      alignment: 'center',
      bold: true,
      fontSize: 10,
      fillColor: '#2563EB',
      color: '#FFFFFF',
    },
    ...totalFormasDePago.map((total) => ({
      text: total.toFixed(2),
      alignment: 'center',
      bold: true,
      fontSize: 10,
      fillColor: '#2563EB',
      color: '#FFFFFF',
    })),
  ];

  return {
    pageOrientation: 'landscape',
    pageSize: {
      width: 1007.12,
      height: 612.28,
    },
    header: headerCustomSection(headerOptions),
    footer: footerSection,
    pageMargins: [20, 95, 20, 70],
    content: [
      {
        layout: 'customLayout01',
        table: {
          headerRows: 2,
          widths: widths,
          body: [allHeaders, ...facturasData, totalRow] as any,
        },
      } as any,
    ],
  };
};
