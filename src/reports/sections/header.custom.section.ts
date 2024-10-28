import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

const currentDate: Content = {
    text: DateFormatter.getDDMMYYYY(new Date()),
    alignment: 'right',
    margin: [0, 15, 20, 0],
    fontSize: 9,
    italics: true
};

interface HeaderOptions {
    title?: string;
    subTitle?: string;
    showDate?: boolean;
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
    const { title, subTitle, showDate = true, startDate, endDate, companyParams } = options;

    const headerCompanyParams: Content = {
        stack: [
            { text: companyParams?.nombre_empresa ?? 'Nombre de la Empresa', fontSize: 10, bold: true, alignment: 'left' },
            { text: companyParams?.direccion ?? 'Dirección de la Empresa', fontSize: 9, alignment: 'left', margin: [0, 2, 0, 0] },
            { text: `Teléfono: ${companyParams?.telefonos ?? '9999-9999'}`, fontSize: 9, alignment: 'left', margin: [0, 2, 0, 0] },
            { text: `RIF: ${companyParams?.rif ?? '99999999-9999'}`, fontSize: 9, alignment: 'left', margin: [0, 2, 0, 0] }
        ],
        margin: [15, 10, 0, 0]
    };

    const headerDates: Content = {
        stack: [
            { 
                text: title ?? 'Título del Reporte', 
                fontSize: 16, 
                bold: true, 
                alignment: 'center', 
                margin: [0, 5, 0, 3] 
            },
            { 
                text: subTitle ?? 'Subtítulo del Reporte', 
                fontSize: 11, 
                italics: true, 
                alignment: 'center', 
                margin: [0, 3, 0, 6] 
            },
            {
                text: `Fecha Desde: ${startDate ?? 'N/A'}      Fecha Hasta: ${endDate ?? 'N/A'}`,
                alignment: 'center',
                fontSize: 10,
                margin: [0, 0, 0, 5],
                color: '#333333'
            }
        ],
        alignment: 'center'
    };

    const headerDate: Content = showDate ? currentDate : { text: '' };

    return {
        columns: [
            { width: 'auto', stack: [headerCompanyParams] },
            { width: '*', stack: [headerDates] },
            { width: 'auto', stack: [headerDate] }
        ],
        columnGap: 12
    };
};
