import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerCustomSection, footerSection } from './sections';

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
  companyParams?:
    | string
    | {
        nombre_empresa: string;
        direccion: string;
        telefonos: string;
        rif: string;
      };
}

export const getKardexReport = (
  options: KardexReportOptions,
): TDocumentDefinitions => {
  const { title, subTitle, data, startDate, endDate, companyParams } = options;

  const totalMontoEntrada = data
    .reduce((sum, item) => sum + item.cantidadEntrada * item.costoUnitario, 0)
    .toFixed(2);
  const totalMontoSalida = data
    .reduce((sum, item) => sum + item.montoSalida, 0)
    .toFixed(2);
  const totalMontoExistenciaInicial = data
    .reduce((sum, item) => sum + item.existenciaInicial * item.costoUnitario, 0)
    .toFixed(2);
  const totalMontoConsumo = data
    .reduce(
      (sum, item) =>
        sum + (item.cantidadConsumo ?? 0) * (item.costoUnitario ?? 0),
      0,
    )
    .toFixed(2);
  const totalExistenciaFinal = data
    .reduce((sum, item) => {
      const existenciaFinal =
        (item.existenciaInicial ?? 0) +
        (item.cantidadEntrada ?? 0) -
        (item.cantidadSalida ?? 0) -
        (item.cantidadConsumo ?? 0);
      return sum + existenciaFinal * (item.costoUnitario ?? 0);
    }, 0)
    .toFixed(2);

  return {
    pageOrientation: 'landscape',
    pageSize: {
      width: 1007.12,
      height: 612.28,
    },
    header: headerCustomSection({
      startDate: startDate,
      endDate: endDate,
      companyParams:
        typeof companyParams === 'string'
          ? {
              nombre_empresa: 'Nombre de la Empresa',
              direccion: 'Dirección',
              telefonos: 'Teléfono',
              rif: 'RIF',
            }
          : companyParams,
      showDate: true,
      showFilterDate: true,
    }),
    footer: footerSection,
    pageMargins: [20, 80, 20, 60],
    content: [
      {
        layout: 'customLayout01',
        table: {
          headerRows: 2,
          widths: [
            'auto',
            '*',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
          ],
          body: [
            [
              { text: '', border: [false, false, false, true] },
              { text: '', border: [false, false, false, true] },
              {
                text: 'EXISTENCIA INICIAL',
                colSpan: 3,
                alignment: 'center',
                bold: true,
                fontSize: 9,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              { text: '' },
              { text: '' },
              {
                text: 'ENTRADAS',
                colSpan: 2,
                alignment: 'center',
                bold: true,
                fontSize: 9,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              { text: '' },
              {
                text: 'SALIDAS',
                colSpan: 2,
                alignment: 'center',
                bold: true,
                fontSize: 9,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              { text: '' },
              {
                text: 'AUTO-CONSUMO',
                colSpan: 2,
                alignment: 'center',
                bold: true,
                fontSize: 9,
                fillColor: '#FF613F',
                color: '#FFFFFF',
                noWrap: true,
              },
              { text: '' },
              {
                text: 'EXISTENCIA FINAL',
                colSpan: 3,
                alignment: 'center',
                bold: true,
                fontSize: 9,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              { text: '' },
              { text: '' },
            ],
            [
              {
                text: 'Código',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              {
                text: 'Descripción',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              {
                text: 'Cantidad',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              {
                text: 'Costo UNI.',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
                noWrap: true,
              },
              {
                text: 'Mto. Total',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
                noWrap: true,
              },
              {
                text: 'Cantidad',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              {
                text: 'Monto',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              {
                text: 'Cantidad',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              {
                text: 'Monto',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              {
                text: 'Cantidad',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              {
                text: 'Monto',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              {
                text: 'Cantidad',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
              {
                text: 'Costo UNI.',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
                noWrap: true,
              },
              {
                text: 'Mto. Total',
                fontSize: 9,
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              },
            ],
            ...data.map((item, index) => {
              const existenciaFinal =
                (item.existenciaInicial ?? 0) +
                (item.cantidadEntrada ?? 0) -
                (item.cantidadSalida ?? 0) -
                (item.cantidadConsumo ?? 0);
              const isEven = index % 2 === 0;

              return [
                {
                  text: item.codigo,
                  fontSize: 8,
                  fillColor: isEven ? '#F3F4F6' : undefined,
                },
                {
                  text: item.descripcion1,
                  fontSize: 8,
                  bold: true,
                  fillColor: isEven ? '#F3F4F6' : undefined,
                },
                {
                  text: (item.existenciaInicial ?? 0).toFixed(2),
                  fontSize: 8,
                  alignment: 'center',
                  fillColor: isEven ? '#F3F4F6' : undefined,
                }, // Cantidad Existencia Inicial
                {
                  text: (item.costoUnitario ?? 0).toFixed(2),
                  fontSize: 8,
                  alignment: 'center',
                  fillColor: isEven ? '#F3F4F6' : undefined,
                }, // Costo UNI. Existencia Inicial
                {
                  text: (
                    (item.existenciaInicial ?? 0) * (item.costoUnitario ?? 0)
                  ).toFixed(2),
                  fontSize: 8,
                  alignment: 'center',
                  bold: true,
                  fillColor: isEven ? '#F3F4F6' : undefined,
                }, // Mto. Total Existencia Inicial
                {
                  text: (item.cantidadEntrada ?? 0).toFixed(2),
                  fontSize: 8,
                  alignment: 'center',
                  fillColor: isEven ? '#F3F4F6' : undefined,
                }, // Cantidad Entrada
                {
                  text: (
                    (item.cantidadEntrada ?? 0) * (item.costoUnitario ?? 0)
                  ).toFixed(2),
                  fontSize: 8,
                  bold: true,
                  alignment: 'center',
                  fillColor: isEven ? '#F3F4F6' : undefined,
                }, // Monto Entrada
                {
                  text: (item.cantidadSalida ?? 0).toFixed(2),
                  fontSize: 8,
                  alignment: 'center',
                  fillColor: isEven ? '#F3F4F6' : undefined,
                }, // Cantidad Salida
                {
                  text: (item.montoSalida ?? 0).toFixed(2),
                  fontSize: 8,
                  bold: true,
                  alignment: 'center',
                  fillColor: isEven ? '#F3F4F6' : undefined,
                }, // Monto Salida
                {
                  text: (item.cantidadConsumo ?? 0).toFixed(2),
                  fontSize: 8,
                  alignment: 'center',
                  fillColor: isEven ? '#F3F4F6' : undefined,
                }, // Cantidad Autoconsumo
                {
                  text: (item.montoConsumo ?? 0).toFixed(2),
                  fontSize: 8,
                  alignment: 'center',
                  bold: true,
                  fillColor: isEven ? '#F3F4F6' : undefined,
                }, // Monto Autoconsumo
                {
                  text: existenciaFinal.toFixed(2),
                  fontSize: 8,
                  alignment: 'center',
                  fillColor: isEven ? '#F3F4F6' : undefined,
                }, // Cantidad Existencia Final
                {
                  text: (item.costoUnitario ?? 0).toFixed(2),
                  fontSize: 8,
                  alignment: 'center',
                  fillColor: isEven ? '#F3F4F6' : undefined,
                }, // Costo UNI. Existencia Final
                {
                  text: (existenciaFinal * (item.costoUnitario ?? 0)).toFixed(
                    2,
                  ),
                  fontSize: 8,
                  alignment: 'center',
                  bold: true,
                  fillColor: isEven ? '#F3F4F6' : undefined,
                }, // Mto. Total Existencia Final
              ];
            }),
            [
              { text: '', colSpan: 4, border: [false, false, false, false] },
              {},
              {},
              {},
              {
                text: totalMontoExistenciaInicial,
                fontSize: 9,
                bold: true,
                alignment: 'center',
                fillColor: '#FF613F',
                color: '#FFFFFF',
              }, // Total Monto Existencia Inicial
              {},
              {
                text: totalMontoEntrada,
                fontSize: 9,
                bold: true,
                alignment: 'center',
                fillColor: '#FF613F',
                color: '#FFFFFF',
              }, // Total Monto Entrada
              {},
              {
                text: totalMontoSalida,
                fontSize: 9,
                bold: true,
                alignment: 'center',
                fillColor: '#FF613F',
                color: '#FFFFFF',
              }, // Total Monto Salida
              {},
              {
                text: totalMontoConsumo,
                fontSize: 9,
                alignment: 'center',
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              }, // Total Monto Autoconsumo
              {},
              {},
              {
                text: totalExistenciaFinal,
                fontSize: 9,
                alignment: 'center',
                bold: true,
                fillColor: '#FF613F',
                color: '#FFFFFF',
              }, // Total Monto Existencia Final
            ],
          ] as any,
        },
      } as any,
    ],
  };
};
