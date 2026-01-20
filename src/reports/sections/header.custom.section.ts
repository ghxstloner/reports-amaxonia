import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const currentDate: Content = {
  text: DateFormatter.getDDMMYYYY(new Date()),
  alignment: 'right',
  margin: [0, 15, 20, 0],
  fontSize: 10,
  italics: true,
  color: '#4B5563',
  bold: true,
};

interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showDate?: boolean;
  showFilterDate?: boolean;
  startDate?: string;
  endDate?: string;
  companyParams?: {
    nombre_empresa: string;
    direccion: string;
    telefonos: string;
    rif: string;
  };
}

export const headerCustomSection = (options: HeaderOptions): Content => {
  const {
    showDate = true,
    showFilterDate = false,
    title,
    subTitle,
    startDate,
    endDate,
    companyParams,
  } = options;

  const headerCompanyParams: Content = {
    stack: [
      {
        text: companyParams?.nombre_empresa ?? 'Nombre de la Empresa',
        fontSize: 13,
        bold: true,
        alignment: 'left',
        color: '#1E40AF',
      },
      {
        text: companyParams?.direccion ?? 'Dirección de la Empresa',
        fontSize: 8,
        alignment: 'left',
        margin: [0, 3, 0, 0],
        color: '#4B5563',
      },
      {
        text: `Teléfono: ${companyParams?.telefonos ?? '9999-9999'}`,
        fontSize: 8,
        alignment: 'left',
        margin: [0, 2, 0, 0],
        color: '#4B5563',
      },
      {
        text: `${companyParams?.rif ?? '99999999-9999'}`,
        fontSize: 8,
        alignment: 'left',
        margin: [0, 2, 0, 0],
        color: '#4B5563',
      },
    ],
    margin: [15, 10, 0, 0],
  };

  const headerDates: Content = showFilterDate
    ? {
        stack: [
          {
            text: null,
            fontSize: 16,
            bold: true,
            alignment: 'center',
            margin: [0, 5, 0, 3],
          },
          {
            text: null,
            fontSize: 11,
            italics: true,
            alignment: 'center',
            margin: [0, 3, 0, 6],
          },
          {
            text: `Fecha Desde: ${startDate ?? 'N/A'}      Fecha Hasta: ${endDate ?? 'N/A'}`,
            alignment: 'center',
            fontSize: 10,
            margin: [0, 0, 0, 10],
            color: '#1E40AF',
            bold: true,
          },
        ],
        alignment: 'center',
      }
    : { text: '' };

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            fontSize: 17,
            bold: true,
            alignment: 'center',
            margin: [-250, 20, 0, 4],
            color: '#1E40AF',
          },
          {
            text: subTitle,
            fontSize: 11,
            italics: true,
            alignment: 'center',
            margin: [-250, 0, 0, 10],
            color: '#4B5563',
          },
        ],
      }
    : null;

  const headerDate: Content = showDate ? currentDate : { text: '' };

  return {
    stack: [
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 967.12,
            y2: 0,
            lineWidth: 2,
            lineColor: '#2563EB',
          },
        ],
        margin: [20, 70, 20, 0],
      },
      {
        columns: [
          { width: 'auto', stack: [headerCompanyParams] },
          { width: '*', stack: [headerDates] },
          { width: '*', stack: [headerTitle] },
          { width: 'auto', stack: [headerDate] },
        ],
        columnGap: 10,
      },
    ],
  };
};
